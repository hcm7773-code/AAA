import React, { useState } from 'react';
import { Search, Check } from 'lucide-react';
import {
  HOT_KEYWORDS,
  HOT_TOPIC_CLUSTERS,
  COMMUNITY_PERSPECTIVES,
  PURCHASE_FACTORS,
} from '../data/luteinReportData';

const CLUSTERS = ['全部', '產品與成分', '使用情境', '品牌與通路', '醫療與手術'] as const;

export const ConsumerInsightsSection: React.FC = () => {
  const [selectedCluster, setSelectedCluster] = useState<(typeof CLUSTERS)[number]>('全部');
  const [selectedKeywordTerm, setSelectedKeywordTerm] = useState<string>('游離型');

  const filteredKeywords =
    selectedCluster === '全部'
      ? HOT_KEYWORDS
      : HOT_KEYWORDS.filter((k) => k.cluster === selectedCluster);

  const activeKeyword =
    HOT_KEYWORDS.find((k) => k.term === selectedKeywordTerm) ?? filteredKeywords[0] ?? HOT_KEYWORDS[0];

  return (
    <section id="consumer-insights" className="py-12 border-b border-slate-200 bg-[#F8FAFC]">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Title */}
        <div className="space-y-1.5">
          <span className="text-xs font-mono font-semibold text-[#4F46E5]">
            02 · 消費者需求、關鍵字與選購決策
          </span>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            熱門討論主題、12 大核心關鍵字與選購 5 大面向
          </h2>
          <p className="text-sm text-slate-600 max-w-3xl">
            消費者不只討論產品名稱，更高度聚焦於 3C 用眼情境、跨境電商比價（iHerb / Coupang）與實際配方含量透明度。
          </p>
        </div>

        {/* 12 Hot Keywords Explorer */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <Search className="w-4 h-4 text-[#4F46E5]" />
              <h3 className="text-base font-bold text-slate-900">
                葉黃素社群熱門關鍵字群（點選檢視行銷意涵）
              </h3>
            </div>

            <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-100 rounded-lg border border-slate-200">
              {CLUSTERS.map((cluster) => {
                const active = selectedCluster === cluster;
                return (
                  <button
                    key={cluster}
                    type="button"
                    onClick={() => {
                      setSelectedCluster(cluster);
                      const nextList =
                        cluster === '全部'
                          ? HOT_KEYWORDS
                          : HOT_KEYWORDS.filter((k) => k.cluster === cluster);
                      if (nextList.length > 0 && !nextList.some((k) => k.term === selectedKeywordTerm)) {
                        setSelectedKeywordTerm(nextList[0].term);
                      }
                    }}
                    className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      active
                        ? 'bg-white text-slate-900 font-semibold shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {cluster}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-7 flex flex-wrap gap-2">
              {filteredKeywords.map((kw) => {
                const active = kw.term === activeKeyword.term;
                return (
                  <button
                    key={kw.term}
                    type="button"
                    onClick={() => setSelectedKeywordTerm(kw.term)}
                    className={`px-4 py-2 rounded-lg border text-sm font-semibold transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5] ${
                      active
                        ? 'bg-[#4F46E5] border-[#4F46E5] text-white'
                        : 'bg-[#F8FAFC] border-slate-200 text-slate-800 hover:border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    {kw.term}
                  </button>
                );
              })}
            </div>

            <div className="lg:col-span-5 tech-indigo-panel rounded-lg p-5 text-white space-y-3">
              <div className="flex items-center justify-between gap-2 text-xs font-mono">
                <span className="text-[#34D399] font-semibold">
                  關鍵字解析 · {activeKeyword.term}
                </span>
                <span className="text-indigo-200/80">{activeKeyword.cluster}</span>
              </div>
              <p className="text-xs sm:text-sm text-indigo-50 leading-relaxed">
                {activeKeyword.context}
              </p>
              <div className="pt-2 border-t border-white/10 text-xs text-emerald-200 leading-relaxed">
                內容策略對策：{activeKeyword.strategicImplication}
              </div>
            </div>
          </div>
        </div>

        {/* 3 Hot Topics & 4 Community Perspectives */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
            <h3 className="text-base font-bold text-slate-900">
              三大社群熱門討論主題
            </h3>
            <div className="divide-y divide-slate-100">
              {HOT_TOPIC_CLUSTERS.map((topic, idx) => (
                <div key={topic.id} className="py-3.5 first:pt-1 last:pb-1 space-y-1.5">
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="text-sm font-bold text-slate-900">
                      0{idx + 1}. {topic.title}
                    </span>
                    <span className="text-xs font-mono text-slate-500">
                      {topic.examples.join(' · ')}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {topic.consumerDriver}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
            <h3 className="text-base font-bold text-slate-900">
              綜合社群四個核心觀點
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {COMMUNITY_PERSPECTIVES.map((view, idx) => (
                <div
                  key={view.id}
                  className="p-4 rounded-lg bg-[#F8FAFC] border border-slate-200 space-y-1.5"
                >
                  <div className="text-xs font-mono font-semibold text-[#4F46E5]">
                    觀點 0{idx + 1}
                  </div>
                  <div className="text-sm font-bold text-slate-900">{view.title}</div>
                  <p className="text-xs text-slate-600 leading-relaxed">{view.summary}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 5 Consumer Purchase Factors Matrix */}
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                消費者選購五大重點與品牌溝通轉譯準則
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                品牌不應只強調價格或包裝，應將複雜配方轉化為「看得懂、能比較、可查證」的資訊
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#047857]">
              <Check className="w-4 h-4" />
              健康效益宣稱須附清楚依據
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-600">
                  <th className="py-3 px-6 w-16">序號</th>
                  <th className="py-3 px-4 min-w-[200px]">消費者選購重視面向</th>
                  <th className="py-3 px-4 min-w-[260px]">社群實際評估焦點</th>
                  <th className="py-3 px-6 min-w-[260px]">品牌內容轉譯與溝通準則</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {PURCHASE_FACTORS.map((factor) => (
                  <tr key={factor.index} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-6 font-mono text-xs font-bold text-[#4F46E5] tabular-nums">
                      {factor.index}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-900">
                      {factor.title}
                    </td>
                    <td className="py-3.5 px-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {factor.detail}
                    </td>
                    <td className="py-3.5 px-6 text-xs sm:text-sm text-[#065F46] font-medium leading-relaxed">
                      {factor.communicationRule}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
