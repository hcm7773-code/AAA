import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { ExperienceSection } from './components/ExperienceSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ContactSection } from './components/ContactSection';
import { ProfileEditModal } from './components/ProfileEditModal';
import { exportToPDF } from './utils/pdfExport';
import {
  initialProfile,
  initialExperiences,
  initialSkillCategories,
  initialProjects,
} from './data/profileData';
import { ProfileData } from './types';
import { User, Briefcase, Code, FolderGit2, Mail, Sparkles, Download, Loader2, Eye, Printer, X, FileText } from 'lucide-react';

const STORAGE_KEY = 'minimal_resume_profile_v1';

export default function App() {
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

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch (e) {
      console.warn('Failed to save profile to localStorage:', e);
    }
  }, [profile]);

  const [activeTab, setActiveTab] = useState<'all' | 'experience' | 'skills' | 'projects' | 'contact'>('all');
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [exportStatus, setExportStatus] = useState<string>('');
  const [isPreviewMode, setIsPreviewMode] = useState<boolean>(false);

  const handleQuickContact = () => {
    setActiveTab('contact');
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
        <header className="lg:hidden bg-white border-b border-zinc-200 p-4 sticky top-0 z-30 flex items-center justify-between shadow-xs no-print">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-zinc-900 text-white rounded-full flex items-center justify-center font-bold text-xs">
              {profile.avatarInitials}
            </div>
            <div>
              <h1 className="font-bold text-sm text-zinc-900">{profile.name}</h1>
              <p className="text-[11px] text-zinc-500">{profile.title.split('/')[0]}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleTogglePreviewMode}
              className="px-2.5 py-1.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 rounded text-xs font-medium border border-zinc-200 transition-colors flex items-center gap-1"
            >
              <Eye className="w-3 h-3 text-zinc-600" />
              <span>預覽</span>
            </button>
            <button
              onClick={handleExportPDF}
              className="px-2.5 py-1.5 bg-zinc-900 hover:bg-black text-white rounded text-xs font-bold transition-colors flex items-center gap-1"
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
        className={`flex-1 flex flex-col lg:flex-row max-w-[1440px] w-full mx-auto my-0 bg-white overflow-hidden ${isPreviewMode ? 'shadow-none rounded-none border-none' : 'shadow-2xl lg:my-4 lg:rounded-xl border border-zinc-200/80'}`}
      >
        {/* Left Sidebar */}
        <Sidebar
          profile={profile}
          onEditProfileClick={() => setIsEditModalOpen(true)}
          onQuickContactClick={handleQuickContact}
          onExportPDF={handleExportPDF}
          onPreviewPrint={handleTogglePreviewMode}
        />

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
                      ? 'bg-zinc-900 text-white font-bold shadow-xs'
                      : 'text-zinc-600 hover:text-black hover:bg-zinc-100'
                  }`}
                >
                  <User className="w-3.5 h-3.5" />
                  <span>完整簡歷 (Overview)</span>
                </button>

                <button
                  onClick={() => setActiveTab('experience')}
                  className={`px-3 py-2 rounded-md transition-all flex items-center gap-1.5 ${
                    activeTab === 'experience'
                      ? 'bg-zinc-900 text-white font-bold shadow-xs'
                      : 'text-zinc-600 hover:text-black hover:bg-zinc-100'
                  }`}
                >
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>經歷背景</span>
                </button>

                <button
                  onClick={() => setActiveTab('skills')}
                  className={`px-3 py-2 rounded-md transition-all flex items-center gap-1.5 ${
                    activeTab === 'skills'
                      ? 'bg-zinc-900 text-white font-bold shadow-xs'
                      : 'text-zinc-600 hover:text-black hover:bg-zinc-100'
                  }`}
                >
                  <Code className="w-3.5 h-3.5" />
                  <span>專業技能</span>
                </button>

                <button
                  onClick={() => setActiveTab('projects')}
                  className={`px-3 py-2 rounded-md transition-all flex items-center gap-1.5 ${
                    activeTab === 'projects'
                      ? 'bg-zinc-900 text-white font-bold shadow-xs'
                      : 'text-zinc-600 hover:text-black hover:bg-zinc-100'
                  }`}
                >
                  <FolderGit2 className="w-3.5 h-3.5" />
                  <span>精選作品集</span>
                </button>

                <button
                  onClick={() => setActiveTab('contact')}
                  className={`px-3 py-2 rounded-md transition-all flex items-center gap-1.5 ${
                    activeTab === 'contact'
                      ? 'bg-zinc-900 text-white font-bold shadow-xs'
                      : 'text-zinc-600 hover:text-black hover:bg-zinc-100'
                  }`}
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>聯絡表單</span>
                </button>
              </div>

              <div className="flex items-center gap-2 pr-1">
                <button
                  onClick={handleTogglePreviewMode}
                  className="px-3 py-1.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 rounded text-xs font-bold transition-all border border-zinc-200 flex items-center gap-1.5"
                  title="切換至純白無干擾列印預覽格式"
                >
                  <Eye className="w-3.5 h-3.5 text-zinc-600" />
                  <span>預覽列印格式</span>
                </button>
                <button
                  onClick={handleExportPDF}
                  disabled={isExporting}
                  className="px-3 py-1.5 bg-zinc-900 hover:bg-black text-white rounded text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 disabled:opacity-50"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>下載簡歷 PDF</span>
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
                <ExperienceSection experiences={initialExperiences} />
                <SkillsSection categories={initialSkillCategories} />
                <ProjectsSection projects={initialProjects} />
                <div id="contact-section">
                  <ContactSection />
                </div>
              </>
            )}

            {/* Individual Tab Views */}
            {activeTab === 'experience' && <ExperienceSection experiences={initialExperiences} />}
            {activeTab === 'skills' && <SkillsSection categories={initialSkillCategories} />}
            {activeTab === 'projects' && <ProjectsSection projects={initialProjects} />}
            {activeTab === 'contact' && (
              <div id="contact-section">
                <ContactSection />
              </div>
            )}
          </div>

          {/* Resume Summary Footer */}
          <footer className="pt-6 border-t border-zinc-200/80 mt-8">
            <div className="bg-white rounded-xl border border-zinc-200/90 p-5 flex flex-wrap items-center justify-between gap-4 text-xs shadow-2xs">
              <div className="flex flex-wrap items-center gap-6 sm:gap-8">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-zinc-900"></span>
                  <span className="text-zinc-500 font-medium">總工作資歷：</span>
                  <span className="font-bold text-zinc-900">{profile.yearsExperience} 年經驗</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-zinc-900"></span>
                  <span className="text-zinc-500 font-medium">精選代表作品：</span>
                  <span className="font-bold text-zinc-900">{initialProjects.length} 項作品</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-zinc-900"></span>
                  <span className="text-zinc-500 font-medium">專業技能領域：</span>
                  <span className="font-bold text-zinc-900">{initialSkillCategories.length} 大核心</span>
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
