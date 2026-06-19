"use client";
import React, { useState } from "react"
import { ChevronDown, ChevronRight, Activity } from "lucide-react"
import { SignalFunnel } from "./SignalFunnel"
import { Badge } from "./ui/badge"

interface PipelineTraceProps {
  isRunning: boolean
  onAnimationComplete: () => void
}

export function PipelineTrace({ isRunning, onAnimationComplete }: PipelineTraceProps) {
  const [expanded, setExpanded] = useState(false)
  const isExpanded = expanded || isRunning

  return (
    <div className="mb-6 glass-panel glow-border rounded-xl overflow-hidden">
      <div
        className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-surface-raised/40 transition-colors"
        onClick={() => !isRunning && setExpanded(!expanded)}
      >
        <div className="flex items-center gap-3">
          {isExpanded
            ? <ChevronDown className="h-3.5 w-3.5 text-muted" />
            : <ChevronRight className="h-3.5 w-3.5 text-muted" />
          }
          <div className="flex items-center gap-2">
            <Activity className="h-3.5 w-3.5 text-accent" />
            <h3 className="font-medium text-sm text-ink">Pipeline Trace</h3>
          </div>

          {!isExpanded && (
            <div className="hidden sm:flex items-center gap-2 ml-2">
              <Badge variant="outline" className="text-[10px] font-mono">200 signals</Badge>
              <span className="text-border">·</span>
              <Badge variant="outline" className="text-[10px] font-mono">11 stages</Badge>
              <span className="text-border">·</span>
              <Badge className="text-[10px] font-mono" style={{ background: "rgba(52,211,153,0.12)", color: "#34D399", borderColor: "rgba(52,211,153,0.2)" } as React.CSSProperties}>
                13 qualified
              </Badge>
            </div>
          )}
        </div>

        {!isRunning && (
          <span className="text-[11px] font-mono text-muted hover:text-ink transition-colors uppercase tracking-wider">
            {isExpanded ? "Collapse" : "View trace"}
          </span>
        )}
      </div>

      {isExpanded && (
        <div className="border-t border-border px-4 py-6 bg-canvas/50">
          <SignalFunnel isRunning={isRunning} onComplete={onAnimationComplete} />
        </div>
      )}
    </div>
  )
}
