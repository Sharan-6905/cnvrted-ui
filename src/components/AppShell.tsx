"use client";
import React, { useState } from "react"
import { LayoutDashboard, Target, Users, ListFilter, Settings, Activity, Loader2, Menu } from "lucide-react"
import { cn } from "../lib/utils"
import { Button } from "./ui/button"

export type ViewType = "onboarding" | "company" | "intent" | "target" | "competitors" | "funnel"

interface AppShellProps {
  currentView: ViewType
  onViewChange: (view: ViewType) => void
  isScanning: boolean
  onRunScan: () => void
  lastScanTime: string
  children: React.ReactNode
}

// Infinity-loop mark approximating the Cnvrted logo
function CnvrtedMark({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M14 12C14 8.686 11.314 6 8 6C4.686 6 2 8.686 2 12C2 15.314 4.686 18 8 18C10.4 18 12.48 16.64 13.52 14.64L20 12L26.48 9.36C27.52 7.36 29.6 6 32 6C35.314 6 38 8.686 38 12C38 15.314 35.314 18 32 18C29.6 18 27.52 16.64 26.48 14.64L20 12L13.52 9.36C12.48 7.36 10.4 6 8 6"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-accent"
      />
    </svg>
  )
}

export function AppShell({ currentView, onViewChange, isScanning, onRunScan, lastScanTime, children }: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const navItems = [
    { id: "company", label: "Company Leads", icon: LayoutDashboard, count: 13 },
    { id: "intent", label: "Intent Leads", icon: Activity, count: 4 },
    { id: "target", label: "Target List", icon: Target, count: 55 },
    { id: "competitors", label: "Competitors", icon: Users, count: 11 },
  ] as const

  const getTitle = () => {
    if (isScanning || currentView === "funnel") return "Pipeline Trace"
    if (currentView === "onboarding") return "ICP Configuration"
    return navItems.find((n) => n.id === currentView)?.label || ""
  }

  return (
    <div className="flex h-screen w-full bg-canvas overflow-hidden">
      {/* Sidebar */}
      <aside
        className={cn(
          "flex flex-col border-r border-border bg-surface transition-all duration-300 ease-in-out h-full z-20 flex-shrink-0",
          sidebarOpen ? "w-[232px]" : "w-[56px]"
        )}
      >
        {/* Logo */}
        <div className="h-14 flex items-center px-4 border-b border-border shrink-0">
          <div className="flex items-center gap-2.5 overflow-hidden min-w-0">
            <CnvrtedMark size={28} />
            {sidebarOpen && (
              <span className="font-display font-800 text-base tracking-tight text-ink whitespace-nowrap" style={{ fontWeight: 800 }}>
                CNVRTED
              </span>
            )}
          </div>
        </div>

        {/* Workspace pill */}
        {sidebarOpen && (
          <div className="px-3 py-3 shrink-0">
            <div className="flex items-center justify-between px-2.5 py-1.5 rounded-md bg-surface-raised border border-border text-xs text-muted hover:text-ink cursor-pointer transition-colors">
              <span className="truncate">Banao Studios</span>
              <span className="ml-1 opacity-50 shrink-0">▾</span>
            </div>
          </div>
        )}

        {/* Nav */}
        <nav className="flex-1 px-2 space-y-0.5 overflow-y-auto py-2">
          {navItems.map((item) => {
            const active = currentView === item.id || (isScanning && item.id === "company")
            return (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={cn(
                  "w-full flex items-center gap-2.5 px-2.5 py-2 text-sm rounded-md transition-all duration-150 relative group",
                  active
                    ? "text-ink bg-surface-raised"
                    : "text-muted hover:text-ink hover:bg-surface-raised/60"
                )}
              >
                {active && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-accent rounded-r-full" />
                )}
                <item.icon className={cn("h-4 w-4 shrink-0", active ? "text-accent" : "text-muted group-hover:text-ink")} />
                {sidebarOpen && (
                  <>
                    <span className="flex-1 text-left font-medium text-[13px]">{item.label}</span>
                    {item.count > 0 && (
                      <span className={cn(
                        "tabular-nums text-[10px] px-1.5 py-0.5 rounded font-mono",
                        active ? "bg-accent/10 text-accent" : "bg-border text-muted"
                      )}>
                        {item.count}
                      </span>
                    )}
                  </>
                )}
              </button>
            )
          })}

          {sidebarOpen && <div className="my-3 border-t border-border mx-1" />}

          <button
            onClick={() => onViewChange("onboarding")}
            className={cn(
              "w-full flex items-center gap-2.5 px-2.5 py-2 text-sm rounded-md transition-all duration-150",
              currentView === "onboarding"
                ? "text-ink bg-surface-raised"
                : "text-muted hover:text-ink hover:bg-surface-raised/60"
            )}
          >
            <ListFilter className={cn("h-4 w-4 shrink-0", currentView === "onboarding" ? "text-accent" : "text-muted")} />
            {sidebarOpen && <span className="font-medium text-[13px]">ICP Config</span>}
          </button>
        </nav>

        {/* Bottom */}
        <div className="p-2 border-t border-border shrink-0">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-full flex items-center gap-2.5 px-2.5 py-2 text-muted hover:text-ink hover:bg-surface-raised/60 rounded-md transition-colors text-sm"
          >
            <Menu className="h-4 w-4 shrink-0" />
            {sidebarOpen && <span className="font-medium text-[13px]">Collapse</span>}
          </button>
          <button className="w-full flex items-center gap-2.5 px-2.5 py-2 text-muted hover:text-ink hover:bg-surface-raised/60 rounded-md transition-colors text-sm">
            <Settings className="h-4 w-4 shrink-0" />
            {sidebarOpen && <span className="font-medium text-[13px]">Settings</span>}
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Top bar */}
        <header className="h-14 bg-surface border-b border-border flex items-center justify-between px-5 shrink-0 z-10">
          <div className="flex items-center gap-4">
            <h1 className="font-display font-bold text-base tracking-tight text-ink" style={{ fontWeight: 700 }}>
              {getTitle()}
            </h1>
            {!isScanning && currentView !== "onboarding" && (
              <div className="hidden sm:flex items-center gap-2 text-[11px] font-mono bg-surface-raised px-2.5 py-1 rounded-full border border-border">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-60" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent" />
                </span>
                <span className="text-muted uppercase tracking-wider">Last scan {lastScanTime}</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="hidden sm:flex text-muted hover:text-ink text-xs">
              Export CSV
            </Button>
            <Button
              onClick={onRunScan}
              disabled={isScanning || currentView === "onboarding"}
              size="sm"
              className={cn(isScanning && "w-32 justify-center")}
            >
              {isScanning ? (
                <>
                  <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />
                  Running…
                </>
              ) : (
                "Run Now"
              )}
            </Button>
          </div>
        </header>

        {/* Scrollable workspace */}
        <div className="flex-1 overflow-auto bg-canvas p-5 sm:p-6 relative intent-radar-bg">
          <div className="relative z-10 h-full w-full">
            {children}
          </div>
        </div>
      </main>
    </div>
  )
}
