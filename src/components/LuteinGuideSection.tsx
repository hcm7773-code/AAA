import React from 'react';
import { ExternalLink, CheckCircle2, Sparkles, ShieldCheck, Info } from 'lucide-react';
import luteinGuideImg from '../assets/images/theme_lutein_guide_1795584359388.jpg';

const LUTEIN_GUIDE_URL =
  'https://medicalnewstw.com/article/01-lutein-best/?prod=lutein&pg=best&act=all&site=mdn&kw=%E8%91%89%E9%BB%83%E7%B4%A0&gad_source=1&gad_camp=1&gad_619435551&gbraid=0AAAAAqKr4A-0cb3g6-wy-6gyKMuiLOuyF&gclid=CjwKCAiAn4XYBhA-EiwaA8176FYLY53CTADjSuCXsnwCT89jpyzBXX6DSBwThv_fmfCzhK4PZJtih3xoCNbwQAvD_BwE';

const GOLDEN_PRINCIPLES = [
  {
    index: '01',
    title: '游離型優於酯化型',
    desc: '游離型葉黃素分子量小、不需經酵素分解即可直接吸收，生體利用率表現更穩定。',
  },
  {
    index: '02',
    title: '10：2 科學黃金比例',
    desc: '依循美國 NIH 大型研究（AREDS2）實證，10mg 葉黃素搭配 2mg 玉米黃素為經典保護比例。',
  },
  {
    index: '03',
    title: '國際專利大廠原料',
    desc: '優先檢視是否採用 FloraGLO® 等具文獻與安全認證之專利游離型原料，品質與純度更有保障。',
  },
  {
    index: '04',
    title: '協同複方全面防護',
    desc: '搭配舒緩疲勞與維持潤澤的實證複方成分，更能因應長時間使用 3C 螢幕的用眼需求。',
  },
];

const COMPOUND_INGREDIENTS = [
  {
    name: '蝦紅素（Astaxanthin）',
    focus: '舒緩肌肉疲勞・提升視覺調節',
  },
  {
    name: '智利酒果（MaquiBright®）',
    focus: '維持晶亮潤澤・改善乾澀不適',
  },
  {
    name: '山桑子（花青素）',
    focus: '抗氧化守護・輔助暗處視覺適應',
  },
];

export const LuteinGuideSection: React.FC = () => {
  return (
    <section
      aria-label="葉黃素推薦與選購指南專題"
      className="w-full max-w-2xl mx-auto animate-enhanced-image-fade"
    >
      <div className="rounded-2xl border border-slate-200 bg-white shadow-xs overflow-hidden">
        {/* Theme Cover Image */}
        <a
          href={LUTEIN_GUIDE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full h-28 sm:h-36 bg-slate-100 overflow-hidden border-b border-slate-100 group"
          title="葉黃素推薦與選購指南專題"
        >
          <img
            src={luteinGuideImg}
            alt="葉黃素推薦與選購指南專題主題圖片"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </a>

        {/* Header Band */}
        <div className="p-5 sm:p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-700">
              <ShieldCheck className="w-4 h-4" />
              <span>專題導讀 · MEDICAL NEWS 評比解析</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
              葉黃素推薦與選購指南專題
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              彙整眼科與營養學四大挑選黃金原則、協同複方成分及日常補充建議
            </p>
          </div>

          <a
            href={LUTEIN_GUIDE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#0F172A] hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold transition-colors shrink-0 shadow-xs"
          >
            <span>開啟專題文章</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* 4 Golden Principles Grid */}
        <div className="p-5 sm:p-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {GOLDEN_PRINCIPLES.map((item) => (
              <div
                key={item.index}
                className="rounded-xl border border-slate-200/80 bg-slate-50/60 p-4 space-y-1.5"
              >
                <div className="flex items-center gap-2">
                  <span className="font-mono-tech text-xs font-bold text-amber-700">
                    {item.index}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Popular Compound Ingredients */}
          <div className="rounded-xl border border-amber-200/70 bg-amber-50/45 p-4 space-y-3">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>常見關鍵協同複方成分</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {COMPOUND_INGREDIENTS.map((ing) => (
                <div
                  key={ing.name}
                  className="rounded-lg bg-white border border-amber-100 px-3 py-2.5 space-y-1"
                >
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="truncate">{ing.name}</span>
                  </div>
                  <div className="text-[11px] text-slate-500">{ing.focus}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Daily Intake Tip & Direct Link Footer */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-slate-100">
            <div className="flex items-start gap-2 text-xs text-slate-500">
              <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <span>
                補充重點：葉黃素重在天天穩定累積，衛福部建議每日攝取量不超過 30mg。
              </span>
            </div>

            <a
              href={LUTEIN_GUIDE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#4F46E5] hover:text-[#4338CA] shrink-0"
            >
              <span>查看完整評比與選購指南</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
