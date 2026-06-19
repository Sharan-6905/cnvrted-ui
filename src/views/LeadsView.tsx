import React from "react"
import { motion } from "framer-motion"
import { seedData } from "../data/seed"
import { PipelineTrace } from "../components/PipelineTrace"
import { Search, Filter, Activity } from "lucide-react"
import { Button } from "../components/ui/button"
import { IntelligenceCard } from "../components/IntelligenceCard"

interface LeadsViewProps {
  type: "company" | "intent"
  isScanning: boolean
  onAnimationComplete: () => void
}

export function LeadsView({ type, isScanning, onAnimationComplete }: LeadsViewProps) {
  const rawData = type === "company" ? seedData.companyLeads : seedData.intentLeads
  const showData = !isScanning

  return (
    <div className="w-full pb-12 relative z-10">
      <PipelineTrace isRunning={isScanning} onAnimationComplete={onAnimationComplete} />

      <div className="mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
            <input 
              type="text" 
              placeholder="Search intelligence..." 
              className="h-10 w-full rounded-md border border-white/10 bg-[#0F0F14]/50 backdrop-blur-sm pl-9 pr-3 text-sm focus:outline-none focus:ring-1 focus:ring-accent transition-all text-ink placeholder:text-muted"
              disabled={isScanning}
            />
          </div>
          <Button variant="outline" size="sm" className="h-10 gap-2 border-white/10 bg-[#0F0F14]/50 backdrop-blur-sm text-ink hover:bg-surface-raised" disabled={isScanning}>
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-accent/10 border border-accent/20 backdrop-blur-sm">
          <Activity className="h-4 w-4 text-accent" />
          <span className="text-xs font-mono text-accent uppercase tracking-wider tabular-nums">
            {showData ? `${rawData.length} intercepts active` : 'Scanning streams...'}
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {!showData ? (
          // Skeleton Cards
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="glass-panel rounded-xl h-32 animate-pulse bg-[#0F0F14]/40" />
          ))
        ) : rawData.length === 0 ? (
          <div className="glass-panel rounded-xl p-12 text-center flex flex-col items-center justify-center border-dashed border-white/10">
            <Activity className="h-8 w-8 text-muted mb-3 opacity-50" />
            <p className="text-muted text-sm">No signals intercepted. Adjust your filters or wait for the next scan.</p>
          </div>
        ) : (
          <motion.div 
            className="flex flex-col gap-4"
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.1 }
              }
            }}
          >
            {rawData.map((row) => (
              <IntelligenceCard key={row.id} data={row} type={type} />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}
