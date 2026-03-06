'use client'

import { Star, Target, MessageSquare, BarChart2, CheckCircle } from 'lucide-react'
import dynamic from 'next/dynamic'
import { KPICard } from '@/components/dashboard/kpi-card'
import { ChartCard } from '@/components/dashboard/chart-card'

const HighchartsReact = dynamic(() => import('highcharts-react-official'), { ssr: false })
import Highcharts from 'highcharts'

// ─── Highcharts theme ─────────────────────────────────────────────────────────
const highchartsTheme = {
  colors: ['var(--chart-blue)', 'var(--chart-green)', '#cbd5e1'],
  chart: { backgroundColor: 'transparent', style: { fontFamily: 'var(--font-inter)' } },
  xAxis: { labels: { style: { color: 'var(--muted-foreground)', fontSize: '11px' } }, gridLineColor: 'var(--border)' },
  yAxis: { labels: { style: { color: 'var(--muted-foreground)', fontSize: '11px' } }, gridLineColor: 'var(--border)' },
  legend: { itemStyle: { color: 'var(--foreground)', fontSize: '12px' } },
  tooltip: { backgroundColor: 'var(--card)', borderColor: 'var(--border)', shadow: false, style: { color: 'var(--foreground)', fontSize: '12px' } },
}
Highcharts.setOptions(highchartsTheme)

const BLUE = '#5074c4'
const GREEN = '#52a878'
const GRAY = '#cbd5e1'
const GRAY_LIGHT = '#e2e8f0'

// ─── KPI data (exactly 5 cards with tooltips) ─────────────────────────────────
const kpis = [
  {
    title: 'Satisfacción media',
    value: '4,2 / 5',
    subtitle: 'Media de cuestionarios finalizados',
    icon: Star,
    trend: { value: '+0,3', positive: true },
    tooltip: 'Media de las valoraciones de los cuestionarios de satisfacción asociados a acciones formativas finalizadas.',
  },
  {
    title: 'Eficacia media (manager)',
    value: '4,0 / 5',
    subtitle: 'Evaluación de transferencia',
    icon: Target,
    trend: { value: '+0,2', positive: true },
    tooltip: 'Media de las evaluaciones realizadas por responsables sobre la aplicación de la formación en el puesto.',
  },
  {
    title: 'Tasa de respuesta satisfacción',
    value: '84,6%',
    subtitle: 'Encuestas respondidas',
    icon: MessageSquare,
    tooltip: 'Encuestas de satisfacción respondidas dividido entre encuestas enviadas.',
  },
  {
    title: 'Tasa de respuesta eficacia',
    value: '76,2%',
    subtitle: 'Encuestas respondidas',
    icon: BarChart2,
    tooltip: 'Encuestas de eficacia respondidas dividido entre encuestas enviadas.',
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

// ─── Monthly YoY data ──────────────────────────────────────────────────────────
const satisfaccionYoY = [
  { mes: 'Ene', actual: 4.0, anterior: 3.8 },
  { mes: 'Feb', actual: 4.1, anterior: 3.9 },
  { mes: 'Mar', actual: 4.2, anterior: 4.0 },
  { mes: 'Abr', actual: 4.0, anterior: 3.7 },
  { mes: 'May', actual: 4.3, anterior: 4.1 },
  { mes: 'Jun', actual: 4.4, anterior: 4.2 },
  { mes: 'Jul', actual: 4.2, anterior: 4.0 },
  { mes: 'Ago', actual: 3.9, anterior: 3.8 },
  { mes: 'Sep', actual: 4.3, anterior: 4.1 },
  { mes: 'Oct', actual: 4.4, anterior: 4.2 },
  { mes: 'Nov', actual: 4.2, anterior: 4.0 },
  { mes: 'Dic', actual: 4.1, anterior: 3.9 },
]

const eficaciaYoY = [
  { mes: 'Ene', actual: 3.8, anterior: 3.6 },
  { mes: 'Feb', actual: 3.9, anterior: 3.7 },
  { mes: 'Mar', actual: 4.0, anterior: 3.8 },
  { mes: 'Abr', actual: 3.7, anterior: 3.5 },
  { mes: 'May', actual: 4.1, anterior: 3.9 },
  { mes: 'Jun', actual: 4.2, anterior: 4.0 },
  { mes: 'Jul', actual: 4.0, anterior: 3.8 },
  { mes: 'Ago', actual: 3.6, anterior: 3.5 },
  { mes: 'Sep', actual: 4.1, anterior: 3.9 },
  { mes: 'Oct', actual: 4.3, anterior: 4.1 },
  { mes: 'Nov', actual: 4.1, anterior: 3.9 },
  { mes: 'Dic', actual: 3.9, anterior: 3.7 },
]

// ─── Satisfaction by offer (3 horizontal bar charts) ──────────────────────────
const satisfaccionByCategory = [
  { categoria: 'Liderazgo', valor: 4.5, respuestas: 34 },
  { categoria: 'Habilidades técnicas', valor: 4.3, respuestas: 52 },
  { categoria: 'Soft skills', valor: 4.2, respuestas: 48 },
  { categoria: 'Idiomas', valor: 4.1, respuestas: 28 },
  { categoria: 'Compliance', valor: 3.8, respuestas: 15 },
]

const satisfaccionByModality = [
  { modalidad: 'Presencial', valor: 4.5, respuestas: 89 },
  { modalidad: 'Blended', valor: 4.3, respuestas: 64 },
  { modalidad: 'Online', valor: 4.1, respuestas: 24 },
]

const satisfaccionByProvider = [
  { proveedor: 'EAE Business', valor: 4.6, respuestas: 23 },
  { proveedor: 'Udemy Business', valor: 4.4, respuestas: 41 },
  { proveedor: 'F. Interna', valor: 4.3, respuestas: 34 },
  { proveedor: 'LinkedIn Learn.', valor: 4.2, respuestas: 29 },
  { proveedor: 'Coursera Teams', valor: 4.1, respuestas: 15 },
]

// ─── Score distribution ───────────────────────────────────────────────────────
const scoreDistribution = [
  { puntuacion: '1', respuestas: 12, porcentaje: 2 },
  { puntuacion: '2', respuestas: 28, porcentaje: 5 },
  { puntuacion: '3', respuestas: 80, porcentaje: 14 },
  { puntuacion: '4', respuestas: 218, porcentaje: 38 },
  { puntuacion: '5', respuestas: 235, porcentaje: 41 },
]

// ─── Ranking de acciones ──────────────────────────────────────────────────────
const accionesRanking = [
  { accion: 'Liderazgo de excelencia', satisfaccion: 4.7, respuestas: 23 },
  { accion: 'Transformación digital', satisfaccion: 4.6, respuestas: 31 },
  { accion: 'Comunicación efectiva', satisfaccion: 4.5, respuestas: 28 },
  { accion: 'Gestión de proyectos', satisfaccion: 4.4, respuestas: 24 },
  { accion: 'Inteligencia emocional', satisfaccion: 4.3, respuestas: 19 },
  { accion: 'Analítica de datos', satisfaccion: 4.2, respuestas: 15 },
  { accion: 'Seguridad cibernética', satisfaccion: 4.0, respuestas: 12 },
  { accion: 'Compliance RGPD', satisfaccion: 3.4, respuestas: 8 },
]

// ─── Alert threshold ──────────────────────────────────────────────────────────
const UMBRAL = 3.5
const accionesConAlerta = 6.8 // % acciones con satisfacción < 3.5

// ─── Highcharts config: Tendencia satisfacción ────────────────────────────────
const configSatisfaccionTendencia = {
  chart: { type: 'line' },
  title: { text: '' },
  xAxis: { categories: satisfaccionYoY.map(d => d.mes) },
  yAxis: { min: 3, max: 5, title: { text: '' } },
  legend: { enabled: true },
  tooltip: {
    headerFormat: '<span style="font-weight: bold">{point.key}</span><br/>',
    pointFormat: '<span style="color:{point.color}">{series.name}</span>: <b>{point.y:.1f}</b><br/>',
    shared: true,
  },
  series: [
    { name: 'Año actual', data: satisfaccionYoY.map(d => d.actual), color: BLUE },
    { name: 'Año anterior', data: satisfaccionYoY.map(d => d.anterior), color: GRAY, dashStyle: 'shortdash' },
  ],
  credits: { enabled: false },
}

// ─── Highcharts config: Tendencia eficacia ────────────────────────────────────
const configEficaciaTendencia = {
  chart: { type: 'line' },
  title: { text: '' },
  xAxis: { categories: eficaciaYoY.map(d => d.mes) },
  yAxis: { min: 3, max: 5, title: { text: '' } },
  legend: { enabled: true },
  tooltip: {
    headerFormat: '<span style="font-weight: bold">{point.key}</span><br/>',
    pointFormat: '<span style="color:{point.color}">{series.name}</span>: <b>{point.y:.1f}</b><br/>',
    shared: true,
  },
  series: [
    { name: 'Año actual', data: eficaciaYoY.map(d => d.actual), color: GREEN },
    { name: 'Año anterior', data: eficaciaYoY.map(d => d.anterior), color: GRAY, dashStyle: 'shortdash' },
  ],
  credits: { enabled: false },
}

// ─── Highcharts config: Satisfacción por categoría (horizontal bar) ───────────
const configSatisfaccionByCategory = {
  chart: { type: 'bar' },
  title: { text: '' },
  xAxis: { type: 'category', title: { text: '' } },
  yAxis: { min: 0, max: 5, title: { text: '' } },
  legend: { enabled: false },
  tooltip: {
    headerFormat: '',
    pointFormat: '<b>{point.categoria}</b><br/>Satisfacción: {point.valor:.1f}<br/>Respuestas: {point.respuestas}',
  },
  series: [
    {
      name: 'Satisfacción',
      data: satisfaccionByCategory.map(d => ({ ...d, y: d.valor })),
      color: BLUE,
      dataLabels: { enabled: true, format: '{point.valor:.1f}' },
    },
  ],
  credits: { enabled: false },
}

// ─── Highcharts config: Satisfacción por modalidad (horizontal bar) ───────────
const configSatisfaccionByModality = {
  chart: { type: 'bar' },
  title: { text: '' },
  xAxis: { type: 'category', title: { text: '' } },
  yAxis: { min: 0, max: 5, title: { text: '' } },
  legend: { enabled: false },
  tooltip: {
    headerFormat: '',
    pointFormat: '<b>{point.modalidad}</b><br/>Satisfacción: {point.valor:.1f}<br/>Respuestas: {point.respuestas}',
  },
  series: [
    {
      name: 'Satisfacción',
      data: satisfaccionByModality.map(d => ({ ...d, y: d.valor })),
      color: GREEN,
      dataLabels: { enabled: true, format: '{point.valor:.1f}' },
    },
  ],
  credits: { enabled: false },
}

// ─── Highcharts config: Satisfacción por proveedor (horizontal bar) ───────────
const configSatisfaccionByProvider = {
  chart: { type: 'bar' },
  title: { text: '' },
  xAxis: { type: 'category', title: { text: '' } },
  yAxis: { min: 0, max: 5, title: { text: '' } },
  legend: { enabled: false },
  tooltip: {
    headerFormat: '',
    pointFormat: '<b>{point.proveedor}</b><br/>Satisfacción: {point.valor:.1f}<br/>Respuestas: {point.respuestas}',
  },
  series: [
    {
      name: 'Satisfacción',
      data: satisfaccionByProvider.map(d => ({ ...d, y: d.valor })),
      color: BLUE,
      dataLabels: { enabled: true, format: '{point.valor:.1f}' },
    },
  ],
  credits: { enabled: false },
}

// ─── Highcharts config: Score distribution (column chart) ──────────────────────
const configScoreDistribution = {
  chart: { type: 'column' },
  title: { text: '' },
  xAxis: { title: { text: '' }, categories: scoreDistribution.map(d => d.puntuacion) },
  yAxis: { title: { text: '' } },
  legend: { enabled: false },
  tooltip: {
    headerFormat: '<b>Puntuación {point.key}</b><br/>',
    pointFormat: 'Respuestas: <b>{point.respuestas}</b><br/>Porcentaje: <b>{point.porcentaje}%</b>',
  },
  series: [
    {
      name: 'Respuestas',
      data: scoreDistribution.map(d => ({
        y: d.respuestas,
        respuestas: d.respuestas,
        porcentaje: d.porcentaje,
        color: d.puntuacion === '5' ? GREEN : d.puntuacion === '1' ? '#ef4444' : BLUE,
      })),
      colorByPoint: true,
      dataLabels: { enabled: true, format: '{point.respuestas}' },
    },
  ],
  credits: { enabled: false },
}

export function TabCalidad() {
  return (
    <div className="flex flex-col gap-4">
      {/* KPI Row – 5 tarjetas con tooltips */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {kpis.map((kpi) => (
          <KPICard key={kpi.title} {...kpi} />
        ))}
      </div>

      {/* Bloque 1 – Tendencia con YoY (line charts) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ChartCard title="Tendencia mensual de satisfacción media" tooltip="Evolución mensual de la satisfacción media comparando el año actual con el año anterior.">
          <HighchartsReact highcharts={Highcharts} options={configSatisfaccionTendencia} />
        </ChartCard>

        <ChartCard title="Tendencia mensual de eficacia media" tooltip="Evolución mensual de la eficacia media comparando el año actual con el año anterior.">
          <HighchartsReact highcharts={Highcharts} options={configEficaciaTendencia} />
        </ChartCard>
      </div>

      {/* Bloque 2 – Satisfacción por oferta (3 horizontal bar charts) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <ChartCard title="Satisfacción media por categoría" tooltip="Puntuación media de satisfacción agrupada por categoría formativa.">
          <HighchartsReact highcharts={Highcharts} options={configSatisfaccionByCategory} />
        </ChartCard>

        <ChartCard title="Satisfacción media por modalidad" tooltip="Puntuación media de satisfacción agrupada por modalidad de impartición.">
          <HighchartsReact highcharts={Highcharts} options={configSatisfaccionByModality} />
        </ChartCard>

        <ChartCard title="Satisfacción media por proveedor" tooltip="Puntuación media de satisfacción agrupada por proveedor de formación.">
          <HighchartsReact highcharts={Highcharts} options={configSatisfaccionByProvider} />
        </ChartCard>
      </div>

      {/* Bloque 3 – Distribución de puntuaciones */}
      <div className="grid grid-cols-1 gap-4">
        <ChartCard title="Distribución de puntuaciones de satisfacción" tooltip="Número de respuestas recibidas para cada puntuación de satisfacción (1–5).">
          <HighchartsReact highcharts={Highcharts} options={configScoreDistribution} />
        </ChartCard>
      </div>

      {/* Bloque 4 – Ranking de acciones */}
      <div className="grid grid-cols-1 gap-4">
        <ChartCard title="Ranking de acciones formativas por satisfacción media" tooltip="Listado ordenado de acciones formativas por puntuación media de satisfacción.">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 pr-3 font-semibold text-muted-foreground">Acción formativa</th>
                  <th className="text-center py-2 pr-3 font-semibold text-muted-foreground">Satisfacción media</th>
                  <th className="text-center py-2 font-semibold text-muted-foreground">Número de respuestas</th>
                </tr>
              </thead>
              <tbody>
                {accionesRanking.map((a, i) => (
                  <tr key={i} className="border-b border-border last:border-0 hover:bg-secondary transition-colors">
                    <td className="py-2 pr-3 text-foreground font-medium">{a.accion}</td>
                    <td className="py-2 pr-3 text-center font-semibold" style={{ color: a.satisfaccion >= 4 ? GREEN : a.satisfaccion >= UMBRAL ? 'var(--foreground)' : '#ef4444' }}>
                      {a.satisfaccion.toFixed(1)} / 5
                    </td>
                    <td className="py-2 text-center text-muted-foreground">{a.respuestas}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ChartCard>
      </div>

      {/* Bloque 5 – Indicador de alerta */}
      <div className="grid grid-cols-1 gap-4">
        <ChartCard title="Indicador de alerta - Acciones por debajo del umbral" tooltip="Porcentaje de acciones formativas con valoración media inferior al umbral configurado.">
          <div className="flex items-center justify-between px-4 py-6">
            <div>
              <p className="text-sm text-muted-foreground mb-1">
                % de acciones con satisfacción &lt; {UMBRAL}
              </p>
              <p className="text-3xl font-bold" style={{ color: accionesConAlerta > 10 ? '#ef4444' : BLUE }}>
                {accionesConAlerta}%
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Umbral de alerta configurado en {UMBRAL}. Se recomienda revisión de acciones bajo umbral.
              </p>
            </div>
            <div className="w-24 h-24 rounded-full flex items-center justify-center" style={{ background: `conic-gradient(${accionesConAlerta > 10 ? '#ef4444' : BLUE} 0deg ${accionesConAlerta * 3.6}deg, ${GRAY_LIGHT} ${accionesConAlerta * 3.6}deg)` }}>
              <div className="w-20 h-20 rounded-full bg-card flex items-center justify-center">
                <span className="text-lg font-bold" style={{ color: accionesConAlerta > 10 ? '#ef4444' : BLUE }}>
                  {accionesConAlerta}%
                </span>
              </div>
            </div>
          </div>
        </ChartCard>
      </div>
    </div>
  )
}
