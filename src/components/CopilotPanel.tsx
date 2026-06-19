"use client";
import React, { useState } from 'react';
import { Mic, ArrowUp } from 'lucide-react';
import { motion } from 'framer-motion';

export const CopilotPanel: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="w-[420px] h-full flex flex-col px-8 py-6 bg-surface/50 backdrop-blur-md border-r border-border relative z-10 shrink-0 overflow-hidden">
      {/* Ambient color gradient background */}
      <div className="absolute inset-0 pointer-events-none z-0" style={{
        background: `
          radial-gradient(ellipse 80% 80% at -10% -10%, rgba(61, 125, 122, 0.08) 0%, transparent 60%),
          radial-gradient(ellipse 60% 80% at 110% 110%, rgba(196, 211, 0, 0.05) 0%, transparent 60%)
        `
      }} />

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto space-y-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] flex flex-col justify-end pb-8 relative z-10">
        <div className="space-y-6">
          {/* Welcome Message */}
          <div className="text-left pb-4">
            <h1 className="font-serif font-medium text-4xl text-ink leading-normal tracking-tight">
              Hey, what can I help you with :)
            </h1>
          </div>

          {/* User Message */}
          <div className="flex justify-end">
            <div className="px-5 py-3 rounded-2xl rounded-tr-sm bg-brand-primary/10 text-brand-primary font-sans text-sm shadow-sm max-w-[85%]">
              hey
            </div>
          </div>

          {/* System Reply */}
          <div className="flex justify-start">
            <div className="px-5 py-3 rounded-2xl rounded-tl-sm bg-white border border-border text-ink font-sans text-sm shadow-sm max-w-[85%]">
              what can i help u with
            </div>
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="pt-4 w-full shrink-0 relative z-10">
        <div className="mb-3 pl-1">
          <span className="font-sans text-sm text-muted">Lets find your customer</span>
        </div>
        
        <div className={`relative flex items-center bg-surface rounded-[24px] border ${isFocused ? 'border-brand-primary shadow-glow' : 'border-black/10 shadow-sm'} transition-all duration-300`}>
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Find leads, enrich data!"
            className="w-full bg-transparent px-5 py-4 outline-none font-sans text-sm text-ink placeholder:text-muted/60"
          />
          <div className="flex items-center gap-2 pr-3">
            <button className="p-2 text-muted hover:text-ink hover:bg-black/5 rounded-full transition-colors">
              <Mic className="w-5 h-5" />
            </button>
            <button 
              className={`p-2 rounded-full transition-all duration-200 ${
                inputValue.trim() 
                  ? 'bg-brand-primary text-white shadow-md hover:bg-[#2A5C59] hover:shadow-lg hover:-translate-y-0.5' 
                  : 'bg-brand-primary/10 text-brand-primary hover:bg-brand-primary/20'
              }`}
            >
              <ArrowUp className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
