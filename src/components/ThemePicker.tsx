import React, { useState, useRef, useEffect } from 'react';
import { Palette, Check } from 'lucide-react';
import { themeOptions, ThemeId } from '../data/themes';
import { Language, translations } from '../data/translations';

interface ThemePickerProps {
  currentTheme: ThemeId;
  onSelectTheme: (themeId: ThemeId) => void;
  language: Language;
  compact?: boolean;
}

export const ThemePicker: React.FC<ThemePickerProps> = ({
  currentTheme,
  onSelectTheme,
  language,
  compact = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const t = translations[language];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const activeTheme = themeOptions.find((opt) => opt.id === currentTheme) || themeOptions[0];

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex items-center gap-2 rounded-lg border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900 transition-colors cursor-pointer ${
          compact ? 'px-2.5 py-1.5 text-xs font-medium' : 'px-3 py-1.5 text-xs font-medium'
        }`}
        title={t.themeLabel}
        aria-label={t.themeLabel}
      >
        <span
          className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
          style={{ backgroundColor: activeTheme.primary }}
        />
        {!compact && <span className="hidden sm:inline">{language === 'zh' ? activeTheme.name : activeTheme.nameEn}</span>}
        <Palette className="w-3.5 h-3.5 text-zinc-500" />
      </button>

      {isOpen && (
        <div
          className={`absolute z-50 mt-2 w-52 rounded-xl bg-white border border-zinc-200 shadow-lg p-2 ${
            compact ? 'left-0' : 'right-0'
          }`}
        >
          <div className="px-2 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
            {t.themeLabel}
          </div>
          <div className="space-y-0.5 mt-1">
            {themeOptions.map((option) => {
              const isSelected = option.id === currentTheme;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => {
                    onSelectTheme(option.id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-zinc-100 text-zinc-900 font-semibold'
                      : 'text-zinc-700 hover:bg-zinc-50'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <span
                      className="w-4 h-4 rounded-full border border-black/10 shrink-0"
                      style={{ backgroundColor: option.primary }}
                    />
                    <span>{language === 'zh' ? option.name : option.nameEn}</span>
                  </span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-zinc-900" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
