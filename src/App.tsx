import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { ExperienceSection } from './components/ExperienceSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ContactSection } from './components/ContactSection';
import { ProfileEditModal } from './components/ProfileEditModal';
import { ThemePicker } from './components/ThemePicker';
import { exportToPDF } from './utils/pdfExport';
import { Language, translations } from './data/translations';
import { ThemeId, getThemeById, applyThemeToDocument } from './data/themes';
import {
  initialProfile,
  initialExperiences,
  initialSkillCategories,
  initialProjects,
} from './data/profileData';
import { ProfileData } from './types';
import { User, Briefcase, Code, FolderGit2, Mail, Sparkles, Download, Loader2, Eye, Printer, X, FileText, Menu } from 'lucide-react';

const STORAGE_KEY = 'minimal_resume_profile_v1';
const EXP_STORAGE_KEY = 'minimal_resume_experiences_v1';
const THEME_STORAGE_KEY = 'minimal_resume_theme_v1';

export default function App() {
  const [lang, setLang] = useState<Language>('zh');
  const t = translations[lang];

  const [themeId, setThemeId] = useState<ThemeId>(() => {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      if (saved) return saved as ThemeId;
    } catch (e) {
      console.warn('Failed to load theme from localStorage:', e);
    }
    return 'zinc';
  });

  useEffect(() => {
    const themeObj = getThemeById(themeId);
    applyThemeToDocument(themeObj);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, themeId);
    } catch (e) {
      console.warn('Failed to save theme to localStorage:', e);
    }
  }, [themeId]);

  const [profile, setProfile] = useState<ProfileData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to load profile from localStorage:', e);
    }
    return initialProfile;
  });

  const [experiences, setExperiences] = useState(() => {
    try {
      const saved = localStorage.getItem(EXP_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to load experiences from localStorage:', e);
    }
    return initialExperiences;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch (e) {
      console.warn('Failed to save profile to localStorage:', e);
    }
  }, [profile]);

  useEffect(() => {
    try {
      localStorage.setItem(EXP_STORAGE_KEY, JSON.stringify(experiences));
    } catch (e) {
      console.warn('Failed to save experiences to localStorage:', e);
    }
  }, [experiences]);

  const [activeTab, setActiveTab] = useState<'all' | 'experience' | 'skills' | 'projects' | 'contact'>('all');
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [exportStatus, setExportStatus] = useState<string>('');
  const [isPreviewMode, setIsPreviewMode] = useState<boolean>(false);

  // Responsive Sidebar auto collapse/expand state
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 1024;
    }
    return true;
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleQuickContact = () => {
    setActiveTab('contact');
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
    const contactElement = document.getElementById('contact-section');
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleTogglePreviewMode = () => {
    if (!isPreviewMode) {
      setActiveTab('all');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setIsPreviewMode(!isPreviewMode);
  };

  const handleExportPDF = async () => {
    try {
      setIsExporting(true);
      setExportStatus('切換至完整履歷視圖...');
      
      // Ensure we render the full resume overview for PDF snapshot
      if (activeTab !== 'all') {
        setActiveTab('all');
        await new Promise((res) => setTimeout(res, 200));
      }

      const filename = `${profile.name.replace(/\s+/g, '_')}_${profile.englishName.replace(/\s+/g, '_')}_Resume.pdf`;
      await exportToPDF('resume-app-container', filename, (status) => {
        setExportStatus(status);
      });
    } catch (err) {
      console.error('Export error:', err);
      alert('匯出 PDF 遭遇錯誤，請再試一次。');
    } finally {
      setTimeout(() => {
        setIsExporting(false);
        setExportStatus('');
      }, 500);
    }
  };

  return (
    <div className={`min-h-screen text-[#18181B] font-sans flex flex-col antialiased selection:bg-zinc-900 selection:text-white relative ${isPreviewMode ? 'bg-white p-0' : 'bg-[#F4F4F5]'}`}>
      {/* Print Preview Top Sticky Notification Banner */}
      {isPreviewMode && (
        <div className="sticky top-0 z-50 bg-zinc-900 text-white p-3 shadow-md flex items-center justify-between px-4 sm:px-8 border-b border-zinc-800 no-print">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <FileText className="w-4 h-4 text-zinc-300" />
            <span className="text-xs font-medium sm:text-sm">
              正在預覽列印/PDF格式 <span className="text-zinc-400 text-xs hidden sm:inline">(純白無干擾，真實呈現 PDF 下載效果)</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportPDF}
              disabled={isExporting}
              className="px-3 py-1.5 bg-white hover:bg-zinc-100 text-zinc-900 rounded text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>下載 PDF 檔</span>
            </button>
            <button
              onClick={() => setIsPreviewMode(false)}
              className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded text-xs font-medium transition-colors flex items-center gap-1 border border-zinc-700"
            >
              <X className="w-3.5 h-3.5" />
              <span>結束預覽</span>
            </button>
          </div>
        </div>
      )}

      {/* Top Mobile Bar */}
      {!isPreviewMode && (
        <header className="lg:hidden bg-white border-b border-zinc-200 p-3 sm:p-4 sticky top-0 z-30 flex items-center justify-between shadow-2xs no-print">
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Hamburger Toggle Button */}
            <button
              onClick={() => setIsSidebarOpen((prev) => !prev)}
              className={`px-2.5 py-1.5 rounded-lg border transition-all flex items-center justify-center gap-1.5 text-xs font-bold ${
                isSidebarOpen
                  ? 'bg-zinc-900 text-white border-zinc-900 shadow-2xs'
                  : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border-zinc-200'
              }`}
              title={isSidebarOpen ? '收合個人資料選單' : '展開個人資料選單'}
              aria-label="Toggle Navigation Menu"
            >
              {isSidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              <span className="text-[11px] font-bold">
                {isSidebarOpen ? '收合' : '選單'}
              </span>
            </button>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-theme-primary text-white rounded-full flex items-center justify-center font-bold text-xs shadow-2xs">
                {profile.avatarInitials}
              </div>
              <div className="hidden min-[360px]:block">
                <h1 className="font-bold text-xs sm:text-sm text-zinc-900 leading-snug">{profile.name}</h1>
                <p className="text-[10px] text-zinc-500 leading-none">{profile.title.split('/')[0]}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={handleTogglePreviewMode}
              className="px-2.5 py-1.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 rounded text-xs font-medium border border-zinc-200 transition-colors flex items-center gap-1"
            >
              <Eye className="w-3 h-3 text-zinc-600" />
              <span className="hidden min-[400px]:inline">預覽</span>
            </button>
            <button
              onClick={handleExportPDF}
              className="px-2.5 py-1.5 bg-theme-primary bg-theme-primary-hover text-white rounded text-xs font-bold transition-colors flex items-center gap-1 shadow-2xs"
            >
              <Download className="w-3 h-3" />
              <span>PDF</span>
            </button>
          </div>
        </header>
      )}

      {/* Main Container */}
      <div
        id="resume-app-container"
        data-print-date={`簡歷版本：${new Date().toLocaleDateString('zh-TW', { year: 'numeric', month: '2-digit', day: '2-digit' })} (Printed)`}
        className={`flex-1 flex flex-col lg:flex-row max-w-[1440px] w-full mx-auto my-0 bg-white overflow-hidden ${isPreviewMode ? 'shadow-none rounded-none border-none' : 'shadow-2xl lg:my-4 lg:rounded-xl border border-zinc-200/80'}`}
      >
        {/* Left Sidebar - Responsive Auto-collapse / Hamburger toggle */}
        <div
          className={`transition-all duration-300 ease-in-out ${
            isSidebarOpen
              ? 'block w-full lg:w-[320px] shrink-0'
              : 'hidden lg:block lg:w-[320px] shrink-0'
          }`}
        >
          <Sidebar
            profile={profile}
            lang={lang}
            themeId={themeId}
            onSelectTheme={setThemeId}
            onToggleLang={() => setLang(lang === 'zh' ? 'en' : 'zh')}
            onEditProfileClick={() => setIsEditModalOpen(true)}
            onQuickContactClick={handleQuickContact}
            onExportPDF={handleExportPDF}
            onPreviewPrint={handleTogglePreviewMode}
          />
        </div>

        {/* Right Main Content Area */}
        <main className={`flex-1 p-6 sm:p-8 lg:p-12 flex flex-col gap-10 overflow-y-auto ${isPreviewMode ? 'bg-white' : 'bg-[#F4F4F5]/60'}`}>
          {/* Navigation Bar */}
          {!isPreviewMode && (
            <nav className="flex flex-wrap items-center justify-between gap-3 bg-white p-2 rounded-lg border border-zinc-200/80 shadow-xs no-print">
              <div className="flex flex-wrap items-center gap-1 text-xs font-medium">
                <button
                  onClick={() => setActiveTab('all')}
                  className={`px-3 py-2 rounded-md transition-all flex items-center gap-1.5 ${
                    activeTab === 'all'
                      ? 'bg-theme-primary text-white font-bold shadow-xs'
                      : 'text-zinc-600 hover:text-black hover:bg-zinc-100'
                  }`}
                >
                  <User className="w-3.5 h-3.5" />
                  <span>{t.navOverview}</span>
                </button>

                <button
                  onClick={() => setActiveTab('experience')}
                  className={`px-3 py-2 rounded-md transition-all flex items-center gap-1.5 ${
                    activeTab === 'experience'
                      ? 'bg-theme-primary text-white font-bold shadow-xs'
                      : 'text-zinc-600 hover:text-black hover:bg-zinc-100'
                  }`}
                >
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>{t.navExperience}</span>
                </button>

                <button
                  onClick={() => setActiveTab('skills')}
                  className={`px-3 py-2 rounded-md transition-all flex items-center gap-1.5 ${
                    activeTab === 'skills'
                      ? 'bg-theme-primary text-white font-bold shadow-xs'
                      : 'text-zinc-600 hover:text-black hover:bg-zinc-100'
                  }`}
                >
                  <Code className="w-3.5 h-3.5" />
                  <span>{t.navSkills}</span>
                </button>

                <button
                  onClick={() => setActiveTab('projects')}
                  className={`px-3 py-2 rounded-md transition-all flex items-center gap-1.5 ${
                    activeTab === 'projects'
                      ? 'bg-theme-primary text-white font-bold shadow-xs'
                      : 'text-zinc-600 hover:text-black hover:bg-zinc-100'
                  }`}
                >
                  <FolderGit2 className="w-3.5 h-3.5" />
                  <span>{t.navProjects}</span>
                </button>

                <button
                  onClick={() => setActiveTab('contact')}
                  className={`px-3 py-2 rounded-md transition-all flex items-center gap-1.5 ${
                    activeTab === 'contact'
                      ? 'bg-theme-primary text-white font-bold shadow-xs'
                      : 'text-zinc-600 hover:text-black hover:bg-zinc-100'
                  }`}
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>{t.navContact}</span>
                </button>
              </div>

              <div className="flex items-center gap-2 pr-1">
                {/* Theme Selector Dropdown */}
                <ThemePicker
                  currentThemeId={themeId}
                  onSelectTheme={setThemeId}
                  lang={lang}
                />

                <button
                  onClick={handleTogglePreviewMode}
                  className="px-3 py-1.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 rounded text-xs font-bold transition-all border border-zinc-200 flex items-center gap-1.5"
                  title="切換至純白無干擾列印預覽格式"
                >
                  <Eye className="w-3.5 h-3.5 text-zinc-600" />
                  <span>{t.previewPrintBtn}</span>
                </button>
                <button
                  onClick={handleExportPDF}
                  disabled={isExporting}
                  className="px-3 py-1.5 bg-theme-primary bg-theme-primary-hover text-white rounded text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 disabled:opacity-50"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{t.exportPdfBtn}</span>
                </button>
                <div className="hidden xl:flex items-center gap-1.5 text-xs text-zinc-400 font-mono pl-2 border-l border-zinc-200">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Clean Minimalism</span>
                </div>
              </div>
            </nav>
          )}

          {/* Section Views Content */}
          <div className="space-y-12 flex-1">
            {/* View All (Default Mode) */}
            {activeTab === 'all' && (
              <>
                <ExperienceSection
                  experiences={experiences}
                  onUpdateExperiences={setExperiences}
                  lang={lang}
                />
                <SkillsSection categories={initialSkillCategories} lang={lang} themeId={themeId} />
                <ProjectsSection projects={initialProjects} lang={lang} />
                <div id="contact-section">
                  <ContactSection lang={lang} />
                </div>
              </>
            )}

            {/* Individual Tab Views */}
            {activeTab === 'experience' && (
              <ExperienceSection
                experiences={experiences}
                onUpdateExperiences={setExperiences}
                lang={lang}
              />
            )}
            {activeTab === 'skills' && <SkillsSection categories={initialSkillCategories} lang={lang} themeId={themeId} />}
            {activeTab === 'projects' && <ProjectsSection projects={initialProjects} lang={lang} />}
            {activeTab === 'contact' && (
              <div id="contact-section">
                <ContactSection lang={lang} />
              </div>
            )}
          </div>

          {/* Resume Summary Footer */}
          <footer className="pt-6 border-t border-zinc-200/80 mt-8">
            <div className="bg-white rounded-xl border border-zinc-200/90 p-5 flex flex-wrap items-center justify-between gap-4 text-xs shadow-2xs">
              <div className="flex flex-wrap items-center gap-6 sm:gap-8">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-theme-primary"></span>
                  <span className="text-zinc-500 font-medium">{t.totalExpLabel}</span>
                  <span className="font-bold text-zinc-900">{profile.yearsExperience} {t.yearsSuffix}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-theme-primary"></span>
                  <span className="text-zinc-500 font-medium">{t.featuredProjectsLabel}</span>
                  <span className="font-bold text-zinc-900">{initialProjects.length} {t.itemsSuffix}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-theme-primary"></span>
                  <span className="text-zinc-500 font-medium">{t.skillDomainsLabel}</span>
                  <span className="font-bold text-zinc-900">{initialSkillCategories.length} {t.domainsSuffix}</span>
                </div>
              </div>
              <div className="text-zinc-400 font-mono text-[11px]">
                {profile.name} ({profile.englishName}) • Minimalist Resume Summary
              </div>
            </div>
          </footer>
        </main>
      </div>

      {/* PDF Export Overlay Toast */}
      {isExporting && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white border border-zinc-200 rounded-xl p-6 max-w-sm w-full text-center space-y-4 shadow-2xl">
            <div className="w-12 h-12 bg-zinc-100 rounded-full flex items-center justify-center mx-auto text-zinc-900">
              <Loader2 className="w-6 h-6 animate-spin text-zinc-900" />
            </div>
            <div>
              <h3 className="font-bold text-zinc-900 text-sm">正在匯出個人簡歷 PDF</h3>
              <p className="text-xs text-zinc-500 mt-1">{exportStatus || '保持極簡黑白排版格式...'}</p>
            </div>
            <div className="w-full bg-zinc-100 h-1.5 rounded-full overflow-hidden">
              <div className="bg-zinc-900 h-1.5 rounded-full animate-pulse w-full"></div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <ProfileEditModal
          profile={profile}
          onSave={(updated) => setProfile(updated)}
          onReset={() => setProfile(initialProfile)}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
    </div>
  );
}
