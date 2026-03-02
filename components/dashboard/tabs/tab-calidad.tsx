"use client"

import { Star, Target, MessageSquare, BarChart2, CheckCircle, AlertTriangle } from "lucide-react"
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend, Cell,
} from "recharts"
import { KPICard } from "@/components/dashboard/kpi-card"
import { ChartCard } from "@/components/dashboard/chart-card"

const BLUE = "var(--chart-blue)"
const GREEN = "var(--chart-green)"
const BLUE_LIGHT = "#a8c4e8"
const GREEN_LIGHT = "#9fd4c2"

const monthlySatisfaction = [
  { mes: "Ene", satisfaccion: 4.0, efectividad: 3.8 },
  { mes: "Feb", satisfaccion: 4.1, efectividad: 3.9 },
  { mes: "Mar", satisfaccion: 4.2, efectividad: 4.0 },
  { mes: "Abr", satisfaccion: 4.0, efectividad: 3.7 },
  { mes: "May", satisfaccion: 4.3, efectividad: 4.1 },
  { mes: "Jun", satisfaccion: 4.4, efectividad: 4.2 },
  { mes: "Jul", satisfaccion: 4.2, efectividad: 4.0 },
  { mes: "Ago", satisfaccion: 3.9, efectividad: 3.6 },
  { mes: "Sep", satisfaccion: 4.3, efectividad: 4.1 },
  { mes: "Oct", satisfaccion: 4.4, efectividad: 4.3 },
  { mes: "Nov", satisfaccion: 4.2, efectividad: 4.1 },
  { mes: "Dic", satisfaccion: 4.1, efectividad: 3.9 },
]

const byCategory = [
  { categoria: "Habilidades técnicas", satisfaccion: 4.3, efectividad: 4.1 },
  { categoria: "Liderazgo", satisfaccion: 4.5, efectividad: 4.4 },
  { categoria: "Compliance", satisfaccion: 3.8, efectividad: 3.6 },
  { categoria: "Soft skills", satisfaccion: 4.2, efectividad: 4.0 },
  { categoria: "Idiomas", satisfaccion: 4.1, efectividad: 3.9 },
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

const kpis = [
  { title: "Satisfacción media", value: "4,2 / 5", subtitle: "Puntuación media global", icon: Star, trend: { value: "+0,3", positive: true } },
  { title: "Efectividad media", value: "4,0 / 5", subtitle: "Puntuación media global", icon: Target, trend: { value: "+0,2", positive: true } },
  { title: "Tasa de respuesta satisfacción", value: "84,6%", subtitle: "Encuestas respondidas", icon: MessageSquare },
  { title: "Tasa de respuesta efectividad", value: "76,2%", subtitle: "Encuestas respondidas", icon: BarChart2 },
  { title: "% participantes \"Apto\"", value: "91,3%", subtitle: "Superaron evaluación", icon: CheckCircle, trend: { value: "+3,1 pp", positive: true } },
  { title: "% cursos bajo umbral", value: "6,8%", subtitle: "Puntuación inferior a 3,5", icon: AlertTriangle, trend: { value: "-1,2 pp", positive: true } },
]

function TooltipCustom({ active, payload, label, suffix = "" }: {
  active?: boolean; payload?: Array<{ value: number; name: string; color?: string }>; label?: string; suffix?: string
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
      {/* KPI Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {kpis.map((kpi) => (
          <KPICard key={kpi.title} {...kpi} />
        ))}
      </div>

      {/* Charts row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <ChartCard title="Evolución mensual de satisfacción">
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={monthlySatisfaction}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="mes" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} domain={[3, 5]} />
              <Tooltip content={<TooltipCustom />} />
              <Line type="monotone" dataKey="satisfaccion" name="Satisfacción" stroke={BLUE} strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Evolución mensual de efectividad">
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={monthlySatisfaction}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="mes" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} domain={[3, 5]} />
              <Tooltip content={<TooltipCustom />} />
              <Line type="monotone" dataKey="efectividad" name="Efectividad" stroke={GREEN} strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Distribución de puntuaciones de satisfacción (1–5)">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={scoreDistribution} barSize={28}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="puntuacion" tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} unit="%" />
              <Tooltip content={<TooltipCustom suffix="%" />} />
              <Bar dataKey="porcentaje" name="% respuestas" radius={[3, 3, 0, 0]}>
                {scoreDistribution.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Charts row 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <ChartCard title="Satisfacción por categoría">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={byCategory} layout="vertical" barSize={12}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} domain={[0, 5]} />
              <YAxis dataKey="categoria" type="category" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} width={100} />
              <Tooltip content={<TooltipCustom />} />
              <Bar dataKey="satisfaccion" name="Satisfacción" fill={BLUE} radius={[0, 3, 3, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Satisfacción por proveedor">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={byProvider} layout="vertical" barSize={12}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} domain={[0, 5]} />
              <YAxis dataKey="proveedor" type="category" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} width={100} />
              <Tooltip content={<TooltipCustom />} />
              <Bar dataKey="satisfaccion" name="Satisfacción" fill={GREEN} radius={[0, 3, 3, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Efectividad por categoría">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={byCategory} layout="vertical" barSize={12}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} domain={[0, 5]} />
              <YAxis dataKey="categoria" type="category" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} width={100} />
              <Tooltip content={<TooltipCustom />} />
              <Bar dataKey="efectividad" name="Efectividad" fill={BLUE_LIGHT} radius={[0, 3, 3, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  )
}
