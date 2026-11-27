export interface VideoChapter {
  idx: number;
  timeLabel: string;
  startSeconds: number;
  endSeconds: number;
  title: string;
  subtitle: string;
}

export interface Micro1Month {
  month: string;
  detail: string;
  amount: number;
  coverageRatio: number;
}

export interface AssetRow {
  component: string;
  costAssumed: string;
  marketValue: string;
  highlight?: boolean;
}

export interface FundAllocationItem {
  id: string;
  title: string;
  amount: number;
  percent: number;
  detail: string;
  colorClass: string;
}

export const VIDEO_CHAPTERS: VideoChapter[] = [
  {
    idx: 1,
    timeLabel: "0:00",
    startSeconds: 0.0,
    endSeconds: 20.74,
    title: "Producto Listo & Capital Propio",
    subtitle: "ERP & IA 100% construido ($55K–$85K) + fundador ya invirtiendo desde diciembre.",
  },
  {
    idx: 2,
    timeLabel: "0:21",
    startSeconds: 20.74,
    endSeconds: 41.38,
    title: "Qué Ofrece Grupo Volia",
    subtitle: "10 módulos integrados: SRI ilimitado, 61 bancos, Kardex, UAFE, RRHH e IA.",
  },
  {
    idx: 3,
    timeLabel: "0:41",
    startSeconds: 41.38,
    endSeconds: 64.04,
    title: "Plan Orgánico + Ventas Activas",
    subtitle: "Arranque en diciembre (4 fases), portavoz corporativo, videos propios y 3 vendedores ya activos.",
  },
  {
    idx: 4,
    timeLabel: "1:04",
    startSeconds: 64.04,
    endSeconds: 87.8,
    title: "Condiciones $5,000 → $5,600",
    subtitle: "+12% fijo (+$600) · Pre-pago VIP desde mayo hasta 28.8% APR real vs póliza.",
  },
  {
    idx: 5,
    timeLabel: "1:28",
    startSeconds: 87.8,
    endSeconds: 108.27,
    title: "Respaldo Real (Micro1 USA)",
    subtitle: "$9,075/mes promedio en Bank of America = cobertura 12x a 25x sobre la cuota.",
  },
  {
    idx: 6,
    timeLabel: "1:48",
    startSeconds: 108.27,
    endSeconds: 124.11,
    title: "Revisa Pagaré & Participa",
    subtitle: "Prueba los 10 demos abajo, revisa el pagaré y agenda tu llamada directa.",
  },
];

export const SCREENSHOT_GALLERY = [
  {
    id: "resumen",
    title: "Resumen & Emisor SRI 1-Clic",
    badge: "Módulo Central",
    src: "/assets/inversion/01_resumen_kpi_facturacion.png",
    demoUrl: "https://demo.grupovolia.com/demo/demo-comercio",
    desc: "Control de facturación en vivo, inventario valorizado CPP, créditos a 365 días y conversión instantánea de proforma a factura SRI.",
  },
  {
    id: "sri",
    title: "Contabilidad SRI v2 & ATS",
    badge: "Cumplimiento Fiscal",
    src: "/assets/inversion/02_contabilidad_sri.png",
    demoUrl: "https://demo.grupovolia.com/demo/demo-contable",
    desc: "Emisión ilimitada de comprobantes electrónicos con firma .p12 cifrada AES-256-GCM, retenciones automáticas y libro diario cuadrado.",
  },
  {
    id: "inventario",
    title: "Inventario Mixto & Escáner CODE128",
    badge: "Multibodega",
    src: "/assets/inversion/03_inventario_escaner.png",
    demoUrl: "https://demo.grupovolia.com/demo/demo-comercio",
    desc: "Soporta unidades SKU, peso/reciclaje con tara y merma, escáner con cámara trasera del celular y Kardex NIIF NIC 2 en tiempo real.",
  },
  {
    id: "finanzas",
    title: "Finanzas NIIF & 61 Bancos EC",
    badge: "Tesorería & Oráculo",
    src: "/assets/inversion/04_finanzas_oraculo_bancos.png",
    demoUrl: "https://demo.grupovolia.com/demo/demo-agro",
    desc: "Conciliación bancaria masiva con 61 bancos y cooperativas de Ecuador, Datafast/Medianet y Oráculo financiero cuantitativo.",
  },
  {
    id: "portal",
    title: "Portal B2B Clientes (/portal)",
    badge: "Autoservicio 24/7",
    src: "/assets/inversion/12_portal_b2b_autoservicio.png",
    demoUrl: "https://demo.grupovolia.com/portal/demo-comercio",
    desc: "Cada empresa entrega a sus propios clientes un portal corporativo para descargar facturas XML/RIDE y estados de cuenta sin soporte manual.",
  },
  {
    id: "empleados",
    title: "App Empleados White-Label",
    badge: "Móvil PWA + IESS",
    src: "/assets/inversion/13_app_empleados_movil.png",
    demoUrl: "https://demo.grupovolia.com/empleado/demo-comercio",
    desc: "Vestida con el logotipo y colores de cada cliente para marcar asistencia GPS, descargar roles de pago y gestionar vacaciones.",
  },
];

export const LIVE_DEMOS = [
  { label: "Comercio & Importadora", url: "https://demo.grupovolia.com/demo/demo-comercio" },
  { label: "Salud & Clínicas (LOPDP)", url: "https://demo.grupovolia.com/demo/demo-salud" },
  { label: "Inmobiliaria & UAFE ($10k)", url: "https://demo.grupovolia.com/demo/demo-inmobiliaria" },
  { label: "Agro & Camaroneras", url: "https://demo.grupovolia.com/demo/demo-agro" },
  { label: "Portal B2B Clientes", url: "https://demo.grupovolia.com/portal/demo-comercio" },
  { label: "App Empleados Móvil", url: "https://demo.grupovolia.com/empleado/demo-comercio" },
];

export const ASSET_BREAKDOWN: AssetRow[] = [
  {
    component: "1. Suite ERP Cloud (10 Módulos · 73 Endpoints)",
    costAssumed: "$0 deuda (Ing. propia)",
    marketValue: "$32,000 – $48,000",
  },
  {
    component: "2. Motor SRI v2 Auto-Retry + Bóveda .p12 + 61 Bancos",
    costAssumed: "Incluido + $0 deuda",
    marketValue: "$10,000 – $15,000",
  },
  {
    component: "3. Portales B2B/RRHH White-Label, Web & Stripe",
    costAssumed: "Dominios / Cloud / Setup",
    marketValue: "$6,000 – $10,000",
  },
  {
    component: "4. Kit Legal, 169 Guías/Contratos, 10 Demos & Videos",
    costAssumed: "Constitución SAS + IA",
    marketValue: "$7,000 – $12,000",
  },
  {
    component: "TOTAL ACTIVO OPERATIVO EN PRODUCCIÓN HOY",
    costAssumed: "~$2,200 – $3,000 efectivo*",
    marketValue: "$55,000 – $85,000 USD",
    highlight: true,
  },
];

export const FUND_ALLOCATION: FundAllocationItem[] = [
  {
    id: "pauta",
    title: "Pauta Digital B2B (6 Meses)",
    amount: 2800,
    percent: 56,
    detail: "$350–$500/mes en Meta Ads y Google Search Ecuador (campañas ABO desde 11 de enero).",
    colorClass: "bg-swiss-pine",
  },
  {
    id: "ugc",
    title: "Producción Videos UGC (2 Olas)",
    amount: 900,
    percent: 18,
    detail: "Pack de 3 videos 9:16 + 6 hooks de apertura/cierre para Q1 ($225 base) y renovación creativa Q2.",
    colorClass: "bg-brand-emerald",
  },
  {
    id: "reserva",
    title: "Reserva Impulso Pauta Q2 (& ISD EC)",
    amount: 700,
    percent: 14,
    detail: "Aceleración de anuncios ganadores en Q2 y cobertura de ajuste ISD si el desembolso entra por Ecuador.",
    colorClass: "bg-teal-600",
  },
  {
    id: "comercial",
    title: "Fuerza Comercial & Cámaras PYME",
    amount: 600,
    percent: 12,
    detail: "Kits impresos QR para visitas en campo, reclutamiento de asesores sin sueldo fijo y gremios.",
    colorClass: "bg-slate-600",
  },
];

export const MICRO1_AUDITED_MONTHS: Micro1Month[] = [
  { month: "Jul 2026", detail: "Capacidad verificada USA", amount: 11957.85, coverageRatio: 25.6 },
  { month: "Ago 2026", detail: "Capacidad verificada USA", amount: 8076.16, coverageRatio: 17.3 },
  { month: "Sep 2026", detail: "Capacidad verificada USA", amount: 10818.16, coverageRatio: 23.2 },
  { month: "Oct 2026", detail: "Capacidad verificada USA", amount: 11717.03, coverageRatio: 25.1 },
];

export const MARKETING_THREE_PILLARS = [
  {
    title: "1. Benchmarks B2B Ecuador",
    badge: "Costo Real Validado",
    bullets: [
      { label: "CPM B2B Ecuador:", text: "$2 a $12 USD en audiencias de dueños PYME y contadores." },
      { label: "Click-to-WhatsApp Calificado:", text: "$1.50 a $6.00 USD por conversación iniciada." },
      { label: "Atención Directa ($0):", text: "Responder conversaciones en WhatsApp Business (<24h) no genera costo extra." },
      { label: "Piso de Algoritmo:", text: "$10–$15 USD/día para salir de fase de aprendizaje y captar 80–160 chats/mes." },
    ],
  },
  {
    title: "2. Matriz 3 Videos + 6 Hooks",
    badge: "Multiplicador Creativo",
    bullets: [
      { label: "Video 1 (SRI / Facturación):", text: "Emisión ilimitada $0/doc + Auto-Retry ante caídas del SRI." },
      { label: "Video 2 (Inventario & Bancos):", text: "Lector CODE128 desde celular + 61 bancos/coops del Ecuador." },
      { label: "Video 3 (Suite 10 Módulos):", text: "Demo en vivo 24h y planes transparentes desde $35 + IVA/mes." },
      { label: "Variaciones AB:", text: "2 entradas y 2 salidas distintas por pieza = 6 anuncios compitiendo en ABO." },
    ],
  },
  {
    title: "3. Fuerza Comercial 100% Variable",
    badge: "$0 Nómina Fija",
    bullets: [
      { label: "Asesores Independientes:", text: "Cobran el 100% del Mes 1 ($69 en Suite PYME) + 15% recurrente Mes 2–12." },
      { label: "Caja Protegida:", text: "Corte al cierre de mes y liquidación del 1 al 5 solo sobre pagos ya acreditados." },
      { label: "Margen Caja Mes 1:", text: "Entre suscripción ($69) y Setup ($120), Grupo Volia retiene +$108 netos el Mes 1." },
      { label: "Margen Recurrente:", text: "Meses 2–12 deja $55.20/m netos (~80%); desde el Mes 13 sube a ~$66/m (~95%)." },
    ],
  },
];

export const INVESTOR_PERKS = [
  {
    title: "1. Bono Doble como Aliado Referidor (Comisión Oficial)",
    badge: "Ingreso Extra Sin Límite",
    desc: "Además del +12% fijo del préstamo, si refieres una empresa o estudio contable de tu círculo, recibes la comisión comercial oficial completa: 100% del Mes 1 + 15% del Mes 2 al 12 (~$183 USD totales por cada Suite PYME cerrada).",
    highlight: "Con solo referir 3 PYMEs generas ~$550 USD adicionales sobre tu retorno.",
  },
  {
    title: "2. Cortesía Círculo Fundador para Tu Negocio o Familia",
    badge: "Implementación Preferencial",
    desc: "Acceso prioritario a demostración privada, activación sin fricción para cualquier emprendimiento propio o familiar en Ecuador y condiciones preferenciales en el Setup inicial si deciden adoptar la Suite Grupo Volia.",
    highlight: "Herramienta lista para facturar al SRI, llevar bodegas e IESS desde el Día 1.",
  },
  {
    title: "3. Pagaré Formal + Reporte Mensual de Tracción",
    badge: "Claridad Legal y Operativa",
    desc: "Se suscribe pagaré simple / acuerdo privado con RUC de GRUPOVOLIA S.A.S. (0993410068001), cronograma exacto en USD y respaldo personal directo. Además recibes resumen mensual de nuevas empresas activadas y campañas.",
    highlight: "Puedes probar la plataforma en vivo 24/7 con los 10 sandboxes demo.",
  },
];

export const INVESTMENT_FAQS = [
  {
    q: "¿Por qué pedir $5,000 USD de inversión en promoción si el software ya está terminado?",
    a: "Porque todo el capital se destina íntegramente a escalar la promoción de lanzamiento comercial (pauta Meta/Google, contenido con portavoz corporativa de imagen empresarial, videos del fundador y activación comercial) sobre un plan orgánico que el fundador ya está financiando con capital propio desde diciembre de 2026 y con 3 asesores comerciales ya trabajando en campo. Es financieramente mucho más eficiente asumir +12% fijo ($600) que liquidar depósitos a largo plazo antes de vencimiento.",
  },
  {
    q: "¿De dónde salen los pagos si la campaña tarda unos meses en madurar?",
    a: "El pago mensual de $466.67 USD está respaldado principalmente por los ingresos independientes de Francisco en Micro1 Inc. (Silicon Valley, vía Deel → Bank of America, proyectos de $45–$100/h con promedio predominante de $70/h y $9,074.98 USD/mes promedio verificado Jul–Oct 2026). La cuota equivale a apenas ~5.1% de ese flujo. Adicionalmente, desde 7 clientes PYME activos (proyectado en Mes 4), el propio SaaS genera flujo neto suficiente para cubrir el 100% de la cuota.",
  },
  {
    q: "¿Qué gano si decides liquidar o pre-pagar todo el préstamo desde Mayo?",
    a: "¡Ganas exactamente los mismos intereses completos (+12% / +$600 sobre $5,000) en menos tiempo! Si te liquidamos en Mayo (~5 meses) o Junio (~6 meses), recibes tu capital íntegro más el 100% de los $600 USD pactados, lo que eleva tu rentabilidad anualizada real al 24.0% – 28.8% anual sin penalidad para ti.",
  },
  {
    q: "¿Qué documento legal respalda la operación y cómo se entrega el capital?",
    a: "Se suscribe un Pagaré a la Orden / Unsecured Commercial Promissory Note redactado para aplicar tanto bajo normativa de Ecuador (Código de Comercio y COGEP) como en Estados Unidos, con firma corporativa de GRUPOVOLIA S.A.S. y garante personal solidario de Francisco de la Vera. El capital pactado se entrega de golpe en una sola transferencia íntegra para arrancar la campaña completa y fijar el cronograma desde el Día 1. Puedes leer y descargar el modelo aquí mismo.",
  },
  {
    q: "¿Cómo funciona el circuito Ecuador vs. el circuito EE.UU.?",
    a: "Nos adaptamos a donde esté tu liquidez: Opción A (EE.UU.): Desembolso por Zelle (+1 407-205-5921) o Bank of America Checking (#898145828511); las pautas se pagan en USD directo con 0% ISD y tus cuotas regresan en BoA con 0% ISD. Opción B (Ecuador): Desembolso a GRUPOVOLIA S.A.S. en Banco de Guayaquil Cta. Cte. #19156303; el capital queda en Ecuador, el 5% ISD puntual de pauta exterior se cubre con el presupuesto Q2 y recibes tu repago localmente sin transferencias al exterior.",
  },
];
