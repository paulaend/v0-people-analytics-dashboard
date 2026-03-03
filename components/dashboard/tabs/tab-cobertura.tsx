"use client"

import { Users, UserX, Clock, BookOpen, TrendingUp } from "lucide-react"
import {
  LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine,
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
    subtitle: "Sobre 660 empleados activos",
    icon: TrendingUp,
    trend: { value: "4,1 pp", positive: true },
  },
  {
    title: "Empleados sin formación",
    value: "181",
    subtitle: "27,4% de la plantilla activa",
    icon: UserX,
    trend: { value: "-8,3%", positive: true },
  },
  {
    title: "Horas medias/empleado activo",
    value: "11,2 h",
    subtitle: "Por empleado en plantilla",
    icon: Clock,
  },
  {
    title: "Horas medias/empleado formado",
    value: "15,4 h",
    subtitle: "Por empleado con formación",
    icon: BookOpen,
  },
]

// ─── Chart data ───────────────────────────────────────────────────────────────
const monthlyCoverage = [
  { mes: "Ene", actual: 58, anterior: 52 }, { mes: "Feb", actual: 63, anterior: 57 },
  { mes: "Mar", actual: 68, anterior: 61 }, { mes: "Abr", actual: 61, anterior: 55 },
  { mes: "May", actual: 72, anterior: 65 }, { mes: "Jun", actual: 76, anterior: 69 },
  { mes: "Jul", actual: 65, anterior: 59 }, { mes: "Ago", actual: 45, anterior: 41 },
  { mes: "Sep", actual: 70, anterior: 63 }, { mes: "Oct", actual: 74, anterior: 67 },
  { mes: "Nov", actual: 73, anterior: 66 }, { mes: "Dic", actual: 62, anterior: 56 },
]

const byGender = [
  { genero: "Mujeres", cobertura: 74, horasActivo: 12.4 },
  { genero: "Hombres", cobertura: 71, horasActivo: 10.2 },
]

const byAge = [
  { rango: "20-29", cobertura: 81 },
  { rango: "30-39", cobertura: 76 },
  { rango: "40-49", cobertura: 69 },
  { rango: "50-59", cobertura: 61 },
  { rango: "60+", cobertura: 44 },
]

const byOrgLevel = [
  { nivel: "Nivel bajo", cobertura: 66, horasActivo: 8.6 },
  { nivel: "Nivel medio", cobertura: 74, horasActivo: 11.4 },
  { nivel: "Nivel alto", cobertura: 78, horasActivo: 14.2 },
  { nivel: "Dirección", cobertura: 82, horasActivo: 18.8 },
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

export function TabCobertura() {
  return (
    <div className="flex flex-col gap-4">
      {/* KPI Row – 4 tarjetas */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {kpis.map((kpi) => (
          <KPICard key={kpi.title} {...kpi} />
        ))}
      </div>

      {/* Bloque 1 – Tendencia */}
      <div className="grid grid-cols-1 gap-4">
        <ChartCard title="Tendencia mensual de % plantilla formada">
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={monthlyCoverage}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="mes" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} unit="%" domain={[0, 100]} />
              <Tooltip content={<Tip suffix="%" />} />
              <Legend iconSize={8} iconType="circle" wrapperStyle={{ fontSize: 10 }} />
              <ReferenceLine y={72.6} stroke="var(--border)" strokeDasharray="4 2" />
              <Line type="monotone" dataKey="actual" name="Año actual" stroke={BLUE} strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="anterior" name="Año anterior" stroke={GREEN} strokeWidth={2} dot={false} strokeDasharray="4 2" />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Bloque 2 – Cobertura por colectivo */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Cobertura por género */}
        <ChartCard title="Cobertura por género">
          <div className="flex flex-col gap-4 pt-2">
            {byGender.map((g) => (
              <div key={g.genero} className="flex flex-col gap-1">
                <div className="flex justify-between text-xs">
                  <span className="font-medium text-foreground">{g.genero}</span>
                  <span className="font-semibold text-foreground">{g.cobertura}% formados</span>
                </div>
                <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${g.cobertura}%`, backgroundColor: g.genero === "Mujeres" ? GREEN : BLUE }}
                  />
                </div>
              </div>
            ))}
            <div className="flex gap-4 mt-1">
              {[{ label: "Mujeres", color: GREEN }, { label: "Hombres", color: BLUE }].map((l) => (
                <div key={l.label} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: l.color }} />
                  {l.label}
                </div>
              ))}
            </div>
          </div>
        </ChartCard>

        {/* Cobertura por rango de edad */}
        <ChartCard title="Cobertura por rango de edad">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={byAge} barSize={20}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="rango" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} unit="%" domain={[0, 100]} />
              <Tooltip content={<Tip suffix="%" />} />
              <Bar dataKey="cobertura" name="% Formados" fill={GREEN} radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Cobertura por nivel organizativo */}
        <ChartCard title="Cobertura por nivel organizativo">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={byOrgLevel} barSize={24}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="nivel" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} unit="%" domain={[0, 100]} />
              <Tooltip content={<Tip suffix="%" />} />
              <Bar dataKey="cobertura" name="% Formados" fill={BLUE_LIGHT} radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Bloque 3 – Intensidad */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Horas medias por empleado activo por género */}
        <ChartCard title="Horas medias por empleado activo por género">
          <div className="flex flex-col gap-4 pt-2">
            {byGender.map((g) => (
              <div key={g.genero} className="flex flex-col gap-1">
                <div className="flex justify-between text-xs">
                  <span className="font-medium text-foreground">{g.genero}</span>
                  <span className="font-semibold text-foreground">{g.horasActivo} h/empleado activo</span>
                </div>
                <div className="w-full h-2.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${(g.horasActivo / 20) * 100}%`, backgroundColor: g.genero === "Mujeres" ? GREEN : BLUE }}
                  />
                </div>
              </div>
            ))}
            <div className="flex gap-4 mt-1">
              {[{ label: "Mujeres", color: GREEN }, { label: "Hombres", color: BLUE }].map((l) => (
                <div key={l.label} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: l.color }} />
                  {l.label}
                </div>
              ))}
            </div>
          </div>
        </ChartCard>

        {/* Horas medias por empleado activo por nivel organizativo */}
        <ChartCard title="Horas medias por empleado activo por nivel organizativo">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={byOrgLevel} layout="vertical" barSize={14}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} unit=" h" />
              <YAxis dataKey="nivel" type="category" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} width={90} />
              <Tooltip content={<Tip suffix=" h" />} />
              <Bar dataKey="horasActivo" name="Horas/empleado activo" fill={GREEN_LIGHT} radius={[0, 3, 3, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  )
}
