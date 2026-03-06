"use client"

import { Users, TrendingUp, Clock, BarChart3, Target, Zap } from "lucide-react"
import dynamic from "next/dynamic"
import { KPICard } from "@/components/dashboard/kpi-card"
import { ChartCard } from "@/components/dashboard/chart-card"

const HighchartsReact = dynamic(() => import("highcharts-react-official"), { ssr: false })

// ─── KPI data (6 cards) ────────────────────────────────────────────────────────
const kpis = [
  {
    title: "Empleados formados",
    value: "479",
    subtitle: "Participantes \u00fanicos finalizados",
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
    title: "Horas totales impartidas",
    value: "8.150 h",
    subtitle: "De acciones finalizadas",
    icon: Clock,
    trend: { value: "11,2%", positive: true },
  },
  {
    title: "Horas totales recibidas",
    value: "7.390 h",
    subtitle: "Participantes finalizados",
    icon: BarChart3,
    trend: { value: "12,4%", positive: true },
  },
  {
    title: "Inversi\u00f3n en formaci\u00f3n",
    value: "125.450 \u20ac",
    subtitle: "Coste acciones finalizadas",
    icon: Target,
    trend: { value: "9,8%", positive: true },
  },
  {
    title: "Satisfacci\u00f3n media",
    value: "3,8",
    subtitle: "De 5.0 puntos",
    icon: Zap,
    trend: { value: "0,2 pp", positive: true },
  },
]

// ─── Bloque 1: Tendencia (Highcharts Line Charts) ─────────────────────────────
const trendHorasConfig = {
  chart: { type: "line", height: 300, backgroundColor: "transparent" },
  title: { text: null },
  xAxis: {
    categories: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
    labels: { style: { fontSize: "10px", color: "var(--muted-foreground)" } },
    lineColor: "var(--border)",
    tickColor: "var(--border)",
  },
  yAxis: {
    title: { text: null },
    labels: { style: { fontSize: "10px", color: "var(--muted-foreground)" } },
    gridLineColor: "var(--border)",
  },
  legend: { itemStyle: { fontSize: "11px", color: "var(--foreground)" } },
  plotOptions: {
    line: { enableMouseTracking: true, dataLabels: { enabled: false } },
  },
  series: [
    {
      name: "A\u00f1o actual",
      data: [420, 560, 640, 480, 720, 880, 580, 320, 700, 820, 760, 510],
      color: "var(--chart-blue)",
      lineWidth: 2,
    },
    {
      name: "A\u00f1o anterior",
      data: [370, 490, 568, 422, 634, 772, 514, 292, 614, 726, 672, 452],
      color: "var(--chart-green)",
      lineWidth: 2,
      dashStyle: "Dash",
    },
  ],
  credits: { enabled: false },
  tooltip: {
    shared: true,
    backgroundColor: "var(--card)",
    borderColor: "var(--border)",
    style: { color: "var(--foreground)", fontSize: "11px" },
  },
}

const trendEmpleadosConfig = {
  chart: { type: "line", height: 300, backgroundColor: "transparent" },
  title: { text: null },
  xAxis: {
    categories: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
    labels: { style: { fontSize: "10px", color: "var(--muted-foreground)" } },
    lineColor: "var(--border)",
    tickColor: "var(--border)",
  },
  yAxis: {
    title: { text: null },
    labels: { style: { fontSize: "10px", color: "var(--muted-foreground)" } },
    gridLineColor: "var(--border)",
  },
  legend: { itemStyle: { fontSize: "11px", color: "var(--foreground)" } },
  plotOptions: {
    line: { enableMouseTracking: true, dataLabels: { enabled: false } },
  },
  series: [
    {
      name: "A\u00f1o actual",
      data: [28, 35, 42, 31, 48, 55, 38, 22, 46, 52, 49, 33],
      color: "var(--chart-blue)",
      lineWidth: 2,
    },
    {
      name: "A\u00f1o anterior",
      data: [24, 29, 36, 27, 41, 47, 33, 20, 40, 45, 43, 29],
      color: "var(--chart-green)",
      lineWidth: 2,
      dashStyle: "Dash",
    },
  ],
  credits: { enabled: false },
  tooltip: {
    shared: true,
    backgroundColor: "var(--card)",
    borderColor: "var(--border)",
    style: { color: "var(--foreground)", fontSize: "11px" },
  },
}

// ─── Bloque 2: Actividad Formativa (Stacked % Horizontal) ──────────────────────
const activityByCategory = {
  chart: { type: "bar", height: 220, backgroundColor: "transparent" },
  title: { text: null },
  xAxis: {
    categories: ["Habilidades t\u00e9cnicas", "Liderazgo", "Compliance", "Soft skills", "Idiomas"],
    labels: { style: { fontSize: "10px", color: "var(--muted-foreground)" } },
  },
  yAxis: {
    title: { text: null },
    labels: { style: { fontSize: "10px", color: "var(--muted-foreground)" } },
    min: 0,
    max: 100,
  },
  plotOptions: {
    bar: {
      stacking: "percent",
      dataLabels: {
        enabled: true,
        format: "{point.percentage:.0f}%",
        style: { fontSize: "9px", color: "white" },
      },
    },
  },
  legend: { itemStyle: { fontSize: "10px" } },
  series: [
    { name: "Acciones", data: [72, 46, 34, 28, 12], color: "var(--chart-blue)" },
  ],
  credits: { enabled: false },
  tooltip: {
    headerFormat: "<b>{point.x}</b><br/>",
    pointFormat: "Acciones: {point.y}",
    backgroundColor: "var(--card)",
    borderColor: "var(--border)",
    style: { color: "var(--foreground)" },
  },
}

const activityByModality = {
  chart: { type: "bar", height: 220, backgroundColor: "transparent" },
  title: { text: null },
  xAxis: {
    categories: ["Online", "Presencial", "Blended"],
    labels: { style: { fontSize: "10px", color: "var(--muted-foreground)" } },
  },
  yAxis: {
    title: { text: null },
    labels: { style: { fontSize: "10px", color: "var(--muted-foreground)" } },
    min: 0,
    max: 100,
  },
  plotOptions: {
    bar: {
      stacking: "percent",
      dataLabels: {
        enabled: true,
        format: "{point.percentage:.0f}%",
        style: { fontSize: "9px", color: "white" },
      },
    },
  },
  legend: { itemStyle: { fontSize: "10px" } },
  series: [
    { name: "Acciones", data: [111, 59, 22], color: "var(--chart-green)" },
  ],
  credits: { enabled: false },
  tooltip: {
    headerFormat: "<b>{point.x}</b><br/>",
    pointFormat: "Acciones: {point.y}",
    backgroundColor: "var(--card)",
    borderColor: "var(--border)",
    style: { color: "var(--foreground)" },
  },
}

// ─── Bloque 3: Cobertura Organizativa (Stacked % Vertical) ────────────────────
const coverageByGender = {
  chart: { type: "column", height: 220, backgroundColor: "transparent" },
  title: { text: null },
  xAxis: {
    categories: ["Mujeres", "Hombres"],
    labels: { style: { fontSize: "10px", color: "var(--muted-foreground)" } },
  },
  yAxis: {
    title: { text: null },
    labels: { style: { fontSize: "10px", color: "var(--muted-foreground)" } },
    min: 0,
    max: 100,
  },
  plotOptions: {
    column: {
      stacking: "percent",
      dataLabels: {
        enabled: true,
        format: "{point.percentage:.0f}%",
        style: { fontSize: "9px", color: "white" },
      },
    },
  },
  legend: { itemStyle: { fontSize: "10px" } },
  series: [
    { name: "Formados", data: [74, 71], color: "var(--chart-blue)" },
    { name: "No formados", data: [26, 29], color: "#d1d5db" },
  ],
  credits: { enabled: false },
  tooltip: {
    headerFormat: "<b>{point.x}</b><br/>",
    pointFormat: "{series.name}: {point.y}<br/>",
    backgroundColor: "var(--card)",
    borderColor: "var(--border)",
    style: { color: "var(--foreground)" },
  },
}

const coverageByAge = {
  chart: { type: "column", height: 220, backgroundColor: "transparent" },
  title: { text: null },
  xAxis: {
    categories: ["20-29", "30-39", "40-49", "50-59", "60+"],
    labels: { style: { fontSize: "10px", color: "var(--muted-foreground)" } },
  },
  yAxis: {
    title: { text: null },
    labels: { style: { fontSize: "10px", color: "var(--muted-foreground)" } },
    min: 0,
    max: 100,
  },
  plotOptions: {
    column: {
      stacking: "percent",
      dataLabels: {
        enabled: true,
        format: "{point.percentage:.0f}%",
        style: { fontSize: "9px", color: "white" },
      },
    },
  },
  legend: { itemStyle: { fontSize: "10px" } },
  series: [
    { name: "Formados", data: [81, 76, 69, 61, 44], color: "var(--chart-blue)" },
    { name: "No formados", data: [19, 24, 31, 39, 56], color: "#d1d5db" },
  ],
  credits: { enabled: false },
  tooltip: {
    headerFormat: "<b>{point.x}</b><br/>",
    pointFormat: "{series.name}: {point.y}<br/>",
    backgroundColor: "var(--card)",
    borderColor: "var(--border)",
    style: { color: "var(--foreground)" },
  },
}

const coverageByOrgLevel = {
  chart: { type: "column", height: 220, backgroundColor: "transparent" },
  title: { text: null },
  xAxis: {
    categories: ["Nivel bajo", "Nivel medio", "Nivel alto", "Direcci\u00f3n"],
    labels: { style: { fontSize: "9px", color: "var(--muted-foreground)" } },
  },
  yAxis: {
    title: { text: null },
    labels: { style: { fontSize: "10px", color: "var(--muted-foreground)" } },
    min: 0,
    max: 100,
  },
  plotOptions: {
    column: {
      stacking: "percent",
      dataLabels: {
        enabled: true,
        format: "{point.percentage:.0f}%",
        style: { fontSize: "9px", color: "white" },
      },
    },
  },
  legend: { itemStyle: { fontSize: "10px" } },
  series: [
    { name: "Formados", data: [66, 74, 78, 82], color: "var(--chart-blue)" },
    { name: "No formados", data: [34, 26, 22, 18], color: "#d1d5db" },
  ],
  credits: { enabled: false },
  tooltip: {
    headerFormat: "<b>{point.x}</b><br/>",
    pointFormat: "{series.name}: {point.y}<br/>",
    backgroundColor: "var(--card)",
    borderColor: "var(--border)",
    style: { color: "var(--foreground)" },
  },
}

// ─── Bloque 4: Intensidad de Formaci\u00f3n (Column Chart) ─────────────────────────
const intensityConfig = {
  chart: { type: "column", height: 220, backgroundColor: "transparent" },
  title: { text: null },
  xAxis: {
    categories: ["Mujeres", "Hombres"],
    labels: { style: { fontSize: "10px", color: "var(--muted-foreground)" } },
  },
  yAxis: {
    title: { text: "Horas medias por empleado" },
    titleFormat: "",
    labels: { style: { fontSize: "10px", color: "var(--muted-foreground)" } },
  },
  plotOptions: {
    column: {
      colorByPoint: false,
      dataLabels: {
        enabled: true,
        format: "{point.y} h",
        style: { fontSize: "10px", fontWeight: "bold" },
      },
    },
  },
  legend: { enabled: false },
  series: [
    {
      name: "Horas medias",
      data: [11.8, 10.6],
      color: "var(--chart-green)",
    },
  ],
  credits: { enabled: false },
  tooltip: {
    headerFormat: "<b>{point.x}</b><br/>",
    pointFormat: "Horas medias: {point.y} h",
    backgroundColor: "var(--card)",
    borderColor: "var(--border)",
    style: { color: "var(--foreground)" },
  },
}

export function TabParticipacion() {
  return (
    <div className="flex flex-col gap-4">
      {/* KPI Cards - 6 tarjetas */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {kpis.map((kpi) => (
          <KPICard key={kpi.title} {...kpi} />
        ))}
      </div>

      {/* Bloque 1 - Tendencia (2 line charts) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ChartCard title="Tendencia mensual de horas de formaci\u00f3n recibidas">
          <HighchartsReact highcharts={require("highcharts")} options={trendHorasConfig} />
        </ChartCard>

        <ChartCard title="Tendencia mensual de empleados formados">
          <HighchartsReact highcharts={require("highcharts")} options={trendEmpleadosConfig} />
        </ChartCard>
      </div>

      {/* Bloque 2 - Actividad Formativa (stacked % horizontal) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ChartCard title="Distribuci\u00f3n de acciones formativas por categor\u00eda">
          <HighchartsReact highcharts={require("highcharts")} options={activityByCategory} />
        </ChartCard>

        <ChartCard title="Distribuci\u00f3n de acciones formativas por modalidad">
          <HighchartsReact highcharts={require("highcharts")} options={activityByModality} />
        </ChartCard>
      </div>

      {/* Bloque 3 - Cobertura Organizativa (stacked % vertical) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <ChartCard title="Cobertura de formaci\u00f3n por g\u00e9nero">
          <HighchartsReact highcharts={require("highcharts")} options={coverageByGender} />
        </ChartCard>

        <ChartCard title="Cobertura de formaci\u00f3n por rango de edad">
          <HighchartsReact highcharts={require("highcharts")} options={coverageByAge} />
        </ChartCard>

        <ChartCard title="Cobertura de formaci\u00f3n por categor\u00eda interna">
          <HighchartsReact highcharts={require("highcharts")} options={coverageByOrgLevel} />
        </ChartCard>
      </div>

      {/* Bloque 4 - Intensidad de Formaci\u00f3n */}
      <div className="grid grid-cols-1 gap-4">
        <ChartCard title="Horas medias de formaci\u00f3n por empleado activo por g\u00e9nero">
          <HighchartsReact highcharts={require("highcharts")} options={intensityConfig} />
        </ChartCard>
      </div>
    </div>
  )
}
