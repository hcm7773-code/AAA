import React, { useState, useMemo } from 'react';
import {
  Briefcase,
  GraduationCap,
  Search,
  Award,
  Plus,
  X,
  Check,
  Sparkles,
} from 'lucide-react';
import { ExperienceItem } from '../types';
import { Language, translations } from '../data/translations';

interface ExperienceSectionProps {
  experiences: ExperienceItem[];
  onUpdateExperiences: (updated: ExperienceItem[]) => void;
  language: Language;
  isPreviewMode?: boolean;
}

const PRESET_BADGES_ZH = ['效能提升 40%', '團隊領導', '零重大故障', '架構重構'];
const PRESET_BADGES_EN = ['+40% Performance', 'Tech Lead', 'Zero Downtime', 'Architecture Revamp'];

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  experiences,
  onUpdateExperiences,
  language,
  isPreviewMode = false,
}) => {
  const [filterType, setFilterType] = useState<'all' | 'work' | 'education'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingExpId, setEditingExpId] = useState<string | null>(null);
  const [newBadgeText, setNewBadgeText] = useState('');

  const t = translations[language];

  const filteredExperiences = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return experiences.filter((exp) => {
      if (filterType !== 'all' && exp.type !== filterType) return false;
      if (!q) return true;
      const role = (language === 'en' && exp.roleEn ? exp.roleEn : exp.role).toLowerCase();
      const company = (language === 'en' && exp.companyEn ? exp.companyEn : exp.company).toLowerCase();
      const desc = (language === 'en' && exp.descriptionEn ? exp.descriptionEn : exp.description).toLowerCase();
      const skillsMatch = exp.skills.some((s) => s.toLowerCase().includes(q));
      return role.includes(q) || company.includes(q) || desc.includes(q) || skillsMatch;
    });
  }, [experiences, filterType, searchQuery, language]);

  const handleAddBadge = (expId: string, textToAdd?: string) => {
    const cleanText = (textToAdd ?? newBadgeText).trim();
    if (!cleanText) return;

    const updated = experiences.map((exp) => {
      if (exp.id !== expId) return exp;
      if (language === 'en') {
        const current = exp.achievementsEn || [];
        if (current.includes(cleanText)) return exp;
        return { ...exp, achievementsEn: [...current, cleanText] };
      } else {
        const current = exp.achievements || [];
        if (current.includes(cleanText)) return exp;
        return { ...exp, achievements: [...current, cleanText] };
      }
    });

    onUpdateExperiences(updated);
    if (!textToAdd) {
      setNewBadgeText('');
      setEditingExpId(null);
    }
  };

  const handleRemoveBadge = (expId: string, badgeIdx: number) => {
    const updated = experiences.map((exp) => {
      if (exp.id !== expId) return exp;
      if (language === 'en') {
        const current = [...(exp.achievementsEn || [])];
        current.splice(badgeIdx, 1);
        return { ...exp, achievementsEn: current };
      } else {
        const current = [...(exp.achievements || [])];
        current.splice(badgeIdx, 1);
        return { ...exp, achievements: current };
      }
    });
    onUpdateExperiences(updated);
  };

  return (
    <section id="section-experience" className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 tracking-tight">
            {t.expTitle}
          </h2>
          <p className="text-sm text-zinc-500 mt-1">{t.expSubtitle}</p>
        </div>

        {!isPreviewMode && (
          <div className="flex flex-wrap items-center gap-2 no-print">
            <div className="inline-flex rounded-lg border border-zinc-200 bg-white p-0.5">
              {(['all', 'work', 'education'] as const).map((type) => {
                const label =
                  type === 'all' ? t.filterAll : type === 'work' ? t.filterWork : t.filterEdu;
                const active = filterType === type;
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setFilterType(type)}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                      active
                        ? 'bg-theme-primary text-white shadow-xs'
                        : 'text-zinc-600 hover:text-zinc-900'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {!isPreviewMode && (
        <div className="relative no-print">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchExpPlaceholder}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-200 bg-white text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-400"
          />
        </div>
      )}

      {filteredExperiences.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-zinc-200 bg-white p-10 text-center text-sm text-zinc-500">
          {t.noExpMatch}
        </div>
      ) : (
        <div className="relative space-y-5 before:absolute before:left-[19px] before:top-4 before:bottom-4 before:w-px before:bg-zinc-200">
          {filteredExperiences.map((exp) => {
            const role = language === 'en' && exp.roleEn ? exp.roleEn : exp.role;
            const company = language === 'en' && exp.companyEn ? exp.companyEn : exp.company;
            const description =
              language === 'en' && exp.descriptionEn ? exp.descriptionEn : exp.description;
            const highlights =
              language === 'en' && exp.highlightsEn ? exp.highlightsEn : exp.highlights;
            const badges =
              language === 'en'
                ? exp.achievementsEn || exp.achievements || []
                : exp.achievements || [];
            const isEditingThis = editingExpId === exp.id;
            const presets = language === 'en' ? PRESET_BADGES_EN : PRESET_BADGES_ZH;

            return (
              <div key={exp.id} className="relative pl-12">
                <div
                  className={`absolute left-0 top-5 w-10 h-10 rounded-xl border flex items-center justify-center bg-white shadow-xs ${
                    exp.type === 'work'
                      ? 'border-zinc-200 text-theme-primary'
                      : 'border-zinc-200 text-zinc-500'
                  }`}
                >
                  {exp.type === 'work' ? (
                    <Briefcase className="w-4 h-4" />
                  ) : (
                    <GraduationCap className="w-4 h-4" />
                  )}
                </div>

                <div className="rounded-2xl border border-zinc-200/90 bg-white p-5 sm:p-6 shadow-xs hover:border-zinc-300 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-base sm:text-lg font-bold text-zinc-900">{role}</h3>
                        <span className="text-xs font-medium px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-600">
                          {exp.type === 'work' ? t.typeWork : t.typeEdu}
                        </span>
                      </div>
                      <p className="text-sm font-semibold text-theme-primary mt-0.5">{company}</p>
                    </div>
                    <span className="text-xs font-mono-tech font-medium text-zinc-500 bg-zinc-50 border border-zinc-200/80 px-2.5 py-1 rounded-lg self-start">
                      {exp.period}
                    </span>
                  </div>

                  <p className="text-sm text-zinc-600 leading-relaxed mt-3">{description}</p>

                  {/* Highlights */}
                  {highlights.length > 0 && (
                    <ul className="mt-4 space-y-1.5">
                      {highlights.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-sm text-zinc-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-theme-accent mt-2 shrink-0" />
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Editable Achievement Badges */}
                  <div className="mt-4 pt-4 border-t border-zinc-100">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mr-1">
                        <Award className="w-3.5 h-3.5" />
                        {t.achievementsLabel}
                      </span>

                      {badges.map((badge, idx) => (
                        <span
                          key={`${badge}-${idx}`}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-theme-accent-light text-theme-primary border border-zinc-200/60 text-xs font-semibold"
                        >
                          <Sparkles className="w-3 h-3 opacity-80" />
                          <span>{badge}</span>
                          {!isPreviewMode && (
                            <button
                              type="button"
                              onClick={() => handleRemoveBadge(exp.id, idx)}
                              className="no-print ml-0.5 text-zinc-400 hover:text-zinc-900 cursor-pointer"
                              aria-label="Remove badge"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          )}
                        </span>
                      ))}

                      {!isPreviewMode && !isEditingThis && (
                        <button
                          type="button"
                          onClick={() => {
                            setEditingExpId(exp.id);
                            setNewBadgeText('');
                          }}
                          className="no-print inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-dashed border-zinc-300 text-xs font-medium text-zinc-500 hover:text-zinc-900 hover:border-zinc-400 transition-colors cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                          <span>{t.addAchievement}</span>
                        </button>
                      )}
                    </div>

                    {isEditingThis && !isPreviewMode && (
                      <div className="mt-3 p-3 rounded-xl bg-zinc-50 border border-zinc-200 space-y-2.5 no-print">
                        <div className="flex flex-col sm:flex-row gap-2">
                          <input
                            type="text"
                            value={newBadgeText}
                            onChange={(e) => setNewBadgeText(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                handleAddBadge(exp.id);
                              }
                            }}
                            placeholder={t.achievementPlaceholder}
                            className="flex-1 px-3 py-1.5 rounded-lg border border-zinc-200 bg-white text-xs focus:outline-none focus:ring-2 focus:ring-zinc-900/10"
                          />
                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => handleAddBadge(exp.id)}
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-theme-primary text-white text-xs font-medium cursor-pointer"
                            >
                              <Check className="w-3.5 h-3.5" />
                              <span>{t.save}</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => setEditingExpId(null)}
                              className="px-3 py-1.5 rounded-lg border border-zinc-200 bg-white text-xs font-medium text-zinc-600 hover:text-zinc-900 cursor-pointer"
                            >
                              {t.cancel}
                            </button>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="text-[11px] text-zinc-400">{t.quickPresets}</span>
                          {presets.map((preset) => (
                            <button
                              key={preset}
                              type="button"
                              onClick={() => handleAddBadge(exp.id, preset)}
                              className="px-2 py-0.5 rounded-md bg-white border border-zinc-200 text-[11px] text-zinc-600 hover:text-zinc-900 hover:border-zinc-300 cursor-pointer"
                            >
                              + {preset}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Skill Tags */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {exp.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-0.5 rounded-md bg-zinc-100 text-zinc-700 text-xs font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
