import React from 'react';
import { Mail, MessageCircle } from 'lucide-react';

interface TopNavigationProps {
  activeTab: 'chat' | 'crm' | 'outreach';
  onTabChange: (tab: 'chat' | 'crm' | 'outreach') => void;
}

export const TopNavigation: React.FC<TopNavigationProps> = ({ activeTab, onTabChange }) => {
  return (
    <header className="w-full h-16 border-b border-border bg-canvas/90 backdrop-blur-md flex items-center justify-between px-8 z-50 shrink-0">
      {/* Left: Logo */}
      <div className="flex items-center gap-2 w-[280px]">
        <span className="font-display text-xl font-bold tracking-tight-display text-ink uppercase">CNVRTED</span>
      </div>

      {/* Center: Tabs and Feedback */}
      <div className="flex flex-col items-center justify-center flex-1">
        <div className="flex items-center bg-black/5 rounded-full px-1 py-1 mb-1 shadow-sm">
          <button 
            onClick={() => onTabChange('chat')}
            className={`px-5 py-1 rounded-full font-sans text-sm font-medium transition-all ${
              activeTab === 'chat' ? 'bg-canvas text-ink shadow-sm' : 'text-muted hover:text-ink'
            }`}
          >
            Chat
          </button>
          <button 
            onClick={() => onTabChange('crm')}
            className={`px-5 py-1 rounded-full font-sans text-sm font-medium transition-all ${
              activeTab === 'crm' ? 'bg-canvas text-ink shadow-sm' : 'text-muted hover:text-ink'
            }`}
          >
            CRM
          </button>
          <button 
            onClick={() => onTabChange('outreach')}
            className={`px-5 py-1 rounded-full font-sans text-sm font-medium transition-all ${
              activeTab === 'outreach' ? 'bg-canvas text-ink shadow-sm' : 'text-muted hover:text-ink'
            }`}
          >
            Outreach
          </button>
        </div>
        <button className="flex items-center gap-1.5 text-[11px] font-sans text-muted hover:text-ink transition-colors">
          <MessageCircle className="w-3 h-3" />
          Leave feedback or report bug
        </button>
      </div>

      {/* Right: Actions and Profile */}
      <div className="flex items-center justify-end gap-6 w-[280px]">
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 text-xs font-sans font-medium text-ink hover:text-brand-primary transition-colors group">
            <Mail className="w-4 h-4 text-muted group-hover:text-red-500 transition-colors" />
            Connect Gmail
          </button>
          <div className="w-px h-4 bg-border" />
          <button className="flex items-center gap-2 text-xs font-sans font-medium text-ink hover:text-brand-primary transition-colors">
            <span className="text-muted font-bold">#</span>
            Join our Slack
          </button>
        </div>
        
        {/* Workspace Indicator */}
        <button className="flex items-center justify-center px-3 py-1.5 rounded-lg border border-border bg-surface text-ink font-sans text-sm hover:bg-black/5 transition-colors tracking-tight-ui shadow-sm font-medium">
          work
        </button>
      </div>
    </header>
  );
};
