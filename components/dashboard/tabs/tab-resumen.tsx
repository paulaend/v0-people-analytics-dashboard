"use client"

import { Users, Clock, TrendingUp, BookOpen, Star } from "lucide-react"
import {
  LineChart, Line, PieChart, Pie, Cell,
  BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts"
import { KPICard } from "@/components/dashboard/kpi-card"
import { ChartCard } from "@/components/dashboard/chart-card"

const BLUE = "var(--chart-blue)"
const GREEN = "var(--chart-green)"
const BLUE_LIGHT = "#a8c4e8"
const GREEN_LIGHT = "#9fd4c2"

// ─── KPI data ────────────────────────────────────────────────────────────────
const kpis = [
  {
    title: "Empleados formados",
    value: "479",
    subtitle: "Participantes únicos finalizados",
    icon: Users,
    trend: { value: "8,3%", positive: true },
  },
  {
    title: "% plantilla formada",
    value: "72,6%",
    subtitle: "Sobre empleados activos",
    icon: TrendingUp,
    trend: { value: "4,1 pp", positive: true },
  },
  {
    title: "Horas totales recibidas",
    value: "7.390 h",
    subtitle: "Participantes finalizados",
    icon: Clock,
    trend: { value: "12,4%", positive: true },
  },
  {
    title: "Horas medias/formado",
    value: "15,4 h",
    subtitle: "Por empleado formado",
    icon: BookOpen,
  },
  {
    title: "Satisfacción media",
    value: "4,2 / 5",
    subtitle: "Media global de cuestionarios",
    icon: Star,
    trend: { value: "+0,3", positive: true },
  },
]

// ─── Chart data ───────────────────────────────────────────────────────────────
const monthlyPersonas = [
  { mes: "Ene", actual: 28, anterior: 24 }, { mes: "Feb", actual: 35, anterior: 29 },
  { mes: "Mar", actual: 42, anterior: 36 }, { mes: "Abr", actual: 31, anterior: 27 },
  { mes: "May", actual: 48, anterior: 41 }, { mes: "Jun", actual: 55, anterior: 47 },
  { mes: "Jul", actual: 38, anterior: 33 }, { mes: "Ago", actual: 22, anterior: 20 },
  { mes: "Sep", actual: 46, anterior: 40 }, { mes: "Oct", actual: 52, anterior: 45 },
  { mes: "Nov", actual: 49, anterior: 43 }, { mes: "Dic", actual: 33, anterior: 29 },
]

const monthlyHoras = [
  { mes: "Ene", actual: 420, anterior: 370 }, { mes: "Feb", actual: 560, anterior: 490 },
  { mes: "Mar", actual: 640, anterior: 568 }, { mes: "Abr", actual: 480, anterior: 422 },
  { mes: "May", actual: 720, anterior: 634 }, { mes: "Jun", actual: 880, anterior: 772 },
  { mes: "Jul", actual: 580, anterior: 514 }, { mes: "Ago", actual: 320, anterior: 292 },
  { mes: "Sep", actual: 700, anterior: 614 }, { mes: "Oct", actual: 820, anterior: 726 },
  { mes: "Nov", actual: 760, anterior: 672 }, { mes: "Dic", actual: 510, anterior: 452 },
]

const monthlyCoste = [
  { mes: "Ene", actual: 8200, anterior: 7400 }, { mes: "Feb", actual: 11400, anterior: 10200 },
  { mes: "Mar", actual: 13800, anterior: 12400 }, { mes: "Abr", actual: 9600, anterior: 8700 },
  { mes: "May", actual: 15200, anterior: 13600 }, { mes: "Jun", actual: 18400, anterior: 16400 },
  { mes: "Jul", actual: 12100, anterior: 11000 }, { mes: "Ago", actual: 6800, anterior: 6200 },
  { mes: "Sep", actual: 14600, anterior: 13100 }, { mes: "Oct", actual: 17200, anterior: 15600 },
  { mes: "Nov", actual: 16100, anterior: 14600 }, { mes: "Dic", actual: 10400, anterior: 9400 },
]

const categoryHours = [
  { name: "Habilidades técnicas", value: 38, color: BLUE },
  { name: "Liderazgo", value: 24, color: GREEN },
  { name: "Normativa y compliance", value: 18, color: BLUE_LIGHT },
  { name: "Soft skills", value: 14, color: GREEN_LIGHT },
  { name: "Idiomas", value: 6, color: "#e2e8f0" },
]

const modalityHours = [
  { modalidad: "Online", porcentaje: 52 },
  { modalidad: "Presencial", porcentaje: 31 },
  { modalidad: "Blended", porcentaje: 17 },
]

const byOrgLevel = [
  { nivel: "Nivel bajo", personas: 128 },
  { nivel: "Nivel medio", personas: 194 },
  { nivel: "Nivel alto", personas: 112 },
  { nivel: "Dirección", personas: 45 },
]

// ─── Tooltip ──────────────────────────────────────────────────────────────────
function Tip({ active, payload, label, formatter }: {
  active?: boolean
  payload?: Array<{ value: number; name: string; color?: string }>
  label?: string
  formatter?: (v: number) => string
}) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-card border border-border rounded-lg shadow-md px-3 py-2 text-xs">
      {label && <p className="font-semibold text-foreground mb-1">{label}</p>}
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color || "var(--foreground)" }}>
          {p.name}: <span className="font-semibold">{formatter ? formatter(p.value) : p.value}</span>
        </p>
      ))}
    </div>
  )
}

export function TabResumen() {
  return (
    <div className="flex flex-col gap-4">
      {/* KPI Row – 5 tarjetas */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {kpis.map((kpi) => (
          <KPICard key={kpi.title} {...kpi} />
        ))}
      </div>

      {/* Línea 1 – Tendencias interanuales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <ChartCard title="Tendencia mensual de personas formadas">
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={monthlyPersonas}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="mes" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <Tooltip content={<Tip formatter={(v) => `${v} emp.`} />} />
              <Legend iconSize={8} iconType="circle" wrapperStyle={{ fontSize: 10 }} />
              <Line type="monotone" dataKey="actual" name="Año actual" stroke={BLUE} strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="anterior" name="Año anterior" stroke={GREEN} strokeWidth={2} dot={false} strokeDasharray="4 2" />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Tendencia mensual de horas recibidas">
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={monthlyHoras}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="mes" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <Tooltip content={<Tip formatter={(v) => `${v} h`} />} />
              <Legend iconSize={8} iconType="circle" wrapperStyle={{ fontSize: 10 }} />
              <Line type="monotone" dataKey="actual" name="Año actual" stroke={BLUE} strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="anterior" name="Año anterior" stroke={GREEN} strokeWidth={2} dot={false} strokeDasharray="4 2" />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Tendencia mensual de coste">
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={monthlyCoste}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="mes" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${Math.round(v / 1000)}K`} />
              <Tooltip content={<Tip formatter={(v) => `${v.toLocaleString("es-ES")} €`} />} />
              <Legend iconSize={8} iconType="circle" wrapperStyle={{ fontSize: 10 }} />
              <Line type="monotone" dataKey="actual" name="Año actual" stroke={BLUE_LIGHT} strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="anterior" name="Año anterior" stroke={GREEN_LIGHT} strokeWidth={2} dot={false} strokeDasharray="4 2" />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Línea 2 – Reparto estratégico */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Distribución de horas por categoría */}
        <ChartCard title="Distribución de horas por categoría">
          <div className="flex items-center gap-4">
            <ResponsiveContainer width="50%" height={180}>
              <PieChart>
                <Pie data={categoryHours} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={2} dataKey="value">
                  {categoryHours.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(v: number) => `${v}%`} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-col gap-2">
              {categoryHours.map((c) => (
                <div key={c.name} className="flex items-center gap-2 text-xs">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: c.color }} />
                  <span className="text-muted-foreground">{c.name}</span>
                  <span className="font-semibold text-foreground ml-auto pl-2">{c.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </ChartCard>

        {/* Distribución de horas por modalidad */}
        <ChartCard title="Distribución de horas por modalidad">
          <div className="flex flex-col gap-3 pt-2">
            {modalityHours.map((m) => (
              <div key={m.modalidad} className="flex flex-col gap-1">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">{m.modalidad}</span>
                  <span className="font-semibold text-foreground">{m.porcentaje}%</span>
                </div>
                <div className="w-full h-2.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${m.porcentaje}%`,
                      backgroundColor: m.modalidad === "Online" ? BLUE : m.modalidad === "Presencial" ? GREEN : BLUE_LIGHT,
                    }}
                  />
                </div>
              </div>
            ))}
            <div className="flex gap-4 mt-2 flex-wrap">
              {[
                { label: "Online", color: BLUE },
                { label: "Presencial", color: GREEN },
                { label: "Blended", color: BLUE_LIGHT },
              ].map((l) => (
                <div key={l.label} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: l.color }} />
                  {l.label}
                </div>
              ))}
            </div>
          </div>
        </ChartCard>

        {/* Distribución de personas formadas por nivel organizativo */}
        <ChartCard title="Personas formadas por nivel organizativo">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={byOrgLevel} barSize={24}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="nivel" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <Tooltip content={<Tip formatter={(v) => `${v} personas`} />} />
              <Bar dataKey="personas" name="Personas formadas" fill={GREEN_LIGHT} radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  )
}
