"use client";
import React from "react"
import { cn } from "../lib/utils"

interface ScoreChipProps {
  score: number | string
  threshold?: number
  isCut?: boolean
  className?: string
}

const RADIUS = 14
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

export function ScoreChip({ score, threshold = 0.68, isCut = false, className }: ScoreChipProps) {
  const getVariant = () => {
    if (isCut) return "cut"
    if (typeof score !== "number") return "mid"
    if (score >= 0.75) return "high"
    if (score >= threshold) return "mid"
    return "low"
  }

  const variant = getVariant()
  const numericScore = typeof score === "number" ? score : 0.5

  const colorMap = {
    high: { stroke: "#34D399", text: "#34D399", bg: "rgba(52,211,153,0.08)" },
    mid:  { stroke: "#F59E0B", text: "#F59E0B", bg: "rgba(245,158,11,0.08)" },
    low:  { stroke: "#4B5563", text: "#9CA3AF", bg: "rgba(75,85,99,0.08)" },
    cut:  { stroke: "#F87171", text: "#F87171", bg: "rgba(248,113,113,0.08)" },
  }

  const { stroke, text, bg } = colorMap[variant]
  const dashoffset = CIRCUMFERENCE * (1 - numericScore)

  return (
    <div className={cn("inline-flex items-center gap-2", className)}>
      {/* Arc ring */}
      <div className="relative flex items-center justify-center" style={{ width: 36, height: 36 }}>
        <svg width="36" height="36" style={{ transform: "rotate(-90deg)" }}>
          {/* Track */}
          <circle
            cx="18" cy="18" r={RADIUS}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="2.5"
          />
          {/* Progress */}
          <circle
            cx="18" cy="18" r={RADIUS}
            fill="none"
            stroke={stroke}
            strokeWidth="2.5"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={dashoffset}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 0.6s ease" }}
          />
        </svg>
        <span
          className="absolute font-mono tabular-nums"
          style={{ fontSize: 9, fontWeight: 600, color: text, lineHeight: 1 }}
        >
          {typeof score === "number" ? score.toFixed(2).replace("0.", ".") : score}
        </span>
      </div>
    </div>
  )
}
