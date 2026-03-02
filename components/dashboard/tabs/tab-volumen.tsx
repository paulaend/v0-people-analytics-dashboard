"use client"

import { BookOpen, Users, Clock, TrendingUp, ArrowUpDown } from "lucide-react"
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend,
} from "recharts"
import { KPICard } from "@/components/dashboard/kpi-card"
import { ChartCard } from "@/components/dashboard/chart-card"

const BLUE = "var(--chart-blue)"
const GREEN = "var(--chart-green)"
const BLUE_LIGHT = "#a8c4e8"

const monthlyActions = [
  { mes: "Ene", acciones: 14 }, { mes: "Feb", acciones: 18 }, { mes: "Mar", acciones: 22 },
  { mes: "Abr", acciones: 17 }, { mes: "May", acciones: 26 }, { mes: "Jun", acciones: 31 },
  { mes: "Jul", acciones: 19 }, { mes: "Ago", acciones: 8 }, { mes: "Sep", acciones: 24 },
  { mes: "Oct", acciones: 28 }, { mes: "Nov", acciones: 25 }, { mes: "Dic", acciones: 15 },
]

const monthlyParticipants = [
  { mes: "Ene", participantes: 94, ant: 82 }, { mes: "Feb", participantes: 118, ant: 101 },
  { mes: "Mar", participantes: 142, ant: 126 }, { mes: "Abr", participantes: 106, ant: 95 },
  { mes: "May", participantes: 162, ant: 140 }, { mes: "Jun", participantes: 188, ant: 161 },
  { mes: "Jul", participantes: 128, ant: 112 }, { mes: "Ago", participantes: 72, ant: 68 },
  { mes: "Sep", participantes: 156, ant: 138 }, { mes: "Oct", participantes: 176, ant: 154 },
  { mes: "Nov", participantes: 164, ant: 148 }, { mes: "Dic", participantes: 109, ant: 96 },
]

const byCategory = [
  { categoria: "Habilidades técnicas", acciones: 72, horas: 2808 },
  { categoria: "Liderazgo", acciones: 46, horas: 1774 },
  { categoria: "Compliance", acciones: 34, horas: 1330 },
  { categoria: "Soft skills", acciones: 28, horas: 1036 },
  { categoria: "Idiomas", acciones: 12, horas: 444 },
]

const byModality = [
  { modalidad: "Online", acciones: 111 }, { modalidad: "Presencial", acciones: 59 }, { modalidad: "Blended", acciones: 22 },
]

const topProviders = [
  { proveedor: "Udemy Business", participantes: 186 },
  { proveedor: "LinkedIn Learning", participantes: 142 },
  { proveedor: "EAE Business School", participantes: 98 },
  { proveedor: "Coursera for Teams", participantes: 74 },
  { proveedor: "Formación Interna", participantes: 61 },
]

const kpis = [
  { title: "Acciones formativas completadas", value: "192", subtitle: "Acumulado año", icon: BookOpen, trend: { value: "14,2%", positive: true } },
  { title: "Total participantes", value: "1.615", subtitle: "Inscripciones acumuladas", icon: Users, trend: { value: "11,8%", positive: true } },
  { title: "Total horas impartidas", value: "7.390 h", subtitle: "Horas totales", icon: Clock },
  { title: "Media horas/participante", value: "4,6 h", subtitle: "Por participación", icon: TrendingUp },
  { title: "Variación interanual horas", value: "+12,4%", subtitle: "vs. año anterior", icon: ArrowUpDown, trend: { value: "+12,4%", positive: true } },
]

function TooltipCustom({ active, payload, label }: {
  active?: boolean; payload?: Array<{ value: number; name: string; color?: string }>; label?: string
}) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-card border border-border rounded-lg shadow-md px-3 py-2 text-xs">
      {label && <p className="font-semibold text-foreground mb-1">{label}</p>}
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color || "var(--foreground)" }}>
          {p.name}: <span className="font-semibold">{p.value}</span>
        </p>
      ))}
    </div>
  )
}

export function TabVolumen() {
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
        <ChartCard title="Evolución mensual de acciones formativas">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={monthlyActions} barSize={14}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="mes" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <Tooltip content={<TooltipCustom />} />
              <Bar dataKey="acciones" name="Acciones" fill={BLUE} radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Evolución mensual de participantes">
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={monthlyParticipants}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="mes" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <Tooltip content={<TooltipCustom />} />
              <Legend iconSize={8} iconType="circle" wrapperStyle={{ fontSize: 10 }} />
              <Line type="monotone" dataKey="participantes" name="Año actual" stroke={BLUE} strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="ant" name="Año anterior" stroke={GREEN} strokeWidth={2} dot={false} strokeDasharray="4 2" />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Acciones formativas por categoría">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={byCategory} layout="vertical" barSize={12}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <YAxis dataKey="categoria" type="category" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} width={100} />
              <Tooltip content={<TooltipCustom />} />
              <Bar dataKey="acciones" name="Acciones" fill={GREEN} radius={[0, 3, 3, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Charts row 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ChartCard title="Acciones por modalidad">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={byModality} barSize={32}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="modalidad" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <Tooltip content={<TooltipCustom />} />
              <Bar dataKey="acciones" name="Acciones" fill={BLUE_LIGHT} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

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
