import React, { useState, useEffect } from 'react';
import { ExperienceItem } from '../types';
import { Language, translations } from '../data/translations';
import { Briefcase, GraduationCap, Calendar, ChevronRight, Sparkles, Award, Edit3, Plus, X, Check } from 'lucide-react';

interface ExperienceSectionProps {
  experiences: ExperienceItem[];
  lang?: Language;
  onUpdateExperiences?: (updated: ExperienceItem[]) => void;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  experiences,
  lang = 'zh',
  onUpdateExperiences,
}) => {
  const [filter, setFilter] = useState<'all' | 'work' | 'education'>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [items, setItems] = useState<ExperienceItem[]>(experiences);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [newTagInput, setNewTagInput] = useState<string>('');

  const t = translations[lang];

  useEffect(() => {
    setItems(experiences);
  }, [experiences]);

  const updateItems = (newItems: ExperienceItem[]) => {
    setItems(newItems);
    if (onUpdateExperiences) {
      onUpdateExperiences(newItems);
    }
  };

  const handleToggleEditAchievements = (itemId: string) => {
    if (editingItemId === itemId) {
      setEditingItemId(null);
      setNewTagInput('');
    } else {
      setEditingItemId(itemId);
      setNewTagInput('');
    }
  };

  const handleAddAchievement = (itemId: string, tag: string) => {
    const trimmed = tag.trim();
    if (!trimmed) return;

    const newItems = items.map((item) => {
      if (item.id === itemId) {
        const current = item.achievements || [];
        if (current.includes(trimmed)) return item;
        return {
          ...item,
          achievements: [...current, trimmed],
        };
      }
      return item;
    });

    updateItems(newItems);
    setNewTagInput('');
  };

  const handleRemoveAchievement = (itemId: string, indexToRemove: number) => {
    const newItems = items.map((item) => {
      if (item.id === itemId && item.achievements) {
        return {
          ...item,
          achievements: item.achievements.filter((_, idx) => idx !== indexToRemove),
        };
      }
      return item;
    });

    updateItems(newItems);
  };

  const filteredItems = items.filter((item) => {
    const matchesType = filter === 'all' || item.type === filter;
    const matchesSearch =
      searchTerm === '' ||
      item.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.achievements &&
        item.achievements.some((a) => a.toLowerCase().includes(searchTerm.toLowerCase()))) ||
      item.skills.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesType && matchesSearch;
  });

  return (
    <section className="space-y-6">
      {/* Header & Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-zinc-200/80">
        <h2 className="text-base font-bold text-zinc-900 flex items-center gap-2 tracking-tight">
          <span className="w-5 h-[1.5px] bg-theme-primary"></span>
          {t.expTitle}
        </h2>

        <div className="flex flex-wrap items-center gap-2">
          {/* Tab Filters */}
          <div className="flex items-center bg-zinc-100 p-1 rounded-lg border border-zinc-200 text-xs font-medium self-start sm:self-auto">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded transition-colors ${
                filter === 'all'
                  ? 'bg-white text-zinc-900 font-bold shadow-xs'
                  : 'text-zinc-500 hover:text-zinc-900'
              }`}
            >
              {t.allTypes} ({items.length})
            </button>
            <button
              onClick={() => setFilter('work')}
              className={`px-3 py-1 rounded transition-colors flex items-center gap-1 ${
                filter === 'work'
                  ? 'bg-white text-zinc-900 font-bold shadow-xs'
                  : 'text-zinc-500 hover:text-zinc-900'
              }`}
            >
              <Briefcase className="w-3 h-3" />
              {t.workType}
            </button>
            <button
              onClick={() => setFilter('education')}
              className={`px-3 py-1 rounded transition-colors flex items-center gap-1 ${
                filter === 'education'
                  ? 'bg-white text-zinc-900 font-bold shadow-xs'
                  : 'text-zinc-500 hover:text-zinc-900'
              }`}
            >
              <GraduationCap className="w-3 h-3" />
              {t.eduType}
            </button>
          </div>

          {/* Search Box */}
          <div className="relative">
            <input
              type="text"
              placeholder={t.searchExpPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-3 py-1.5 text-xs bg-zinc-50 border border-zinc-200 rounded-md outline-none focus:border-zinc-500 w-full sm:w-48 transition-colors"
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
        </div>
      </div>

      {/* Timeline List */}
      <div className="space-y-6 relative before:absolute before:left-3.5 before:top-3 before:bottom-3 before:w-[1px] before:bg-zinc-200 pl-2">
        {filteredItems.map((item) => {
          const roleStr = lang === 'en' ? (item.roleEn || item.role) : item.role;
          const companyStr = lang === 'en' ? (item.companyEn || item.company) : item.company;
          const descStr = lang === 'en' ? (item.descriptionEn || item.description) : item.description;
          const highlightsList = lang === 'en' && item.highlightsEn ? item.highlightsEn : item.highlights;
          const achievementsList = lang === 'en' && item.achievementsEn ? item.achievementsEn : item.achievements;

          return (
            <div key={item.id} className="relative pl-8 group">
              {/* Timeline node icon dot */}
              <div className="absolute left-0 top-1 w-7 h-7 rounded-full bg-white border border-zinc-300 flex items-center justify-center text-zinc-600 group-hover:border-zinc-900 group-hover:bg-zinc-900 group-hover:text-white transition-all shadow-xs">
                {item.type === 'work' ? (
                  <Briefcase className="w-3.5 h-3.5" />
                ) : (
                  <GraduationCap className="w-3.5 h-3.5" />
                )}
              </div>

              {/* Timeline Item Content Card */}
              <div className="bg-white border border-zinc-200 rounded-lg p-5 shadow-xs hover:shadow-md hover:-translate-y-1 hover:border-zinc-300 transition-all duration-300">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                  <span className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold text-zinc-400 tracking-wider">
                    <Calendar className="w-3 h-3 text-zinc-400" />
                    {item.period}
                  </span>
                  <span className="text-[11px] px-2 py-0.5 bg-zinc-100 text-zinc-600 rounded border border-zinc-200 font-mono self-start sm:self-auto">
                    {item.type === 'work' ? (lang === 'en' ? 'Full-time Work' : '全職工作') : (lang === 'en' ? 'Academic Degree' : '學術學位')}
                  </span>
                </div>

                <h3 className="font-bold text-zinc-900 text-base">
                  {roleStr}{' '}
                  <span className="font-normal text-zinc-500 text-sm">
                    @ {companyStr}
                  </span>
                </h3>

                <p className="text-xs sm:text-sm text-zinc-600 mt-2 leading-relaxed">
                  {descStr}
                </p>

                {/* Achievements Badges Section */}
                <div className="mt-3.5 pt-3 border-t border-zinc-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-zinc-600 uppercase tracking-wider flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-amber-500" />
                      {t.achievements}
                    </span>
                    <button
                      onClick={() => handleToggleEditAchievements(item.id)}
                      className="text-[11px] text-zinc-500 hover:text-zinc-900 font-medium flex items-center gap-1 px-2 py-0.5 rounded hover:bg-zinc-100 border border-transparent hover:border-zinc-200 transition-colors no-print"
                      title="編輯成就標籤"
                    >
                      <Edit3 className="w-3 h-3 text-zinc-400" />
                      {editingItemId === item.id ? (lang === 'en' ? 'Done' : '完成編輯') : (lang === 'en' ? 'Edit Badges' : '編輯標籤')}
                    </button>
                  </div>

                  {/* Badges List */}
                  {achievementsList && achievementsList.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {achievementsList.map((badge, bIdx) => (
                        <span
                          key={bIdx}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-50/90 text-amber-950 border border-amber-200/90 rounded-md text-xs font-semibold shadow-2xs transition-all hover:border-amber-300"
                        >
                          <span>{badge}</span>
                          {editingItemId === item.id && (
                            <button
                              onClick={() => handleRemoveAchievement(item.id, bIdx)}
                              className="text-amber-700 hover:text-rose-600 ml-0.5 p-0.5 rounded hover:bg-amber-100 transition-colors no-print"
                              title="刪除此標籤"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          )}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-zinc-400 italic">
                      {lang === 'en' ? 'No achievements added yet.' : '尚無設定成就標籤'}
                    </p>
                  )}

                  {/* Editing Inline Panel */}
                  {editingItemId === item.id && (
                    <div className="mt-3 p-3 bg-zinc-50 rounded-lg border border-zinc-200 space-y-2.5 no-print">
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          placeholder={lang === 'en' ? 'Enter achievement tag (e.g. 🏆 Top Performer)...' : '輸入成就標籤 (例如: 🏆 專案績效特優)...'}
                          value={newTagInput}
                          onChange={(e) => setNewTagInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleAddAchievement(item.id, newTagInput);
                            }
                          }}
                          className="flex-1 px-2.5 py-1.5 text-xs bg-white border border-zinc-300 rounded outline-none focus:border-zinc-500"
                        />
                        <button
                          onClick={() => handleAddAchievement(item.id, newTagInput)}
                          className="px-3 py-1.5 bg-zinc-900 hover:bg-black text-white rounded text-xs font-bold transition-colors flex items-center gap-1 shrink-0"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          {lang === 'en' ? 'Add Tag' : '新增標籤'}
                        </button>
                      </div>

                      {/* Quick Preset Badges */}
                      <div className="flex flex-wrap items-center gap-1.5 text-[11px] pt-1.5 border-t border-zinc-200/80">
                        <span className="text-zinc-500 font-medium flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-amber-500" />
                          {lang === 'en' ? 'Suggestions:' : '快速建議：'}
                        </span>
                        {(lang === 'en' 
                          ? ['🏆 Best Employee', '🚀 30% Speed Boost', '🏅 Project Award', '⭐ 100% On Time', '🎓 Scholarship']
                          : ['🏆 最佳員工獎', '🚀 效能提升 30%', '🏅 專案獲獎', '⭐ 100% 準時交付', '🎓 優秀學業獎學金']
                        ).map((preset, pIdx) => (
                          <button
                            key={pIdx}
                            type="button"
                            onClick={() => handleAddAchievement(item.id, preset)}
                            className="px-2 py-0.5 bg-white border border-zinc-200 text-zinc-700 hover:text-black hover:border-zinc-400 rounded text-[11px] transition-colors"
                          >
                            + {preset}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Highlights List */}
                {highlightsList && highlightsList.length > 0 && (
                  <ul className="mt-3.5 space-y-1.5 border-t border-zinc-100 pt-3">
                    {highlightsList.map((point, idx) => (
                      <li
                        key={idx}
                        className="text-xs text-zinc-600 flex items-start gap-2 leading-normal"
                      >
                        <ChevronRight className="w-3.5 h-3.5 text-zinc-400 shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Skills Tags */}
                <div className="mt-4 flex flex-wrap gap-1.5 pt-2">
                  {item.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2.5 py-1 bg-zinc-50 text-zinc-700 border border-zinc-200 rounded text-[11px] font-medium"
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
    </section>
  );
};
