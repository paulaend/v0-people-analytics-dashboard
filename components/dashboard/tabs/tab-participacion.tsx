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
    subtitle: "Participantes únicos finalizados",
    icon: Users,
    trend: { value: "8,3%", positive: true },
    tooltip: "Número de empleados únicos que han finalizado al menos una acción formativa en el periodo seleccionado.",
  },
  {
    title: "% plantilla formada",
    value: "72,6%",
    subtitle: "Sobre empleados activos",
    icon: TrendingUp,
    trend: { value: "4,1 pp", positive: true },
    tooltip: "Porcentaje de empleados activos que han finalizado formación en el periodo.",
  },
  {
    title: "Horas totales impartidas",
    value: "8.150 h",
    subtitle: "De acciones finalizadas",
    icon: Clock,
    trend: { value: "11,2%", positive: true },
    tooltip: "Suma de horas de las acciones formativas finalizadas en el periodo.",
  },
  {
    title: "Horas totales recibidas",
    value: "7.390 h",
    subtitle: "Participantes finalizados",
    icon: BarChart3,
    trend: { value: "12,4%", positive: true },
    tooltip: "Horas de formación multiplicadas por número de participantes finalizados.",
  },
  {
    title: "Inversión en formación",
    value: "125.450 €",
    subtitle: "Coste acciones finalizadas",
    icon: Target,
    trend: { value: "9,8%", positive: true },
    tooltip: "Coste total de las acciones formativas finalizadas en el periodo seleccionado.",
  },
  {
    title: "Satisfacción media",
    value: "3,8",
    subtitle: "De 5.0 puntos",
    icon: Zap,
    trend: { value: "0,2 pp", positive: true },
    tooltip: "Media de las valoraciones de los cuestionarios de satisfacción de las acciones formativas.",
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
      name: "Año actual",
      data: [420, 560, 640, 480, 720, 880, 580, 320, 700, 820, 760, 510],
      color: "var(--chart-blue)",
      lineWidth: 2,
    },
    {
      name: "Año anterior",
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
      name: "Año actual",
      data: [28, 35, 42, 31, 48, 55, 38, 22, 46, 52, 49, 33],
      color: "var(--chart-blue)",
      lineWidth: 2,
    },
    {
      name: "Año anterior",
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

// ─── Bloque 2: Actividad Formativa (Single horizontal 100% stacked bar) ────────
const activityByCategory = {
  chart: { type: "bar", height: 120, backgroundColor: "transparent" },
  title: { text: null },
  xAxis: {
    categories: ["Total"],
    labels: { style: { fontSize: "10px", color: "var(--muted-foreground)" } },
  },
  yAxis: {
    title: { text: null },
    labels: { enabled: false },
    min: 0,
    max: 100,
  },
  plotOptions: {
    bar: {
      stacking: "percent",
      pointPadding: 0,
      groupPadding: 0.15,
      dataLabels: {
        enabled: true,
        format: "{point.y} ({point.percentage:.0f}%)",
        style: { fontSize: "9px", color: "white", fontWeight: "bold" },
        inside: true,
      },
    },
  },
  legend: { 
    enabled: true,
    itemStyle: { fontSize: "10px", color: "var(--foreground)" },
    layout: "horizontal",
    align: "center",
    verticalAlign: "bottom",
  },
  series: [
    { name: "Soft skills", data: [32], color: "#3b82f6" },
    { name: "Liderazgo", data: [24], color: "#8b5cf6" },
    { name: "Compliance", data: [18], color: "#ec4899" },
    { name: "Idiomas", data: [14], color: "#f59e0b" },
    { name: "Técnicas", data: [12], color: "#10b981" },
  ],
  credits: { enabled: false },
  tooltip: {
    headerFormat: "",
    pointFormat: "<b>{series.name}</b><br/>{point.y} acciones<br/>{point.percentage:.0f}%",
    backgroundColor: "var(--card)",
    borderColor: "var(--border)",
    style: { color: "var(--foreground)", fontSize: "11px" },
  },
}

const activityByModality = {
  chart: { type: "bar", height: 120, backgroundColor: "transparent" },
  title: { text: null },
  xAxis: {
    categories: ["Total"],
    labels: { style: { fontSize: "10px", color: "var(--muted-foreground)" } },
  },
  yAxis: {
    title: { text: null },
    labels: { enabled: false },
    min: 0,
    max: 100,
  },
  plotOptions: {
    bar: {
      stacking: "percent",
      pointPadding: 0,
      groupPadding: 0.15,
      dataLabels: {
        enabled: true,
        format: "{point.y} ({point.percentage:.0f}%)",
        style: { fontSize: "9px", color: "white", fontWeight: "bold" },
        inside: true,
      },
    },
  },
  legend: {
    enabled: true,
    itemStyle: { fontSize: "10px", color: "var(--foreground)" },
    layout: "horizontal",
    align: "center",
    verticalAlign: "bottom",
  },
  series: [
    { name: "Online", data: [55], color: "#3b82f6" },
    { name: "Presencial", data: [30], color: "#10b981" },
    { name: "Blended", data: [15], color: "#f59e0b" },
  ],
  credits: { enabled: false },
  tooltip: {
    headerFormat: "",
    pointFormat: "<b>{series.name}</b><br/>{point.y} acciones<br/>{point.percentage:.0f}%",
    backgroundColor: "var(--card)",
    borderColor: "var(--border)",
    style: { color: "var(--foreground)", fontSize: "11px" },
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
    categories: ["Nivel bajo", "Nivel medio", "Nivel alto", "Dirección"],
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

// ─── Bloque 4: Intensidad de Formación (Column Chart) ──────────────────────────
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
      {/* Contextual message */}
      <div className="bg-accent/20 border border-accent/30 rounded-lg px-4 py-3 text-sm text-foreground">
        Analiza el volumen de formación, su evolución y el alcance en la plantilla.
      </div>

      {/* KPI Cards - 6 tarjetas */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {kpis.map((kpi) => (
          <KPICard key={kpi.title} {...kpi} />
        ))}
      </div>

      {/* Bloque 1 - Tendencia (2 line charts) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ChartCard
          title="Tendencia mensual de horas de formación recibidas"
          tooltip="Horas de formación recibidas por participantes finalizados en cada mes."
        >
          <HighchartsReact highcharts={require("highcharts")} options={trendHorasConfig} />
        </ChartCard>

        <ChartCard
          title="Tendencia mensual de empleados formados"
          tooltip="Número de empleados únicos que finalizan formación cada mes."
        >
          <HighchartsReact highcharts={require("highcharts")} options={trendEmpleadosConfig} />
        </ChartCard>
      </div>

      {/* Bloque 2 - Actividad Formativa (single 100% stacked horizontal bar) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ChartCard
          title="Distribución de acciones formativas por categoría"
          tooltip="Distribución porcentual de las acciones formativas según su categoría."
        >
          <HighchartsReact highcharts={require("highcharts")} options={activityByCategory} />
        </ChartCard>

        <ChartCard
          title="Distribución de acciones formativas por modalidad"
          tooltip="Distribución de acciones formativas según modalidad (online, presencial, mixta)."
        >
          <HighchartsReact highcharts={require("highcharts")} options={activityByModality} />
        </ChartCard>
      </div>

      {/* Bloque 3 - Cobertura Organizativa (stacked % vertical) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <ChartCard
          title="Cobertura de formación por género"
          tooltip="Proporción de empleados formados y no formados dentro de cada género."
        >
          <HighchartsReact highcharts={require("highcharts")} options={coverageByGender} />
        </ChartCard>

        <ChartCard
          title="Cobertura de formación por rango de edad"
          tooltip="Porcentaje de empleados formados en cada rango de edad."
        >
          <HighchartsReact highcharts={require("highcharts")} options={coverageByAge} />
        </ChartCard>

        <ChartCard
          title="Cobertura de formación por categoría interna"
          tooltip="Proporción de empleados formados dentro de cada categoría organizativa."
        >
          <HighchartsReact highcharts={require("highcharts")} options={coverageByOrgLevel} />
        </ChartCard>
      </div>

      {/* Bloque 4 - Intensidad de Formación */}
      <div className="grid grid-cols-1 gap-4">
        <ChartCard
          title="Horas medias de formación por empleado activo por género"
        >
          <HighchartsReact highcharts={require("highcharts")} options={intensityConfig} />
        </ChartCard>
      </div>
    </div>
  )
}
