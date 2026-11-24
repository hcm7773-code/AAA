import React, { useState } from 'react';
import {
  MapPin,
  Mail,
  Check,
  Copy,
  Download,
  Printer,
  Pencil,
  Globe,
  Github,
  Linkedin,
  Briefcase,
  BookOpen,
  PanelLeftClose,
} from 'lucide-react';
import { ProfileData } from '../types';
import { Language, translations } from '../data/translations';
import { ThemeId } from '../data/themes';
import { ThemePicker } from './ThemePicker';

interface SidebarProps {
  profile: ProfileData;
  language: Language;
  onToggleLanguage: () => void;
  currentTheme: ThemeId;
  onSelectTheme: (themeId: ThemeId) => void;
  onEditProfile: () => void;
  onQuickContact: () => void;
  onExportPDF: () => void;
  onTogglePreview: () => void;
  onCloseMobileSidebar?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  profile,
  language,
  onToggleLanguage,
  currentTheme,
  onSelectTheme,
  onEditProfile,
  onQuickContact,
  onExportPDF,
  onTogglePreview,
  onCloseMobileSidebar,
}) => {
  const [copied, setCopied] = useState(false);
  const t = translations[language];

  const handleCopyEmail = () => {
    if (navigator.clipboard && profile.email) {
      navigator.clipboard.writeText(profile.email).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  const displayTitle = language === 'en' && profile.titleEn ? profile.titleEn : profile.title;
  const displayCompany =
    language === 'en' && profile.companyEn ? profile.companyEn : profile.company;
  const displayLocation =
    language === 'en' && profile.locationEn ? profile.locationEn : profile.location;
  const displayBio = language === 'en' && profile.bioEn ? profile.bioEn : profile.bio;

  const socialItems = [
    { label: 'GitHub', href: profile.github, icon: Github },
    { label: 'LinkedIn', href: profile.linkedin, icon: Linkedin },
    { label: 'Behance', href: profile.behance, icon: Briefcase },
    ...(profile.blog ? [{ label: 'Blog', href: profile.blog, icon: BookOpen }] : []),
  ];

  return (
    <div className="flex flex-col h-full p-6 sm:p-7 justify-between bg-white">
      <div className="space-y-6">
        {/* Top Utility Bar */}
        <div className="flex items-center justify-between gap-2 no-print">
          <div className="flex items-center gap-1.5">
            <ThemePicker
              currentTheme={currentTheme}
              onSelectTheme={onSelectTheme}
              language={language}
              compact
            />
            <button
              type="button"
              onClick={onToggleLanguage}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-zinc-200 bg-white text-xs font-medium text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900 transition-colors cursor-pointer"
              title="Switch Language"
            >
              <Globe className="w-3.5 h-3.5 text-zinc-500" />
              <span>{language === 'zh' ? 'EN' : '中文'}</span>
            </button>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={onEditProfile}
              className="p-1.5 rounded-lg border border-zinc-200 text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 transition-colors cursor-pointer"
              title={t.editProfile}
              aria-label={t.editProfile}
            >
              <Pencil className="w-3.5 h-3.5" />
            </button>
            {onCloseMobileSidebar && (
              <button
                type="button"
                onClick={onCloseMobileSidebar}
                className="lg:hidden p-1.5 rounded-lg border border-zinc-200 text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 transition-colors cursor-pointer"
                title={t.collapseSidebar}
                aria-label={t.collapseSidebar}
              >
                <PanelLeftClose className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Avatar & Identity */}
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="relative shrink-0">
              {profile.avatarUrl ? (
                <img
                  src={profile.avatarUrl}
                  alt={profile.name}
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 rounded-2xl object-cover border border-zinc-200"
                />
              ) : (
                <div className="w-16 h-16 rounded-2xl bg-theme-primary text-white flex items-center justify-center text-xl font-bold tracking-tight shadow-sm">
                  {profile.avatarInitials}
                </div>
              )}
              {profile.openToWork && (
                <span
                  className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white"
                  title={t.openToWork}
                />
              )}
            </div>

            <div className="min-w-0">
              <h1 className="text-xl font-bold text-zinc-900 tracking-tight truncate">
                {language === 'zh' ? profile.name : profile.englishName}
              </h1>
              <p className="text-xs font-medium text-zinc-500 truncate">
                {language === 'zh' ? profile.englishName : profile.name}
              </p>
              <div className="mt-1.5 inline-flex items-center gap-1.5 text-[11px] font-medium text-zinc-600">
                <span
                  className={`w-2 h-2 rounded-full ${
                    profile.openToWork ? 'bg-emerald-500' : 'bg-zinc-400'
                  }`}
                />
                <span>{profile.openToWork ? t.openToWork : t.notOpenToWork}</span>
              </div>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-theme-primary leading-snug">{displayTitle}</p>
            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-zinc-500">
              <span className="inline-flex items-center gap-1">
                <Briefcase className="w-3.5 h-3.5 text-zinc-400" />
                {displayCompany}
              </span>
              <span className="inline-flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                {displayLocation}
              </span>
            </div>
          </div>

          <p className="text-xs sm:text-[13px] text-zinc-600 leading-relaxed">{displayBio}</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-2.5 pt-2">
          <div className="rounded-xl bg-zinc-50 border border-zinc-200/80 p-3">
            <div className="text-lg font-bold text-zinc-900 tabular-nums">
              {profile.yearsExperience}+
            </div>
            <div className="text-[11px] text-zinc-500 font-medium mt-0.5">{t.yearsExp}</div>
          </div>
          <div className="rounded-xl bg-zinc-50 border border-zinc-200/80 p-3">
            <div className="text-lg font-bold text-zinc-900 tabular-nums">
              {profile.completedProjects}+
            </div>
            <div className="text-[11px] text-zinc-500 font-medium mt-0.5">{t.projectsDone}</div>
          </div>
        </div>

        {/* Social Links */}
        <div className="space-y-2 pt-1">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
            {t.socialLinks}
          </div>
          <div className="flex flex-wrap gap-2">
            {socialItems.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-zinc-200 bg-white text-xs font-medium text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900 transition-colors"
                >
                  <Icon className="w-3.5 h-3.5 text-zinc-500" />
                  <span>{item.label}</span>
                </a>
              );
            })}
          </div>
        </div>

        {/* Primary Actions */}
        <div className="space-y-2 pt-1 no-print">
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleCopyEmail}
              className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-zinc-200 bg-white text-xs font-medium text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900 transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">{t.copied}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-zinc-500" />
                  <span>{t.copyEmail}</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onQuickContact}
              className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-zinc-200 bg-white text-xs font-medium text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900 transition-colors cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5 text-zinc-500" />
              <span>{t.quickContact}</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={onTogglePreview}
              className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-zinc-200 bg-white text-xs font-medium text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-zinc-500" />
              <span>{t.previewPrint}</span>
            </button>

            <button
              type="button"
              onClick={onExportPDF}
              className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-theme-primary bg-theme-primary-hover text-white text-xs font-medium transition-colors cursor-pointer shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{t.downloadPdf}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Contact Info Footer */}
      <div className="pt-6 mt-6 border-t border-zinc-100 text-[11px] text-zinc-400 space-y-1">
        <div className="truncate font-mono-tech">{profile.email}</div>
        <div className="truncate font-mono-tech">{profile.phone}</div>
        <div className="pt-1">
          © {new Date().getFullYear()} {profile.englishName}. {t.copyright}.
        </div>
      </div>
    </div>
  );
};
