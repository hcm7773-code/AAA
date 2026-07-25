import React, { useState } from 'react';
import { SkillCategory } from '../types';
import { Code2, Wrench, Layers, CheckCircle2, BarChart2 } from 'lucide-react';

interface SkillsSectionProps {
  categories: SkillCategory[];
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ categories }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

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

  return (
    <section className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-zinc-200/80">
        <h2 className="text-base font-bold text-zinc-900 flex items-center gap-2 tracking-tight">
          <span className="w-5 h-[1.5px] bg-zinc-900"></span>
          專業技能清單 (Technical Skills)
        </h2>

        <div className="flex flex-wrap items-center gap-2">
          {/* Category Filter Tabs */}
          <div className="flex items-center bg-zinc-100 p-1 rounded-lg border border-zinc-200 text-xs font-medium">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1 rounded transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-white text-zinc-900 font-bold shadow-xs'
                  : 'text-zinc-500 hover:text-zinc-900'
              }`}
            >
              全部類別
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
                {c.category.split(' ')[0]}
              </button>
            ))}
          </div>

          {/* Search input */}
          <div className="relative">
            <input
              type="text"
              placeholder="搜尋技能 (例如: React, Docker...)"
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

      {/* Skill Categories Grid */}
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
                    {filteredSkills.map((skill, sIdx) => (
                      <div
                        key={sIdx}
                        className="group p-2 bg-zinc-50/70 border border-zinc-200/80 rounded-md hover:border-zinc-400 hover:bg-white transition-all space-y-1.5"
                      >
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-zinc-800 flex items-center gap-1.5">
                            {skill.name}
                            <span className="text-[10px] font-normal text-zinc-400 bg-zinc-200/60 px-1.5 py-0.2 rounded font-mono">
                              {skill.tag}
                            </span>
                          </span>
                          <span className="text-[11px] font-mono text-zinc-500 font-semibold">
                            {skill.level}%
                          </span>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full bg-zinc-200 rounded-full h-1.5 overflow-hidden">
                          <div
                            className="bg-zinc-800 h-1.5 rounded-full transition-all duration-500 group-hover:bg-black"
                            style={{ width: `${skill.level}%` }}
                          ></div>
                        </div>

                        <div className="flex items-center justify-between text-[10px] text-zinc-400 font-mono pt-0.5">
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
    </section>
  );
};
