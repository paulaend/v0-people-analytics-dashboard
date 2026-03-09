'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

export interface Widget {
  id: string
  title: string
  type: 'chart' | 'kpi' | 'table'
  visible: boolean
  order: number
}

interface WidgetContextType {
  widgets: Widget[]
  toggleWidget: (id: string) => void
  reorderWidgets: (widgets: Widget[]) => void
  addWidget: (widget: Widget) => void
  removeWidget: (id: string) => void
}

const WidgetContext = createContext<WidgetContextType | undefined>(undefined)

export function WidgetProvider({ children, initialWidgets }: { children: ReactNode; initialWidgets: Widget[] }) {
  const [widgets, setWidgets] = useState<Widget[]>(initialWidgets)

  const toggleWidget = (id: string) => {
    setWidgets((prev) => prev.map((w) => (w.id === id ? { ...w, visible: !w.visible } : w)))
  }

  const reorderWidgets = (newWidgets: Widget[]) => {
    setWidgets(newWidgets)
  }

  const addWidget = (widget: Widget) => {
    setWidgets((prev) => [...prev, widget])
  }

  const removeWidget = (id: string) => {
    setWidgets((prev) => prev.filter((w) => w.id !== id))
  }

  return (
    <WidgetContext.Provider value={{ widgets, toggleWidget, reorderWidgets, addWidget, removeWidget }}>
      {children}
    </WidgetContext.Provider>
  )
}

export function useWidgets() {
  const context = useContext(WidgetContext)
  if (!context) {
    throw new Error('useWidgets must be used within WidgetProvider')
  }
  return context
}
