"use client";
import * as React from "react"
import { cn } from "../../lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "outline" | "secondary" | "destructive"
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium transition-colors tabular-nums border",
        {
          "bg-accent text-[#09090C] border-transparent": variant === "default",
          "bg-surface-raised border-border text-ink": variant === "secondary",
          "bg-cut/10 text-cut border-cut/20": variant === "destructive",
          "border-border bg-transparent text-muted": variant === "outline",
        },
        className
      )}
      {...props}
    />
  )
}
