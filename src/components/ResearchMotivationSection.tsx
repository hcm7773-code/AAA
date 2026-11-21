import React from 'react';
import { ArrowUpRight, ShieldCheck } from 'lucide-react';
import { REPORT_META, RESEARCH_MOTIVATIONS } from '../data/luteinReportData';

interface ResearchMotivationSectionProps {
  onJumpToSection: (sectionId: string) => void;
}

const KEY_OBSERVATIONS = [
  {
    index: '01',
    title: '九月討論高峰與異常回查',
    detail: '三個月主題共 591 筆，9 月達 229 筆；9/8 單日高峰 37 筆、9/17 負面高峰 6 篇。',
    target: 'volume-sentiment',
  },
  {
    index: '02',
    title: '選購聚焦規格與成分透明度',
    detail: '「游離型」、「配方」、「成分」、「iHerb」等關鍵字顯示消費者重視劑量比例與檢驗依據。',
    target: 'consumer-insights',
  },
  {
    index: '03',
    title: '多元渠道結構與風險應變',
    detail: '大研生醫 FB 粉絲團 12 則居首（約方格子兩倍），搭配五階段機制因應效果落差負評。',
    target: 'channels-kol',
  },
];

export const ResearchMotivationSection: React.FC<ResearchMotivationSectionProps> = ({
  onJumpToSection,
}) => {
  return (
    <section
      id="research-motivation"
      className="py-10 border-t border-slate-200 bg-white"
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Caliber Calibration Principle Banner */}
        <div className="bg-[#ECFDF5] border border-[#A7F3D0] rounded-xl px-5 py-4 flex items-start gap-3">
          <ShieldCheck className="w-4 h-4 text-[#059669] shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-[#065F46] leading-relaxed">
            <span className="font-semibold">口徑校準原則：</span>
            {REPORT_META.caliberPrinciple}
          </div>
        </div>

        {/* 2-Column Bottom Grid: Platform Core Summary Navigation & Research Motivation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          {/* Platform Core Summary Navigation */}
          <div className="border border-slate-200 rounded-xl p-6 space-y-4 bg-[#F8FAFC]/50 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <span className="text-xs font-mono font-semibold text-[#4F46E5]">
                    06 · 摘要導覽
                  </span>
                  <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                    平台核心摘要導覽
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => onJumpToSection('volume-sentiment')}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#4F46E5] hover:text-[#3730A3] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5] rounded"
                >
                  <span>進入聲量與情緒分析</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="divide-y divide-slate-200 border-t border-b border-slate-200 bg-white rounded-lg px-4">
                {KEY_OBSERVATIONS.map((item) => (
                  <button
                    key={item.index}
                    type="button"
                    onClick={() => onJumpToSection(item.target)}
                    className="w-full py-3.5 grid grid-cols-[36px_1fr] gap-3 items-start text-left hover:bg-slate-50/80 transition-colors cursor-pointer"
                  >
                    <span className="font-mono text-xs font-semibold text-[#4F46E5] tabular-nums pt-0.5">
                      {item.index}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        {item.title}
                      </p>
                      <p className="text-xs sm:text-sm text-slate-600 mt-0.5 leading-relaxed">
                        {item.detail}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Research Motivation & Market Background */}
          <div className="border border-slate-200 rounded-xl p-6 space-y-4 bg-[#F8FAFC]/50 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <span className="text-xs font-mono font-semibold text-[#4F46E5]">
                    07 · 研究背景與問題定義
                  </span>
                  <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                    研究動機與市場背景
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() => onJumpToSection('action-recommendations')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#4F46E5]/30 bg-white hover:bg-[#EEF2FF] text-xs font-semibold text-[#4F46E5] hover:text-[#3730A3] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5]"
                >
                  <span>查看五項行動建議</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="divide-y divide-slate-200 border-t border-b border-slate-200 bg-white rounded-lg px-4">
                {RESEARCH_MOTIVATIONS.map((item) => (
                  <div
                    key={item.index}
                    className="py-3.5 grid grid-cols-[36px_1fr] gap-3 items-start"
                  >
                    <span className="font-mono text-xs font-semibold text-[#4F46E5] tabular-nums pt-0.5">
                      {item.index}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        {item.title}
                      </p>
                      <p className="text-xs sm:text-sm text-slate-600 mt-0.5 leading-relaxed">
                        {item.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
