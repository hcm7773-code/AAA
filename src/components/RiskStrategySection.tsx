import React, { useState } from 'react';
import { ShieldAlert, CheckSquare, Square, ArrowRight } from 'lucide-react';
import { CRISIS_STAGES, STRATEGIC_ACTIONS } from '../data/luteinReportData';

export const RiskStrategySection: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [checkedActions, setCheckedActions] = useState<Record<string, boolean>>({
    content: true,
    trust: true,
  });

  const currentStage =
    CRISIS_STAGES.find((s) => s.step === activeStep) ?? CRISIS_STAGES[0];

  const toggleAction = (id: string) => {
    setCheckedActions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const selectedCount = Object.values(checkedActions).filter(Boolean).length;

  return (
    <section id="risk-strategy" className="py-12 bg-[#F8FAFC]">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Part 1: 5-Stage Crisis Response Workflow */}
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-1.5">
              <span className="text-xs font-mono font-semibold text-[#4F46E5]">
                04 · 輿情風險辨識與應變機制
              </span>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                五階段危機管理與持續監測流程
              </h2>
              <p className="text-sm text-slate-600 max-w-3xl">
                重點防範產品效果爭議、品牌信任危機與社會責任期待；於促銷期間、KOL 貼文後及聲量異常高峰日強化檢視。
              </p>
            </div>
            <div className="inline-flex items-center gap-2 text-xs font-medium text-rose-700 bg-rose-50 border border-rose-200 rounded-lg px-3 py-2 self-start md:self-auto">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>核心風險：產品效果期待落差與誠信質疑</span>
            </div>
          </div>

          {/* Interactive 5-Stage Horizontal Stepper */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-6">
            <div
              role="tablist"
              aria-label="輿情應變五階段"
              className="grid grid-cols-1 sm:grid-cols-5 gap-2.5"
            >
              {CRISIS_STAGES.map((stage) => {
                const isActive = stage.step === activeStep;
                return (
                  <button
                    key={stage.step}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveStep(stage.step)}
                    className={`p-3.5 rounded-lg border text-left transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5] ${
                      isActive
                        ? 'bg-[#110C3B] border-[#110C3B] text-white'
                        : 'bg-[#F8FAFC] border-slate-200 text-slate-800 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className={isActive ? 'text-[#34D399]' : 'text-[#4F46E5]'}>
                        STAGE 0{stage.step}
                      </span>
                      <span className={isActive ? 'text-indigo-200' : 'text-slate-500'}>
                        {stage.horizon}
                      </span>
                    </div>
                    <div className="text-sm font-bold mt-1 flex items-center justify-between">
                      <span>{stage.phase}</span>
                      {stage.step < 5 && (
                        <ArrowRight
                          className={`w-3.5 h-3.5 hidden sm:inline ${
                            isActive ? 'text-[#34D399]' : 'text-slate-400'
                          }`}
                        />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Stage Operational Detail */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
              <div className="lg:col-span-5 bg-[#ECFDF5] border border-[#A7F3D0] rounded-lg p-5 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-[#047857]">
                  <span className="font-semibold">
                    階段 0{currentStage.step} · {currentStage.phase}
                  </span>
                  <span>{currentStage.horizon}</span>
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  {currentStage.focus}
                </h3>
                <div className="space-y-1.5 pt-2 border-t border-[#A7F3D0]">
                  <div className="text-xs font-semibold text-[#065F46]">
                    關鍵觸發與監控時機
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-800">
                    {currentStage.triggers.map((trig) => (
                      <li key={trig} className="flex items-start gap-2">
                        <span className="font-mono text-[#059669]">·</span>
                        <span>{trig}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="lg:col-span-7 bg-[#F8FAFC] border border-slate-200 rounded-lg p-5 space-y-3">
                <div className="text-xs font-semibold text-slate-700">
                  標準應變與執行清單
                </div>
                <div className="divide-y divide-slate-200">
                  {currentStage.actions.map((act, idx) => (
                    <div
                      key={act}
                      className="py-3 first:pt-1 last:pb-1 flex items-start gap-3 text-sm text-slate-800"
                    >
                      <span className="font-mono text-xs font-bold text-[#4F46E5] tabular-nums pt-0.5">
                        0{idx + 1}
                      </span>
                      <span className="leading-relaxed">{act}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-2 border-t border-slate-200 text-xs text-slate-500">
                  應變節奏區分：短期著重官方聲明、專責小組與專家可查證資訊；中長期著重讓消費者參與產品改進、定期檢驗公開與客服一致性培訓。
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Part 2: 5 Strategic Recommendations */}
        <div id="action-recommendations" className="space-y-6 scroll-mt-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1.5">
              <span className="text-xs font-mono font-semibold text-[#4F46E5]">
                05 · 結論與行動藍圖
              </span>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                五大品牌行銷與輿情管理行動建議
              </h2>
              <p className="text-sm text-slate-600">
                以「透明溝通、精準內容、持續監測」為核心，建立長期口碑與競爭優勢。
              </p>
            </div>
            <div className="text-xs font-mono text-slate-600 tabular-nums">
              已勾選納入執行清單：{selectedCount} / {STRATEGIC_ACTIONS.length} 項
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {STRATEGIC_ACTIONS.map((item) => {
              const checked = !!checkedActions[item.id];
              return (
                <div
                  key={item.id}
                  className={`rounded-xl border p-5 flex flex-col justify-between gap-4 transition-colors ${
                    checked
                      ? 'bg-white border-[#4F46E5]'
                      : 'bg-white border-slate-200'
                  }`}
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-mono font-semibold text-[#4F46E5]">
                        {item.pillar}
                      </span>
                      <button
                        type="button"
                        onClick={() => toggleAction(item.id)}
                        aria-label={`標記 ${item.pillar} 為優先執行`}
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 cursor-pointer"
                      >
                        {checked ? (
                          <CheckSquare className="w-4 h-4 text-[#059669]" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-400" />
                        )}
                        <span>{checked ? '優先執行' : '加入清單'}</span>
                      </button>
                    </div>
                    <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {item.recommendation}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 space-y-1 text-xs text-slate-500">
                    <div>
                      <span className="font-semibold text-slate-700">核心受眾：</span>
                      {item.targetAudience}
                    </div>
                    <div>
                      <span className="font-semibold text-slate-700">追蹤指標：</span>
                      {item.kpiFocus}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Core Thesis Summary Card */}
            <div className="tech-indigo-panel border border-[#2B2475] rounded-xl p-6 text-white flex flex-col justify-between gap-4">
              <div className="space-y-2">
                <span className="text-xs font-mono font-semibold text-[#34D399]">
                  報告總結核心方向
                </span>
                <h3 className="text-xl font-bold tracking-tight">
                  透明溝通 · 精準內容 · 持續監測
                </h3>
                <p className="text-xs sm:text-sm text-indigo-100/85 leading-relaxed">
                  社群輿情分析不只是統計品牌被討論多少次，而是理解消費者為什麼討論、在意哪些規格與檢驗資訊，並轉化為長期品牌信任。
                </p>
              </div>
              <div className="pt-3 border-t border-white/10 text-[11px] font-mono text-indigo-200/80">
                資料口徑：2025/10–2026/10 年度大盤與 2026/08–2026/10 社群輿情樣本
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
