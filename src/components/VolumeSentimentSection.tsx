import React, { useState } from 'react';
import { TrendingUp, AlertTriangle, CheckCircle2, Info } from 'lucide-react';
import {
  MONTHLY_TOPIC_VOLUMES,
  PEAK_EVENTS,
  SENTIMENT_BREAKDOWN,
} from '../data/luteinReportData';

export const VolumeSentimentSection: React.FC = () => {
  const [chartMode, setChartMode] = useState<'quarterly' | 'annual'>('quarterly');
  const [selectedPeakId, setSelectedPeakId] = useState<string>(PEAK_EVENTS[0].id);
  const [selectedSentimentId, setSelectedSentimentId] = useState<'positive' | 'neutral' | 'negative'>('negative');

  const activePeak = PEAK_EVENTS.find((p) => p.id === selectedPeakId) ?? PEAK_EVENTS[0];
  const activeSentiment =
    SENTIMENT_BREAKDOWN.find((s) => s.id === selectedSentimentId) ?? SENTIMENT_BREAKDOWN[2];

  const maxMonthlyCount = 260;

  return (
    <section id="volume-sentiment" className="py-12 border-b border-slate-200 bg-white">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1.5">
            <span className="text-xs font-mono font-semibold text-[#4F46E5]">
              01 · 聲量趨勢與情緒診斷
            </span>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              討論高峰追蹤與正負面口碑結構
            </h2>
            <p className="text-sm text-slate-600 max-w-2xl">
              三個月社群主題共 591 筆（9 月為高峰 229 筆）；情緒樣本 576 篇顯示 72% 正面評價，但 9 月 17 日負面高峰揭示消費者期待落差。
            </p>
          </div>

          {/* Interactive Chart Scope Switcher */}
          <div
            role="tablist"
            aria-label="聲量圖表口徑切換"
            className="inline-flex items-center p-1 bg-slate-100 rounded-lg border border-slate-200 self-start md:self-auto"
          >
            <button
              type="button"
              role="tab"
              aria-selected={chartMode === 'quarterly'}
              onClick={() => setChartMode('quarterly')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                chartMode === 'quarterly'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              三個月主題趨勢 (591 筆)
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={chartMode === 'annual'}
              onClick={() => setChartMode('annual')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                chartMode === 'annual'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              年度關鍵字大盤 (384,830 則)
            </button>
          </div>
        </div>

        {/* Main 2-Column Observatory */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left: Volume Trend & Peak Events */}
          <div className="lg:col-span-7 border border-slate-200 rounded-xl p-6 flex flex-col justify-between gap-6 bg-[#F8FAFC]/60">
            {chartMode === 'quarterly' ? (
              <div className="space-y-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      2026 年 8 – 10 月社群主題聲量分布
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      統計口徑：三個月主題資料合計 591 筆 · 9 月為討論高峰
                    </p>
                  </div>
                  <span className="font-mono text-xs font-semibold text-[#059669] tabular-nums">
                    Peak: 229 筆 (9 月)
                  </span>
                </div>

                {/* Crisp Responsive Bar Chart */}
                <div className="bg-white border border-slate-200 rounded-lg p-5">
                  <div className="grid grid-cols-3 gap-6 items-end h-52 pt-4">
                    {MONTHLY_TOPIC_VOLUMES.map((item) => {
                      const heightPct = Math.round((item.count / maxMonthlyCount) * 100);
                      return (
                        <div
                          key={item.month}
                          className="flex flex-col items-center h-full justify-end gap-2"
                        >
                          <div className="font-mono text-sm font-bold tabular-nums text-slate-900">
                            {item.count} 筆
                          </div>
                          <div className="w-full max-w-[84px] flex-1 flex items-end">
                            <div
                              style={{ height: `${heightPct}%` }}
                              className={`w-full rounded-t-md transition-all duration-300 ${
                                item.isPeak
                                  ? 'bg-[#4F46E5]'
                                  : 'bg-slate-300 hover:bg-slate-400'
                              }`}
                            />
                          </div>
                          <div className="text-center pt-1 border-t border-slate-100 w-full">
                            <div className="text-xs font-semibold text-slate-800">
                              {item.periodLabel}
                            </div>
                            <div className="text-[11px] font-mono text-slate-500 tabular-nums">
                              {item.month}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      年度葉黃素關鍵字大盤聲量對照 (2025/10 – 2026/10)
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      統計口徑：年度總聲量 384,830 則 · 正負顯性情緒比較
                    </p>
                  </div>
                  <span className="font-mono text-xs font-semibold text-[#4F46E5] tabular-nums">
                    Total: 384,830 則
                  </span>
                </div>

                <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-5">
                  {[
                    {
                      label: '年度關鍵字總聲量',
                      value: 384830,
                      pct: 100,
                      barClass: 'bg-[#110C3B]',
                    },
                    {
                      label: '年度正面情緒聲量',
                      value: 118820,
                      pct: Math.round((118820 / 384830) * 100),
                      barClass: 'bg-[#10B981]',
                    },
                    {
                      label: '年度負面情緒聲量',
                      value: 10851,
                      pct: Math.max(3, Math.round((10851 / 384830) * 100)),
                      barClass: 'bg-rose-600',
                    },
                  ].map((row) => (
                    <div key={row.label} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs sm:text-sm">
                        <span className="font-medium text-slate-700">{row.label}</span>
                        <span className="font-mono font-bold tabular-nums text-slate-900">
                          {row.value.toLocaleString()} 則
                        </span>
                      </div>
                      <div className="w-full h-3 bg-slate-100 rounded-sm overflow-hidden">
                        <div
                          style={{ width: `${row.pct}%` }}
                          className={`h-full ${row.barClass}`}
                        />
                      </div>
                    </div>
                  ))}
                  <p className="text-xs text-slate-500 pt-2 border-t border-slate-100">
                    註：年度其餘聲量屬於中立客觀討論、一般科普與通路商品資訊轉載；年度正面聲量約為負面聲量的 10.95 倍。
                  </p>
                </div>
              </div>
            )}

            {/* Peak Event Selector & Diagnostic Detail */}
            <div className="space-y-3">
              <div className="text-xs font-semibold text-slate-700">
                九月關鍵異常峰值回查（點選檢視歸因）
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {PEAK_EVENTS.map((peak) => {
                  const active = peak.id === selectedPeakId;
                  return (
                    <button
                      key={peak.id}
                      type="button"
                      onClick={() => setSelectedPeakId(peak.id)}
                      className={`p-3 rounded-lg border text-left transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5] ${
                        active
                          ? peak.tone === 'negative'
                            ? 'bg-rose-50 border-rose-300'
                            : 'bg-[#EEF2FF] border-[#4F46E5]'
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="text-[11px] font-mono text-slate-500 tabular-nums">
                        {peak.date}
                      </div>
                      <div className="text-xs font-semibold text-slate-900 mt-0.5">
                        {peak.type}
                      </div>
                      <div
                        className={`text-lg font-mono font-bold tabular-nums mt-1 ${
                          peak.tone === 'negative' ? 'text-rose-700' : 'text-[#4F46E5]'
                        }`}
                      >
                        {peak.count} {peak.unit}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="bg-white border border-slate-200 rounded-lg p-4 flex items-start gap-3">
                {activePeak.tone === 'negative' ? (
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                ) : (
                  <TrendingUp className="w-4 h-4 text-[#4F46E5] shrink-0 mt-0.5" />
                )}
                <div className="space-y-1 text-xs leading-relaxed">
                  <div className="font-semibold text-slate-900">
                    {activePeak.date} · {activePeak.type}（{activePeak.count} {activePeak.unit}）
                  </div>
                  <p className="text-slate-600">{activePeak.driver}</p>
                  <p className="text-slate-800 font-medium">
                    建議判讀：{activePeak.actionNote}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Sentiment Breakdown (576 Samples) */}
          <div className="lg:col-span-5 border border-slate-200 rounded-xl p-6 flex flex-col justify-between gap-6 bg-white">
            <div className="space-y-5">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    社群情緒分類樣本解析
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    統計口徑：情緒分類有效樣本共 576 篇
                  </p>
                </div>
                <span className="font-mono text-xs font-semibold text-slate-700 tabular-nums">
                  n = 576 篇
                </span>
              </div>

              {/* Stacked Proportion Bar */}
              <div className="space-y-2">
                <div className="h-4 w-full rounded-sm overflow-hidden flex border border-slate-200">
                  <button
                    type="button"
                    aria-label="檢視正面情緒 72%"
                    onClick={() => setSelectedSentimentId('positive')}
                    style={{ width: '72%' }}
                    className="bg-[#10B981] hover:bg-[#059669] transition-colors cursor-pointer"
                  />
                  <button
                    type="button"
                    aria-label="檢視中立情緒 18%"
                    onClick={() => setSelectedSentimentId('neutral')}
                    style={{ width: '18%' }}
                    className="bg-slate-400 hover:bg-slate-500 transition-colors cursor-pointer"
                  />
                  <button
                    type="button"
                    aria-label="檢視負面情緒 10%"
                    onClick={() => setSelectedSentimentId('negative')}
                    style={{ width: '10%' }}
                    className="bg-rose-600 hover:bg-rose-700 transition-colors cursor-pointer"
                  />
                </div>
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 tabular-nums">
                  <span>正面 72%</span>
                  <span>中立 18%</span>
                  <span>負面 10%</span>
                </div>
              </div>

              {/* Interactive Sentiment Rows */}
              <div className="divide-y divide-slate-200 border border-slate-200 rounded-lg overflow-hidden">
                {SENTIMENT_BREAKDOWN.map((slice) => {
                  const active = slice.id === selectedSentimentId;
                  const indicatorClass =
                    slice.id === 'positive'
                      ? 'text-[#059669]'
                      : slice.id === 'negative'
                      ? 'text-rose-700'
                      : 'text-slate-700';

                  return (
                    <button
                      key={slice.id}
                      type="button"
                      onClick={() => setSelectedSentimentId(slice.id)}
                      className={`w-full px-4 py-3 flex items-center justify-between text-left transition-colors cursor-pointer ${
                        active ? 'bg-slate-50' : 'bg-white hover:bg-slate-50/70'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        {slice.id === 'positive' && (
                          <CheckCircle2 className="w-4 h-4 text-[#059669]" />
                        )}
                        {slice.id === 'neutral' && (
                          <Info className="w-4 h-4 text-slate-500" />
                        )}
                        {slice.id === 'negative' && (
                          <AlertTriangle className="w-4 h-4 text-rose-600" />
                        )}
                        <span className="text-sm font-semibold text-slate-900">
                          {slice.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 font-mono tabular-nums">
                        <span className="text-sm font-bold text-slate-900">
                          {slice.count} 篇
                        </span>
                        <span className={`text-xs font-bold w-10 text-right ${indicatorClass}`}>
                          {slice.percentage}%
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Diagnostic Panel for Selected Sentiment */}
            <div className="tech-indigo-panel rounded-lg p-4 text-white space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[#34D399] font-semibold">
                  情緒判讀 · {activeSentiment.label}
                </span>
                <span className="text-indigo-200 tabular-nums">
                  {activeSentiment.count} 篇 ({activeSentiment.percentage}%)
                </span>
              </div>
              <p className="text-xs text-indigo-100/90 leading-relaxed">
                {activeSentiment.interpretation}
              </p>
              <div className="pt-2 border-t border-white/10 text-xs text-emerald-200 leading-relaxed">
                管理焦點：{activeSentiment.riskFocus}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
