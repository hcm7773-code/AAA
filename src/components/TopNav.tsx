import React from 'react';
import { BarChart3 } from 'lucide-react';

interface TopNavProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

const NAV_ITEMS = [
  { id: 'overview', label: '市場總覽' },
  { id: 'volume-sentiment', label: '聲量與情緒' },
  { id: 'consumer-insights', label: '選購與關鍵字' },
  { id: 'channels-kol', label: '頻道與 KOL' },
  { id: 'risk-strategy', label: '風險與建議' },
];

export const TopNav: React.FC<TopNavProps> = ({ activeSection, onNavigate }) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-slate-200 no-print">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-6 sm:gap-8">
        {/* Single-line Brand Wordmark */}
        <a
          href="#overview"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('overview');
          }}
          className="flex items-center gap-2.5 text-slate-900 font-bold tracking-tight whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5] rounded-md"
        >
          <span className="w-7 h-7 rounded-lg bg-[#4F46E5] text-white flex items-center justify-center shrink-0">
            <BarChart3 className="w-4 h-4" />
          </span>
          <span className="text-sm sm:text-base font-bold">葉黃素市場聲量洞察</span>
        </a>

        {/* Single-line Navigation Links */}
        <nav
          aria-label="主要導覽列"
          className="flex items-center gap-4 sm:gap-6 overflow-x-auto min-w-0"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(item.id)}
                className={`relative py-1 text-xs sm:text-sm font-medium transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5] rounded ${
                  isActive
                    ? 'text-[#4F46E5] font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {item.label}
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-[15px] h-0.5 bg-[#4F46E5]"
                  />
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
