"use client";
import React, { useState } from 'react';
import { TopNavigation } from './TopNavigation';
import { CopilotPanel } from './CopilotPanel';
import { LeadWorkspace } from './LeadWorkspace';
import { CrmWorkspace } from './CrmWorkspace';
import { OutreachWorkspace } from './OutreachWorkspace';
import { Settings, HelpCircle, FileText, Plus } from 'lucide-react';

export const Layout: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'chat' | 'crm' | 'outreach'>('chat');

  return (
    <div className="flex flex-col h-screen w-full bg-canvas overflow-hidden">
      <TopNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      {activeTab === 'chat' && (
        <>
          {/* Spreadsheet Controls */}
          <div className="flex items-center justify-between px-8 py-4 border-b border-border bg-canvas shrink-0 relative z-10">
            <div className="flex items-center gap-4">
              <h2 className="font-sans font-semibold text-lg text-ink tracking-tight-ui">My First Spreadsheet</h2>
              <button className="px-3 py-1.5 rounded-md border border-dashed border-border text-sm font-sans text-muted hover:text-ink hover:border-ink/30 transition-all">
                Add tags
              </button>
            </div>
            <div className="flex items-center gap-5">
              <button className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-sm">
                Upgrade your plan
              </button>
              <div className="w-px h-4 bg-border" />
              <div className="flex items-center gap-4 text-muted">
                <button className="hover:text-ink transition-colors p-1"><FileText className="w-4 h-4" /></button>
                <button className="hover:text-ink transition-colors p-1"><HelpCircle className="w-4 h-4" /></button>
                <button className="hover:text-ink transition-colors p-1"><Settings className="w-4 h-4" /></button>
              </div>
            </div>
          </div>

          {/* Spreadsheet Tabs */}
          <div className="flex items-end px-8 border-b border-border bg-canvas shrink-0 gap-2 pt-4 relative z-10">
            <button className="px-6 py-2 bg-canvas border border-border border-b-canvas rounded-t-lg font-sans font-medium text-sm text-ink relative translate-y-[1px] z-10 shadow-[0_-2px_10px_rgba(0,0,0,0.02)]">
              list 1
            </button>
            <button className="px-6 py-2 bg-black/[0.02] border border-transparent rounded-t-lg font-sans font-medium text-sm text-muted hover:text-ink transition-colors relative translate-y-[1px]">
              xyz
            </button>
            <button className="p-2 hover:bg-black/5 transition-colors mb-1 rounded-md text-muted hover:text-ink ml-1">
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Split View */}
          <div className="flex-1 flex flex-row overflow-hidden relative z-0">
            <CopilotPanel />
            <LeadWorkspace />
          </div>
        </>
      )}

      {activeTab === 'crm' && <CrmWorkspace />}
      {activeTab === 'outreach' && <OutreachWorkspace />}
    </div>
  );
};
