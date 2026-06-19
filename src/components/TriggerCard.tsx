import React, { useState } from "react"
import { ArrowUpRight } from "lucide-react"
import { cn } from "../lib/utils"

interface TriggerCardProps {
  quote: string
  platform: "reddit" | "linkedin" | "hackernews" | "x" | "exa" | string
  link?: string
}

const platformConfig: Record<string, { color: string; label: string }> = {
  reddit:       { color: "#FF4500", label: "Reddit" },
  linkedin:     { color: "#3B82F6", label: "LinkedIn" },
  hackernews:   { color: "#FF6600", label: "HN" },
  x:            { color: "#9CA3AF", label: "X" },
  exa:          { color: "#5DC8F0", label: "Exa" },
  buyer_intent: { color: "#5DC8F0", label: "Intent" },
  news:         { color: "#6B7280", label: "News" },
  funding:      { color: "#34D399", label: "Funding" },
  watchlist:    { color: "#6B7280", label: "Watchlist" },
}

export function TriggerCard({ quote, platform, link = "#" }: TriggerCardProps) {
  const [expanded, setExpanded] = useState(false)
  const config = platformConfig[platform] || { color: "#64647A", label: platform.replace("_", " ") }

  const emphasizedQuote = quote.replace(
    /(destroying me|insane rates|without breaking the bank|frantic affair|killer launch video)/gi,
    `<span style="background:rgba(93,200,240,0.12);color:#5DC8F0;padding:0 4px;border-radius:3px;font-weight:500">$&</span>`
  )

  return (
    <div className="flex flex-col gap-2.5 p-3 rounded-md border border-border bg-surface-raised relative overflow-hidden group">
      {/* Left accent bar colored by platform */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-md"
        style={{ background: config.color }}
      />

      <div className="flex items-center gap-2 pl-2">
        <span
          className="inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-mono font-semibold uppercase tracking-wider border"
          style={{
            color: config.color,
            borderColor: `${config.color}30`,
            background: `${config.color}08`,
          }}
        >
          {config.label}
        </span>
        <span className="text-[10px] font-mono text-muted/40">•</span>
        <span className="text-[10px] font-mono text-muted/50 uppercase tracking-widest">intercepted</span>
        <div className="flex-1" />
        <a
          href={link}
          className="inline-flex items-center text-[10px] font-mono text-muted hover:text-accent transition-colors"
          onClick={(e) => e.stopPropagation()}
        >
          Source <ArrowUpRight className="ml-0.5 h-3 w-3" />
        </a>
      </div>

      <div className="relative pl-2">
        <blockquote
          className={cn(
            "text-[13px] leading-relaxed text-ink/90 font-normal max-w-lg",
            !expanded && "line-clamp-3"
          )}
          dangerouslySetInnerHTML={{ __html: emphasizedQuote }}
        />
        {quote.length > 120 && (
          <button
            onClick={(e) => { e.stopPropagation(); setExpanded(!expanded) }}
            className="text-[10px] font-mono text-accent hover:underline mt-1.5 focus:outline-none uppercase tracking-wider"
          >
            {expanded ? "[show less]" : "[read full]"}
          </button>
        )}
      </div>
    </div>
  )
}
