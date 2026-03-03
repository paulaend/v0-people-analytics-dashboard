"use client"

import { BookOpen, Users, UserCheck, Clock, Percent } from "lucide-react"
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
    title: "Acciones finalizadas",
    value: "192",
    subtitle: "Acumulado año",
    icon: BookOpen,
    trend: { value: "14,2%", positive: true },
  },
  {
    title: "Participantes inscritos",
    value: "1.615",
    subtitle: "Total inscripciones",
    icon: Users,
    trend: { value: "11,8%", positive: true },
  },
  {
    title: "Participantes finalizados",
    value: "1.366",
    subtitle: "Completaron la acción",
    icon: UserCheck,
    trend: { value: "13,1%", positive: true },
  },
  {
    title: "Tasa de finalización",
    value: "84,6%",
    subtitle: "Finalizados / inscritos",
    icon: Percent,
    trend: { value: "+2,4 pp", positive: true },
  },
  {
    title: "Horas totales impartidas",
    value: "7.390 h",
    subtitle: "Total acumulado",
    icon: Clock,
  },
]

// ─── Chart data ───────────────────────────────────────────────────────────────
const monthlyAcciones = [
  { mes: "Ene", actual: 14, anterior: 12 }, { mes: "Feb", actual: 18, anterior: 15 },
  { mes: "Mar", actual: 22, anterior: 19 }, { mes: "Abr", actual: 17, anterior: 14 },
  { mes: "May", actual: 26, anterior: 22 }, { mes: "Jun", actual: 31, anterior: 27 },
  { mes: "Jul", actual: 19, anterior: 16 }, { mes: "Ago", actual: 8, anterior: 7 },
  { mes: "Sep", actual: 24, anterior: 21 }, { mes: "Oct", actual: 28, anterior: 24 },
  { mes: "Nov", actual: 25, anterior: 22 }, { mes: "Dic", actual: 15, anterior: 13 },
]

const monthlyInscritos = [
  { mes: "Ene", actual: 94, anterior: 82 }, { mes: "Feb", actual: 118, anterior: 101 },
  { mes: "Mar", actual: 142, anterior: 126 }, { mes: "Abr", actual: 106, anterior: 95 },
  { mes: "May", actual: 162, anterior: 140 }, { mes: "Jun", actual: 188, anterior: 161 },
  { mes: "Jul", actual: 128, anterior: 112 }, { mes: "Ago", actual: 72, anterior: 68 },
  { mes: "Sep", actual: 156, anterior: 138 }, { mes: "Oct", actual: 176, anterior: 154 },
  { mes: "Nov", actual: 164, anterior: 148 }, { mes: "Dic", actual: 109, anterior: 96 },
]

const byCategory = [
  { categoria: "Habilidades técnicas", acciones: 72 },
  { categoria: "Liderazgo", acciones: 46 },
  { categoria: "Compliance", acciones: 34 },
  { categoria: "Soft skills", acciones: 28 },
  { categoria: "Idiomas", acciones: 12 },
]

const byModality = [
  { modalidad: "Online", acciones: 111 },
  { modalidad: "Presencial", acciones: 59 },
  { modalidad: "Blended", acciones: 22 },
]

const byEstado = [
  { estado: "Inscrito", participantes: 249, color: BLUE_LIGHT },
  { estado: "Iniciado", participantes: 312, color: BLUE },
  { estado: "Finalizado", participantes: 1366, color: GREEN },
  { estado: "Baja", participantes: 88, color: "#e2e8f0" },
]

const topProviders = [
  { proveedor: "Udemy Business", participantes: 186 },
  { proveedor: "LinkedIn Learning", participantes: 142 },
  { proveedor: "EAE Business School", participantes: 98 },
  { proveedor: "Coursera for Teams", participantes: 74 },
  { proveedor: "Formación Interna", participantes: 61 },
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

export function TabVolumen() {
  return (
    <div className="flex flex-col gap-4">
      {/* KPI Row – 5 tarjetas */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {kpis.map((kpi) => (
          <KPICard key={kpi.title} {...kpi} />
        ))}
      </div>

      {/* Charts row 1 – tendencias */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ChartCard title="Tendencia mensual de acciones">
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={monthlyAcciones}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="mes" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <Tooltip content={<Tip />} />
              <Legend iconSize={8} iconType="circle" wrapperStyle={{ fontSize: 10 }} />
              <Line type="monotone" dataKey="actual" name="Año actual" stroke={BLUE} strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="anterior" name="Año anterior" stroke={GREEN} strokeWidth={2} dot={false} strokeDasharray="4 2" />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Tendencia mensual de participantes inscritos">
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={monthlyInscritos}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="mes" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <Tooltip content={<Tip />} />
              <Legend iconSize={8} iconType="circle" wrapperStyle={{ fontSize: 10 }} />
              <Line type="monotone" dataKey="actual" name="Año actual" stroke={BLUE} strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="anterior" name="Año anterior" stroke={GREEN} strokeWidth={2} dot={false} strokeDasharray="4 2" />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Charts row 2 – reparto */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <ChartCard title="Acciones por categoría">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={byCategory} layout="vertical" barSize={12}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <YAxis dataKey="categoria" type="category" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} width={110} />
              <Tooltip content={<Tip />} />
              <Bar dataKey="acciones" name="Acciones" fill={GREEN} radius={[0, 3, 3, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Acciones por modalidad">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={byModality} barSize={32}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="modalidad" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <Tooltip content={<Tip />} />
              <Bar dataKey="acciones" name="Acciones" fill={BLUE_LIGHT} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Participantes por estado">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={byEstado} barSize={28}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="estado" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <Tooltip content={<Tip />} />
              <Bar dataKey="participantes" name="Participantes" radius={[3, 3, 0, 0]}>
                {byEstado.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Charts row 3 – proveedores */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ChartCard title="Top 5 proveedores por participantes">
          <div className="flex flex-col gap-2 pt-1">
            {topProviders.map((p, i) => (
              <div key={p.proveedor} className="flex items-center gap-2">
                <span className="text-xs font-semibold text-muted-foreground w-4 shrink-0">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-0.5">
                    <span className="text-xs text-foreground truncate">{p.proveedor}</span>
                    <span className="text-xs font-semibold text-foreground pl-2">{p.participantes}</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${(p.participantes / topProviders[0].participantes) * 100}%`, backgroundColor: BLUE }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>
    </div>
  )
}
