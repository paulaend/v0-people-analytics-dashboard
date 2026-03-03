"use client"

import {
  Home,
  Star,
  Users,
  Euro,
  BarChart2,
  Calendar,
  MessageSquare,
  Rocket,
  AlignJustify,
  PieChart,
  ArrowUpCircle,
  Settings,
} from "lucide-react"
import { cn } from "@/lib/utils"

const NAV_ITEMS = [
  { icon: Home, label: "Inicio" },
  { icon: Star, label: "Favoritos" },
  { icon: Users, label: "Personas" },
  { icon: Euro, label: "Compensación" },
  { icon: BarChart2, label: "Analytics" },
  { icon: Calendar, label: "Tiempo" },
  { icon: MessageSquare, label: "Comunicación" },
  { icon: Rocket, label: "Talento" },
  { icon: AlignJustify, label: "N\u00f3mina" },
  { icon: PieChart, label: "Informes" },
]

interface SidebarProps {
  activeIndex?: number
}

export function Sidebar({ activeIndex = 4 }: SidebarProps) {
  return (
    <aside
      className="hidden md:flex flex-col items-center w-14 shrink-0 h-screen sticky top-0 border-r border-border"
      style={{ backgroundColor: "var(--sidebar)" }}
    >
      {/* Logo area */}
      <div className="w-full h-14 flex items-center justify-center border-b"
        style={{ borderColor: "var(--sidebar-border)" }}>
        <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-primary-foreground"
          style={{ backgroundColor: "var(--chart-blue)" }}>
          IE
        </div>
      </div>

      {/* Nav items */}
      <nav className="flex flex-col items-center gap-1 py-3 flex-1 overflow-y-auto w-full px-2">
        {NAV_ITEMS.map(({ icon: Icon, label }, i) => (
          <button
            key={label}
            title={label}
            className={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center transition-colors",
              i === activeIndex
                ? "text-primary-foreground"
                : "hover:opacity-80"
            )}
            style={i === activeIndex
              ? { backgroundColor: "var(--sidebar-primary)" }
              : { color: "var(--sidebar-foreground)" }}
          >
            <Icon className="w-4.5 h-4.5" style={{ width: 18, height: 18 }} />
            <span className="sr-only">{label}</span>
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="pb-4 flex flex-col items-center gap-1 w-full px-2">
        <button
          title="Subir"
          className="w-10 h-10 rounded-xl flex items-center justify-center hover:opacity-80 transition-colors"
          style={{ color: "var(--sidebar-foreground)" }}
        >
          <ArrowUpCircle style={{ width: 18, height: 18 }} />
          <span className="sr-only">Subir</span>
        </button>
        <button
          title="Configuración"
          className="w-10 h-10 rounded-xl flex items-center justify-center hover:opacity-80 transition-colors"
          style={{ color: "var(--sidebar-foreground)" }}
        >
          <Settings style={{ width: 18, height: 18 }} />
          <span className="sr-only">Configuración</span>
        </button>
      </div>
    </aside>
  )
}
