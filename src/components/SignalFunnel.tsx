"use client";
import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { seedData } from "../data/seed"
import { cn } from "../lib/utils"

interface SignalFunnelProps {
  isRunning: boolean
  onComplete?: () => void
}

function CountUp({ to, duration = 1, isRunning }: { to: number; duration?: number; isRunning: boolean }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isRunning) { setCount(0); return }
    let startTime: number
    let animationFrame: number

    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = timestamp - startTime
      if (progress < duration * 1000) {
        setCount(Math.floor((progress / (duration * 1000)) * to))
        animationFrame = requestAnimationFrame(updateCount)
      } else {
        setCount(to)
      }
    }
    animationFrame = requestAnimationFrame(updateCount)
    return () => cancelAnimationFrame(animationFrame)
  }, [to, duration, isRunning])

  return <span>{isRunning ? count : to}</span>
}

const sourceColors: Record<string, string> = {
  Reddit: "#FF4500",
  X: "#9CA3AF",
  LinkedIn: "#3B82F6",
  HackerNews: "#FF6600",
  Exa: "#5DC8F0",
}

export function SignalFunnel({ isRunning, onComplete }: SignalFunnelProps) {
  const stages = seedData.pipeline.stages

  useEffect(() => {
    if (isRunning) {
      const timer = setTimeout(() => onComplete?.(), 3000)
      return () => clearTimeout(timer)
    }
  }, [isRunning, onComplete])

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Source badges */}
      <div className="flex flex-col items-center mb-6 gap-2">
        <div className="flex gap-2 flex-wrap justify-center">
          {["Reddit", "X", "LinkedIn", "HackerNews", "Exa"].map((source, i) => (
            <motion.span
              key={source}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-mono border border-border"
              style={{ color: sourceColors[source], borderColor: `${sourceColors[source]}30` }}
            >
              <span className="h-1 w-1 rounded-full" style={{ background: sourceColors[source] }} />
              {source}
            </motion.span>
          ))}
        </div>
        <motion.div
          className="h-6 border-l border-dashed border-border"
          initial={{ height: 0 }}
          animate={{ height: 24 }}
          transition={{ duration: 0.4 }}
        />
      </div>

      {/* Stages */}
      <div className="space-y-2">
        {stages.map((stage, i) => {
          const inCount = stage.in || stage.raw_signals || stage.total || stage.total_articles || stage.harvested || stage.articles || stage.watchlist_built || 0
          const outCount = stage.out || stage.kept || stage.passed || stage.unique_companies || stage.scored || stage.dropped_clients_or_invalid || stage.queued || stage.signals_queued || 0
          const isFinal = stage.name.includes("Final judge")
          const ratio = Math.max(0.05, (outCount / (inCount || 1)))

          return (
            <motion.div
              key={stage.name}
              className={cn(
                "relative rounded-lg border px-4 py-3 flex items-center justify-between",
                isFinal
                  ? "border-accent/30 bg-accent/5"
                  : "border-border bg-surface"
              )}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.12, duration: 0.35 }}
            >
              <div className="flex items-center gap-3">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-border text-[10px] font-mono text-muted shrink-0">
                  {i + 1}
                </span>
                <div>
                  <h4 className={cn("text-[13px] font-medium", isFinal ? "text-accent" : "text-ink")}>
                    {stage.name}
                  </h4>
                  <div className="flex gap-3 text-[10px] font-mono text-muted mt-0.5 uppercase tracking-wider flex-wrap">
                    {Object.entries(stage).map(([key, value]) => {
                      if (key === "name" || typeof value === "object") return null
                      return (
                        <span key={key}>
                          {key.replace(/_/g, " ")}:{" "}
                          <CountUp to={Number(value)} isRunning={isRunning} duration={1.5} />
                        </span>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Funnel bar */}
              <div className="hidden sm:block w-24 h-1.5 rounded-full bg-border overflow-hidden shrink-0">
                <motion.div
                  className={cn("h-full rounded-full", isFinal ? "bg-accent" : "bg-muted")}
                  initial={{ width: "100%" }}
                  animate={{ width: `${ratio * 100}%` }}
                  transition={{ delay: 0.8 + i * 0.12, duration: 0.7, ease: "easeOut" }}
                />
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
