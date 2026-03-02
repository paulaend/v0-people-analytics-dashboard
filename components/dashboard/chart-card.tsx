"use client"

import type { ReactNode } from "react"
import { Maximize2, Minus } from "lucide-react"
import { cn } from "@/lib/utils"

interface ChartCardProps {
  title: string
  children: ReactNode
  className?: string
  expandable?: boolean
}

export function ChartCard({ title, children, className, expandable = true }: ChartCardProps) {
  return (
    <div
      className={cn(
        "bg-card rounded-xl border border-border shadow-sm p-4 flex flex-col gap-3",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-sm font-semibold text-foreground leading-tight">{title}</h3>
        <div className="flex items-center gap-1">
          {expandable && (
            <button
              className="w-6 h-6 rounded-md flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors"
              aria-label="Expandir"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          )}
          <button
            className="w-6 h-6 rounded-md flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors"
            aria-label="Minimizar"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
      <div className="flex-1 min-h-0">{children}</div>
    </div>
  )
}
