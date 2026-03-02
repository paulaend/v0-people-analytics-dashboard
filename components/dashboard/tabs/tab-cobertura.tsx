"use client"

import { Users, UserCheck, UserX, Clock, BookOpen } from "lucide-react"
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend, ReferenceLine,
} from "recharts"
import { KPICard } from "@/components/dashboard/kpi-card"
import { ChartCard } from "@/components/dashboard/chart-card"

const BLUE = "var(--chart-blue)"
const GREEN = "var(--chart-green)"
const BLUE_LIGHT = "#a8c4e8"
const GREEN_LIGHT = "#9fd4c2"

const monthlyCoverage = [
  { mes: "Ene", cobertura: 58 }, { mes: "Feb", cobertura: 63 }, { mes: "Mar", cobertura: 68 },
  { mes: "Abr", cobertura: 61 }, { mes: "May", cobertura: 72 }, { mes: "Jun", cobertura: 76 },
  { mes: "Jul", cobertura: 65 }, { mes: "Ago", cobertura: 45 }, { mes: "Sep", cobertura: 70 },
  { mes: "Oct", cobertura: 74 }, { mes: "Nov", cobertura: 73 }, { mes: "Dic", cobertura: 62 },
]

const byGender = [
  { genero: "Mujeres", cobertura: 74, horas: 16.2 },
  { genero: "Hombres", cobertura: 71, horas: 14.6 },
]

const byAge = [
  { rango: "20-29", cobertura: 81, horas: 18.4 },
  { rango: "30-39", cobertura: 76, horas: 16.1 },
  { rango: "40-49", cobertura: 69, horas: 14.8 },
  { rango: "50-59", cobertura: 61, horas: 12.2 },
  { rango: "60+", cobertura: 44, horas: 9.6 },
]

const byCategory = [
  { categoria: "Nivel bajo", cobertura: 66, horas: 11.4 },
  { categoria: "Nivel medio", cobertura: 74, horas: 15.8 },
  { categoria: "Nivel alto", cobertura: 78, horas: 18.2 },
  { categoria: "Dirección", cobertura: 82, horas: 22.6 },
]

const kpis = [
  { title: "Total empleados formados", value: "479", subtitle: "Acumulado año", icon: UserCheck, trend: { value: "8,3%", positive: true } },
  { title: "% formados vs plantilla activa", value: "72,6%", subtitle: "Sobre 660 empleados activos", icon: Users, trend: { value: "4,1 pp", positive: true } },
  { title: "Empleados sin formación", value: "181", subtitle: "Pendiente de formación", icon: UserX, trend: { value: "-8,3%", positive: true } },
  { title: "Media horas/empleado activo", value: "11,2 h", subtitle: "Por empleado en plantilla", icon: Clock },
  { title: "Media horas/empleado formado", value: "15,4 h", subtitle: "Por empleado con formación", icon: BookOpen },
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

export function TabCobertura() {
  return (
    <div className="flex flex-col gap-4">
      {/* KPI Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {kpis.map((kpi) => (
          <KPICard key={kpi.title} {...kpi} />
        ))}
      </div>

      {/* Charts row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <ChartCard title="Evolución mensual de % empleados formados">
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={monthlyCoverage}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="mes" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} unit="%" domain={[0, 100]} />
              <Tooltip content={<TooltipCustom suffix="%" />} />
              <ReferenceLine y={72.6} stroke="var(--border)" strokeDasharray="4 2" />
              <Line type="monotone" dataKey="cobertura" name="Cobertura" stroke={BLUE} strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Cobertura de formación por género">
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
                    style={{
                      width: `${g.cobertura}%`,
                      backgroundColor: g.genero === "Mujeres" ? GREEN : BLUE,
                    }}
                  />
                </div>
                <span className="text-xs text-muted-foreground">{g.horas} h/empleado formado</span>
              </div>
            ))}
            <div className="flex gap-4">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: GREEN }} />Mujeres
              </div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: BLUE }} />Hombres
              </div>
            </div>
          </div>
        </ChartCard>

        <ChartCard title="Cobertura por rango de edad">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={byAge} barSize={20}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="rango" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} unit="%" domain={[0, 100]} />
              <Tooltip content={<TooltipCustom suffix="%" />} />
              <Bar dataKey="cobertura" name="% Formados" fill={GREEN} radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Charts row 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ChartCard title="Cobertura por categoría interna">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={byCategory} barSize={24}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="categoria" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} unit="%" domain={[0, 100]} />
              <Tooltip content={<TooltipCustom suffix="%" />} />
              <Bar dataKey="cobertura" name="% Formados" fill={BLUE_LIGHT} radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Media de horas por empleado activo y categoría">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={byCategory} layout="vertical" barSize={14}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} unit=" h" />
              <YAxis dataKey="categoria" type="category" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} width={90} />
              <Tooltip content={<TooltipCustom suffix=" h" />} />
              <Bar dataKey="horas" name="Horas/empleado" fill={GREEN_LIGHT} radius={[0, 3, 3, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  )
}
