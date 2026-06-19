import React from 'react';
import { motion } from 'framer-motion';
import { MoreHorizontal } from 'lucide-react';

const MOCK_DATA = Array.from({ length: 20 }).map((_, i) => ({
  id: i + 1,
  name: i === 0 ? "John Doe" : i === 1 ? "Jane Smith" : "Marcus Webb",
  description: i === 0 ? "Software Engineer" : i === 1 ? "Product Manager" : "Head of Growth",
  industry: i === 0 ? "Technology" : i === 1 ? "Software" : "SaaS",
  size: i === 0 ? "100-500" : i === 1 ? "50-200" : "1k-5k",
  type: i === 0 ? "B2B" : i === 1 ? "B2C" : "B2B",
  location: i === 0 ? "San Francisco" : i === 1 ? "New York" : "Austin",
  country: i === 0 ? "USA" : i === 1 ? "USA" : "USA",
  linkedin: i === 0 ? "linkedin.com/in/johndoe" : i === 1 ? "linkedin.com/in/janesmith" : "",
}));

export const LeadWorkspace: React.FC = () => {
  return (
    <div className="flex-1 h-full bg-canvas overflow-y-auto px-8 py-6 relative">
      <div className="w-full bg-surface rounded-2xl border border-border shadow-sm overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-border bg-black/[0.02]">
          <div className="col-span-1 text-xs font-sans font-semibold text-muted uppercase tracking-wider text-center">#</div>
          <div className="col-span-2 text-xs font-sans font-semibold text-muted uppercase tracking-wider">Name</div>
          <div className="col-span-2 text-xs font-sans font-semibold text-muted uppercase tracking-wider">Description</div>
          <div className="col-span-2 text-xs font-sans font-semibold text-muted uppercase tracking-wider">Industry</div>
          <div className="col-span-1 text-xs font-sans font-semibold text-muted uppercase tracking-wider">Size</div>
          <div className="col-span-1 text-xs font-sans font-semibold text-muted uppercase tracking-wider">Type</div>
          <div className="col-span-1 text-xs font-sans font-semibold text-muted uppercase tracking-wider">Location</div>
          <div className="col-span-1 text-xs font-sans font-semibold text-muted uppercase tracking-wider">Country</div>
          <div className="col-span-1 text-xs font-sans font-semibold text-muted uppercase tracking-wider">LinkedIn</div>
        </div>
        
        {/* Table Body */}
        <div className="divide-y divide-border">
          {MOCK_DATA.map((row, i) => {
            const avatarColors = [
              'bg-brand-primary/10 text-brand-primary',
              'bg-brand-accent/20 text-[#5B6A00]',
              'bg-amber-100 text-amber-700',
              'bg-blue-100 text-blue-700',
              'bg-purple-100 text-purple-700'
            ];
            const colorClass = avatarColors[i % avatarColors.length];

            return (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i * 0.05, 0.5) }}
                key={row.id} 
                className="grid grid-cols-12 gap-4 px-6 py-3 items-center hover:bg-black/[0.02] transition-colors group cursor-pointer"
              >
                <div className="col-span-1 font-sans text-xs text-muted text-center">{row.id}</div>
                <div className="col-span-2 flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full ${colorClass} flex items-center justify-center font-sans font-semibold text-xs shrink-0`}>
                    {row.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="font-sans font-medium text-sm text-ink group-hover:text-brand-primary transition-colors truncate">
                    {row.name}
                  </div>
                </div>
                <div className="col-span-2 font-sans text-sm text-muted truncate">
                  {row.description}
                </div>
                <div className="col-span-2 font-sans text-sm text-ink truncate">
                  {row.industry}
                </div>
                <div className="col-span-1 font-sans text-sm text-ink truncate">
                  {row.size}
                </div>
                <div className="col-span-1 font-sans text-sm text-ink truncate">
                  {row.type}
                </div>
                <div className="col-span-1 font-sans text-sm text-muted truncate">
                  {row.location}
                </div>
                <div className="col-span-1 font-sans text-sm text-muted truncate">
                  {row.country}
                </div>
                <div className="col-span-1 flex items-center justify-between">
                  {row.linkedin ? (
                    <a href="#" className="font-sans text-xs text-blue-600 hover:underline flex items-center gap-1.5 truncate">
                       <div className="w-4 h-4 bg-[#0A66C2] text-white flex items-center justify-center rounded-[2px] font-bold text-[8px] shrink-0">in</div>
                    </a>
                  ) : <span className="text-muted text-xs">-</span>}
                  <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-black/5 rounded text-muted transition-all shrink-0 ml-2">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
