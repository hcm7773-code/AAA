import React, { useState } from 'react';
import { SkillCategory } from '../types';
import { Language, translations } from '../data/translations';
import { ThemeId, getThemeById } from '../data/themes';
import {
  Code2,
  Wrench,
  Layers,
  CheckCircle2,
  BarChart2,
  ArrowUpDown,
  ArrowDown,
  ArrowUp,
  PieChart,
  LayoutGrid,
  Target,
  Sparkles,
  Award,
} from 'lucide-react';

interface SkillsSectionProps {
  categories: SkillCategory[];
  lang?: Language;
  themeId?: ThemeId;
}

interface RadarAxis {
  label: string;
  enLabel: string;
  score: number;
  benchmark: number;
  description: string;
  relatedSkills: string[];
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ categories, lang = 'zh', themeId = 'zinc' }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc' | 'default'>('desc');
  const [viewMode, setViewMode] = useState<'cards' | 'pie' | 'radar'>('cards');
  const [activePieIndex, setActivePieIndex] = useState<number | null>(null);
  const [activeRadarAxis, setActiveRadarAxis] = useState<number | null>(null);

  const t = translations[lang];
  const themeObj = getThemeById((themeId || 'zinc') as ThemeId);

  const getCategoryIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Code2 className="w-4 h-4 text-zinc-700" />;
      case 1:
        return <Layers className="w-4 h-4 text-zinc-700" />;
      case 2:
      default:
        return <Wrench className="w-4 h-4 text-zinc-700" />;
    }
  };

  // Color palette for Pie Chart Slices based on active theme
  const sliceColors = [
    themeObj.primaryColor,
    themeObj.accentColor,
    themeObj.primaryHover,
    '#52525b',
    '#71717a',
  ];

  // Calculate stats for Pie Chart
  const pieData = categories.map((cat, idx) => {
    const totalLevel = cat.skills.reduce((acc, s) => acc + s.level, 0);
    const avgLevel = cat.skills.length > 0 ? Math.round(totalLevel / cat.skills.length) : 0;
    return {
      category: cat.category,
      skills: cat.skills,
      totalLevel,
      avgLevel,
      count: cat.skills.length,
      color: sliceColors[idx % sliceColors.length],
    };
  });

  const grandTotalLevel = pieData.reduce((acc, d) => acc + d.totalLevel, 0);

  // Radar Chart Domains & Values
  const radarAxes: RadarAxis[] = [
    {
      label: '前端與系統架構',
      enLabel: 'Frontend Architecture',
      score: 95,
      benchmark: 80,
      description: 'Micro-frontends 模組化設計、大型 React/TypeScript 專案建置與跨平台組件庫',
      relatedSkills: ['React', 'TypeScript', 'Micro-frontends', 'Vite', 'Design System'],
    },
    {
      label: '團隊領導與 Mentoring',
      enLabel: 'Team Leadership',
      score: 88,
      benchmark: 75,
      description: '帶領 6+ 人工程團隊、制定 Code Review 規範、Codebase 品質與技術人才培育',
      relatedSkills: ['Code Review', 'Agile/Scrum', 'Tech Mentoring', 'CI/CD Pipeline'],
    },
    {
      label: 'UI/UX 互動與溝通',
      enLabel: 'UI/UX & Communication',
      score: 92,
      benchmark: 78,
      description: '設計系統建置、WCAG 無障礙規範、與 PM/UI 設計師高效跨領域對齊',
      relatedSkills: ['Tailwind CSS', 'Figma', 'WCAG AA', 'Design Tokens'],
    },
    {
      label: '效能優化與監控',
      enLabel: 'Performance & Ops',
      score: 90,
      benchmark: 82,
      description: 'Web Vitals LCP 提升 45%、極致打包包體瘦身、記憶體洩漏除錯與即時串流監控',
      relatedSkills: ['LCP/Web Vitals', 'GraphQL', 'WebSocket', 'Performance Tuning'],
    },
    {
      label: '敏捷開發與 DevOps',
      enLabel: 'Agile & DevOps',
      score: 86,
      benchmark: 70,
      description: '自動化測試流程部署、Docker 容器化開發與單元/整合測試涵蓋率提升',
      relatedSkills: ['Docker', 'Node.js', 'Git Flow', 'CI/CD Automation'],
    },
    {
      label: '商業思考與產品規劃',
      enLabel: 'Product & Business Strategy',
      score: 85,
      benchmark: 72,
      description: '從使用者痛點出發轉化為技術指標、協助決策產品 Roadmap 與指標量化',
      relatedSkills: ['Product Roadmap', 'User Analytics', 'A/B Testing', 'ROI Tracking'],
    },
  ];

  // Radar geometry calculations
  const radarCx = 180;
  const radarCy = 180;
  const radarRadius = 120;
  const numAxes = radarAxes.length;

  const getAxisAngle = (index: number) => {
    return (index * 2 * Math.PI) / numAxes - Math.PI / 2;
  };

  const getCoordinates = (index: number, score: number) => {
    const angle = getAxisAngle(index);
    const r = (score / 100) * radarRadius;
    return {
      x: radarCx + r * Math.cos(angle),
      y: radarCy + r * Math.sin(angle),
    };
  };

  const candidatePolygonPoints = radarAxes
    .map((axis, i) => {
      const { x, y } = getCoordinates(i, axis.score);
      return `${x},${y}`;
    })
    .join(' ');

  const benchmarkPolygonPoints = radarAxes
    .map((axis, i) => {
      const { x, y } = getCoordinates(i, axis.benchmark);
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <section className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-zinc-200/80">
        <h2 className="text-base font-bold text-zinc-900 flex items-center gap-2 tracking-tight">
          <span className="w-5 h-[1.5px] bg-theme-primary"></span>
          {t.skillsTitle}
        </h2>

        <div className="flex flex-wrap items-center gap-2">
          {/* View Mode Toggle Switcher */}
          <div className="flex items-center bg-zinc-100 p-1 rounded-lg border border-zinc-200 text-xs font-medium no-print">
            <button
              onClick={() => setViewMode('cards')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded transition-all ${
                viewMode === 'cards'
                  ? 'bg-white text-zinc-900 font-bold shadow-2xs'
                  : 'text-zinc-500 hover:text-zinc-900'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>{t.barChartBtn}</span>
            </button>
            <button
              onClick={() => setViewMode('pie')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded transition-all ${
                viewMode === 'pie'
                  ? 'bg-white text-zinc-900 font-bold shadow-2xs'
                  : 'text-zinc-500 hover:text-zinc-900'
              }`}
            >
              <PieChart className="w-3.5 h-3.5" />
              <span>{t.pieChartBtn}</span>
            </button>
            <button
              onClick={() => setViewMode('radar')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded transition-all ${
                viewMode === 'radar'
                  ? 'bg-white text-zinc-900 font-bold shadow-2xs'
                  : 'text-zinc-500 hover:text-zinc-900'
              }`}
            >
              <Target className="w-3.5 h-3.5 text-zinc-900" />
              <span>{t.radarChartBtn}</span>
            </button>
          </div>

          {/* Category Filter Tabs */}
          {viewMode === 'cards' && (
            <div className="flex items-center bg-zinc-100 p-1 rounded-lg border border-zinc-200 text-xs font-medium">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3 py-1 rounded transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-white text-zinc-900 font-bold shadow-xs'
                    : 'text-zinc-500 hover:text-zinc-900'
                }`}
              >
                {t.allCategories}
              </button>
              {categories.map((c) => (
                <button
                  key={c.category}
                  onClick={() => setSelectedCategory(c.category)}
                  className={`px-3 py-1 rounded transition-colors ${
                    selectedCategory === c.category
                      ? 'bg-white text-zinc-900 font-bold shadow-xs'
                      : 'text-zinc-500 hover:text-zinc-900'
                  }`}
                >
                  {lang === 'en' && c.categoryEn ? c.categoryEn.split(' ')[0] : c.category.split(' ')[0]}
                </button>
              ))}
            </div>
          )}

          {/* Search input */}
          {viewMode === 'cards' && (
            <div className="relative">
              <input
                type="text"
                placeholder={t.searchSkillsPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-3 py-1.5 text-xs bg-zinc-50 border border-zinc-200 rounded-md outline-none focus:border-zinc-500 w-full sm:w-44 transition-colors"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 text-xs"
                >
                  ✕
                </button>
              )}
            </div>
          )}

          {/* Proficiency Sort Toggle Button */}
          {viewMode === 'cards' && (
            <div className="flex items-center bg-zinc-100 p-1 rounded-lg border border-zinc-200 text-xs font-medium shrink-0 no-print">
              <button
                type="button"
                onClick={() => {
                  if (sortOrder === 'desc') setSortOrder('asc');
                  else if (sortOrder === 'asc') setSortOrder('default');
                  else setSortOrder('desc');
                }}
                className="flex items-center gap-1.5 px-2.5 py-1 bg-white text-zinc-900 rounded font-bold shadow-2xs hover:bg-zinc-50 transition-colors"
                title="點擊切換熟練度排序模式"
              >
                {sortOrder === 'desc' && (
                  <>
                    <ArrowDown className="w-3.5 h-3.5 text-zinc-800" />
                    <span>熟練度高→低</span>
                  </>
                )}
                {sortOrder === 'asc' && (
                  <>
                    <ArrowUp className="w-3.5 h-3.5 text-zinc-800" />
                    <span>熟練度低→高</span>
                  </>
                )}
                {sortOrder === 'default' && (
                  <>
                    <ArrowUpDown className="w-3.5 h-3.5 text-zinc-400" />
                    <span className="text-zinc-600">預設排序</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* VIEW MODE 1: Capability Radar Chart */}
      {viewMode === 'radar' ? (
        <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-xs space-y-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 border-b border-zinc-100 pb-6">
            {/* SVG Interactive Radar Chart */}
            <div className="relative w-full max-w-[380px] aspect-square shrink-0 flex items-center justify-center p-2 bg-zinc-50/50 rounded-2xl border border-zinc-200/80">
              <svg viewBox="0 0 360 360" className="w-full h-full">
                {/* Background Concentric Grid Polygons (20%, 40%, 60%, 80%, 100%) */}
                {[0.2, 0.4, 0.6, 0.8, 1.0].map((level, lIdx) => {
                  const pts = radarAxes
                    .map((_, i) => {
                      const { x, y } = getCoordinates(i, level * 100);
                      return `${x},${y}`;
                    })
                    .join(' ');
                  return (
                    <g key={lIdx}>
                      <polygon
                        points={pts}
                        fill="none"
                        stroke={lIdx === 4 ? '#d4d4d8' : '#e4e4e7'}
                        strokeWidth={lIdx === 4 ? '1.5' : '1'}
                        strokeDasharray={lIdx < 4 ? '2 2' : undefined}
                      />
                      {/* Scale Label */}
                      <text
                        x={radarCx + 4}
                        y={radarCy - level * radarRadius + 10}
                        fontSize="8"
                        fontFamily="monospace"
                        fill="#a1a1aa"
                      >
                        {level * 100}%
                      </text>
                    </g>
                  );
                })}

                {/* Radial Axis Lines */}
                {radarAxes.map((_, i) => {
                  const { x, y } = getCoordinates(i, 100);
                  return (
                    <line
                      key={i}
                      x1={radarCx}
                      y1={radarCy}
                      x2={x}
                      y2={y}
                      stroke="#e4e4e7"
                      strokeWidth="1"
                    />
                  );
                })}

                {/* Industry Benchmark Polygon */}
                <polygon
                  points={benchmarkPolygonPoints}
                  fill="rgba(161, 161, 170, 0.1)"
                  stroke="#a1a1aa"
                  strokeWidth="1.5"
                  strokeDasharray="4 3"
                />

                {/* Candidate Capability Polygon */}
                <polygon
                  points={candidatePolygonPoints}
                  fill={themeObj.primaryColor}
                  fillOpacity={0.2}
                  stroke={themeObj.primaryColor}
                  strokeWidth="2.5"
                  className="transition-all duration-300"
                />

                {/* Interactive Points on Polygon */}
                {radarAxes.map((axis, i) => {
                  const { x, y } = getCoordinates(i, axis.score);
                  const isHovered = activeRadarAxis === i;

                  return (
                    <g
                      key={i}
                      className="cursor-pointer group"
                      onMouseEnter={() => setActiveRadarAxis(i)}
                      onMouseLeave={() => setActiveRadarAxis(null)}
                    >
                      <circle
                        cx={x}
                        cy={y}
                        r={isHovered ? '7' : '4.5'}
                        fill={themeObj.primaryColor}
                        stroke="#ffffff"
                        strokeWidth="2"
                        className="transition-all duration-200"
                      />
                      {isHovered && (
                        <circle
                          cx={x}
                          cy={y}
                          r="12"
                          fill={themeObj.primaryColor}
                          fillOpacity={0.2}
                          className="animate-ping"
                        />
                      )}
                    </g>
                  );
                })}

                {/* Axis Labels Around Radar */}
                {radarAxes.map((axis, i) => {
                  const { x, y } = getCoordinates(i, 118);
                  const isHovered = activeRadarAxis === i;

                  let textAnchor: 'start' | 'middle' | 'end' = 'middle';
                  if (x > radarCx + 20) textAnchor = 'start';
                  else if (x < radarCx - 20) textAnchor = 'end';

                  return (
                    <g
                      key={i}
                      className="cursor-pointer"
                      onMouseEnter={() => setActiveRadarAxis(i)}
                      onMouseLeave={() => setActiveRadarAxis(null)}
                    >
                      <text
                        x={x}
                        y={y}
                        textAnchor={textAnchor}
                        fontSize="10"
                        fontWeight={isHovered ? 'bold' : '600'}
                        fill={isHovered ? '#000000' : '#3f3f46'}
                        className="transition-colors"
                      >
                        {axis.label.split(' ')[0]}
                      </text>
                      <text
                        x={x}
                        y={y + 12}
                        textAnchor={textAnchor}
                        fontSize="9"
                        fontFamily="monospace"
                        fontWeight="bold"
                        fill={isHovered ? '#18181b' : '#71717a'}
                      >
                        {axis.score}%
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Radar Insights & Domain Breakdown List */}
            <div className="flex-1 w-full space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-100 pb-2">
                <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  綜合能力分佈與資深指標 (Senior Professional Competency)
                </h3>
                <div className="flex items-center gap-3 text-[11px] font-mono no-print">
                  <span className="flex items-center gap-1 text-zinc-900 font-bold">
                    <span className="w-2.5 h-2.5 bg-zinc-900 rounded-sm"></span>
                    個人評估
                  </span>
                  <span className="flex items-center gap-1 text-zinc-400">
                    <span className="w-2.5 h-2.5 bg-zinc-300 rounded-sm"></span>
                    資深基準 (80%)
                  </span>
                </div>
              </div>

              {/* Grid of Domain Scores */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {radarAxes.map((axis, idx) => {
                  const isHovered = activeRadarAxis === idx;
                  return (
                    <div
                      key={idx}
                      onMouseEnter={() => setActiveRadarAxis(idx)}
                      onMouseLeave={() => setActiveRadarAxis(null)}
                      className={`p-3.5 rounded-lg border transition-all cursor-pointer ${
                        isHovered
                          ? 'bg-zinc-900 text-white border-zinc-900 shadow-md scale-[1.01]'
                          : 'bg-zinc-50/80 border-zinc-200 text-zinc-800 hover:border-zinc-300 hover:bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span
                          className={`text-xs font-bold ${
                            isHovered ? 'text-white' : 'text-zinc-900'
                          }`}
                        >
                          {axis.label}
                        </span>
                        <span
                          className={`text-xs font-mono font-bold px-1.5 py-0.5 rounded ${
                            isHovered
                              ? 'bg-zinc-800 text-amber-300'
                              : 'bg-white border border-zinc-200 text-zinc-900'
                          }`}
                        >
                          {axis.score}%
                        </span>
                      </div>

                      <p
                        className={`text-[11px] leading-relaxed line-clamp-2 mb-2 ${
                          isHovered ? 'text-zinc-300' : 'text-zinc-500'
                        }`}
                      >
                        {axis.description}
                      </p>

                      <div className="flex flex-wrap gap-1">
                        {axis.relatedSkills.map((sk, skIdx) => (
                          <span
                            key={skIdx}
                            className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                              isHovered
                                ? 'bg-zinc-800 text-zinc-200 border border-zinc-700'
                                : 'bg-white border border-zinc-200 text-zinc-600'
                            }`}
                          >
                            #{sk}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Active Hovered Domain Spotlight Detail Box */}
          <div className="p-4 bg-zinc-900 text-white rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                  {activeRadarAxis !== null
                    ? radarAxes[activeRadarAxis].label
                    : '資深架構師綜合點評'}
                </span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed max-w-3xl">
                {activeRadarAxis !== null
                  ? radarAxes[activeRadarAxis].description
                  : '具備全方位前端架構領導能力，跨足效能極限優化、團隊敏捷帶領與產品商業邏輯對齊。'}
              </p>
            </div>
            <div className="text-right shrink-0">
              <span className="text-[10px] text-zinc-400 font-mono block">綜合成就分數</span>
              <span className="text-2xl font-bold font-mono text-white">
                {activeRadarAxis !== null ? radarAxes[activeRadarAxis].score : '91'} / 100
              </span>
            </div>
          </div>
        </div>
      ) : viewMode === 'pie' ? (
        <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-xs space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-zinc-100 pb-6">
            {/* SVG Donut Chart */}
            <div className="relative w-64 h-64 shrink-0 flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                {(() => {
                  const radius = 38;
                  const circumference = 2 * Math.PI * radius;
                  let accumulatedPercent = 0;

                  return pieData.map((d, i) => {
                    const percent = grandTotalLevel > 0 ? d.totalLevel / grandTotalLevel : 0;
                    const strokeDasharray = `${percent * circumference} ${circumference}`;
                    const strokeDashoffset = -accumulatedPercent * circumference;
                    accumulatedPercent += percent;

                    const isHovered = activePieIndex === i;

                    return (
                      <circle
                        key={i}
                        cx="50"
                        cy="50"
                        r={radius}
                        fill="transparent"
                        stroke={d.color}
                        strokeWidth={isHovered ? '16' : '12'}
                        strokeDasharray={strokeDasharray}
                        strokeDashoffset={strokeDashoffset}
                        className="transition-all duration-300 cursor-pointer origin-center"
                        onMouseEnter={() => setActivePieIndex(i)}
                        onMouseLeave={() => setActivePieIndex(null)}
                      />
                    );
                  });
                })()}
              </svg>

              {/* Inner Stats Overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none p-4">
                {activePieIndex !== null ? (
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block">
                      {pieData[activePieIndex].category.split(' ')[0]}
                    </span>
                    <span className="text-xl font-bold text-zinc-900 font-mono block">
                      {Math.round(
                        (pieData[activePieIndex].totalLevel / (grandTotalLevel || 1)) * 100
                      )}
                      %
                    </span>
                    <span className="text-[11px] text-zinc-500 font-medium">
                      均標 {pieData[activePieIndex].avgLevel}%
                    </span>
                  </div>
                ) : (
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block">
                      技能領域總體
                    </span>
                    <span className="text-xl font-bold text-zinc-900 font-mono block">
                      {categories.length} 大領域
                    </span>
                    <span className="text-[11px] text-zinc-500 font-medium">
                      共 {categories.reduce((acc, c) => acc + c.skills.length, 0)} 項專業
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Category Breakdown Cards & Legend */}
            <div className="flex-1 w-full space-y-3">
              <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider flex items-center justify-between">
                <span>技能領域權重佔比 (Domain Weight Distribution)</span>
                <span className="text-[10px] text-zinc-400 font-normal">懸停圓餅圖檢視細節</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {pieData.map((d, idx) => {
                  const share = Math.round((d.totalLevel / (grandTotalLevel || 1)) * 100);
                  const isHovered = activePieIndex === idx;

                  return (
                    <div
                      key={idx}
                      onMouseEnter={() => setActivePieIndex(idx)}
                      onMouseLeave={() => setActivePieIndex(null)}
                      className={`p-3.5 rounded-lg border transition-all cursor-pointer ${
                        isHovered
                          ? 'bg-zinc-900 text-white border-zinc-900 shadow-md scale-[1.02]'
                          : 'bg-zinc-50/80 border-zinc-200 text-zinc-800 hover:border-zinc-300 hover:bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span
                            className="w-2.5 h-2.5 rounded-full shrink-0"
                            style={{ backgroundColor: d.color }}
                          ></span>
                          <span className={`text-xs font-bold truncate ${isHovered ? 'text-white' : 'text-zinc-900'}`}>
                            {d.category}
                          </span>
                        </div>
                        <span
                          className={`text-xs font-mono font-bold px-1.5 py-0.5 rounded ${
                            isHovered
                              ? 'bg-zinc-800 text-zinc-200'
                              : 'bg-white border border-zinc-200 text-zinc-900'
                          }`}
                        >
                          {share}%
                        </span>
                      </div>

                      <div className="space-y-1.5 text-[11px] font-mono">
                        <div className="flex justify-between">
                          <span className={isHovered ? 'text-zinc-400' : 'text-zinc-500'}>
                            技能數量
                          </span>
                          <span className={isHovered ? 'text-zinc-200' : 'text-zinc-700'}>
                            {d.count} 項
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className={isHovered ? 'text-zinc-400' : 'text-zinc-500'}>
                            平均熟練度
                          </span>
                          <span className={isHovered ? 'text-zinc-200' : 'text-zinc-700'}>
                            {d.avgLevel}%
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Detailed Skill Chips in Selected / Hovered Category */}
          <div className="pt-2">
            <h4 className="text-xs font-bold text-zinc-700 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-zinc-900"></span>
              {activePieIndex !== null
                ? `${pieData[activePieIndex].category} 涵蓋技能與熟練度`
                : '全領域專業技能熟練度一覽'}
            </h4>

            <div className="flex flex-wrap gap-2">
              {(activePieIndex !== null ? [categories[activePieIndex]] : categories).flatMap((c) =>
                c.skills.map((s, sIdx) => (
                  <div
                    key={`${c.category}-${sIdx}`}
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-zinc-50 border border-zinc-200 rounded-lg text-xs hover:border-zinc-400 hover:bg-white transition-all shadow-2xs"
                  >
                    <span className="font-bold text-zinc-900">{s.name}</span>
                    <span className="text-[10px] text-zinc-400 font-mono bg-zinc-200/60 px-1.5 py-0.2 rounded">
                      {s.tag}
                    </span>
                    <span className="text-[11px] font-mono font-bold text-zinc-900 bg-white border border-zinc-200 px-1.5 py-0.2 rounded">
                      {s.level}%
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      ) : (
        /* VIEW MODE 2: Standard Card Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories
            .filter((cat) => selectedCategory === 'all' || cat.category === selectedCategory)
            .map((cat, idx) => {
              const filteredSkills = cat.skills.filter((s) =>
                s.name.toLowerCase().includes(searchTerm.toLowerCase())
              );

              if (searchTerm && filteredSkills.length === 0) return null;

              const categoryAvgLevel =
                cat.skills.length > 0
                  ? Math.round(cat.skills.reduce((acc, s) => acc + s.level, 0) / cat.skills.length)
                  : 0;

              const sortedSkills = [...filteredSkills].sort((a, b) => {
                if (sortOrder === 'desc') return b.level - a.level;
                if (sortOrder === 'asc') return a.level - b.level;
                return 0;
              });

              return (
                <div
                  key={idx}
                  className="bg-white border border-zinc-200 rounded-lg p-5 flex flex-col justify-between shadow-xs hover:border-zinc-300 transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3 pb-2 border-b border-zinc-100">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-zinc-100 rounded border border-zinc-200">
                          {getCategoryIcon(idx)}
                        </div>
                        <h3 className="font-bold text-zinc-900 text-sm">{cat.category}</h3>
                      </div>
                      <span className="text-[10px] text-zinc-400 font-mono">
                        {filteredSkills.length} 項
                      </span>
                    </div>

                    {/* Category Overall Proficiency Visual Bar */}
                    <div className="mb-4 bg-zinc-50/90 p-2.5 rounded-md border border-zinc-200/80 space-y-1.5">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-semibold text-zinc-700 flex items-center gap-1.5">
                          <BarChart2 className="w-3.5 h-3.5 text-zinc-700" />
                          領域總體熟練度
                        </span>
                        <span className="font-mono font-bold text-zinc-900 bg-white border border-zinc-200 px-1.5 py-0.5 rounded text-[10px] shadow-2xs">
                          {categoryAvgLevel}%
                        </span>
                      </div>
                      <div className="w-full bg-zinc-200/90 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-zinc-900 h-2 rounded-full transition-all duration-700"
                          style={{ width: `${categoryAvgLevel}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Skill List Items */}
                    <div className="space-y-3">
                      {sortedSkills.map((skill, sIdx) => (
                        <div
                          key={sIdx}
                          className="group p-2.5 bg-zinc-50/80 border border-zinc-200/80 rounded-md hover:border-zinc-400 hover:bg-white transition-all space-y-2"
                        >
                          <div className="flex items-center justify-between text-xs gap-2">
                            <div className="flex items-center gap-1.5 min-w-0">
                              <span className="font-bold text-zinc-900 truncate">
                                {skill.name}
                              </span>
                              <span className="text-[10px] font-normal text-zinc-500 bg-zinc-200/60 px-1.5 py-0.5 rounded font-mono shrink-0">
                                {skill.tag}
                              </span>
                            </div>

                            {/* Inline Visual Level Indicator Bar & Percentage */}
                            <div className="flex items-center gap-2 shrink-0">
                              <div
                                className="w-16 sm:w-20 bg-zinc-200/90 rounded-full h-2 overflow-hidden border border-zinc-200"
                                title={`熟練度: ${skill.level}%`}
                              >
                                <div
                                  className="bg-zinc-900 group-hover:bg-black h-2 rounded-full transition-all duration-500"
                                  style={{ width: `${skill.level}%` }}
                                ></div>
                              </div>
                              <span className="text-[11px] font-mono font-bold text-zinc-900 bg-white border border-zinc-200 px-1.5 py-0.5 rounded shadow-2xs">
                                {skill.level}%
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between text-[10px] text-zinc-400 font-mono pt-0.5 border-t border-zinc-100/80">
                            <span>經驗 {skill.years} 年</span>
                            <span className="flex items-center gap-0.5 text-emerald-600 font-medium">
                              <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                              熟練運用
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-zinc-100 text-[11px] text-zinc-400 flex items-center justify-between font-mono">
                    <span>分類：{cat.category.split(' ')[0]}</span>
                    <span>狀態：持續維護中</span>
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </section>
  );
};

