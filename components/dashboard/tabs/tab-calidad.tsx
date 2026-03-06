"use client"

import { Star, Target, MessageSquare, BarChart2, CheckCircle } from "lucide-react"
import {
  BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
  Legend,
} from "recharts"
import { KPICard } from "@/components/dashboard/kpi-card"
import { ChartCard } from "@/components/dashboard/chart-card"

const BLUE = "var(--chart-blue)"
const GREEN = "var(--chart-green)"
const BLUE_LIGHT = "#a8c4e8"
const GREEN_LIGHT = "#9fd4c2"
const GRAY = "#cbd5e1"

// ─── KPI data (exactly 5 cards) ────────────────────────────────────────────────
const kpis = [
  {
    title: "Satisfacci\u00f3n media",
    value: "4,2 / 5",
    subtitle: "Media de cuestionarios finalizados",
    icon: Star,
    trend: { value: "+0,3", positive: true },
  },
  {
    title: "Eficacia media (manager)",
    value: "4,0 / 5",
    subtitle: "Evaluaci\u00f3n de transferencia",
    icon: Target,
    trend: { value: "+0,2", positive: true },
  },
  {
    title: "Tasa de respuesta satisfacci\u00f3n",
    value: "84,6%",
    subtitle: "Encuestas respondidas",
    icon: MessageSquare,
  },
  {
    title: "Tasa de respuesta eficacia",
    value: "76,2%",
    subtitle: "Encuestas respondidas",
    icon: BarChart2,
  },
  {
    title: "% participantes aptos",
    value: "91,3%",
    subtitle: "Superaron evaluaci\u00f3n",
    icon: CheckCircle,
    trend: { value: "+3,1 pp", positive: true },
  },
]

// ─── Monthly data with YoY comparison ──────────────────────────────────────────
const satisfaccionYoY = [
  { mes: "Ene", actual: 4.0, anterior: 3.8 },
  { mes: "Feb", actual: 4.1, anterior: 3.9 },
  { mes: "Mar", actual: 4.2, anterior: 4.0 },
  { mes: "Abr", actual: 4.0, anterior: 3.7 },
  { mes: "May", actual: 4.3, anterior: 4.1 },
  { mes: "Jun", actual: 4.4, anterior: 4.2 },
  { mes: "Jul", actual: 4.2, anterior: 4.0 },
  { mes: "Ago", actual: 3.9, anterior: 3.8 },
  { mes: "Sep", actual: 4.3, anterior: 4.1 },
  { mes: "Oct", actual: 4.4, anterior: 4.2 },
  { mes: "Nov", actual: 4.2, anterior: 4.0 },
  { mes: "Dic", actual: 4.1, anterior: 3.9 },
]

const eficaciaYoY = [
  { mes: "Ene", actual: 3.8, anterior: 3.6 },
  { mes: "Feb", actual: 3.9, anterior: 3.7 },
  { mes: "Mar", actual: 4.0, anterior: 3.8 },
  { mes: "Abr", actual: 3.7, anterior: 3.5 },
  { mes: "May", actual: 4.1, anterior: 3.9 },
  { mes: "Jun", actual: 4.2, anterior: 4.0 },
  { mes: "Jul", actual: 4.0, anterior: 3.8 },
  { mes: "Ago", actual: 3.6, anterior: 3.5 },
  { mes: "Sep", actual: 4.1, anterior: 3.9 },
  { mes: "Oct", actual: 4.3, anterior: 4.1 },
  { mes: "Nov", actual: 4.1, anterior: 3.9 },
  { mes: "Dic", actual: 3.9, anterior: 3.7 },
]

// ─── Satisfaction by offer (only satisfaction, no efficacy) ────────────────────
const satisfaccionByCategory = [
  { categoria: "Liderazgo", valor: 4.5 },
  { categoria: "Habilidades t\u00e9cnicas", valor: 4.3 },
  { categoria: "Soft skills", valor: 4.2 },
  { categoria: "Idiomas", valor: 4.1 },
  { categoria: "Compliance", valor: 3.8 },
]

const satisfaccionByModality = [
  { modalidad: "Presencial", valor: 4.5 },
  { modalidad: "Blended", valor: 4.3 },
  { modalidad: "Online", valor: 4.1 },
]

const satisfaccionByProvider = [
  { proveedor: "EAE Business", valor: 4.6 },
  { proveedor: "Udemy Business", valor: 4.4 },
  { proveedor: "F. Interna", valor: 4.3 },
  { proveedor: "LinkedIn Learn.", valor: 4.2 },
  { proveedor: "Coursera Teams", valor: 4.1 },
]

// ─── Score distribution ───────────────────────────────────────────────────────
const scoreDistribution = [
  { puntuacion: "1", porcentaje: 2, color: "#f87171" },
  { puntuacion: "2", porcentaje: 5, color: "#fca5a5" },
  { puntuacion: "3", porcentaje: 14, color: GRAY },
  { puntuacion: "4", porcentaje: 38, color: BLUE_LIGHT },
  { puntuacion: "5", porcentaje: 41, color: GREEN },
]

// ─── Ranking de acciones ──────────────────────────────────────────────────────
const accionesRanking = [
  { accion: "Liderazgo de excelencia", satisfaccion: 4.7, respuestas: 23 },
  { accion: "Transformaci\u00f3n digital", satisfaccion: 4.6, respuestas: 31 },
  { accion: "Comunicaci\u00f3n efectiva", satisfaccion: 4.5, respuestas: 28 },
  { accion: "Gesti\u00f3n de proyectos", satisfaccion: 4.4, respuestas: 24 },
  { accion: "Inteligencia emocional", satisfaccion: 4.3, respuestas: 19 },
  { accion: "Analyt\u00edtica de datos", satisfaccion: 4.2, respuestas: 15 },
  { accion: "Seguridad cibern\u00e9tica", satisfaccion: 4.0, respuestas: 12 },
  { accion: "Compliance RGPD", satisfaccion: 3.4, respuestas: 8 },
]

// ─── Alert data (% acciones con satisfacción < umbral) ─────────────────────────
const UMBRAL = 3.5
const accionesConAlerta = 6.8 // porcentaje de acciones bajo umbral

// ─── Tooltip ──────────────────────────────────────────────────────────────────
function Tip({ active, payload, label, suffix = "" }: {
  active?: boolean
  payload?: Array<{ value: number; name: string; color?: string }>
  label?: string
  suffix?: string
}) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-card border border-border rounded-lg shadow-md px-3 py-2 text-xs">
      {label && <p className="font-semibold text-foreground mb-1">{label}</p>}
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color || "var(--foreground)" }}>
          {p.name}: <span className="font-semibold">{p.value}{suffix}</span>
        </p>
      ))}
    </div>
  )
}

export function TabCalidad() {
  return (
    <div className="flex flex-col gap-4">
      {/* KPI Row – 5 tarjetas (sin % acciones bajo umbral) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {kpis.map((kpi) => (
          <KPICard key={kpi.title} {...kpi} />
        ))}
      </div>

      {/* Bloque 1 – Tendencia con YoY (línea) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ChartCard title="Tendencia mensual de satisfacci\u00f3n media">
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={satisfaccionYoY}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="mes" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} domain={[3, 5]} />
              <Tooltip content={<Tip />} />
              <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "16px" }} />
              <Line type="monotone" dataKey="actual" name="A\u00f1o actual" stroke={BLUE} strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="anterior" name="A\u00f1o anterior" stroke={GRAY} strokeWidth={2} dot={false} strokeDasharray="5 5" />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Tendencia mensual de eficacia media">
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={eficaciaYoY}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="mes" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} domain={[3, 5]} />
              <Tooltip content={<Tip />} />
              <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "16px" }} />
              <Line type="monotone" dataKey="actual" name="A\u00f1o actual" stroke={GREEN} strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="anterior" name="A\u00f1o anterior" stroke={GRAY} strokeWidth={2} dot={false} strokeDasharray="5 5" />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Bloque 2 – Satisfacci\u00f3n por oferta (solo satisfacci\u00f3n, sin eficacia) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <ChartCard title="Satisfacci\u00f3n media por categor\u00eda">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={satisfaccionByCategory} layout="vertical" barSize={14}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} domain={[0, 5]} />
              <YAxis dataKey="categoria" type="category" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} width={110} />
              <Tooltip content={<Tip />} />
              <Bar dataKey="valor" name="Satisfacci\u00f3n" fill={BLUE} radius={[0, 3, 3, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Satisfacci\u00f3n media por modalidad">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={satisfaccionByModality} barSize={40}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="modalidad" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} domain={[0, 5]} />
              <Tooltip content={<Tip />} />
              <Bar dataKey="valor" name="Satisfacci\u00f3n" fill={BLUE_LIGHT} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Satisfacci\u00f3n media por proveedor">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={satisfaccionByProvider} layout="vertical" barSize={14}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} domain={[0, 5]} />
              <YAxis dataKey="proveedor" type="category" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} width={100} />
              <Tooltip content={<Tip />} />
              <Bar dataKey="valor" name="Satisfacci\u00f3n" fill={GREEN} radius={[0, 3, 3, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Bloque 3 – Distribuci\u00f3n de puntuaciones + Ranking */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ChartCard title="Distribuci\u00f3n de puntuaciones de satisfacci\u00f3n (1\u20135)">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={scoreDistribution} barSize={36}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="puntuacion" tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} unit="%" />
              <Tooltip content={<Tip suffix="%" />} />
              <Bar dataKey="porcentaje" name="% respuestas" radius={[3, 3, 0, 0]}>
                {scoreDistribution.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Ranking de acciones formativas por satisfacci\u00f3n media">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 pr-3 font-semibold text-muted-foreground">Acci\u00f3n</th>
                  <th className="text-center py-2 pr-3 font-semibold text-muted-foreground">Satisfacci\u00f3n</th>
                  <th className="text-center py-2 font-semibold text-muted-foreground">Respuestas</th>
                </tr>
              </thead>
              <tbody>
                {accionesRanking.map((a, i) => (
                  <tr key={i} className="border-b border-border last:border-0 hover:bg-secondary transition-colors">
                    <td className="py-2 pr-3 text-foreground font-medium">{a.accion}</td>
                    <td className="py-2 pr-3 text-center font-semibold" style={{ color: a.satisfaccion >= 4 ? BLUE : a.satisfaccion >= UMBRAL ? "var(--foreground)" : "#ef4444" }}>
                      {a.satisfaccion.toFixed(1)} / 5
                    </td>
                    <td className="py-2 text-center text-muted-foreground">{a.respuestas}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ChartCard>
      </div>

      {/* Bloque 4 – Alertas de calidad */}
      <div className="grid grid-cols-1 gap-4">
        <ChartCard title="Alertas de calidad">
          <div className="flex items-center justify-between px-4 py-6">
            <div>
              <p className="text-sm text-muted-foreground mb-1">
                % de acciones con satisfacci\u00f3n &lt; {UMBRAL}
              </p>
              <p className="text-3xl font-bold" style={{ color: BLUE }}>
                {accionesConAlerta}%
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Umbral de alerta configurado en {UMBRAL}. Se recomienda revisi\u00f3n de acciones bajo umbral.
              </p>
            </div>
            <div className="w-24 h-24 rounded-full flex items-center justify-center" style={{ background: `conic-gradient(${BLUE} 0deg ${accionesConAlerta * 3.6}deg, ${GRAY} ${accionesConAlerta * 3.6}deg)` }}>
              <div className="w-20 h-20 rounded-full bg-card flex items-center justify-center">
                <span className="text-lg font-bold" style={{ color: BLUE }}>
                  {accionesConAlerta}%
                </span>
              </div>
            </div>
          </div>
        </ChartCard>
      </div>
    </div>
  )
}
