"use client";
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
            <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 16.64L24 7.636v11.73c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64z" fill="#34A853"/>
              <path d="M12 16.64L0 7.636v11.73C0 20.27 .732 21 1.636 21h3.819V11.73L12 16.64z" fill="#4285F4"/>
              <path d="M12 10.682L3.927 3.493C2.309 2.28 0 3.435 0 5.457v2.179l12 9.004V10.682z" fill="#EA4335"/>
              <path d="M12 10.682l8.073-7.189c1.618-1.214 3.927-.058 3.927 1.964v2.179l-12 9.004V10.682z" fill="#FBBC04"/>
            </svg>
            Connect Gmail
          </button>
          <div className="w-px h-4 bg-border" />
          <button className="flex items-center gap-2 text-xs font-sans font-medium text-ink hover:text-brand-primary transition-colors">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 shrink-0">
              <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52z" fill="#E01E5A"/>
              <path d="M6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313z" fill="#E01E5A"/>
              <path d="M8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834z" fill="#36C5F0"/>
              <path d="M8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312z" fill="#36C5F0"/>
              <path d="M18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834z" fill="#2EB67D"/>
              <path d="M17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.168 0a2.528 2.528 0 0 1 2.52 2.522v6.312z" fill="#2EB67D"/>
              <path d="M15.168 18.829a2.528 2.528 0 0 1 2.522 2.522 2.528 2.528 0 0 1-2.522 2.522 2.528 2.528 0 0 1-2.521-2.522v-2.522h2.521z" fill="#ECB22E"/>
              <path d="M15.168 17.561a2.528 2.528 0 0 1-2.522-2.523 2.528 2.528 0 0 1 2.522-2.52 2.528 2.528 0 0 1 2.521 2.52v6.313a2.528 2.528 0 0 1-2.521 2.522 2.528 2.528 0 0 1-2.522-2.522v-6.313z" fill="#ECB22E"/>
            </svg>
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
