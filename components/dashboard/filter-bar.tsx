"use client"

import { useState } from "react"
import { ChevronDown, X, ChevronLeft, ChevronRight, Download, Pencil, Sparkles } from "lucide-react"

const COMPANIES = ["BridgeTech Systems", "CloudStream", "DataHorizon", "Elche/Elx Office", "Viladecans Hub"]
const ORG_UNIT_TYPES = ["Departamento", "Dirección", "Unidad", "División"]
const ORG_UNITS = ["RRHH", "Tecnología", "Comercial", "Finanzas", "Marketing", "Legal"]

interface FilterBarProps {
  showConsultarIA?: boolean
}

export function FilterBar({ showConsultarIA = true }: FilterBarProps) {
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([])
  const [selectedOrgType, setSelectedOrgType] = useState("")
  const [selectedOrgUnit, setSelectedOrgUnit] = useState<string[]>([])
  const [currentDate, setCurrentDate] = useState({ year: 2026 })

  const toggleCompany = (c: string) =>
    setSelectedCompanies((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]))

  const toggleOrgUnit = (u: string) =>
    setSelectedOrgUnit((prev) => (prev.includes(u) ? prev.filter((x) => x !== u) : [...prev, u]))

  return (
    <div className="flex flex-col gap-3">
      {/* Action buttons */}
      <div className="flex items-center gap-2 flex-wrap">
        <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-primary-foreground border border-primary/30 hover:opacity-90 transition-opacity"
          style={{ backgroundColor: "var(--primary)" }}>
          <Download className="w-3.5 h-3.5" />
          Exportar
        </button>
        <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-foreground bg-card border border-border hover:bg-muted transition-colors">
          <Pencil className="w-3.5 h-3.5" />
          Editar
        </button>
        {showConsultarIA && (
          <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors"
            style={{ color: "var(--primary)", borderColor: "var(--primary)", backgroundColor: "var(--kpi-icon-bg)" }}>
            <Sparkles className="w-3.5 h-3.5" />
            Consultar IA
          </button>
        )}
      </div>

      {/* Filters row */}
      <div className="flex items-center gap-2 flex-wrap">
        {/* Companies multi-select */}
        <div className="relative group">
          <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-foreground bg-card border border-border hover:bg-muted transition-colors min-w-[140px]">
            <span className="truncate">
              {selectedCompanies.length === 0
                ? "Todas las empresas"
                : `${selectedCompanies.length} seleccionadas`}
            </span>
            <ChevronDown className="w-3.5 h-3.5 ml-auto shrink-0" />
          </button>
          <div className="absolute top-full left-0 mt-1 w-52 bg-card border border-border rounded-xl shadow-lg p-1 z-50 hidden group-focus-within:block">
            {COMPANIES.map((c) => (
              <button
                key={c}
                onClick={() => toggleCompany(c)}
                className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-muted transition-colors flex items-center gap-2"
              >
                <span
                  className="w-3.5 h-3.5 rounded border border-border shrink-0 flex items-center justify-center"
                  style={selectedCompanies.includes(c) ? { backgroundColor: "var(--primary)", borderColor: "var(--primary)" } : {}}
                >
                  {selectedCompanies.includes(c) && <span className="text-primary-foreground text-[8px]">✓</span>}
                </span>
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Org unit type */}
        <div className="relative group">
          <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-foreground bg-card border border-border hover:bg-muted transition-colors min-w-[160px]">
            <span className="truncate">{selectedOrgType || "Tipo de unidad organizativa"}</span>
            <ChevronDown className="w-3.5 h-3.5 ml-auto shrink-0" />
          </button>
          <div className="absolute top-full left-0 mt-1 w-52 bg-card border border-border rounded-xl shadow-lg p-1 z-50 hidden group-focus-within:block">
            {ORG_UNIT_TYPES.map((t) => (
              <button
                key={t}
                onClick={() => setSelectedOrgType(t)}
                className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-muted transition-colors"
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Org unit multi-select */}
        <div className="relative group">
          <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-foreground bg-card border border-border hover:bg-muted transition-colors min-w-[140px]">
            <span className="truncate">
              {selectedOrgUnit.length === 0 ? "Unidad organizativa" : `${selectedOrgUnit.length} seleccionadas`}
            </span>
            <ChevronDown className="w-3.5 h-3.5 ml-auto shrink-0" />
          </button>
          <div className="absolute top-full left-0 mt-1 w-52 bg-card border border-border rounded-xl shadow-lg p-1 z-50 hidden group-focus-within:block">
            {ORG_UNITS.map((u) => (
              <button
                key={u}
                onClick={() => toggleOrgUnit(u)}
                className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-muted transition-colors flex items-center gap-2"
              >
                <span
                  className="w-3.5 h-3.5 rounded border border-border shrink-0 flex items-center justify-center"
                  style={selectedOrgUnit.includes(u) ? { backgroundColor: "var(--primary)", borderColor: "var(--primary)" } : {}}
                >
                  {selectedOrgUnit.includes(u) && <span className="text-primary-foreground text-[8px]">✓</span>}
                </span>
                {u}
              </button>
            ))}
          </div>
        </div>

        {/* Clear filters */}
        {(selectedCompanies.length > 0 || selectedOrgType || selectedOrgUnit.length > 0) && (
          <button
            onClick={() => { setSelectedCompanies([]); setSelectedOrgType(""); setSelectedOrgUnit([]) }}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground bg-card border border-border hover:bg-muted transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}

        <div className="ml-auto flex items-center gap-1">
          <button
            onClick={() => setCurrentDate((d) => ({ year: d.year - 1 }))}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-xs font-semibold text-foreground px-2 py-1.5 bg-card border border-border rounded-lg min-w-[64px] text-center">
            {currentDate.year}
          </span>
          <button
            onClick={() => setCurrentDate((d) => ({ year: d.year + 1 }))}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
