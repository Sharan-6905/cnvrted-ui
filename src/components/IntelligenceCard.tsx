import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { BrainCircuit, ChevronDown, MessageSquare, Target } from "lucide-react"
import { ScoreChip } from "./ScoreChip"
import { SignalTypeChip } from "./SignalTypeChip"
import { TriggerCard } from "./TriggerCard"
import { cn } from "../lib/utils"

export interface IntelligenceCardProps {
  data: any
  type: "company" | "intent"
}

export function IntelligenceCard({ data, type }: IntelligenceCardProps) {
  const [expanded, setExpanded] = useState(false)
  const isCompany = type === "company"

  const triggerData = isCompany ? data.trigger : data.intent
  const platform = data.platform || data.source

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      className={cn(
        "glass-panel glow-border rounded-xl overflow-hidden transition-all duration-300",
        expanded ? "bg-[#0F0F14]/80 shadow-soft" : "hover:bg-[#0F0F14]/70"
      )}
    >
      <div 
        className="p-5 cursor-pointer flex flex-col md:flex-row md:items-start gap-4 md:gap-6"
        onClick={() => setExpanded(!expanded)}
      >
        {/* Left Col: Identity & Metrics */}
        <div className="flex-shrink-0 w-full md:w-64 space-y-3">
          <div>
            <h3 className="font-display font-semibold text-lg text-ink flex items-center gap-2">
              {data.company || (
                <span className="text-muted italic flex items-center gap-1.5 text-base">
                  <MessageSquare className="h-4 w-4" /> Individual
                </span>
              )}
            </h3>
            <div className="flex items-center gap-2 mt-1.5">
              <SignalTypeChip type={data.type as any} subtype={data.subtype} />
            </div>
          </div>
          
          <div className="flex items-center gap-3 pt-2">
            <ScoreChip score={data.score} />
            {isCompany && data.match && (
              <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-canvas border border-border">
                <Target className="h-3.5 w-3.5 text-accent" />
                <span className="text-xs font-mono tabular-nums text-muted">
                  {(data.match * 100).toFixed(0)}% MATCH
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Mid Col: Evidence Trigger */}
        <div className="flex-1 min-w-0" onClick={(e) => e.stopPropagation()}>
          <div className="mb-2 flex items-center gap-2">
            <div className="h-px flex-1 bg-gradient-to-r from-accent/20 to-transparent" />
            <span className="text-[10px] font-mono text-accent uppercase tracking-widest">Intercepted Evidence</span>
          </div>
          <TriggerCard quote={triggerData} platform={platform} />
        </div>

        {/* Right Col: Expand toggle */}
        <div className="hidden md:flex flex-shrink-0 items-center justify-center pt-2">
          <motion.div animate={{ rotate: expanded ? 180 : 0 }}>
            <ChevronDown className="h-5 w-5 text-muted hover:text-ink transition-colors" />
          </motion.div>
        </div>
      </div>

      {/* Expanded Reasoning Section */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-white/5 bg-[#09090C]/50"
          >
            <div className="p-5 flex flex-col md:flex-row gap-6">
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-2 text-accent">
                  <BrainCircuit className="h-4 w-4" />
                  <h4 className="text-xs font-mono uppercase tracking-wider">Agent Reasoning</h4>
                </div>
                <p className="text-sm text-ink/90 leading-relaxed font-sans bg-[#0F0F14]/50 p-4 rounded-lg border border-border/50">
                  {data.why}
                </p>
              </div>
              
              <div className="w-full md:w-48 space-y-2 flex flex-col justify-end">
                <button className="w-full py-2 px-3 rounded-md bg-accent text-canvas font-medium text-sm hover:bg-accent/90 transition-colors">
                  Push to CRM
                </button>
                <button className="w-full py-2 px-3 rounded-md bg-surface-raised border border-border text-ink text-sm hover:bg-border transition-colors">
                  Discard Lead
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
