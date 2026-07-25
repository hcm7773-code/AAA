import React, { useState } from 'react';
import { ProfileData } from '../types';
import { Language, translations } from '../data/translations';
import { ThemeId } from '../data/themes';
import { ThemePicker } from './ThemePicker';
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
  ExternalLink,
  Eye,
  Rss,
  Languages
} from 'lucide-react';

interface SidebarProps {
  profile: ProfileData;
  lang: Language;
  themeId?: ThemeId;
  onSelectTheme?: (themeId: ThemeId) => void;
  onToggleLang: (lang: Language) => void;
  onEditProfileClick: () => void;
  onQuickContactClick: () => void;
  onExportPDF: () => void;
  onPreviewPrint?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  profile,
  lang,
  themeId,
  onSelectTheme,
  onToggleLang,
  onEditProfileClick,
  onQuickContactClick,
  onExportPDF,
  onPreviewPrint,
}) => {
  const [copied, setCopied] = useState(false);
  const t = translations[lang];

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

  const bioText = lang === 'en' ? (profile.bioEn || profile.bio) : profile.bio;
  const locationText = lang === 'en' ? (profile.locationEn || profile.location) : profile.location;
  const companyText = lang === 'en' ? (profile.companyEn || profile.company) : profile.company;
  const titleText = lang === 'en' ? (profile.titleEn || profile.title) : profile.title;

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
                <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-white" title={t.openToWork}></span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5 no-print flex-wrap justify-end">
            {/* Theme Selector if provided */}
            {themeId && onSelectTheme && (
              <ThemePicker
                currentThemeId={themeId}
                onSelectTheme={onSelectTheme}
                lang={lang}
                compact={true}
              />
            )}

            {/* Language Toggle Button */}
            <div className="flex items-center bg-zinc-100 p-0.5 rounded border border-zinc-200 text-xs font-mono">
              <button
                type="button"
                onClick={() => onToggleLang('zh')}
                className={`px-2 py-1 rounded transition-colors ${lang === 'zh' ? 'bg-theme-primary text-white font-bold shadow-2xs' : 'text-zinc-500 hover:text-zinc-900'}`}
                title="切換至繁體中文"
              >
                中
              </button>
              <button
                type="button"
                onClick={() => onToggleLang('en')}
                className={`px-2 py-1 rounded transition-colors ${lang === 'en' ? 'bg-theme-primary text-white font-bold shadow-2xs' : 'text-zinc-500 hover:text-zinc-900'}`}
                title="Switch to English"
              >
                EN
              </button>
            </div>

            <button
              onClick={onEditProfileClick}
              className="p-1.5 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 rounded transition-colors text-xs flex items-center gap-1 border border-zinc-200"
              title={t.editProfile}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t.edit}</span>
            </button>
          </div>
        </div>

        <h1 className="text-2xl font-bold tracking-tight mb-1 text-zinc-900 flex items-center gap-2">
          {lang === 'en' ? profile.englishName : profile.name}
          <span className="text-xs font-normal text-zinc-400 font-mono">
            ({lang === 'en' ? profile.name : profile.englishName})
          </span>
        </h1>
        
        {/* Role Title */}
        <div className="mt-1 space-y-1">
          <p className="text-zinc-800 text-xs sm:text-sm font-bold tracking-wide">
            {titleText}
          </p>
          {lang === 'zh' && profile.titleEn && (
            <p className="text-[11px] text-zinc-400 font-mono tracking-wider uppercase">
              {profile.titleEn}
            </p>
          )}
        </div>

        <div className="mt-3 flex items-center gap-2 text-xs text-zinc-500">
          <MapPin className="w-3.5 h-3.5 text-zinc-400" />
          <span>{locationText}</span>
          <span className="text-zinc-300">•</span>
          {profile.openToWork ? (
            <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px] font-medium border border-emerald-200">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
              {t.openToWork}
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-zinc-600 bg-zinc-100 px-2 py-0.5 rounded text-[11px] font-medium border border-zinc-200">
              <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full"></span>
              {t.employed}
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
            {t.bioHeader}
          </h2>
          <p className="text-sm leading-relaxed text-zinc-600 bg-zinc-50/70 p-3.5 rounded-lg border border-zinc-100">
            {bioText}
          </p>
        </section>

        {/* Highlight Quick Stats */}
        <section className="grid grid-cols-2 gap-3">
          <div className="bg-zinc-50 p-3 rounded-lg border border-zinc-200/80">
            <p className="text-[10px] text-zinc-400 uppercase font-mono">{t.yearsExperience}</p>
            <p className="text-lg font-bold text-zinc-900 mt-0.5">{profile.yearsExperience}+ {t.yearsUnit}</p>
          </div>
          <div className="bg-zinc-50 p-3 rounded-lg border border-zinc-200/80">
            <p className="text-[10px] text-zinc-400 uppercase font-mono">{t.completedProjects}</p>
            <p className="text-lg font-bold text-zinc-900 mt-0.5">{profile.completedProjects}+ {t.projectsUnit}</p>
          </div>
        </section>

        {/* Social & Contact Links */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest">
              {t.contactHeader}
            </h2>
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
                  title="Personal Blog"
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
                    <span>{lang === 'en' ? 'Personal Website / Blog' : '個人網站 / 部落格'}</span>
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
                    <span>{t.emailCopied}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-zinc-400" />
                    <span>{t.copyEmail}</span>
                  </>
                )}
              </button>
              <button
                onClick={onQuickContactClick}
                className="py-2 px-3 bg-white text-zinc-900 hover:bg-zinc-100 text-xs font-bold rounded transition-colors flex items-center justify-center gap-1"
                title={t.quickContactBtn}
              >
                <span>{lang === 'en' ? 'Contact' : '發信'}</span>
              </button>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-2 mt-2">
              <button
                onClick={onPreviewPrint}
                className="py-2.5 px-2 bg-zinc-100 hover:bg-white text-zinc-800 text-xs font-bold rounded transition-colors flex items-center justify-center gap-1.5 border border-zinc-200 shadow-xs hover:border-zinc-300"
              >
                <Eye className="w-3.5 h-3.5 text-zinc-600" />
                <span>{t.previewPrint}</span>
              </button>
              <button
                onClick={onExportPDF}
                className="py-2.5 px-2 bg-theme-primary bg-theme-primary-hover text-white text-xs font-bold rounded transition-colors flex items-center justify-center gap-1.5 shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{t.downloadPDF}</span>
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Footer copyright */}
      <div className="mt-8 pt-6 border-t border-zinc-100 flex items-center justify-between text-[11px] text-zinc-400">
        <p className="font-mono italic">© {new Date().getFullYear()} {lang === 'en' ? profile.englishName : profile.name}</p>
        <button
          onClick={onExportPDF}
          className="flex items-center gap-1 hover:text-zinc-800 transition-colors font-medium text-zinc-600"
        >
          <Download className="w-3 h-3 text-zinc-500" />
          <span>{t.downloadPDF}</span>
        </button>
      </div>
    </aside>
  );
};
