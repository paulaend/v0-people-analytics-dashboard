"use client"

import { Star, Target, MessageSquare, BarChart2, CheckCircle, AlertTriangle } from "lucide-react"
import {
  BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
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
    title: "Valoraci\u00f3n media global",
    value: "4,2 / 5",
    subtitle: "Media global de cuestionarios",
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
    title: "Tasa respuesta valoraci\u00f3n",
    value: "84,6%",
    subtitle: "Encuestas respondidas",
    icon: MessageSquare,
  },
  {
    title: "Tasa respuesta eficacia",
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
  {
    title: "% acciones bajo umbral",
    value: "6,8%",
    subtitle: "Satisfacci\u00f3n media < 3,5",
    icon: AlertTriangle,
    trend: { value: "-1,2 pp", positive: true },
  },
]

// ─── Chart data ───────────────────────────────────────────────────────────────
const monthlyValoracion = [
  { mes: "Ene", valoracion: 4.0 }, { mes: "Feb", valoracion: 4.1 },
  { mes: "Mar", valoracion: 4.2 }, { mes: "Abr", valoracion: 4.0 },
  { mes: "May", valoracion: 4.3 }, { mes: "Jun", valoracion: 4.4 },
  { mes: "Jul", valoracion: 4.2 }, { mes: "Ago", valoracion: 3.9 },
  { mes: "Sep", valoracion: 4.3 }, { mes: "Oct", valoracion: 4.4 },
  { mes: "Nov", valoracion: 4.2 }, { mes: "Dic", valoracion: 4.1 },
]

const monthlyEficacia = [
  { mes: "Ene", eficacia: 3.8 }, { mes: "Feb", eficacia: 3.9 },
  { mes: "Mar", eficacia: 4.0 }, { mes: "Abr", eficacia: 3.7 },
  { mes: "May", eficacia: 4.1 }, { mes: "Jun", eficacia: 4.2 },
  { mes: "Jul", eficacia: 4.0 }, { mes: "Ago", eficacia: 3.6 },
  { mes: "Sep", eficacia: 4.1 }, { mes: "Oct", eficacia: 4.3 },
  { mes: "Nov", eficacia: 4.1 }, { mes: "Dic", eficacia: 3.9 },
]

const byCategory = [
  { categoria: "Liderazgo", valoracion: 4.5, eficacia: 4.4 },
  { categoria: "Habilidades t\u00e9cnicas", valoracion: 4.3, eficacia: 4.1 },
  { categoria: "Soft skills", valoracion: 4.2, eficacia: 4.0 },
  { categoria: "Idiomas", valoracion: 4.1, eficacia: 3.9 },
  { categoria: "Compliance", valoracion: 3.8, eficacia: 3.6 },
]

const byModality = [
  { modalidad: "Presencial", valoracion: 4.5 },
  { modalidad: "Blended", valoracion: 4.3 },
  { modalidad: "Online", valoracion: 4.1 },
]

const byProvider = [
  { proveedor: "EAE Business", valoracion: 4.6 },
  { proveedor: "Udemy Business", valoracion: 4.4 },
  { proveedor: "F. Interna", valoracion: 4.3 },
  { proveedor: "LinkedIn Learn.", valoracion: 4.2 },
  { proveedor: "Coursera Teams", valoracion: 4.1 },
]

const scoreDistribution = [
  { puntuacion: "1", porcentaje: 2, color: "#f87171" },
  { puntuacion: "2", porcentaje: 5, color: "#fca5a5" },
  { puntuacion: "3", porcentaje: 14, color: "#e2e8f0" },
  { puntuacion: "4", porcentaje: 38, color: BLUE_LIGHT },
  { puntuacion: "5", porcentaje: 41, color: GREEN },
]

const UMBRAL = 3.5

const accionesBajoUmbral = [
  { accion: "Prevenci\u00f3n de riesgos laborales", categoria: "Compliance", valoracion: 3.2 },
  { accion: "Compliance RGPD", categoria: "Compliance", valoracion: 3.4 },
  { accion: "Normativa interna 2025", categoria: "Compliance", valoracion: 3.4 },
  { accion: "Excel b\u00e1sico", categoria: "Habilidades t\u00e9cnicas", valoracion: 3.45 },
  { accion: "Ingl\u00e9s nivel A2", categoria: "Idiomas", valoracion: 3.48 },
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

export function TabCalidad() {
  return (
    <div className="flex flex-col gap-4">
      {/* KPI Row – 6 tarjetas */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {kpis.map((kpi) => (
          <KPICard key={kpi.title} {...kpi} />
        ))}
      </div>

      {/* Bloque 1 – Tendencia */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ChartCard title="Tendencia mensual de valoraci\u00f3n media">
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={monthlyValoracion}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="mes" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} domain={[3, 5]} />
              <Tooltip content={<Tip />} />
              <Line type="monotone" dataKey="valoracion" name="Valoraci\u00f3n" stroke={BLUE} strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Tendencia mensual de eficacia media">
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={monthlyEficacia}>
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
        <ChartCard title="Valoraci\u00f3n media por categor\u00eda">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={byCategory} layout="vertical" barSize={12}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} domain={[0, 5]} />
              <YAxis dataKey="categoria" type="category" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} width={110} />
              <Tooltip content={<Tip />} />
              <Bar dataKey="valoracion" name="Valoraci\u00f3n" fill={BLUE} radius={[0, 3, 3, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Valoraci\u00f3n media por modalidad">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={byModality} barSize={36}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="modalidad" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} domain={[0, 5]} />
              <Tooltip content={<Tip />} />
              <Bar dataKey="valoracion" name="Valoraci\u00f3n" fill={BLUE_LIGHT} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Valoraci\u00f3n media por proveedor">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={byProvider} layout="vertical" barSize={12}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} domain={[0, 5]} />
              <YAxis dataKey="proveedor" type="category" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} width={100} />
              <Tooltip content={<Tip />} />
              <Bar dataKey="valoracion" name="Valoraci\u00f3n" fill={GREEN} radius={[0, 3, 3, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Bloque 3 – Distribución + tabla umbral */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ChartCard title="Distribuci\u00f3n de puntuaciones de satisfacci\u00f3n (1\u20135)">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={scoreDistribution} barSize={32}>
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

        <ChartCard title="Acciones bajo umbral (valoraci\u00f3n < 3,5)">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 pr-3 font-semibold text-muted-foreground">Acci\u00f3n</th>
                  <th className="text-left py-2 pr-3 font-semibold text-muted-foreground">Categor\u00eda</th>
                  <th className="text-right py-2 font-semibold text-muted-foreground">Valoraci\u00f3n</th>
                </tr>
              </thead>
              <tbody>
                {accionesBajoUmbral.map((a, i) => (
                  <tr key={i} className="border-b border-border last:border-0">
                    <td className="py-2 pr-3 text-foreground">{a.accion}</td>
                    <td className="py-2 pr-3 text-muted-foreground">{a.categoria}</td>
                    <td className="py-2 text-right font-semibold" style={{ color: "#ef4444" }}>
                      {a.valoracion.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-[10px] text-muted-foreground mt-2">
              Umbral de alerta: valoraci\u00f3n inferior a {UMBRAL}. Ordenadas de peor a mejor.
            </p>
          </div>
        </ChartCard>
      </div>
    </div>
  )
}
