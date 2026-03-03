"use client"

import { useState } from "react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { Header } from "@/components/dashboard/header"
import { FilterBar } from "@/components/dashboard/filter-bar"
import { TabParticipacion } from "@/components/dashboard/tabs/tab-participacion"
import { TabCalidad } from "@/components/dashboard/tabs/tab-calidad"
import { cn } from "@/lib/utils"

const TABS = [
  { id: "participacion", label: "Participaci\u00f3n" },
  { id: "calidad", label: "Calidad y Resultado" },
] as const

type TabId = (typeof TABS)[number]["id"]

export default function PeopleAnalyticsDashboard() {
  const [activeTab, setActiveTab] = useState<TabId>("participacion")

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar activeIndex={4} />

      {/* Main area */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Header />

        {/* Content scroll area */}
        <main className="flex-1 overflow-y-auto">
          {/* Tab navigation */}
          <div className="sticky top-0 z-10 bg-background border-b border-border px-4 md:px-6">
            <nav className="flex items-end gap-1 -mb-px" aria-label="Secciones del dashboard">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap",
                    activeTab === tab.id
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground hover:border-border",
                  )}
                  aria-current={activeTab === tab.id ? "page" : undefined}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Filter bar */}
          <div className="px-4 md:px-6 py-3 border-b border-border bg-background">
            <FilterBar showConsultarIA />
          </div>

          {/* Dashboard content */}
          <div className="px-4 md:px-6 py-5">
            {activeTab === "participacion" && <TabParticipacion />}
            {activeTab === "calidad" && <TabCalidad />}
          </div>
        </main>
      </div>
    </div>
  )
}
