"use client";
import React from "react"
import { Banknote, Newspaper, Radar, Eye } from "lucide-react"
import { cn } from "../lib/utils"

interface SignalTypeChipProps {
  type: "funding" | "news" | "intent" | "watchlist"
  subtype?: string | null
}

const config = {
  funding:   { icon: Banknote,  color: "#34D399", bg: "rgba(52,211,153,0.08)",  border: "rgba(52,211,153,0.2)"  },
  news:      { icon: Newspaper, color: "#9CA3AF", bg: "rgba(156,163,175,0.06)", border: "rgba(156,163,175,0.15)" },
  intent:    { icon: Radar,     color: "#5DC8F0", bg: "rgba(93,200,240,0.08)",  border: "rgba(93,200,240,0.2)"  },
  watchlist: { icon: Eye,       color: "#9CA3AF", bg: "rgba(156,163,175,0.06)", border: "rgba(156,163,175,0.15)" },
}

export function SignalTypeChip({ type, subtype }: SignalTypeChipProps) {
  const { icon: Icon, color, bg, border } = config[type] || config.news

  return (
    <span
      className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium border"
      style={{ color, background: bg, borderColor: border }}
    >
      <Icon className="h-3 w-3 shrink-0" />
      <span className="capitalize">{type}</span>
      {subtype && (
        <span className="font-mono opacity-60 lowercase">· {subtype}</span>
      )}
    </span>
  )
}
