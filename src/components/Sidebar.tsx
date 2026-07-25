import React, { useState } from 'react';
import { ProfileData } from '../types';
import { 
  Github, 
  Linkedin, 
  Globe, 
  Mail, 
  MapPin, 
  Download, 
  Edit3, 
  Check, 
  Copy, 
  Briefcase, 
  ExternalLink,
  Sparkles,
  Eye,
  Rss
} from 'lucide-react';

interface SidebarProps {
  profile: ProfileData;
  onEditProfileClick: () => void;
  onQuickContactClick: () => void;
  onExportPDF: () => void;
  onPreviewPrint?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  profile,
  onEditProfileClick,
  onQuickContactClick,
  onExportPDF,
  onPreviewPrint,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(profile.email);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = profile.email;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.warn('Clipboard write failed:', err);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <aside className="w-full lg:w-[320px] bg-white border-b lg:border-b-0 lg:border-r border-zinc-200 p-6 sm:p-8 lg:p-10 flex flex-col shrink-0">
      {/* Top Profile Header */}
      <div className="mb-8 relative">
        <div className="flex items-start justify-between">
          <div className="relative mb-6">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-zinc-100 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-700 text-2xl sm:text-3xl font-semibold tracking-wider shadow-inner">
              {profile.avatarInitials}
            </div>
            {profile.openToWork && (
              <span className="absolute bottom-1 right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-white" title="Open to Opportunities"></span>
              </span>
            )}
          </div>

          <button
            onClick={onEditProfileClick}
            className="p-2 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 rounded-md transition-colors text-xs flex items-center gap-1 border border-zinc-200"
            title="編輯個人資料"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">編輯</span>
          </button>
        </div>

        <h1 className="text-2xl font-bold tracking-tight mb-1 text-zinc-900 flex items-center gap-2">
          {profile.name}
          <span className="text-xs font-normal text-zinc-400 font-mono">({profile.englishName})</span>
        </h1>
        <p className="text-zinc-500 text-xs sm:text-sm font-medium uppercase tracking-widest mt-1">
          {profile.title}
        </p>

        <div className="mt-3 flex items-center gap-2 text-xs text-zinc-500">
          <MapPin className="w-3.5 h-3.5 text-zinc-400" />
          <span>{profile.location}</span>
          <span className="text-zinc-300">•</span>
          {profile.openToWork ? (
            <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px] font-medium border border-emerald-200">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
              尋找新機會中
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-zinc-600 bg-zinc-100 px-2 py-0.5 rounded text-[11px] font-medium border border-zinc-200">
              <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full"></span>
              穩定任職中
            </span>
          )}
        </div>
      </div>

      {/* Main Sidebar Sections */}
      <div className="flex-1 space-y-8">
        {/* Personal Bio */}
        <section>
          <h2 className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full"></span>
            個人簡介
          </h2>
          <p className="text-sm leading-relaxed text-zinc-600 bg-zinc-50/70 p-3.5 rounded-lg border border-zinc-100">
            {profile.bio}
          </p>
        </section>

        {/* Highlight Quick Stats */}
        <section className="grid grid-cols-2 gap-3">
          <div className="bg-zinc-50 p-3 rounded-lg border border-zinc-200/80">
            <p className="text-[10px] text-zinc-400 uppercase font-mono">業界資歷</p>
            <p className="text-lg font-bold text-zinc-900 mt-0.5">{profile.yearsExperience}+ 年</p>
          </div>
          <div className="bg-zinc-50 p-3 rounded-lg border border-zinc-200/80">
            <p className="text-[10px] text-zinc-400 uppercase font-mono">完成專案</p>
            <p className="text-lg font-bold text-zinc-900 mt-0.5">{profile.completedProjects}+ 個</p>
          </div>
        </section>

        {/* Social & Contact Links */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest">
              社群與聯絡方式
            </h2>
            {/* Quick Icon Strip */}
            <div className="flex items-center gap-1.5 no-print">
              {profile.github && (
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 rounded transition-colors"
                  title="GitHub"
                >
                  <Github className="w-3.5 h-3.5" />
                </a>
              )}
              {profile.linkedin && (
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 rounded transition-colors"
                  title="LinkedIn"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                </a>
              )}
              {profile.behance && (
                <a
                  href={profile.behance}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 rounded transition-colors"
                  title="Behance / Portfolio"
                >
                  <Globe className="w-3.5 h-3.5" />
                </a>
              )}
              {profile.blog && (
                <a
                  href={profile.blog}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 rounded transition-colors"
                  title="Personal Blog / Website"
                >
                  <Rss className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>

          <ul className="space-y-2.5 text-sm font-medium">
            {profile.github && (
              <li>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between text-zinc-600 hover:text-black hover:bg-zinc-50 p-2 rounded transition-colors border border-transparent hover:border-zinc-200"
                >
                  <span className="flex items-center gap-2.5">
                    <Github className="w-4 h-4 text-zinc-700" />
                    <span>GitHub</span>
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
                </a>
              </li>
            )}
            {profile.linkedin && (
              <li>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between text-zinc-600 hover:text-black hover:bg-zinc-50 p-2 rounded transition-colors border border-transparent hover:border-zinc-200"
                >
                  <span className="flex items-center gap-2.5">
                    <Linkedin className="w-4 h-4 text-zinc-700" />
                    <span>LinkedIn</span>
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
                </a>
              </li>
            )}
            {profile.behance && (
              <li>
                <a
                  href={profile.behance}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between text-zinc-600 hover:text-black hover:bg-zinc-50 p-2 rounded transition-colors border border-transparent hover:border-zinc-200"
                >
                  <span className="flex items-center gap-2.5">
                    <Globe className="w-4 h-4 text-zinc-700" />
                    <span>Behance / Portfolio</span>
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
                </a>
              </li>
            )}
            {profile.blog && (
              <li>
                <a
                  href={profile.blog}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between text-zinc-600 hover:text-black hover:bg-zinc-50 p-2 rounded transition-colors border border-transparent hover:border-zinc-200"
                >
                  <span className="flex items-center gap-2.5">
                    <Rss className="w-4 h-4 text-zinc-700" />
                    <span>個人網站 / 部落格</span>
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
                </a>
              </li>
            )}
          </ul>
        </section>

        {/* Quick Action Email Bar */}
        <section className="pt-2">
          <div className="bg-zinc-900 text-white p-4 rounded-lg space-y-3">
            <div className="flex items-center justify-between text-xs text-zinc-300">
              <span className="flex items-center gap-1.5 font-mono">
                <Mail className="w-3.5 h-3.5 text-zinc-400" />
                {profile.email}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyEmail}
                className="flex-1 py-2 px-3 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-medium rounded transition-colors flex items-center justify-center gap-1.5 border border-zinc-700"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>已複製 Email</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-zinc-400" />
                    <span>複製信箱</span>
                  </>
                )}
              </button>
              <button
                onClick={onQuickContactClick}
                className="py-2 px-3 bg-white text-zinc-900 hover:bg-zinc-100 text-xs font-bold rounded transition-colors flex items-center justify-center gap-1"
                title="跳轉至聯絡表單"
              >
                <span>發信</span>
              </button>
            </div>

            {/* Action Buttons: PDF Export & Print Preview */}
            <div className="grid grid-cols-2 gap-2 mt-2">
              <button
                onClick={onPreviewPrint}
                className="py-2.5 px-2 bg-zinc-100 hover:bg-white text-zinc-800 text-xs font-bold rounded transition-colors flex items-center justify-center gap-1.5 border border-zinc-200 shadow-xs hover:border-zinc-300"
                title="預覽純白極簡列印格式"
              >
                <Eye className="w-3.5 h-3.5 text-zinc-600" />
                <span>預覽列印格式</span>
              </button>
              <button
                onClick={onExportPDF}
                className="py-2.5 px-2 bg-zinc-900 hover:bg-black text-white text-xs font-bold rounded transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                title="直接下載 PDF 檔案"
              >
                <Download className="w-3.5 h-3.5" />
                <span>下載 PDF</span>
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Footer copyright */}
      <div className="mt-8 pt-6 border-t border-zinc-100 flex items-center justify-between text-[11px] text-zinc-400">
        <p className="font-mono italic">© {new Date().getFullYear()} {profile.name}</p>
        <button
          onClick={onExportPDF}
          className="flex items-center gap-1 hover:text-zinc-800 transition-colors font-medium text-zinc-600"
          title="匯出 PDF 簡歷"
        >
          <Download className="w-3 h-3 text-zinc-500" />
          <span>匯出 PDF</span>
        </button>
      </div>
    </aside>
  );
};
