import React, { useState } from 'react';
import { Microscope, Layers } from 'lucide-react';
import { DATA_CALIBERS, REPORT_META } from '../data/luteinReportData';
import { CaliberId } from '../types';

export const OverviewHero: React.FC = () => {
  const [selectedCaliberId, setSelectedCaliberId] = useState<CaliberId>('annual');

  const activeCaliber =
    DATA_CALIBERS.find((item) => item.id === selectedCaliberId) ?? DATA_CALIBERS[0];

  return (
    <section id="overview" className="pt-6 pb-10 border-b border-slate-200 tech-grid-surface">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
        {/* Compact Platform Identity Header */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#4F46E5] text-white flex items-center justify-center shrink-0">
              <Microscope className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight [text-wrap:balance]">
                {REPORT_META.platformTitle}
              </h1>
              <p className="text-xs sm:text-sm text-slate-500">
                {REPORT_META.dataProvider}
                <span aria-hidden="true" className="mx-2">/</span>
                核心分析期間 {REPORT_META.primaryPeriod}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 md:text-right">
            <span>資料來源：{REPORT_META.dataProvider}</span>
            <span className="font-mono tabular-nums text-slate-700 font-medium">
              年度補充觀察 {REPORT_META.annualPeriod}
            </span>
          </div>
        </div>

        {/* Full-Width Deep Midnight Indigo Tech Command Panel */}
        <div className="tech-indigo-panel border border-[#2B2475] rounded-xl p-6 sm:p-7 text-white grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-7 flex flex-col justify-between gap-5">
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-mono font-semibold text-[#34D399] tracking-wide">
                  核心策略定調 · 口徑檢視器
                </span>
                <span className="text-xs font-mono text-indigo-200/80 tabular-nums">
                  4 組獨立樣本口徑
                </span>
              </div>

              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight [text-wrap:balance]">
                  {REPORT_META.coreDirection}
                </h2>
                <p className="text-xs sm:text-sm text-indigo-100/80 mt-2 leading-relaxed max-w-2xl">
                  社群輿情分析的價值不只是統計曝光次數，而是釐清消費者討論脈絡、選購資訊缺口與影響品牌信任的關鍵成因。
                </p>
              </div>
            </div>

            {/* Interactive Caliber Selector */}
            <div
              role="tablist"
              aria-label="資料統計口徑切換"
              className="grid grid-cols-2 sm:grid-cols-4 gap-2.5"
            >
              {DATA_CALIBERS.map((caliber) => {
                const active = caliber.id === selectedCaliberId;
                return (
                  <button
                    key={caliber.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setSelectedCaliberId(caliber.id)}
                    className={`px-3 py-2.5 rounded-lg text-left transition-colors duration-150 border cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#34D399] ${
                      active
                        ? 'bg-[#032D26] border-[#10B981] text-white'
                        : 'bg-white/5 border-white/10 text-indigo-100/80 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <div className="text-[11px] font-medium truncate">
                      {caliber.label}
                    </div>
                    <div className="text-sm font-mono font-bold tabular-nums mt-0.5 text-[#34D399]">
                      {caliber.headlineMetric}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Active Mint-Emerald Telemetry Sub-panel */}
          <div className="lg:col-span-5 bg-[#032D26] border border-[#065F46] rounded-lg p-5 flex flex-col justify-between gap-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#34D399]">
                  <Layers className="w-4 h-4 shrink-0" />
                  <span>{activeCaliber.label}</span>
                </div>
                <span className="font-mono text-xs text-emerald-200/80 tabular-nums">
                  {activeCaliber.period}
                </span>
              </div>

              <p className="text-xs text-emerald-50/90 leading-relaxed">
                {activeCaliber.summary}
              </p>

              <div className="grid grid-cols-1 gap-2 pt-2 border-t border-[#065F46]/80">
                {activeCaliber.breakdown.map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between text-xs gap-3"
                  >
                    <span className="text-emerald-100/80">{row.label}</span>
                    <span className="font-mono font-semibold tabular-nums text-white">
                      {row.value}
                      {row.share ? (
                        <span className="text-[#34D399] ml-1.5">({row.share})</span>
                      ) : null}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-[11px] font-mono text-emerald-200/75 leading-relaxed border-t border-[#065F46]/80 pt-2.5">
              口徑備註：{activeCaliber.caveat}
            </p>
          </div>
        </div>

        {/* Full-Width 4-Column KPI Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {DATA_CALIBERS.map((kpi) => {
            const isSelected = kpi.id === selectedCaliberId;
            return (
              <button
                key={kpi.id}
                type="button"
                onClick={() => setSelectedCaliberId(kpi.id)}
                className={`text-left rounded-xl p-5 border transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5] ${
                  isSelected
                    ? 'bg-[#ECFDF5] border-[#10B981]'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between gap-2 text-xs text-slate-500">
                  <span className="font-medium truncate">{kpi.label}</span>
                  <span className="font-mono tabular-nums shrink-0">{kpi.period}</span>
                </div>
                <div className="mt-2 text-2xl sm:text-3xl font-bold font-mono tabular-nums text-slate-900">
                  {kpi.headlineMetric}
                </div>
                <div className="mt-2 text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {kpi.breakdown[0]?.label}：{kpi.breakdown[0]?.value}
                  {kpi.breakdown[1] ? ` · ${kpi.breakdown[1].label} ${kpi.breakdown[1].value}` : ''}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
