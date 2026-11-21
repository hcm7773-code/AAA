import React, { useState } from 'react';
import { Radio, AlertCircle, Users, Compass } from 'lucide-react';
import {
  SOURCE_CHANNELS,
  ANALYTICAL_FRAMEWORKS,
  KOL_ARCHETYPES,
  TOPIC_OPERATION_HOOKS,
} from '../data/luteinReportData';

const CHANNEL_CATEGORIES = [
  '全部',
  '品牌自有社群',
  '內容創作平台',
  '社群論壇',
  '新聞與媒體',
] as const;

export const ChannelsKolSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] =
    useState<(typeof CHANNEL_CATEGORIES)[number]>('全部');
  const [selectedKolId, setSelectedKolId] = useState<string>(KOL_ARCHETYPES[0].id);

  const visibleChannels =
    selectedCategory === '全部'
      ? SOURCE_CHANNELS
      : SOURCE_CHANNELS.filter((c) => c.category === selectedCategory);

  const activeKol =
    KOL_ARCHETYPES.find((k) => k.id === selectedKolId) ?? KOL_ARCHETYPES[0];

  return (
    <section id="channels-kol" className="py-12 border-b border-slate-200 bg-white">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Heading */}
        <div className="space-y-1.5">
          <span className="text-xs font-mono font-semibold text-[#4F46E5]">
            03 · 來源頻道競品比較與 KOL 評估
          </span>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            資訊傳播路徑拆解與 Instagram KOL 分眾合作策略
          </h2>
          <p className="text-sm text-slate-600 max-w-3xl">
            品牌自有社群、內容平台、論壇與新聞媒體共同構成市場傳播網，判讀競品表現時須區分曝光規模與真實互動品質。
          </p>
        </div>

        {/* Channel Ranking & Caliber Warning */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-7 border border-slate-200 rounded-xl p-6 space-y-5 bg-[#F8FAFC]/60">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-[#4F46E5]" />
                <h3 className="text-base font-bold text-slate-900">
                  來源頻道與網站影響力排行
                </h3>
              </div>

              <div className="flex flex-wrap items-center gap-1 p-1 bg-white rounded-lg border border-slate-200">
                {CHANNEL_CATEGORIES.map((cat) => {
                  const active = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        active
                          ? 'bg-[#110C3B] text-white'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Channel Quantitative Highlight */}
            <div className="bg-white border border-slate-200 rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>來源頻道榜首對照（大研生醫 FB 粉絲團 vs 第二名方格子）</span>
                <span className="font-mono tabular-nums text-slate-700">2 : 1 量級差</span>
              </div>
              <div className="space-y-2.5">
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-900">
                    <span>大研生醫 Facebook 粉絲團</span>
                    <span className="font-mono tabular-nums text-[#4F46E5]">12 則</span>
                  </div>
                  <div className="h-2.5 w-full bg-slate-100 rounded-sm overflow-hidden">
                    <div className="h-full bg-[#4F46E5] w-full" />
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                    <span>方格子 (Vocus) · 排行第二</span>
                    <span className="font-mono tabular-nums text-slate-700">約 6 則（約為榜首一半）</span>
                  </div>
                  <div className="h-2.5 w-full bg-slate-100 rounded-sm overflow-hidden">
                    <div className="h-full bg-[#10B981] w-1/2" />
                  </div>
                </div>
              </div>
            </div>

            {/* Channel Detail List */}
            <div className="divide-y divide-slate-200 border border-slate-200 rounded-lg bg-white overflow-hidden">
              {visibleChannels.map((ch) => (
                <div key={ch.name} className="p-4 space-y-1.5">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <span className="text-sm font-bold text-slate-900">{ch.name}</span>
                    <span className="text-xs font-mono text-slate-500">
                      {ch.category}
                      {ch.reportedCount ? ` · ${ch.reportedCount} 則` : ''}
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 font-medium">{ch.rankNote}</p>
                  <p className="text-xs text-slate-600 leading-relaxed">{ch.natureNote}</p>
                  <p className="text-xs text-amber-800 bg-amber-50/70 border border-amber-200 rounded px-2.5 py-1.5 mt-1">
                    判讀提醒：{ch.caution}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Analytical Frameworks & KOL Matrix */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Caution + 4 Analytical Lenses */}
            <div className="border border-slate-200 rounded-xl p-6 space-y-4 bg-white">
              <div className="flex items-start gap-2.5 text-slate-900">
                <AlertCircle className="w-4 h-4 text-[#4F46E5] shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-base font-bold">競品比較分析維度</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    統計口徑：品牌比較資料合計 284 則
                  </p>
                </div>
              </div>

              <div className="bg-[#ECFDF5] border border-[#A7F3D0] rounded-lg p-3.5 text-xs text-[#065F46] leading-relaxed">
                品牌自有貼文、論壇討論與新聞轉載性質不同，比較平台時須同步檢視貼文主題、正負情緒及互動品質，不可單憑曝光量推論口碑優劣。
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ANALYTICAL_FRAMEWORKS.map((fw) => (
                  <div
                    key={fw.name}
                    className="p-3.5 rounded-lg bg-[#F8FAFC] border border-slate-200 space-y-1"
                  >
                    <div className="text-xs font-bold text-slate-900">{fw.name}</div>
                    <p className="text-xs text-slate-600 leading-relaxed">{fw.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Instagram KOL Assessment */}
            <div className="tech-indigo-panel border border-[#2B2475] rounded-xl p-6 text-white space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#34D399]" />
                    <h3 className="text-base font-bold">Instagram KOL 評估對象</h3>
                  </div>
                  <span className="text-xs font-mono text-indigo-200/80">3 類帳號原型</span>
                </div>

                <div className="grid grid-cols-1 gap-2">
                  {KOL_ARCHETYPES.map((kol) => {
                    const active = kol.id === selectedKolId;
                    return (
                      <button
                        key={kol.id}
                        type="button"
                        onClick={() => setSelectedKolId(kol.id)}
                        className={`px-3.5 py-2.5 rounded-lg border text-left transition-colors cursor-pointer ${
                          active
                            ? 'bg-[#032D26] border-[#10B981] text-white'
                            : 'bg-white/5 border-white/10 text-indigo-100 hover:bg-white/10'
                        }`}
                      >
                        <div className="text-xs font-semibold">{kol.category}</div>
                        <div className="text-[11px] text-[#34D399] mt-0.5">
                          規劃形式：{kol.recommendedFormat}
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="bg-white/5 border border-white/10 rounded-lg p-4 space-y-2 text-xs">
                  <div className="font-semibold text-[#34D399]">
                    {activeKol.category} · 執行細節
                  </div>
                  <p className="text-indigo-50 leading-relaxed">
                    <span className="text-indigo-200">內容特色：</span>
                    {activeKol.contentFocus}
                  </p>
                  <p className="text-indigo-50 leading-relaxed">
                    <span className="text-indigo-200">明確行動設計：</span>
                    {activeKol.targetAction}
                  </p>
                  <p className="text-emerald-200 leading-relaxed pt-1 border-t border-white/10">
                    測試原則：{activeKol.testingProtocol}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-indigo-100">
                  <Compass className="w-3.5 h-3.5 text-[#34D399]" />
                  <span>可結合話題領域與轉化前提</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {TOPIC_OPERATION_HOOKS.map((hook) => (
                    <div
                      key={hook.title}
                      className="bg-white/5 border border-white/10 rounded p-2 text-[11px]"
                    >
                      <div className="font-semibold text-white">{hook.title}</div>
                      <div className="text-indigo-200/80 mt-0.5 line-clamp-2">
                        {hook.detail}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
