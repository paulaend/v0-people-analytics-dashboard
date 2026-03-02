"use client"

import {
  Users, BookOpen, Clock, TrendingUp, DollarSign, Star,
} from "lucide-react"
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts"
import { KPICard } from "@/components/dashboard/kpi-card"
import { ChartCard } from "@/components/dashboard/chart-card"

const BLUE = "var(--chart-blue)"
const GREEN = "var(--chart-green)"
const BLUE_LIGHT = "#a8c4e8"
const GREEN_LIGHT = "#9fd4c2"

const monthlyEmployees = [
  { mes: "Ene", formados: 28 }, { mes: "Feb", formados: 35 }, { mes: "Mar", formados: 42 },
  { mes: "Abr", formados: 31 }, { mes: "May", formados: 48 }, { mes: "Jun", formados: 55 },
  { mes: "Jul", formados: 38 }, { mes: "Ago", formados: 22 }, { mes: "Sep", formados: 46 },
  { mes: "Oct", formados: 52 }, { mes: "Nov", formados: 49 }, { mes: "Dic", formados: 33 },
]

const monthlyHours = [
  { mes: "Ene", horas: 420 }, { mes: "Feb", horas: 560 }, { mes: "Mar", horas: 640 },
  { mes: "Abr", horas: 480 }, { mes: "May", horas: 720 }, { mes: "Jun", horas: 880 },
  { mes: "Jul", horas: 580 }, { mes: "Ago", horas: 320 }, { mes: "Sep", horas: 700 },
  { mes: "Oct", horas: 820 }, { mes: "Nov", horas: 760 }, { mes: "Dic", horas: 510 },
]

const monthlyCost = [
  { mes: "Ene", coste: 8200 }, { mes: "Feb", coste: 11400 }, { mes: "Mar", coste: 13800 },
  { mes: "Abr", coste: 9600 }, { mes: "May", coste: 15200 }, { mes: "Jun", coste: 18400 },
  { mes: "Jul", coste: 12100 }, { mes: "Ago", coste: 6800 }, { mes: "Sep", coste: 14600 },
  { mes: "Oct", coste: 17200 }, { mes: "Nov", coste: 16100 }, { mes: "Dic", coste: 10400 },
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

const kpis = [
  { title: "Total empleados formados", value: "479", subtitle: "Acumulado año", icon: Users, trend: { value: "8,3%", positive: true } },
  { title: "% empleados formados", value: "72,6%", subtitle: "Sobre plantilla activa", icon: TrendingUp, trend: { value: "4,1 pp", positive: true } },
  { title: "Total horas de formación", value: "7.390", subtitle: "Horas recibidas", icon: Clock, trend: { value: "12,4%", positive: true } },
  { title: "Media horas/formado", value: "15,4 h", subtitle: "Por empleado formado", icon: BookOpen },
  { title: "Coste total formación", value: "154.800 €", subtitle: "Inversión acumulada", icon: DollarSign, trend: { value: "9,7%", positive: false } },
  { title: "Satisfacción media", value: "4,2 / 5", subtitle: "Puntuación media global", icon: Star, trend: { value: "+0,3", positive: true } },
]

function ChartTooltipStyle({ active, payload, label, formatter }: {
  active?: boolean; payload?: Array<{ value: number; name: string; color?: string }>; label?: string; formatter?: (v: number) => string
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
      {/* KPI Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {kpis.map((kpi) => (
          <KPICard key={kpi.title} {...kpi} />
        ))}
      </div>

      {/* Charts row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <ChartCard title="Empleados formados mensual">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={monthlyEmployees} barSize={14}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="mes" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <Tooltip content={<ChartTooltipStyle formatter={(v) => `${v} emp.`} />} />
              <Bar dataKey="formados" name="Formados" fill={BLUE} radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Horas de formación mensual">
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={monthlyHours}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="mes" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <Tooltip content={<ChartTooltipStyle formatter={(v) => `${v} h`} />} />
              <Line type="monotone" dataKey="horas" name="Horas" stroke={GREEN} strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Coste de formación mensual">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={monthlyCost} barSize={14}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="mes" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${Math.round(v / 1000)}K`} />
              <Tooltip content={<ChartTooltipStyle formatter={(v) => `${v.toLocaleString("es-ES")} €`} />} />
              <Bar dataKey="coste" name="Coste" fill={BLUE_LIGHT} radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Charts row 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ChartCard title="% horas por categoría de formación">
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

        <ChartCard title="% horas por modalidad">
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
      </div>
    </div>
  )
}
