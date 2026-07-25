import React, { useState } from 'react';
import { ProjectItem } from '../types';
import { FolderGit2, ExternalLink, Github, Eye, X } from 'lucide-react';

interface ProjectsSectionProps {
  projects: ProjectItem[];
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Frontend', 'Fullstack', 'UI/UX'];

  const filteredProjects = projects.filter((p) => {
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    const matchesSearch =
      searchQuery === '' ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-zinc-200/80">
        <h2 className="text-base font-bold text-zinc-900 flex items-center gap-2 tracking-tight">
          <span className="w-5 h-[1.5px] bg-zinc-900"></span>
          精選作品集 (Featured Projects)
        </h2>

        <div className="flex flex-wrap items-center gap-2">
          {/* Categories Tabs */}
          <div className="flex items-center gap-1 bg-zinc-100 p-1 rounded-lg border border-zinc-200 text-xs font-medium self-start sm:self-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1 rounded transition-colors ${
                  activeCategory === cat
                    ? 'bg-white text-zinc-900 font-bold shadow-xs'
                    : 'text-zinc-500 hover:text-zinc-900'
                }`}
              >
                {cat === 'All' ? '全部作品' : cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative">
            <input
              type="text"
              placeholder="搜尋作品或標籤..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-3 py-1.5 text-xs bg-zinc-50 border border-zinc-200 rounded-md outline-none focus:border-zinc-500 w-full sm:w-44 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 text-xs"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="group bg-white border border-zinc-200 rounded-lg overflow-hidden flex flex-col justify-between hover:border-zinc-400 transition-all shadow-xs"
          >
            <div>
              {/* Image Thumbnail */}
              <div className="relative aspect-video bg-zinc-100 overflow-hidden border-b border-zinc-200">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-zinc-900/80 backdrop-blur-xs text-white text-[10px] font-mono px-2.5 py-1 rounded uppercase tracking-wider">
                  {project.year}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5">
                <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-400 mb-1">
                  <FolderGit2 className="w-3.5 h-3.5" />
                  <span>{project.category}</span>
                </div>

                <h3 className="text-base font-bold text-zinc-900 group-hover:text-black transition-colors mb-2">
                  {project.title}
                </h3>

                <p className="text-xs text-zinc-600 line-clamp-2 leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 bg-zinc-100 text-zinc-600 border border-zinc-200/80 rounded text-[10px] font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="px-5 py-3.5 bg-zinc-50 border-t border-zinc-100 flex items-center justify-between text-xs">
              <button
                onClick={() => setSelectedProject(project)}
                className="text-zinc-700 hover:text-black font-medium flex items-center gap-1 hover:underline"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>檢視專案細節</span>
              </button>

              <div className="flex items-center gap-3 text-zinc-500">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-black transition-colors"
                    title="GitHub Repository"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                )}
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-black transition-colors"
                    title="Live Preview"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white border border-zinc-200 rounded-lg max-w-xl w-full p-6 space-y-5 relative shadow-2xl">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 p-1.5 text-zinc-400 hover:text-black hover:bg-zinc-100 rounded-md transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="aspect-video bg-zinc-100 rounded-md overflow-hidden border border-zinc-200">
              <img
                src={selectedProject.imageUrl}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-xs font-mono text-zinc-400 uppercase">
                  {selectedProject.category} • {selectedProject.year}
                </span>
              </div>
              <h3 className="text-xl font-bold text-zinc-900">{selectedProject.title}</h3>
            </div>

            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
              {selectedProject.details || selectedProject.description}
            </p>

            <div className="space-y-2">
              <p className="text-xs font-bold text-zinc-400 uppercase">核心使用技術</p>
              <div className="flex flex-wrap gap-2">
                {selectedProject.tags.map((t, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 bg-zinc-100 text-zinc-800 border border-zinc-200 rounded text-xs font-mono"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-100 flex items-center justify-end gap-3">
              <button
                onClick={() => setSelectedProject(null)}
                className="px-4 py-2 border border-zinc-200 text-xs font-medium rounded hover:bg-zinc-50 transition-colors"
              >
                關閉
              </button>
              {selectedProject.link && (
                <a
                  href={selectedProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-zinc-900 text-white text-xs font-bold rounded hover:bg-black transition-colors flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>造訪實際網站</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
