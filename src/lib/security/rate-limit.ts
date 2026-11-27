import type { NextRequest } from "next/server";

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: number;
  retryAfterSec: number;
}

interface MemoryRateEntry {
  count: number;
  resetAt: number;
}

const memoryStore = new Map<string, MemoryRateEntry>();
const MAX_MEMORY_ENTRIES = 5000;

function cleanupExpiredEntries(now: number): void {
  if (memoryStore.size <= MAX_MEMORY_ENTRIES) return;

  for (const [k, v] of memoryStore) {
    if (v.resetAt <= now) {
      memoryStore.delete(k);
    }
  }

  // Hard cap protection in case of unique-key flood within the active window
  if (memoryStore.size > MAX_MEMORY_ENTRIES) {
    const excess = memoryStore.size - 4000;
    let removed = 0;
    for (const k of memoryStore.keys()) {
      memoryStore.delete(k);
      removed += 1;
      if (removed >= excess) break;
    }
  }
}

function checkMemoryRateLimit(
  key: string,
  limit: number,
  windowMs: number
): RateLimitResult {
  const now = Date.now();
  cleanupExpiredEntries(now);

  const existing = memoryStore.get(key);
  if (!existing || existing.resetAt <= now) {
    const resetAt = now + windowMs;
    memoryStore.set(key, { count: 1, resetAt });
    return {
      allowed: true,
      remaining: Math.max(0, limit - 1),
      resetAt,
      retryAfterSec: Math.max(1, Math.ceil(windowMs / 1000)),
    };
  }

  existing.count += 1;
  const allowed = existing.count <= limit;
  const remaining = Math.max(0, limit - existing.count);
  const retryAfterSec = Math.max(1, Math.ceil((existing.resetAt - now) / 1000));

  return {
    allowed,
    remaining,
    resetAt: existing.resetAt,
    retryAfterSec,
  };
}

/**
 * Extracts client IP safely from standard proxy headers (Vercel / Cloudflare / Reverse Proxy).
 */
export function getClientIp(req: Request | NextRequest): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) {
    const firstIp = xff.split(",")[0]?.trim();
    if (firstIp) return firstIp.slice(0, 64);
  }

  const realIp = req.headers.get("x-real-ip")?.trim();
  if (realIp) return realIp.slice(0, 64);

  const cfIp = req.headers.get("cf-connecting-ip")?.trim();
  if (cfIp) return cfIp.slice(0, 64);

  return "unknown";
}

/**
 * Checks rate limit using Upstash Redis REST API when configured,
 * with automatic zero-downtime fallback to an in-memory Map.
 */
export async function checkRateLimit(
  key: string,
  limit: number,
  windowMs: number
): Promise<RateLimitResult> {
  const upstashUrl = process.env.UPSTASH_REDIS_REST_URL?.trim();
  const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN?.trim();

  if (upstashUrl && upstashToken) {
    try {
      const now = Date.now();
      const bucket = Math.floor(now / windowMs);
      const resetAt = (bucket + 1) * windowMs;
      const redisKey = `gv_rl:${key}:${bucket}`;
      const baseUrl = upstashUrl.replace(/\/+$/, "");

      const res = await fetch(`${baseUrl}/pipeline`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${upstashToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify([
          ["INCR", redisKey],
          ["PEXPIRE", redisKey, windowMs],
        ]),
        signal: AbortSignal.timeout(1500),
        cache: "no-store",
      });

      if (res.ok) {
        const data = (await res.json()) as Array<{ result?: number }>;
        const count = Number(data?.[0]?.result ?? 0);
        if (Number.isFinite(count) && count > 0) {
          const allowed = count <= limit;
          return {
            allowed,
            remaining: Math.max(0, limit - count),
            resetAt,
            retryAfterSec: Math.max(1, Math.ceil((resetAt - now) / 1000)),
          };
        }
      }
    } catch {
      // Seamless fallback to in-memory limiter if Upstash is unreachable
    }
  }

  return checkMemoryRateLimit(key, limit, windowMs);
}

/**
 * Escapes untrusted strings before interpolating into HTML email templates.
 */
export function escapeHtml(str: unknown): string {
  return String(str ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
