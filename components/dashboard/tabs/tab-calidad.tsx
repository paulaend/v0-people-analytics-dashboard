"use client"

import { Star, Target, MessageSquare, BarChart2, CheckCircle, AlertTriangle } from "lucide-react"
import {
  BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell,
} from "recharts"
import { KPICard } from "@/components/dashboard/kpi-card"
import { ChartCard } from "@/components/dashboard/chart-card"

const BLUE = "var(--chart-blue)"
const GREEN = "var(--chart-green)"
const BLUE_LIGHT = "#a8c4e8"
const GREEN_LIGHT = "#9fd4c2"

// ─── KPI data ─────────────────────────────────────────────────────────────────
const kpis = [
  {
    title: "Satisfacción media",
    value: "4,2 / 5",
    subtitle: "Media global de cuestionarios",
    icon: Star,
    trend: { value: "+0,3", positive: true },
  },
  {
    title: "Eficacia media (manager)",
    value: "4,0 / 5",
    subtitle: "Evaluación de transferencia",
    icon: Target,
    trend: { value: "+0,2", positive: true },
  },
  {
    title: "Tasa de respuesta satisfacción",
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
    subtitle: "Superaron evaluación",
    icon: CheckCircle,
    trend: { value: "+3,1 pp", positive: true },
  },
  {
    title: "% acciones bajo umbral",
    value: "6,8%",
    subtitle: "Satisfacción media < 3,5",
    icon: AlertTriangle,
    trend: { value: "-1,2 pp", positive: true },
  },
]

// ─── Chart data ───────────────────────────────────────────────────────────────
const monthlyTrend = [
  { mes: "Ene", satisfaccion: 4.0, eficacia: 3.8 },
  { mes: "Feb", satisfaccion: 4.1, eficacia: 3.9 },
  { mes: "Mar", satisfaccion: 4.2, eficacia: 4.0 },
  { mes: "Abr", satisfaccion: 4.0, eficacia: 3.7 },
  { mes: "May", satisfaccion: 4.3, eficacia: 4.1 },
  { mes: "Jun", satisfaccion: 4.4, eficacia: 4.2 },
  { mes: "Jul", satisfaccion: 4.2, eficacia: 4.0 },
  { mes: "Ago", satisfaccion: 3.9, eficacia: 3.6 },
  { mes: "Sep", satisfaccion: 4.3, eficacia: 4.1 },
  { mes: "Oct", satisfaccion: 4.4, eficacia: 4.3 },
  { mes: "Nov", satisfaccion: 4.2, eficacia: 4.1 },
  { mes: "Dic", satisfaccion: 4.1, eficacia: 3.9 },
]

const byCategory = [
  { categoria: "Habilidades técnicas", satisfaccion: 4.3, eficacia: 4.1 },
  { categoria: "Liderazgo", satisfaccion: 4.5, eficacia: 4.4 },
  { categoria: "Compliance", satisfaccion: 3.8, eficacia: 3.6 },
  { categoria: "Soft skills", satisfaccion: 4.2, eficacia: 4.0 },
  { categoria: "Idiomas", satisfaccion: 4.1, eficacia: 3.9 },
]

const byModality = [
  { modalidad: "Online", satisfaccion: 4.1 },
  { modalidad: "Presencial", satisfaccion: 4.5 },
  { modalidad: "Blended", satisfaccion: 4.3 },
]

const byProvider = [
  { proveedor: "Udemy Business", satisfaccion: 4.4 },
  { proveedor: "LinkedIn Learning", satisfaccion: 4.2 },
  { proveedor: "EAE Business", satisfaccion: 4.6 },
  { proveedor: "Coursera Teams", satisfaccion: 4.1 },
  { proveedor: "Formación Interna", satisfaccion: 4.3 },
]

const scoreDistribution = [
  { puntuacion: "1", porcentaje: 2, color: "#f87171" },
  { puntuacion: "2", porcentaje: 5, color: "#fca5a5" },
  { puntuacion: "3", porcentaje: 14, color: "#e2e8f0" },
  { puntuacion: "4", porcentaje: 38, color: BLUE_LIGHT },
  { puntuacion: "5", porcentaje: 41, color: GREEN },
]

// Ranking de acciones por satisfacción media (top + worst)
const rankingAcciones = [
  { accion: "Liderazgo avanzado", satisfaccion: 4.8 },
  { accion: "Negociación efectiva", satisfaccion: 4.7 },
  { accion: "Excel avanzado", satisfaccion: 4.6 },
  { accion: "Compliance RGPD", satisfaccion: 3.4 },
  { accion: "Prevención de riesgos", satisfaccion: 3.2 },
]

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

const UMBRAL = 3.5

export function TabCalidad() {
  return (
    <div className="flex flex-col gap-4">
      {/* KPI Row – 6 tarjetas */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {kpis.map((kpi) => (
          <KPICard key={kpi.title} {...kpi} />
        ))}
      </div>

      {/* Bloque 1 – Tendencias */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ChartCard title="Tendencia mensual de satisfacción media">
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={monthlyTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="mes" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} domain={[3, 5]} />
              <Tooltip content={<Tip />} />
              <Line type="monotone" dataKey="satisfaccion" name="Satisfacción" stroke={BLUE} strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Tendencia mensual de eficacia media">
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={monthlyTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="mes" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} domain={[3, 5]} />
              <Tooltip content={<Tip />} />
              <Line type="monotone" dataKey="eficacia" name="Eficacia" stroke={GREEN} strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Bloque 2 – Calidad por oferta */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <ChartCard title="Satisfacción media por categoría">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={byCategory} layout="vertical" barSize={12}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} domain={[0, 5]} />
              <YAxis dataKey="categoria" type="category" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} width={110} />
              <Tooltip content={<Tip />} />
              <Bar dataKey="satisfaccion" name="Satisfacción" fill={BLUE} radius={[0, 3, 3, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Satisfacción media por modalidad">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={byModality} barSize={32}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="modalidad" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} domain={[0, 5]} />
              <Tooltip content={<Tip />} />
              <Bar dataKey="satisfaccion" name="Satisfacción" fill={BLUE_LIGHT} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Satisfacción media por proveedor">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={byProvider} layout="vertical" barSize={12}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} domain={[0, 5]} />
              <YAxis dataKey="proveedor" type="category" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} width={110} />
              <Tooltip content={<Tip />} />
              <Bar dataKey="satisfaccion" name="Satisfacción" fill={GREEN} radius={[0, 3, 3, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Bloque 2 cont. – Eficacia por categoría */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <ChartCard title="Eficacia media por categoría">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={byCategory} layout="vertical" barSize={12}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} domain={[0, 5]} />
              <YAxis dataKey="categoria" type="category" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} width={110} />
              <Tooltip content={<Tip />} />
              <Bar dataKey="eficacia" name="Eficacia" fill={GREEN_LIGHT} radius={[0, 3, 3, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Bloque 3 – Distribución de puntuaciones */}
        <ChartCard title="Distribución de puntuaciones de satisfacción (1–5)">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={scoreDistribution} barSize={28}>
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

        {/* Ranking de acciones por satisfacción + indicador umbral */}
        <ChartCard title="Ranking de acciones por satisfacción media">
          <div className="flex flex-col gap-2 pt-1">
            {rankingAcciones.map((a, i) => {
              const belowThreshold = a.satisfaccion < UMBRAL
              return (
                <div key={a.accion} className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-muted-foreground w-4 shrink-0">{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-0.5">
                      <span className="text-xs text-foreground truncate">{a.accion}</span>
                      <span
                        className="text-xs font-semibold pl-2"
                        style={{ color: belowThreshold ? "#ef4444" : "var(--foreground)" }}
                      >
                        {a.satisfaccion.toFixed(1)}
                        {belowThreshold && (
                          <span className="ml-1 text-[10px] font-normal text-red-500">↓ umbral</span>
                        )}
                      </span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${(a.satisfaccion / 5) * 100}%`,
                          backgroundColor: belowThreshold ? "#f87171" : BLUE,
                        }}
                      />
                    </div>
                  </div>
                </div>
              )
            })}
            <p className="text-[10px] text-muted-foreground mt-1">
              Umbral de alerta: puntuación inferior a {UMBRAL}
            </p>
          </div>
        </ChartCard>
      </div>
    </div>
  )
}
