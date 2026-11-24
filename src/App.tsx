import React, { useState, useEffect } from 'react';
import {
  Menu,
  X,
  Briefcase,
  Code2,
  FolderGit2,
  Mail,
  LayoutGrid,
  Printer,
  Download,
  Globe,
  Loader2,
  PanelLeftOpen,
} from 'lucide-react';
import { Sidebar } from './components/Sidebar';
import { ExperienceSection } from './components/ExperienceSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ContactSection } from './components/ContactSection';
import { ProfileEditModal } from './components/ProfileEditModal';
import { ThemePicker } from './components/ThemePicker';
import {
  initialProfile,
  initialExperiences,
  initialSkillCategories,
  initialProjects,
} from './data/profileData';
import { Language, translations } from './data/translations';
import { ThemeId, applyThemeToDocument } from './data/themes';
import { ProfileData, ExperienceItem } from './types';
import { exportToPDF } from './utils/pdfExport';

type ActiveSection = 'all' | 'experience' | 'skills' | 'projects' | 'contact';

const STORAGE_KEYS = {
  PROFILE: 'minimal_resume_profile_v1',
  EXPERIENCES: 'minimal_resume_experiences_v1',
  THEME: 'minimal_resume_theme_v1',
};

export function App() {
  const [language, setLanguage] = useState<Language>('zh');
  const [currentTheme, setCurrentTheme] = useState<ThemeId>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.THEME) as ThemeId | null;
    return saved || 'zinc';
  });

  const [profile, setProfile] = useState<ProfileData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROFILE);
      return saved ? { ...initialProfile, ...JSON.parse(saved) } : initialProfile;
    } catch {
      return initialProfile;
    }
  });

  const [experiences, setExperiences] = useState<ExperienceItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.EXPERIENCES);
      return saved ? JSON.parse(saved) : initialExperiences;
    } catch {
      return initialExperiences;
    }
  });

  const [activeSection, setActiveSection] = useState<ActiveSection>('all');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 1024;
    }
    return true;
  });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [exportStatus, setExportStatus] = useState('');

  const t = translations[language];

  useEffect(() => {
    applyThemeToDocument(currentTheme);
    localStorage.setItem(STORAGE_KEYS.THEME, currentTheme);
  }, [currentTheme]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.EXPERIENCES, JSON.stringify(experiences));
  }, [experiences]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleToggleLanguage = () => {
    setLanguage((prev) => (prev === 'zh' ? 'en' : 'zh'));
  };

  const handleResetProfile = () => {
    setProfile(initialProfile);
    setExperiences(initialExperiences);
    localStorage.removeItem(STORAGE_KEYS.PROFILE);
    localStorage.removeItem(STORAGE_KEYS.EXPERIENCES);
  };

  const handleQuickContact = () => {
    setActiveSection('contact');
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
    setTimeout(() => {
      document.getElementById('section-contact')?.scrollIntoView({ behavior: 'smooth' });
    }, 60);
  };

  const handleExportPDF = async () => {
    const prevSection = activeSection;
    setActiveSection('all');
    setIsExportingPdf(true);
    setExportStatus(t.exportingPdfDesc);

    setTimeout(async () => {
      try {
        const filename = `${profile.englishName.replace(/\s+/g, '_')}_Resume.pdf`;
        await exportToPDF('resume-app-container', filename, (status) => setExportStatus(status));
      } catch (err) {
        console.error('PDF export error:', err);
        window.print();
      } finally {
        setIsExportingPdf(false);
        setActiveSection(prevSection);
      }
    }, 250);
  };

  const handleTogglePreview = () => {
    setIsPreviewMode((prev) => {
      const next = !prev;
      if (next) {
        setActiveSection('all');
      }
      return next;
    });
  };

  const navItems: Array<{ id: ActiveSection; label: string; icon: React.ElementType }> = [
    { id: 'all', label: t.navAll, icon: LayoutGrid },
    { id: 'experience', label: t.navExperience, icon: Briefcase },
    { id: 'skills', label: t.navSkills, icon: Code2 },
    { id: 'projects', label: t.navProjects, icon: FolderGit2 },
    { id: 'contact', label: t.navContact, icon: Mail },
  ];

  const printDateString = `Generated ${new Date().toLocaleDateString(
    language === 'zh' ? 'zh-TW' : 'en-US'
  )} — ${profile.englishName}`;

  return (
    <div
      className={`min-h-screen transition-colors ${
        isPreviewMode ? 'bg-white' : 'bg-[#FAFAFA]'
      } text-zinc-900`}
    >
      {/* Print Preview Top Banner */}
      {isPreviewMode && (
        <div className="sticky top-0 z-40 bg-zinc-900 text-white px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 shadow-md no-print">
          <div className="flex items-center gap-2 text-xs font-medium">
            <Printer className="w-4 h-4 text-zinc-300" />
            <span>{t.previewModeBanner}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/15 hover:bg-white/25 text-xs font-medium transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{t.previewPrint}</span>
            </button>
            <button
              type="button"
              onClick={handleExportPDF}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-zinc-900 hover:bg-zinc-100 text-xs font-semibold transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{t.downloadPdf}</span>
            </button>
            <button
              type="button"
              onClick={handleTogglePreview}
              className="px-3 py-1.5 rounded-lg border border-white/25 hover:bg-white/10 text-xs font-medium transition-colors cursor-pointer"
            >
              {t.exitPreview}
            </button>
          </div>
        </div>
      )}

      {/* Mobile Top Bar */}
      {!isPreviewMode && (
        <header className="lg:hidden sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-zinc-200 px-4 py-3 flex items-center justify-between no-print">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={() => setIsSidebarOpen((prev) => !prev)}
              className="p-2 rounded-lg border border-zinc-200 text-zinc-700 hover:bg-zinc-50 cursor-pointer"
              aria-label={isSidebarOpen ? t.closeMenu : t.openMenu}
            >
              {isSidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
            <div className="min-w-0">
              <div className="text-sm font-bold text-zinc-900 truncate">
                {language === 'zh' ? profile.name : profile.englishName}
              </div>
              <div className="text-[11px] text-zinc-500 truncate">
                {language === 'en' && profile.titleEn ? profile.titleEn : profile.title}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <ThemePicker
              currentTheme={currentTheme}
              onSelectTheme={setCurrentTheme}
              language={language}
              compact
            />
            <button
              type="button"
              onClick={handleToggleLanguage}
              className="px-2.5 py-1.5 rounded-lg border border-zinc-200 bg-white text-xs font-medium text-zinc-700 cursor-pointer"
            >
              {language === 'zh' ? 'EN' : '中文'}
            </button>
          </div>
        </header>
      )}

      {/* Mobile Backdrop */}
      {isSidebarOpen && !isPreviewMode && (
        <div
          className="fixed inset-0 z-30 bg-zinc-900/40 backdrop-blur-xs lg:hidden no-print"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Container */}
      <div
        id="resume-app-container"
        data-print-date={printDateString}
        className="max-w-7xl mx-auto flex flex-col lg:flex-row min-h-screen"
      >
        {/* Left Sidebar */}
        <aside
          className={`${
            isPreviewMode
              ? 'w-full lg:w-80 border-b lg:border-b-0 lg:border-r border-zinc-200 bg-white'
              : isSidebarOpen
              ? 'fixed inset-y-0 left-0 z-40 w-80 shadow-2xl lg:shadow-none lg:sticky lg:top-0 lg:h-screen border-r border-zinc-200 bg-white overflow-y-auto transition-transform duration-200'
              : 'hidden'
          }`}
        >
          <Sidebar
            profile={profile}
            language={language}
            onToggleLanguage={handleToggleLanguage}
            currentTheme={currentTheme}
            onSelectTheme={setCurrentTheme}
            onEditProfile={() => setIsEditModalOpen(true)}
            onQuickContact={handleQuickContact}
            onExportPDF={handleExportPDF}
            onTogglePreview={handleTogglePreview}
            onCloseMobileSidebar={() => setIsSidebarOpen(false)}
          />
        </aside>

        {/* Right Main Content */}
        <main className="flex-1 min-w-0 px-4 sm:px-8 lg:px-12 py-8 lg:py-10 space-y-10">
          {/* Desktop Section Navigation Bar */}
          {!isPreviewMode && (
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-zinc-200/80 no-print">
              <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
                {!isSidebarOpen && (
                  <button
                    type="button"
                    onClick={() => setIsSidebarOpen(true)}
                    className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-200 bg-white text-xs font-medium text-zinc-700 hover:bg-zinc-50 cursor-pointer mr-1"
                    title={t.expandSidebar}
                  >
                    <PanelLeftOpen className="w-3.5 h-3.5" />
                    <span>{t.expandSidebar}</span>
                  </button>
                )}

                <nav className="flex items-center gap-1.5">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeSection === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setActiveSection(item.id)}
                        className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                          isActive
                            ? 'bg-theme-primary text-white shadow-xs'
                            : 'bg-white border border-zinc-200/80 text-zinc-600 hover:text-zinc-900 hover:border-zinc-300'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>

              <div className="hidden xl:flex items-center gap-2">
                <ThemePicker
                  currentTheme={currentTheme}
                  onSelectTheme={setCurrentTheme}
                  language={language}
                />
                <button
                  type="button"
                  onClick={handleToggleLanguage}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-200 bg-white text-xs font-medium text-zinc-700 hover:bg-zinc-50 cursor-pointer"
                >
                  <Globe className="w-3.5 h-3.5 text-zinc-500" />
                  <span>{language === 'zh' ? 'English' : '繁體中文'}</span>
                </button>
              </div>
            </div>
          )}

          {/* Sections */}
          <div className="space-y-12">
            {(activeSection === 'all' || activeSection === 'experience' || isPreviewMode) && (
              <ExperienceSection
                experiences={experiences}
                onUpdateExperiences={setExperiences}
                language={language}
                isPreviewMode={isPreviewMode}
              />
            )}

            {(activeSection === 'all' || activeSection === 'skills' || isPreviewMode) && (
              <SkillsSection
                skillCategories={initialSkillCategories}
                language={language}
                themeId={currentTheme}
                isPreviewMode={isPreviewMode}
              />
            )}

            {(activeSection === 'all' || activeSection === 'projects' || isPreviewMode) && (
              <ProjectsSection
                projects={initialProjects}
                language={language}
                isPreviewMode={isPreviewMode}
              />
            )}

            {(activeSection === 'all' || activeSection === 'contact') && !isPreviewMode && (
              <ContactSection language={language} recipientEmail={profile.email} />
            )}
          </div>

          {/* Footer */}
          <footer className="pt-8 border-t border-zinc-200/80 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-zinc-400">
            <span>{t.footerSummary}</span>
            <span className="font-mono-tech">
              {profile.englishName} · {profile.email}
            </span>
          </footer>
        </main>
      </div>

      {/* PDF Export Loading Modal */}
      {isExportingPdf && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-900/50 backdrop-blur-xs p-4 no-print">
          <div className="bg-white rounded-2xl border border-zinc-200 shadow-xl p-6 max-w-sm w-full text-center space-y-3">
            <Loader2 className="w-8 h-8 animate-spin text-theme-primary mx-auto" />
            <h3 className="text-base font-bold text-zinc-900">{t.exportingPdfTitle}</h3>
            <p className="text-xs text-zinc-500">{exportStatus || t.exportingPdfDesc}</p>
          </div>
        </div>
      )}

      {/* Profile Edit Modal */}
      <ProfileEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        profile={profile}
        onSave={setProfile}
        onReset={handleResetProfile}
        language={language}
      />
    </div>
  );
}

export default App;
