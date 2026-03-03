"use client"

import { Users, UserCheck, Clock, BookOpen, TrendingUp } from "lucide-react"
import {
  LineChart, Line,
  BarChart, Bar,
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
    title: "% plantilla formada",
    value: "72,6%",
    subtitle: "Sobre empleados activos",
    icon: TrendingUp,
    trend: { value: "4,1 pp", positive: true },
  },
  {
    title: "Empleados formados",
    value: "479",
    subtitle: "Participantes \u00fanicos",
    icon: Users,
    trend: { value: "8,3%", positive: true },
  },
  {
    title: "Participantes finalizados",
    value: "1.366",
    subtitle: "Completaron la acci\u00f3n",
    icon: UserCheck,
    trend: { value: "13,1%", positive: true },
  },
  {
    title: "Horas totales recibidas",
    value: "7.390 h",
    subtitle: "Participantes finalizados",
    icon: Clock,
    trend: { value: "12,4%", positive: true },
  },
  {
    title: "Horas medias/empleado activo",
    value: "11,2 h",
    subtitle: "Por empleado en plantilla",
    icon: BookOpen,
  },
]

// ─── Chart data ───────────────────────────────────────────────────────────────
const monthlyFormados = [
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

const byCategory = [
  { categoria: "Habilidades t\u00e9cnicas", acciones: 72 },
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

const byGender = [
  { genero: "Mujeres", formados: 74, noFormados: 26 },
  { genero: "Hombres", formados: 71, noFormados: 29 },
]

const byAge = [
  { rango: "20-29", formados: 81, noFormados: 19 },
  { rango: "30-39", formados: 76, noFormados: 24 },
  { rango: "40-49", formados: 69, noFormados: 31 },
  { rango: "50-59", formados: 61, noFormados: 39 },
  { rango: "60+", formados: 44, noFormados: 56 },
]

const byOrgLevel = [
  { nivel: "Nivel bajo", formados: 66, noFormados: 34 },
  { nivel: "Nivel medio", formados: 74, noFormados: 26 },
  { nivel: "Nivel alto", formados: 78, noFormados: 22 },
  { nivel: "Direcci\u00f3n", formados: 82, noFormados: 18 },
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

export function TabParticipacion() {
  return (
    <div className="flex flex-col gap-4">
      {/* KPI Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {kpis.map((kpi) => (
          <KPICard key={kpi.title} {...kpi} />
        ))}
      </div>

      {/* Bloque 1 – Tendencia */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ChartCard title="Tendencia mensual de empleados formados">
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={monthlyFormados}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="mes" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <Tooltip content={<Tip suffix=" emp." />} />
              <Legend iconSize={8} iconType="circle" wrapperStyle={{ fontSize: 10 }} />
              <Line type="monotone" dataKey="actual" name="A\u00f1o actual" stroke={BLUE} strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="anterior" name="A\u00f1o anterior" stroke={GREEN} strokeWidth={2} dot={false} strokeDasharray="4 2" />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Tendencia mensual de horas recibidas">
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={monthlyHoras}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="mes" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <Tooltip content={<Tip suffix=" h" />} />
              <Legend iconSize={8} iconType="circle" wrapperStyle={{ fontSize: 10 }} />
              <Line type="monotone" dataKey="actual" name="A\u00f1o actual" stroke={BLUE} strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="anterior" name="A\u00f1o anterior" stroke={GREEN} strokeWidth={2} dot={false} strokeDasharray="4 2" />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Bloque 2 – Distribución formativa */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ChartCard title="Acciones por categor\u00eda">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={byCategory} layout="vertical" barSize={12}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <YAxis dataKey="categoria" type="category" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} width={120} />
              <Tooltip content={<Tip />} />
              <Bar dataKey="acciones" name="Acciones" fill={GREEN} radius={[0, 3, 3, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Acciones por modalidad">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={byModality} barSize={36}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="modalidad" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <Tooltip content={<Tip />} />
              <Bar dataKey="acciones" name="Acciones" fill={BLUE_LIGHT} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Bloque 3 – Cobertura organizativa (stacked 100%) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <ChartCard title="Cobertura por g\u00e9nero">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={byGender} barSize={40}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="genero" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} unit="%" domain={[0, 100]} />
              <Tooltip content={<Tip suffix="%" />} />
              <Legend iconSize={8} iconType="circle" wrapperStyle={{ fontSize: 10 }} />
              <Bar dataKey="formados" name="Formados" stackId="a" fill={GREEN} />
              <Bar dataKey="noFormados" name="No formados" stackId="a" fill={GREEN_LIGHT} radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Cobertura por rango de edad">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={byAge} barSize={24}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="rango" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} unit="%" domain={[0, 100]} />
              <Tooltip content={<Tip suffix="%" />} />
              <Legend iconSize={8} iconType="circle" wrapperStyle={{ fontSize: 10 }} />
              <Bar dataKey="formados" name="Formados" stackId="a" fill={BLUE} />
              <Bar dataKey="noFormados" name="No formados" stackId="a" fill={BLUE_LIGHT} radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Cobertura por categor\u00eda interna">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={byOrgLevel} barSize={24}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="nivel" tick={{ fontSize: 9, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} unit="%" domain={[0, 100]} />
              <Tooltip content={<Tip suffix="%" />} />
              <Legend iconSize={8} iconType="circle" wrapperStyle={{ fontSize: 10 }} />
              <Bar dataKey="formados" name="Formados" stackId="a" fill={BLUE} />
              <Bar dataKey="noFormados" name="No formados" stackId="a" fill={BLUE_LIGHT} radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  )
}
