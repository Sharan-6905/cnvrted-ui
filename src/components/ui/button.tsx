"use client";
import * as React from "react"
import { cn } from "../../lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "ghost" | "outline" | "link"
  size?: "default" | "sm" | "lg" | "icon"
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent disabled:pointer-events-none disabled:opacity-40",
          {
            "bg-accent text-[#09090C] hover:bg-accent/90 shadow-sm font-semibold": variant === "default",
            "bg-surface-raised text-ink border border-border hover:border-accent/40 hover:text-ink": variant === "secondary",
            "border border-border bg-transparent text-ink hover:bg-surface-raised hover:border-border/80": variant === "outline",
            "hover:bg-surface-raised text-muted hover:text-ink": variant === "ghost",
            "text-accent underline-offset-4 hover:underline": variant === "link",
            "h-9 px-4 py-2 text-sm": size === "default",
            "h-8 rounded-md px-3 text-xs": size === "sm",
            "h-11 rounded-md px-8 text-sm": size === "lg",
            "h-9 w-9": size === "icon",
          },
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"
