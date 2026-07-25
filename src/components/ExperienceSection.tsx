import React, { useState } from 'react';
import { ExperienceItem } from '../types';
import { Briefcase, GraduationCap, Calendar, ChevronRight, Sparkles } from 'lucide-react';

interface ExperienceSectionProps {
  experiences: ExperienceItem[];
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ experiences }) => {
  const [filter, setFilter] = useState<'all' | 'work' | 'education'>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredItems = experiences.filter((item) => {
    const matchesType = filter === 'all' || item.type === filter;
    const matchesSearch =
      searchTerm === '' ||
      item.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.skills.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesType && matchesSearch;
  });

  return (
    <section className="space-y-6">
      {/* Header & Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-zinc-200/80">
        <h2 className="text-base font-bold text-zinc-900 flex items-center gap-2 tracking-tight">
          <span className="w-5 h-[1.5px] bg-zinc-900"></span>
          經歷與教育背景 (Resume Timeline)
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
              全部 ({experiences.length})
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
              工作經歷
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
              學歷背景
            </button>
          </div>

          {/* Search Box */}
          <div className="relative">
            <input
              type="text"
              placeholder="搜尋公司或關鍵字..."
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
        </div>
      </div>

      {/* Timeline List */}
      <div className="space-y-6 relative before:absolute before:left-3.5 before:top-3 before:bottom-3 before:w-[1px] before:bg-zinc-200 pl-2">
        {filteredItems.map((item) => (
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
            <div className="bg-white border border-zinc-200 rounded-lg p-5 shadow-xs hover:border-zinc-300 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                <span className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold text-zinc-400 tracking-wider">
                  <Calendar className="w-3 h-3 text-zinc-400" />
                  {item.period}
                </span>
                <span className="text-[11px] px-2 py-0.5 bg-zinc-100 text-zinc-600 rounded border border-zinc-200 font-mono self-start sm:self-auto">
                  {item.type === 'work' ? '全職工作' : '學術學位'}
                </span>
              </div>

              <h3 className="font-bold text-zinc-900 text-base">
                {item.role}{' '}
                <span className="font-normal text-zinc-500 text-sm">
                  @ {item.company}
                </span>
              </h3>

              <p className="text-xs sm:text-sm text-zinc-600 mt-2 leading-relaxed">
                {item.description}
              </p>

              {/* Highlights List */}
              {item.highlights && item.highlights.length > 0 && (
                <ul className="mt-3.5 space-y-1.5 border-t border-zinc-100 pt-3">
                  {item.highlights.map((point, idx) => (
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
        ))}
      </div>
    </section>
  );
};
