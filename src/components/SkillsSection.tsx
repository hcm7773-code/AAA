import React, { useState, useMemo } from 'react';
import { BarChart3, PieChart as PieIcon, Radar, Search, ArrowUpDown } from 'lucide-react';
import { SkillCategory } from '../types';
import { Language, translations } from '../data/translations';
import { getThemeById, ThemeId } from '../data/themes';

interface SkillsSectionProps {
  skillCategories: SkillCategory[];
  language: Language;
  themeId?: ThemeId;
  isPreviewMode?: boolean;
}

type ViewMode = 'list' | 'pie' | 'radar';
type SortOrder = 'default' | 'desc' | 'asc';

export const SkillsSection: React.FC<SkillsSectionProps> = ({
  skillCategories,
  language,
  themeId = 'zinc',
  isPreviewMode = false,
}) => {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<SortOrder>('default');
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const t = translations[language];
  const activeTheme = getThemeById((themeId || 'zinc') as ThemeId);

  const categoryNames = useMemo(
    () =>
      skillCategories.map((cat) => ({
        key: cat.category,
        label: language === 'en' && cat.categoryEn ? cat.categoryEn : cat.category,
      })),
    [skillCategories, language]
  );

  const filteredCategories = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return skillCategories
      .filter((cat) => selectedCategory === 'all' || cat.category === selectedCategory)
      .map((cat) => {
        const filteredSkills = cat.skills.filter((s) => {
          if (!q) return true;
          return s.name.toLowerCase().includes(q) || s.tag.toLowerCase().includes(q);
        });

        const sortedSkills = [...filteredSkills];
        if (sortOrder === 'desc') {
          sortedSkills.sort((a, b) => b.level - a.level);
        } else if (sortOrder === 'asc') {
          sortedSkills.sort((a, b) => a.level - b.level);
        }

        return {
          ...cat,
          skills: sortedSkills,
        };
      })
      .filter((cat) => cat.skills.length > 0);
  }, [skillCategories, selectedCategory, searchQuery, sortOrder]);

  const flatSkills = useMemo(
    () => filteredCategories.flatMap((c) => c.skills),
    [filteredCategories]
  );

  // Pie Chart Calculations
  const pieSegments = useMemo(() => {
    const total = flatSkills.reduce((sum, s) => sum + s.level, 0) || 1;
    let cumulativeAngle = -Math.PI / 2;
    const palette = [
      activeTheme.primary,
      activeTheme.accent,
      '#52525b',
      '#71717a',
      '#a1a1aa',
      '#27272a',
    ];

    return flatSkills.slice(0, 8).map((skill, index) => {
      const sliceAngle = (skill.level / total) * Math.PI * 2;
      const startAngle = cumulativeAngle;
      const endAngle = cumulativeAngle + sliceAngle;
      cumulativeAngle = endAngle;

      const r = 82;
      const cx = 110;
      const cy = 110;
      const x1 = cx + r * Math.cos(startAngle);
      const y1 = cy + r * Math.sin(startAngle);
      const x2 = cx + r * Math.cos(endAngle);
      const y2 = cy + r * Math.sin(endAngle);
      const largeArcFlag = sliceAngle > Math.PI ? 1 : 0;

      const d = `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
      return {
        skill,
        d,
        color: palette[index % palette.length],
        share: Math.round((skill.level / total) * 100),
      };
    });
  }, [flatSkills, activeTheme]);

  // Radar Chart Calculations (up to 6 top skills)
  const radarData = useMemo(() => {
    const items = flatSkills.slice(0, 6);
    if (items.length < 3) return null;
    const cx = 150;
    const cy = 140;
    const maxR = 92;
    const count = items.length;

    const getPoint = (index: number, valueRatio: number) => {
      const angle = (Math.PI * 2 * index) / count - Math.PI / 2;
      return {
        x: cx + maxR * valueRatio * Math.cos(angle),
        y: cy + maxR * valueRatio * Math.sin(angle),
      };
    };

    const rings = [0.25, 0.5, 0.75, 1].map((ratio) =>
      items
        .map((_, idx) => {
          const pt = getPoint(idx, ratio);
          return `${pt.x},${pt.y}`;
        })
        .join(' ')
    );

    const polygonPoints = items
      .map((item, idx) => {
        const pt = getPoint(idx, item.level / 100);
        return `${pt.x},${pt.y}`;
      })
      .join(' ');

    const vertices = items.map((item, idx) => {
      const pt = getPoint(idx, item.level / 100);
      const labelPt = getPoint(idx, 1.24);
      const axisPt = getPoint(idx, 1);
      return { item, pt, labelPt, axisPt };
    });

    return { cx, cy, rings, polygonPoints, vertices };
  }, [flatSkills]);

  return (
    <section id="section-skills" className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 tracking-tight">
            {t.skillsTitle}
          </h2>
          <p className="text-sm text-zinc-500 mt-1">{t.skillsSubtitle}</p>
        </div>

        {!isPreviewMode && (
          <div className="inline-flex rounded-lg border border-zinc-200 bg-white p-0.5 self-start no-print">
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                viewMode === 'list'
                  ? 'bg-theme-primary text-white shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>{t.viewList}</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('pie')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                viewMode === 'pie'
                  ? 'bg-theme-primary text-white shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              <PieIcon className="w-3.5 h-3.5" />
              <span>{t.viewPie}</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('radar')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                viewMode === 'radar'
                  ? 'bg-theme-primary text-white shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              <Radar className="w-3.5 h-3.5" />
              <span>{t.viewRadar}</span>
            </button>
          </div>
        )}
      </div>

      {!isPreviewMode && (
        <div className="flex flex-col md:flex-row gap-3 no-print">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchSkillPlaceholder}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-zinc-200 bg-white text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900/10"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 rounded-xl border border-zinc-200 bg-white text-xs font-medium text-zinc-700 focus:outline-none cursor-pointer"
            >
              <option value="all">{t.filterAll}</option>
              {categoryNames.map((cat) => (
                <option key={cat.key} value={cat.key}>
                  {cat.label}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={() =>
                setSortOrder((prev) =>
                  prev === 'default' ? 'desc' : prev === 'desc' ? 'asc' : 'default'
                )
              }
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-zinc-200 bg-white text-xs font-medium text-zinc-700 hover:bg-zinc-50 cursor-pointer"
            >
              <ArrowUpDown className="w-3.5 h-3.5 text-zinc-500" />
              <span>
                {sortOrder === 'default'
                  ? t.sortDefault
                  : sortOrder === 'desc'
                  ? t.sortDesc
                  : t.sortAsc}
              </span>
            </button>
          </div>
        </div>
      )}

      {filteredCategories.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-zinc-200 bg-white p-10 text-center text-sm text-zinc-500">
          {t.noSkillMatch}
        </div>
      ) : viewMode === 'list' || isPreviewMode ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filteredCategories.map((cat) => {
            const catTitle = language === 'en' && cat.categoryEn ? cat.categoryEn : cat.category;
            const avg = Math.round(
              cat.skills.reduce((sum, s) => sum + s.level, 0) / cat.skills.length
            );
            return (
              <div
                key={cat.category}
                className="rounded-2xl border border-zinc-200/90 bg-white p-5 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 pb-3 border-b border-zinc-100">
                    <h3 className="text-sm font-bold text-zinc-900">{catTitle}</h3>
                    <span className="text-[11px] font-mono-tech text-zinc-500">
                      {cat.skills.length} {t.skillCountUnit}
                    </span>
                  </div>

                  <div className="mt-4 space-y-3.5">
                    {cat.skills.map((skill) => (
                      <div key={skill.name} className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-semibold text-zinc-800">{skill.name}</span>
                          <span className="font-mono-tech text-zinc-500 tabular-nums">
                            {skill.level}% · {skill.years} {t.yearsUnit}
                          </span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-zinc-100 overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{
                              width: `${skill.level}%`,
                              backgroundColor: activeTheme.primary,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-500">
                  <span>{t.avgProficiency}</span>
                  <span className="font-mono-tech font-bold text-theme-primary">{avg}%</span>
                </div>
              </div>
            );
          })}
        </div>
      ) : viewMode === 'pie' ? (
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="flex justify-center">
              <svg viewBox="0 0 220 220" className="w-56 h-56 overflow-visible">
                {pieSegments.map((seg) => {
                  const isHovered = hoveredSkill === seg.skill.name;
                  return (
                    <path
                      key={seg.skill.name}
                      d={seg.d}
                      fill={seg.color}
                      stroke="#ffffff"
                      strokeWidth={2}
                      opacity={hoveredSkill && !isHovered ? 0.45 : 1}
                      className="transition-opacity cursor-pointer"
                      onMouseEnter={() => setHoveredSkill(seg.skill.name)}
                      onMouseLeave={() => setHoveredSkill(null)}
                    />
                  );
                })}
                <circle cx="110" cy="110" r="42" fill="#ffffff" />
                <text
                  x="110"
                  y="106"
                  textAnchor="middle"
                  className="text-[11px] fill-zinc-400 font-medium"
                >
                  {hoveredSkill ? hoveredSkill.slice(0, 12) : t.avgProficiency}
                </text>
                <text
                  x="110"
                  y="124"
                  textAnchor="middle"
                  className="text-sm font-bold fill-zinc-900"
                >
                  {hoveredSkill
                    ? `${pieSegments.find((s) => s.skill.name === hoveredSkill)?.skill.level ?? 0}%`
                    : `${Math.round(
                        flatSkills.reduce((a, b) => a + b.level, 0) / (flatSkills.length || 1)
                      )}%`}
                </text>
              </svg>
            </div>

            <div className="space-y-2">
              {pieSegments.map((seg) => (
                <div
                  key={seg.skill.name}
                  onMouseEnter={() => setHoveredSkill(seg.skill.name)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg border transition-colors cursor-pointer ${
                    hoveredSkill === seg.skill.name
                      ? 'border-zinc-300 bg-zinc-50'
                      : 'border-zinc-100 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span
                      className="w-3 h-3 rounded-sm shrink-0"
                      style={{ backgroundColor: seg.color }}
                    />
                    <span className="text-xs font-medium text-zinc-800 truncate">
                      {seg.skill.name}
                    </span>
                  </div>
                  <span className="text-xs font-mono-tech text-zinc-500 shrink-0 ml-2">
                    {seg.skill.level}% ({seg.share}%)
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-xs">
          {radarData ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="flex justify-center">
                <svg viewBox="0 0 300 280" className="w-full max-w-[320px] h-auto overflow-visible">
                  {radarData.rings.map((points, i) => (
                    <polygon
                      key={i}
                      points={points}
                      fill="none"
                      stroke="#e4e4e7"
                      strokeWidth={1}
                    />
                  ))}
                  {radarData.vertices.map((v, i) => (
                    <line
                      key={i}
                      x1={radarData.cx}
                      y1={radarData.cy}
                      x2={v.axisPt.x}
                      y2={v.axisPt.y}
                      stroke="#e4e4e7"
                      strokeWidth={1}
                    />
                  ))}
                  <polygon
                    points={radarData.polygonPoints}
                    fill={activeTheme.primary}
                    fillOpacity={0.18}
                    stroke={activeTheme.primary}
                    strokeWidth={2}
                  />
                  {radarData.vertices.map((v) => (
                    <g key={v.item.name}>
                      <circle cx={v.pt.x} cy={v.pt.y} r={4} fill={activeTheme.primary} />
                      <text
                        x={v.labelPt.x}
                        y={v.labelPt.y}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="text-[10px] font-semibold fill-zinc-700"
                      >
                        {v.item.name.split('/')[0].trim()}
                      </text>
                    </g>
                  ))}
                </svg>
              </div>

              <div className="space-y-2.5">
                {radarData.vertices.map(({ item }) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between px-3 py-2 rounded-lg bg-zinc-50 border border-zinc-200/70"
                  >
                    <div>
                      <div className="text-xs font-semibold text-zinc-900">{item.name}</div>
                      <div className="text-[11px] text-zinc-500">
                        {item.tag} · {item.years} {t.yearsUnit}
                      </div>
                    </div>
                    <div className="text-sm font-mono-tech font-bold text-theme-primary">
                      {item.level}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center text-sm text-zinc-500 py-8">{t.noSkillMatch}</div>
          )}
        </div>
      )}
    </section>
  );
};
