import React from 'react';
import { Send, Users, MailOpen, MousePointerClick, Calendar, Activity, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const MOCK_CAMPAIGNS = [
  { id: 1, name: "Founder Intent Campaign", status: "active", sent: 142, openRate: 68, clickRate: 24, meetings: 4 },
  { id: 2, name: "Enterprise SaaS Leads Q3", status: "active", sent: 89, openRate: 55, clickRate: 18, meetings: 1 },
  { id: 3, name: "Game Studios Funding Event", status: "paused", sent: 45, openRate: 72, clickRate: 31, meetings: 3 },
  { id: 4, name: "Competitor Switch Target", status: "draft", sent: 0, openRate: 0, clickRate: 0, meetings: 0 },
];

const MOCK_ACTIVITIES = [
  { id: 1, type: "open", text: "Michele Fisher opened 'Scaling Rezolve Ai'", time: "2m ago" },
  { id: 2, type: "click", text: "Rand Fishkin clicked link in 'Video Agency Intro'", time: "15m ago" },
  { id: 3, type: "meeting", text: "Meeting booked with VP Marketing at Midsummer Studios", time: "1h ago" },
  { id: 4, type: "sent", text: "Email delivered to 45 targets in Founder Intent Campaign", time: "2h ago" },
  { id: 5, type: "open", text: "CEO at Work Optional opened your email", time: "3h ago" },
];

export const OutreachWorkspace: React.FC = () => {
  return (
    <div className="flex-1 h-full bg-canvas overflow-hidden flex flex-col relative">
      <div className="px-8 py-6 border-b border-border bg-canvas shrink-0 flex items-center justify-between z-10">
        <div>
          <h2 className="font-serif font-medium text-2xl text-ink">Automated Outreach</h2>
          <p className="font-sans text-sm text-muted mt-1">Multi-channel AI sequences and telemetry.</p>
        </div>
        <button className="px-5 py-2.5 rounded-lg bg-blue-600 text-white font-sans font-medium hover:bg-blue-700 transition-colors shadow-sm flex items-center gap-2">
          <Plus className="w-4 h-4" /> New Sequence
        </button>
      </div>

      <div className="flex-1 flex flex-row overflow-hidden">
        {/* Left Panel: Campaigns */}
        <div className="w-1/2 h-full overflow-y-auto border-r border-border p-8 bg-surface/30">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-sans font-semibold text-ink">Active Sequences</h3>
            <span className="text-xs font-mono text-muted bg-black/5 px-2 py-1 rounded">4 Campaigns</span>
          </div>
          
          <div className="space-y-4">
            {MOCK_CAMPAIGNS.map((campaign, i) => (
              <motion.div 
                key={campaign.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-panel p-5 rounded-xl cursor-pointer hover:border-brand-primary/30 transition-colors group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${campaign.status === 'active' ? 'bg-[#00A63E]' : campaign.status === 'paused' ? 'bg-amber-500' : 'bg-muted'}`} />
                    <h4 className="font-sans font-medium text-ink text-base">{campaign.name}</h4>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted group-hover:text-brand-primary transition-colors" />
                </div>
                
                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <div className="text-[10px] font-mono text-muted uppercase tracking-wider mb-1">Sent</div>
                    <div className="font-sans font-medium text-ink">{campaign.sent}</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-muted uppercase tracking-wider mb-1">Open Rate</div>
                    <div className="font-sans font-medium text-ink">{campaign.openRate}%</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-muted uppercase tracking-wider mb-1">Click Rate</div>
                    <div className="font-sans font-medium text-ink">{campaign.clickRate}%</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-muted uppercase tracking-wider mb-1">Meetings</div>
                    <div className="font-sans font-medium text-ink">{campaign.meetings}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Panel: Live Telemetry */}
        <div className="w-1/2 h-full overflow-y-auto p-8 bg-canvas">
          <div className="flex items-center gap-2 mb-8">
            <Activity className="w-4 h-4 text-blue-600" />
            <h3 className="font-sans font-semibold text-ink">Live Telemetry</h3>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-10">
            <div className="glass-panel p-5 rounded-xl border border-blue-600/20 bg-blue-50/30">
              <div className="flex items-center gap-2 text-blue-600 mb-2">
                <MailOpen className="w-4 h-4" />
                <span className="font-mono text-xs uppercase tracking-wider font-semibold">Global Open Rate</span>
              </div>
              <div className="text-4xl font-serif text-ink mb-2">64.2%</div>
              <div className="h-1.5 w-full bg-blue-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 w-[64.2%]" />
              </div>
            </div>
            
            <div className="glass-panel p-5 rounded-xl border border-brand-primary/20 bg-brand-primary/5">
              <div className="flex items-center gap-2 text-brand-primary mb-2">
                <Calendar className="w-4 h-4" />
                <span className="font-mono text-xs uppercase tracking-wider font-semibold">Meetings Booked</span>
              </div>
              <div className="text-4xl font-serif text-ink mb-2">8</div>
              <p className="text-xs font-sans text-muted">Across all active sequences</p>
            </div>
          </div>

          <div>
            <h3 className="font-sans font-medium text-sm text-muted mb-4 uppercase tracking-wider">Activity Feed</h3>
            <div className="relative border-l border-border ml-3 space-y-6 pb-4">
              {MOCK_ACTIVITIES.map((activity, i) => (
                <motion.div 
                  key={activity.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + (i * 0.1) }}
                  className="relative pl-6"
                >
                  <div className={`absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full border-2 border-canvas ${
                    activity.type === 'open' ? 'bg-blue-500' :
                    activity.type === 'click' ? 'bg-purple-500' :
                    activity.type === 'meeting' ? 'bg-[#00A63E]' : 'bg-muted'
                  }`} />
                  <div className="font-sans text-sm text-ink mb-0.5">{activity.text}</div>
                  <div className="font-mono text-xs text-muted">{activity.time}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Required import missing above
import { Plus } from 'lucide-react';
