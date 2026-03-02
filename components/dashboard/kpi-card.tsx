"use client"

import type { LucideIcon } from "lucide-react"
import { Info } from "lucide-react"
import { cn } from "@/lib/utils"

interface KPICardProps {
  title: string
  value: string
  subtitle?: string
  icon: LucideIcon
  trend?: { value: string; positive: boolean }
  className?: string
}

export function KPICard({ title, value, subtitle, icon: Icon, trend, className }: KPICardProps) {
  return (
    <div
      className={cn(
        "bg-card rounded-xl border border-border shadow-sm p-4 flex flex-col gap-2 min-w-0",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
            style={{ backgroundColor: "var(--kpi-icon-bg)" }}>
            <Icon className="w-4 h-4" style={{ color: "var(--kpi-icon-color)" }} />
          </div>
          <span className="text-xs font-medium text-muted-foreground leading-tight line-clamp-2">{title}</span>
        </div>
        <Info className="w-3.5 h-3.5 text-muted-foreground/50 shrink-0 mt-0.5" />
      </div>
      <div className="flex items-end justify-between gap-1 mt-1">
        <span className="text-2xl font-bold text-foreground leading-none tracking-tight">{value}</span>
        {trend && (
          <span
            className={cn(
              "text-xs font-medium px-1.5 py-0.5 rounded",
              trend.positive
                ? "text-emerald-700 bg-emerald-50"
                : "text-rose-700 bg-rose-50",
            )}
          >
            {trend.positive ? "+" : ""}{trend.value}
          </span>
        )}
      </div>
      {subtitle && <span className="text-xs text-muted-foreground">{subtitle}</span>}
    </div>
  )
}
