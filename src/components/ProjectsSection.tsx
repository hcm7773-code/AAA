import React, { useState, useMemo } from 'react';
import { ExternalLink, Github, Search, X, Layers } from 'lucide-react';
import { ProjectItem } from '../types';
import { Language, translations } from '../data/translations';

interface ProjectsSectionProps {
  projects: ProjectItem[];
  language: Language;
  isPreviewMode?: boolean;
}

const CATEGORIES: Array<'All' | ProjectItem['category']> = [
  'All',
  'Frontend',
  'Fullstack',
  'UI/UX',
  'Mobile',
];

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects,
  language,
  isPreviewMode = false,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'All' | ProjectItem['category']>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const t = translations[language];

  const filteredProjects = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return projects.filter((proj) => {
      if (selectedCategory !== 'All' && proj.category !== selectedCategory) return false;
      if (!q) return true;
      const title = (language === 'en' && proj.titleEn ? proj.titleEn : proj.title).toLowerCase();
      const desc = (
        language === 'en' && proj.descriptionEn ? proj.descriptionEn : proj.description
      ).toLowerCase();
      const tagMatch = proj.tags.some((tag) => tag.toLowerCase().includes(q));
      return title.includes(q) || desc.includes(q) || tagMatch;
    });
  }, [projects, selectedCategory, searchQuery, language]);

  return (
    <section id="section-projects" className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 tracking-tight">
            {t.projectsTitle}
          </h2>
          <p className="text-sm text-zinc-500 mt-1">{t.projectsSubtitle}</p>
        </div>

        {!isPreviewMode && (
          <div className="flex flex-wrap items-center gap-1 rounded-lg border border-zinc-200 bg-white p-0.5 self-start no-print">
            {CATEGORIES.map((cat) => {
              const active = selectedCategory === cat;
              const label = cat === 'All' ? t.filterAll : cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
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
        )}
      </div>

      {!isPreviewMode && (
        <div className="relative no-print">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchProjectPlaceholder}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-200 bg-white text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900/10"
          />
        </div>
      )}

      {filteredProjects.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-zinc-200 bg-white p-10 text-center text-sm text-zinc-500">
          {t.noProjectMatch}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredProjects.map((project) => {
            const title = language === 'en' && project.titleEn ? project.titleEn : project.title;
            const description =
              language === 'en' && project.descriptionEn
                ? project.descriptionEn
                : project.description;

            return (
              <article
                key={project.id}
                onClick={() => !isPreviewMode && setActiveProject(project)}
                className={`group rounded-2xl border border-zinc-200/90 bg-white overflow-hidden shadow-xs transition-all ${
                  !isPreviewMode ? 'hover:border-zinc-300 hover:-translate-y-0.5 hover:shadow-md cursor-pointer' : ''
                }`}
              >
                <div className="aspect-video w-full bg-zinc-100 overflow-hidden relative border-b border-zinc-100">
                  {failedImages[project.id] ? (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-100 text-zinc-400 p-4 text-center">
                      <Layers className="w-8 h-8 mb-2 opacity-60" />
                      <span className="text-xs font-medium text-zinc-500">{title}</span>
                    </div>
                  ) : (
                    <img
                      src={project.imageUrl}
                      alt={title}
                      referrerPolicy="no-referrer"
                      onError={() =>
                        setFailedImages((prev) => ({ ...prev, [project.id]: true }))
                      }
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  )}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="px-2.5 py-1 rounded-md bg-white/95 backdrop-blur-xs border border-zinc-200/80 text-[11px] font-semibold text-zinc-800 shadow-xs">
                      {project.category}
                    </span>
                    <span className="px-2 py-1 rounded-md bg-zinc-900/85 text-[11px] font-mono-tech font-medium text-white">
                      {project.year}
                    </span>
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-base font-bold text-zinc-900 group-hover:text-theme-primary transition-colors">
                      {title}
                    </h3>
                  </div>

                  <p className="text-sm text-zinc-600 leading-relaxed line-clamp-2">
                    {description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 rounded-md bg-zinc-100 text-zinc-700 text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {!isPreviewMode && (
                    <div className="pt-2 flex items-center justify-between border-t border-zinc-100 no-print">
                      <span className="text-xs font-semibold text-theme-primary">
                        {t.viewDetails} →
                      </span>
                      <div
                        className="flex items-center gap-2"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 transition-colors"
                            aria-label={t.sourceCode}
                          >
                            <Github className="w-4 h-4" />
                          </a>
                        )}
                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 transition-colors"
                            aria-label={t.liveDemo}
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Project Details Modal */}
      {activeProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/55 backdrop-blur-xs no-print"
          onClick={() => setActiveProject(null)}
        >
          <div
            className="bg-white rounded-2xl border border-zinc-200 shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-video bg-zinc-100 border-b border-zinc-200">
              <img
                src={activeProject.imageUrl}
                alt={
                  language === 'en' && activeProject.titleEn
                    ? activeProject.titleEn
                    : activeProject.title
                }
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => setActiveProject(null)}
                className="absolute top-3 right-3 p-2 rounded-full bg-white/95 text-zinc-700 hover:text-zinc-900 shadow-md cursor-pointer"
                aria-label={t.closeModal}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              <div>
                <div className="flex items-center gap-2 text-xs text-zinc-500 mb-1">
                  <span className="font-semibold text-theme-primary">{activeProject.category}</span>
                  <span>·</span>
                  <span className="font-mono-tech">{activeProject.year}</span>
                </div>
                <h3 className="text-xl font-bold text-zinc-900">
                  {language === 'en' && activeProject.titleEn
                    ? activeProject.titleEn
                    : activeProject.title}
                </h3>
              </div>

              <p className="text-sm text-zinc-600 leading-relaxed">
                {language === 'en' && activeProject.descriptionEn
                  ? activeProject.descriptionEn
                  : activeProject.description}
              </p>

              {(activeProject.details || activeProject.detailsEn) && (
                <div className="rounded-xl bg-zinc-50 border border-zinc-200/80 p-4 space-y-1.5">
                  <div className="text-xs font-semibold text-zinc-900">{t.projectOverview}</div>
                  <p className="text-sm text-zinc-600 leading-relaxed">
                    {language === 'en' && activeProject.detailsEn
                      ? activeProject.detailsEn
                      : activeProject.details}
                  </p>
                </div>
              )}

              <div>
                <div className="text-xs font-semibold text-zinc-900 mb-2">{t.techStack}</div>
                <div className="flex flex-wrap gap-1.5">
                  {activeProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md bg-zinc-100 text-zinc-700 text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-end gap-2.5 pt-4 border-t border-zinc-100">
                {activeProject.githubUrl && (
                  <a
                    href={activeProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-zinc-200 text-xs font-medium text-zinc-700 hover:bg-zinc-50"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>{t.sourceCode}</span>
                  </a>
                )}
                {activeProject.link && (
                  <a
                    href={activeProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-theme-primary bg-theme-primary-hover text-white text-xs font-medium"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>{t.liveDemo}</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
