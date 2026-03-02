"use client"

import { Bell, HelpCircle, Search } from "lucide-react"

export function Header() {
  return (
    <header className="h-14 border-b border-border bg-card flex items-center px-4 gap-4 sticky top-0 z-20">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs flex-1 min-w-0" aria-label="Breadcrumb">
        <span className="text-muted-foreground hidden sm:block">People Analytics</span>
        <span className="text-muted-foreground hidden sm:block">/</span>
        <span className="text-primary font-medium hidden sm:block">Colecciones de dashboards</span>
        <span className="text-muted-foreground hidden sm:block">/</span>
        <span className="font-semibold text-foreground truncate">Formación</span>
      </nav>

      {/* Search */}
      <div className="relative hidden lg:flex items-center">
        <Search className="w-3.5 h-3.5 text-muted-foreground absolute left-3" />
        <input
          type="search"
          placeholder="Buscar secciones, empleados y más"
          className="pl-8 pr-4 py-1.5 text-xs rounded-lg border border-border bg-muted/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring w-64"
        />
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-2 ml-auto">
        <button className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors">
          <Bell className="w-4 h-4" />
          <span className="sr-only">Notificaciones</span>
        </button>
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-primary-foreground"
          style={{ backgroundColor: "var(--primary)" }}>
          IE
        </div>
        <button className="hidden sm:flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
          <HelpCircle className="w-4 h-4" />
          <span>Obtener ayuda</span>
        </button>
        <span className="hidden sm:flex items-center gap-1 text-xs font-bold"
          style={{ color: "var(--primary)" }}>
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
            <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 3a7 7 0 110 14A7 7 0 0112 5z" />
          </svg>
          endalia
        </span>
      </div>
    </header>
  )
}
