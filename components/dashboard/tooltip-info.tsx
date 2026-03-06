"use client"

import { Info } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface TooltipInfoProps {
  text: string
  className?: string
}

export function TooltipInfo({ text, className }: TooltipInfoProps) {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div className="relative group">
      <Info
        className={cn("w-3.5 h-3.5 text-muted-foreground/50 cursor-help shrink-0", className)}
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      />
      {isVisible && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-foreground text-card px-3 py-2 rounded-lg text-xs leading-snug whitespace-normal max-w-[200px] z-10 shadow-lg">
          {text}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[4px] border-r-[4px] border-t-[4px] border-l-transparent border-r-transparent" style={{ borderTopColor: "var(--foreground)" }} />
        </div>
      )}
    </div>
  )
}
