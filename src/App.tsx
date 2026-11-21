import React, { useState, useEffect } from 'react';
import { TopNav } from './components/TopNav';
import { TopResourceCarousel } from './components/TopResourceCarousel';
import { OverviewHero } from './components/OverviewHero';
import { VolumeSentimentSection } from './components/VolumeSentimentSection';
import { ConsumerInsightsSection } from './components/ConsumerInsightsSection';
import { ChannelsKolSection } from './components/ChannelsKolSection';
import { RiskStrategySection } from './components/RiskStrategySection';
import { ResearchMotivationSection } from './components/ResearchMotivationSection';
import { REPORT_META } from './data/luteinReportData';

const SECTION_IDS = [
  'overview',
  'volume-sentiment',
  'consumer-insights',
  'channels-kol',
  'risk-strategy',
];

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('overview');

  useEffect(() => {
    const handleScroll = () => {
      const scrollOffset = window.scrollY + 120;
      for (let i = SECTION_IDS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTION_IDS[i]);
        if (el && el.offsetTop <= scrollOffset) {
          setActiveSection(SECTION_IDS[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col selection:bg-[#4F46E5] selection:text-white">
      <TopNav activeSection={activeSection} onNavigate={handleNavigate} />

      <main className="flex-1">
        <TopResourceCarousel />
        <OverviewHero />
        <VolumeSentimentSection />
        <ConsumerInsightsSection />
        <ChannelsKolSection />
        <RiskStrategySection />
        <ResearchMotivationSection onJumpToSection={handleNavigate} />
      </main>

      <footer className="bg-white border-t border-slate-200 py-6">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            {REPORT_META.platformTitle} · 核心分析期間 {REPORT_META.primaryPeriod}
          </div>
          <div className="font-mono text-slate-600">
            {REPORT_META.dataProvider} · 核心方向：{REPORT_META.coreDirection}
          </div>
        </div>
      </footer>
    </div>
  );
}
