import React from 'react';
import { Database, ArrowRightLeft, CheckCircle2, AlertCircle, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const MOCK_SYNC_DATA = Array.from({ length: 15 }).map((_, i) => ({
  id: i + 1,
  company: i === 0 ? "Snackbar Studio" : i === 1 ? "Rezolve Ai" : "Midsummer Studios",
  contact: i === 0 ? "rand@snackbar.com" : i === 1 ? "michele@rezolve.ai" : "hello@midsummer.com",
  status: i % 5 === 0 ? "failed" : i % 3 === 0 ? "pending" : "synced",
  targetCrm: "Salesforce",
  time: `${Math.floor(Math.random() * 59)}m ago`,
  owner: "Sharan"
}));

export const CrmWorkspace: React.FC = () => {
  return (
    <div className="flex-1 h-full bg-canvas overflow-y-auto px-8 py-8 relative">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header & High-level Metrics */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-serif font-medium text-2xl text-ink">CRM Integration</h2>
              <p className="font-sans text-sm text-muted mt-1">Live bidirectional sync with Salesforce.</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-2 text-xs font-mono text-accent bg-accent/10 px-3 py-1.5 rounded-md border border-accent/20">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                </span>
                SYNC ACTIVE
              </span>
              <button className="px-4 py-2 rounded-lg bg-surface border border-border text-ink font-sans text-sm hover:bg-black/5 transition-colors shadow-sm font-medium">
                Configure Mapping
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Metric 1 */}
            <div className="glass-panel p-5 rounded-xl flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-wider text-muted">Total Synced</span>
                <Database className="w-4 h-4 text-brand-primary" />
              </div>
              <div className="text-3xl font-serif text-ink">1,492</div>
              <div className="h-1.5 w-full bg-black/5 rounded-full overflow-hidden">
                <div className="h-full bg-brand-primary w-[85%]" />
              </div>
            </div>
            {/* Metric 2 */}
            <div className="glass-panel p-5 rounded-xl flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-wider text-muted">Pending Queue</span>
                <Clock className="w-4 h-4 text-amber-500" />
              </div>
              <div className="text-3xl font-serif text-ink">34</div>
              <div className="h-1.5 w-full bg-black/5 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 w-[15%]" />
              </div>
            </div>
            {/* Metric 3 */}
            <div className="glass-panel p-5 rounded-xl flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-wider text-muted">Sync Errors</span>
                <AlertCircle className="w-4 h-4 text-red-500" />
              </div>
              <div className="text-3xl font-serif text-ink">3</div>
              <div className="h-1.5 w-full bg-black/5 rounded-full overflow-hidden">
                <div className="h-full bg-red-500 w-[2%]" />
              </div>
            </div>
          </div>
        </div>

        {/* Live Sync Log */}
        <div className="glass-panel rounded-xl overflow-hidden flex flex-col">
          <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-black/[0.02]">
            <h3 className="font-sans font-semibold text-sm text-ink flex items-center gap-2">
              <ArrowRightLeft className="w-4 h-4 text-muted" />
              Recent Sync Activity
            </h3>
            <button className="text-xs font-sans text-brand-primary hover:underline">View All Logs</button>
          </div>
          
          <div className="divide-y divide-border">
            <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-black/[0.01]">
              <div className="col-span-3 text-xs font-mono font-semibold text-muted uppercase tracking-wider">Company</div>
              <div className="col-span-3 text-xs font-mono font-semibold text-muted uppercase tracking-wider">Primary Contact</div>
              <div className="col-span-2 text-xs font-mono font-semibold text-muted uppercase tracking-wider">Target</div>
              <div className="col-span-2 text-xs font-mono font-semibold text-muted uppercase tracking-wider">Status</div>
              <div className="col-span-2 text-xs font-mono font-semibold text-muted uppercase tracking-wider text-right">Time</div>
            </div>

            {MOCK_SYNC_DATA.map((row, i) => (
              <motion.div 
                key={row.id}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="grid grid-cols-12 gap-4 px-6 py-3 items-center hover:bg-black/[0.02] transition-colors text-sm font-sans"
              >
                <div className="col-span-3 font-medium text-ink truncate">{row.company}</div>
                <div className="col-span-3 text-muted truncate">{row.contact}</div>
                <div className="col-span-2 text-ink flex items-center gap-1.5">
                  <div className="w-4 h-4 bg-blue-500 rounded-sm flex items-center justify-center text-[8px] text-white font-bold">SF</div>
                  {row.targetCrm}
                </div>
                <div className="col-span-2">
                  {row.status === 'synced' && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-[#00A63E]/10 text-[#00A63E]">
                      <CheckCircle2 className="w-3 h-3" /> Synced
                    </span>
                  )}
                  {row.status === 'pending' && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-amber-500/10 text-amber-600">
                      <Clock className="w-3 h-3" /> Pending
                    </span>
                  )}
                  {row.status === 'failed' && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-red-500/10 text-red-600">
                      <AlertCircle className="w-3 h-3" /> Failed
                    </span>
                  )}
                </div>
                <div className="col-span-2 text-right text-muted text-xs font-mono">{row.time}</div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
