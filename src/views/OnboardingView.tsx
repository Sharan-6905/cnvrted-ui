"use client";
import React, { useState } from "react"
import { Button } from "../components/ui/button"
import { Loader2 } from "lucide-react"
import { motion } from "framer-motion"

interface OnboardingViewProps {
  onComplete: () => void
}

const mockSignals = [
  { platform: "reddit",   color: "#FF4500", label: "Reddit",   text: "\"We need a performance marketing agency for our SaaS launch…\"", tag: "intent" },
  { platform: "funding",  color: "#34D399", label: "Funding",  text: "Midsummer Studios raises $2M seed round to scale product.", tag: "funding" },
  { platform: "linkedin", color: "#3B82F6", label: "LinkedIn", text: "DUIU just hired a new Head of Growth.", tag: "hire" },
  { platform: "hackernews", color: "#FF6600", label: "HN",     text: "\"Without breaking the bank — anyone know a good B2B agency?\"", tag: "intent" },
  { platform: "exa",      color: "#5DC8F0", label: "Exa",      text: "Work Optional announces rebrand + new HQ.", tag: "news" },
]

function SignalCard({ signal, delay }: { signal: typeof mockSignals[0]; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.4, ease: "easeOut" }}
      className="flex flex-col gap-1.5 p-3 rounded-lg border border-border bg-[#0F0F14]/80 backdrop-blur-sm relative overflow-hidden"
    >
      {/* Platform left bar */}
      <div className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-lg" style={{ background: signal.color }} />
      <div className="flex items-center gap-2 pl-1">
        <span
          className="text-[9px] font-mono font-bold uppercase tracking-widest px-1.5 py-0.5 rounded border"
          style={{ color: signal.color, borderColor: `${signal.color}30`, background: `${signal.color}0D` }}
        >
          {signal.label}
        </span>
        <span className="text-[9px] font-mono text-muted/50 uppercase tracking-widest">intercepted</span>
        <div className="flex-1" />
        <span
          className="text-[9px] font-mono px-1.5 py-0.5 rounded"
          style={{ color: signal.color, background: `${signal.color}12` }}
        >
          {signal.tag}
        </span>
      </div>
      <p className="text-[11px] text-ink/80 leading-relaxed pl-1 line-clamp-2">{signal.text}</p>
    </motion.div>
  )
}

export function OnboardingView({ onComplete }: OnboardingViewProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [icpGenerated, setIcpGenerated] = useState(false)

  const handleGenerate = () => {
    setIsGenerating(true)
    setTimeout(() => { setIsGenerating(false); setIcpGenerated(true) }, 2500)
  }

  return (
    <div className="w-full min-h-[calc(100vh-56px)] flex flex-col md:flex-row items-start justify-center max-w-5xl mx-auto gap-10 px-6 py-10">

      {/* ── Left: form ── */}
      <div className="flex-1 w-full max-w-[420px] space-y-6 pt-2">
        <div>
          <p className="text-[10px] font-mono uppercase tracking-[0.14em] text-muted mb-4">Profile setup</p>
          <h1 className="font-display leading-[1.05] tracking-tight text-ink" style={{ fontSize: "clamp(2.4rem, 4vw, 3.2rem)", fontWeight: 800 }}>
            Set up your
          </h1>
          <h1 className="font-serif-italic leading-[1.1] text-accent" style={{ fontSize: "clamp(2.4rem, 4vw, 3.2rem)" }}>
            ideal profile.
          </h1>
          <p className="text-sm text-muted leading-relaxed mt-4 max-w-sm">
            We'll read your site, build your ICP, and start intercepting buying signals across Reddit, LinkedIn, HN, and more.
          </p>
        </div>

        {!icpGenerated ? (
          <div className="space-y-3">
            {[
              { label: "Website URL", value: "https://yourcompany.com" },
              { label: "LinkedIn URL", value: "https://linkedin.com/company/yourcompany", optional: true },
            ].map(({ label, value, optional }) => (
              <div key={label} className="space-y-1">
                <label className="text-[10px] font-mono uppercase tracking-wider text-muted">
                  {label}{optional && <span className="normal-case ml-1 opacity-40">optional</span>}
                </label>
                <input
                  type="text"
                  defaultValue={value}
                  className="w-full h-10 px-3 rounded-md border border-border bg-surface text-sm text-ink focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent/60 transition-colors"
                />
              </div>
            ))}

            <div className="space-y-1">
              <label className="text-[10px] font-mono uppercase tracking-wider text-muted">What do you sell?</label>
              <textarea
                defaultValue="Performance marketing for B2B SaaS companies"
                rows={2}
                className="w-full p-3 rounded-md border border-border bg-surface text-sm text-ink resize-none focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent/60 transition-colors"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-mono uppercase tracking-wider text-muted">Who do you target?</label>
              <textarea
                defaultValue="Series A–C SaaS, 20–200 employees, scaling paid acquisition"
                rows={2}
                className="w-full p-3 rounded-md border border-border bg-surface text-sm text-ink resize-none focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent/60 transition-colors"
              />
            </div>

            <Button className="w-full h-11 font-semibold text-sm mt-2" onClick={handleGenerate} disabled={isGenerating}>
              {isGenerating ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Reading your site…</> : "Generate my ICP →"}
            </Button>
          </div>
        ) : (
          <motion.div className="space-y-4" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
            <div className="p-4 bg-surface rounded-lg border border-accent/20 space-y-3 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(93,200,240,0.07) 0%, transparent 70%)" }} />
              <p className="text-[10px] font-mono uppercase tracking-[0.1em] text-accent">ICP Generated</p>
              <div className="space-y-2.5 relative z-10">
                {[
                  { k: "Value Prop", v: "High-ROI performance marketing & paid acquisition for scaling B2B SaaS." },
                  { k: "Target Accounts", v: "Series A–C SaaS, $5M–$50M ARR, 20–200 employees." },
                ].map(({ k, v }) => (
                  <div key={k}>
                    <p className="text-[10px] font-mono uppercase tracking-wider text-muted mb-0.5">{k}</p>
                    <p className="text-sm text-ink leading-relaxed">{v}</p>
                  </div>
                ))}
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-wider text-muted mb-1.5">Buying Triggers</p>
                  <code className="block text-[11px] font-mono text-accent/80 bg-accent/5 border border-accent/10 p-2.5 rounded leading-relaxed">
                    [funding: &gt;$5M] OR [hire: Head of Growth] OR [intent: "paid social agency"]
                  </code>
                </div>
              </div>
            </div>
            <Button className="w-full h-11 font-semibold" onClick={onComplete}>
              Confirm & Start Listening →
            </Button>
          </motion.div>
        )}
      </div>

      {/* ── Right: live signal preview ── */}
      <div className="hidden md:flex flex-1 flex-col max-w-[380px] pt-2">
        <p className="text-[10px] font-mono uppercase tracking-[0.14em] text-muted mb-4">
          Live signals — right now
        </p>

        {/* Big gradient orb behind the cards */}
        <div className="relative rounded-xl border border-border bg-surface overflow-hidden p-4 space-y-2.5">
          {/* Orb */}
          <div className="absolute -top-12 -right-12 w-56 h-56 rounded-full pointer-events-none blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(93,200,240,0.1) 0%, rgba(100,50,200,0.07) 50%, transparent 70%)" }} />
          <div className="absolute -bottom-8 -left-8 w-40 h-40 rounded-full pointer-events-none blur-2xl"
            style={{ background: "radial-gradient(circle, rgba(52,211,153,0.06) 0%, transparent 70%)" }} />

          {mockSignals.map((signal, i) => (
            <SignalCard key={signal.platform} signal={signal} delay={0.2 + i * 0.15} />
          ))}

          {/* Ticker at bottom */}
          <div className="flex items-center gap-2 pt-1">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent" />
            </span>
            <span className="text-[10px] font-mono text-muted uppercase tracking-wider">
              Monitoring Reddit · LinkedIn · HN · Exa
            </span>
          </div>
        </div>
      </div>

    </div>
  )
}
