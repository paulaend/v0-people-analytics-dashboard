'use client'

import { Star, Target, MessageSquare, BarChart2, CheckCircle } from 'lucide-react'
import dynamic from 'next/dynamic'
import { KPICard } from '@/components/dashboard/kpi-card'
import { ChartCard } from '@/components/dashboard/chart-card'
import { WidgetGrid } from '@/components/dashboard/widget-grid'

const HighchartsReact = dynamic(() => import('highcharts-react-official'), { ssr: false })

// ─── KPI data (5 cards with tooltips) ──────────────────────────────────────────
const kpis = [
  {
    title: 'Satisfacción media',
    value: '4,2 / 5',
    subtitle: 'Media de cuestionarios finalizados',
    icon: Star,
    trend: { value: '+0,3', positive: true },
    tooltip: 'Media de las respuestas de los cuestionarios de satisfacción completados por participantes al finalizar la formación.',
  },
  {
    title: 'Eficacia media (manager)',
    value: '4,0 / 5',
    subtitle: 'Evaluación de transferencia',
    icon: Target,
    trend: { value: '+0,2', positive: true },
    tooltip: 'Valoración realizada por el responsable del participante sobre la aplicación de la formación en el puesto de trabajo.',
  },
  {
    title: 'Tasa de respuesta satisfacción',
    value: '84,6%',
    subtitle: 'Encuestas respondidas',
    icon: MessageSquare,
    tooltip: 'Porcentaje de cuestionarios de satisfacción respondidos respecto al total enviado.',
  },
  {
    title: 'Tasa de respuesta eficacia',
    value: '76,2%',
    subtitle: 'Encuestas respondidas',
    icon: BarChart2,
    tooltip: 'Porcentaje de cuestionarios de eficacia respondidos respecto al total enviado.',
  },
  {
    title: '% participantes aptos',
    value: '91,3%',
    subtitle: 'Superaron evaluación',
    icon: CheckCircle,
    trend: { value: '+3,1 pp', positive: true },
    tooltip: 'Participantes que cumplen los criterios de aptitud dividido entre participantes evaluados.',
  },
]

// ─── Highcharts configurations ─────────────────────────────────────────────────

const satisfaccionYoYConfig = {
  chart: { type: 'line', height: 300, backgroundColor: 'transparent' },
  title: { text: null },
  xAxis: {
    categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    labels: { style: { fontSize: '10px', color: 'var(--muted-foreground)' } },
    lineColor: 'var(--border)',
    tickColor: 'var(--border)',
  },
  yAxis: {
    title: { text: null },
    labels: { style: { fontSize: '10px', color: 'var(--muted-foreground)' } },
    gridLineColor: 'var(--border)',
    min: 0,
    max: 5,
  },
  legend: { itemStyle: { fontSize: '11px', color: 'var(--foreground)' } },
  plotOptions: {
    line: { enableMouseTracking: true, dataLabels: { enabled: false } },
  },
  series: [
    {
      name: 'Año actual',
      data: [4.0, 4.1, 4.2, 4.0, 4.3, 4.4, 4.2, 3.9, 4.3, 4.4, 4.2, 4.1],
      color: 'var(--chart-blue)',
      lineWidth: 2,
    },
    {
      name: 'Año anterior',
      data: [3.8, 3.9, 4.0, 3.7, 4.1, 4.2, 4.0, 3.8, 4.1, 4.2, 4.0, 3.9],
      color: 'var(--chart-green)',
      lineWidth: 2,
      dashStyle: 'Dash',
    },
  ],
  credits: { enabled: false },
  tooltip: {
    shared: true,
    backgroundColor: 'var(--card)',
    borderColor: 'var(--border)',
    style: { color: 'var(--foreground)', fontSize: '11px' },
  },
}

const eficaciaYoYConfig = {
  chart: { type: 'line', height: 300, backgroundColor: 'transparent' },
  title: { text: null },
  xAxis: {
    categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    labels: { style: { fontSize: '10px', color: 'var(--muted-foreground)' } },
    lineColor: 'var(--border)',
    tickColor: 'var(--border)',
  },
  yAxis: {
    title: { text: null },
    labels: { style: { fontSize: '10px', color: 'var(--muted-foreground)' } },
    gridLineColor: 'var(--border)',
    min: 0,
    max: 5,
  },
  legend: { itemStyle: { fontSize: '11px', color: 'var(--foreground)' } },
  plotOptions: {
    line: { enableMouseTracking: true, dataLabels: { enabled: false } },
  },
  series: [
    {
      name: 'Año actual',
      data: [3.8, 3.9, 4.0, 3.7, 4.1, 4.2, 4.0, 3.6, 4.1, 4.3, 4.1, 3.9],
      color: 'var(--chart-blue)',
      lineWidth: 2,
    },
    {
      name: 'Año anterior',
      data: [3.6, 3.7, 3.8, 3.5, 3.9, 4.0, 3.8, 3.5, 3.9, 4.1, 3.9, 3.7],
      color: 'var(--chart-green)',
      lineWidth: 2,
      dashStyle: 'Dash',
    },
  ],
  credits: { enabled: false },
  tooltip: {
    shared: true,
    backgroundColor: 'var(--card)',
    borderColor: 'var(--border)',
    style: { color: 'var(--foreground)', fontSize: '11px' },
  },
}

const satisfaccionByCategoryConfig = {
  chart: { type: 'bar', height: 220, backgroundColor: 'transparent' },
  title: { text: null },
  xAxis: {
    categories: ['Soft skills', 'Liderazgo', 'Compliance', 'Idiomas', 'Técnicas'],
    labels: { style: { fontSize: '10px', color: 'var(--muted-foreground)' } },
  },
  yAxis: {
    title: { text: null },
    labels: { style: { fontSize: '10px', color: 'var(--muted-foreground)' } },
    min: 0,
    max: 5,
  },
  plotOptions: {
    bar: {
      dataLabels: {
        enabled: true,
        format: '{point.y}',
        style: { fontSize: '10px', fontWeight: 'bold' },
      },
    },
  },
  legend: { enabled: false },
  series: [
    {
      name: 'Satisfacción media',
      data: [4.3, 4.1, 4.0, 4.2, 3.9],
      color: 'var(--chart-blue)',
    },
  ],
  credits: { enabled: false },
  tooltip: {
    headerFormat: '<b>{point.x}</b><br/>',
    pointFormat: 'Satisfacción: {point.y} / 5',
    backgroundColor: 'var(--card)',
    borderColor: 'var(--border)',
    style: { color: 'var(--foreground)', fontSize: '11px' },
  },
}

const satisfaccionByModalityConfig = {
  chart: { type: 'bar', height: 220, backgroundColor: 'transparent' },
  title: { text: null },
  xAxis: {
    categories: ['Online', 'Presencial', 'Blended'],
    labels: { style: { fontSize: '10px', color: 'var(--muted-foreground)' } },
  },
  yAxis: {
    title: { text: null },
    labels: { style: { fontSize: '10px', color: 'var(--muted-foreground)' } },
    min: 0,
    max: 5,
  },
  plotOptions: {
    bar: {
      dataLabels: {
        enabled: true,
        format: '{point.y}',
        style: { fontSize: '10px', fontWeight: 'bold' },
      },
    },
  },
  legend: { enabled: false },
  series: [
    {
      name: 'Satisfacción media',
      data: [4.0, 4.4, 4.1],
      color: 'var(--chart-green)',
    },
  ],
  credits: { enabled: false },
  tooltip: {
    headerFormat: '<b>{point.x}</b><br/>',
    pointFormat: 'Satisfacción: {point.y} / 5',
    backgroundColor: 'var(--card)',
    borderColor: 'var(--border)',
    style: { color: 'var(--foreground)', fontSize: '11px' },
  },
}

const satisfaccionByProviderConfig = {
  chart: { type: 'bar', height: 220, backgroundColor: 'transparent' },
  title: { text: null },
  xAxis: {
    categories: ['Proveedor A', 'Proveedor B', 'Proveedor C', 'Interno'],
    labels: { style: { fontSize: '9px', color: 'var(--muted-foreground)' } },
  },
  yAxis: {
    title: { text: null },
    labels: { style: { fontSize: '10px', color: 'var(--muted-foreground)' } },
    min: 0,
    max: 5,
  },
  plotOptions: {
    bar: {
      dataLabels: {
        enabled: true,
        format: '{point.y}',
        style: { fontSize: '10px', fontWeight: 'bold' },
      },
    },
  },
  legend: { enabled: false },
  series: [
    {
      name: 'Satisfacción media',
      data: [4.2, 3.9, 4.3, 4.1],
      color: '#f59e0b',
    },
  ],
  credits: { enabled: false },
  tooltip: {
    headerFormat: '<b>{point.x}</b><br/>',
    pointFormat: 'Satisfacción: {point.y} / 5',
    backgroundColor: 'var(--card)',
    borderColor: 'var(--border)',
    style: { color: 'var(--foreground)', fontSize: '11px' },
  },
}

const scoreDistributionConfig = {
  chart: { type: 'column', height: 220, backgroundColor: 'transparent' },
  title: { text: null },
  xAxis: {
    categories: ['1', '2', '3', '4', '5'],
    title: { text: 'Puntuación' },
    labels: { style: { fontSize: '10px', color: 'var(--muted-foreground)' } },
  },
  yAxis: {
    title: { text: 'Número de respuestas' },
    labels: { style: { fontSize: '10px', color: 'var(--muted-foreground)' } },
  },
  plotOptions: {
    column: {
      colorByPoint: true,
      dataLabels: {
        enabled: true,
        format: '{point.y}',
        style: { fontSize: '10px', fontWeight: 'bold' },
      },
    },
  },
  legend: { enabled: false },
  series: [
    {
      name: 'Respuestas',
      data: [
        { y: 45, color: '#ef4444' },
        { y: 82, color: '#f97316' },
        { y: 156, color: '#eab308' },
        { y: 298, color: '#84cc16' },
        { y: 419, color: '#22c55e' },
      ],
    },
  ],
  credits: { enabled: false },
  tooltip: {
    headerFormat: '<b>Puntuación: {point.x}</b><br/>',
    pointFormat: 'Respuestas: {point.y}',
    backgroundColor: 'var(--card)',
    borderColor: 'var(--border)',
    style: { color: 'var(--foreground)', fontSize: '11px' },
  },
}

const outlierTableData = [
  { nombre: 'Excel Avanzado', satisfaccion: 4.8, respuestas: 28, outlier: 'superior' },
  { nombre: 'Presentaciones Efectivas', satisfaccion: 4.7, respuestas: 35, outlier: 'superior' },
  { nombre: 'Comunicación Asertiva', satisfaccion: 4.6, respuestas: 42, outlier: 'superior' },
  { nombre: 'Gestión del Estrés', satisfaccion: 2.1, respuestas: 24, outlier: 'inferior' },
  { nombre: 'Cumplimiento RGPD', satisfaccion: 2.5, respuestas: 31, outlier: 'inferior' },
]

export function TabCalidad() {
  return (
    <div className="flex flex-col gap-4">
      {/* Contextual message */}
      <div className="bg-accent/20 border border-accent/30 rounded-lg px-4 py-3 text-sm text-foreground">
        Analiza la calidad de la formación a través de las evaluaciones de satisfacción y eficacia.
      </div>

      {/* KPI Cards - 5 tarjetas */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {kpis.map((kpi) => (
          <KPICard key={kpi.title} {...kpi} />
        ))}
      </div>

      {/* Widgets Grid - Default widgets */}
      <WidgetGrid>
        {/* Tendencia mensual de satisfacción media */}
        <div className="col-span-1 md:col-span-2">
          <ChartCard
            title="Tendencia mensual de satisfacción media"
            tooltip="Evolución de la satisfacción media mes a mes comparado con el año anterior."
          >
            <HighchartsReact highcharts={require('highcharts')} options={satisfaccionYoYConfig} />
          </ChartCard>
        </div>

        {/* Tendencia mensual de eficacia media */}
        <div className="col-span-1 md:col-span-2">
          <ChartCard
            title="Tendencia mensual de eficacia media"
            tooltip="Evolución de la eficacia media mes a mes comparado con el año anterior."
          >
            <HighchartsReact highcharts={require('highcharts')} options={eficaciaYoYConfig} />
          </ChartCard>
        </div>

        {/* Satisfacción media por categoría */}
        <div className="col-span-1">
          <ChartCard
            title="Satisfacción media por categoría"
            tooltip="Puntuación promedio de satisfacción para cada categoría de formación."
          >
            <HighchartsReact highcharts={require('highcharts')} options={satisfaccionByCategoryConfig} />
          </ChartCard>
        </div>

        {/* Satisfacción media por modalidad */}
        <div className="col-span-1">
          <ChartCard
            title="Satisfacción media por modalidad"
            tooltip="Satisfacción promedio según el tipo de modalidad (online, presencial, blended)."
          >
            <HighchartsReact highcharts={require('highcharts')} options={satisfaccionByModalityConfig} />
          </ChartCard>
        </div>

        {/* Satisfacción media por proveedor */}
        <div className="col-span-1">
          <ChartCard
            title="Satisfacción media por proveedor"
            tooltip="Puntuación de satisfacción promedio para cada proveedor de formación."
          >
            <HighchartsReact highcharts={require('highcharts')} options={satisfaccionByProviderConfig} />
          </ChartCard>
        </div>

        {/* Distribución de puntuaciones de satisfacción */}
        <div className="col-span-1 md:col-span-2">
          <ChartCard
            title="Distribución de puntuaciones de satisfacción"
            tooltip="Cantidad de respuestas por cada nivel en la escala 1-5."
          >
            <HighchartsReact highcharts={require('highcharts')} options={scoreDistributionConfig} />
          </ChartCard>
        </div>

        {/* Outliers de satisfacción - Table */}
        <div className="col-span-1 md:col-span-2">
          <ChartCard
            title="Outliers de satisfacción"
            tooltip="Acciones formativas cuya valoración media se encuentra significativamente por encima o por debajo de la media general del periodo."
          >
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 px-3 font-semibold text-foreground">Acción</th>
                    <th className="text-center py-2 px-3 font-semibold text-foreground">Satisfacción</th>
                    <th className="text-center py-2 px-3 font-semibold text-foreground">Respuestas</th>
                  </tr>
                </thead>
                <tbody>
                  {outlierTableData.map((row, idx) => (
                    <tr
                      key={idx}
                      className={`border-b border-border/50 ${
                        row.outlier === 'superior' ? 'bg-green-50/30' : 'bg-red-50/30'
                      } hover:bg-muted/50`}
                    >
                      <td className="py-2 px-3 text-foreground">{row.nombre}</td>
                      <td className={`text-center py-2 px-3 font-semibold ${
                        row.outlier === 'superior' ? 'text-green-700' : 'text-red-700'
                      }`}>
                        {row.satisfaccion} / 5
                      </td>
                      <td className="text-center py-2 px-3 text-muted-foreground">{row.respuestas}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ChartCard>
        </div>
      </WidgetGrid>
    </div>
  )
}
