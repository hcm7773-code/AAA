import React, { useState, useRef, useEffect } from 'react';
import { Palette, Check, ChevronDown } from 'lucide-react';
import { ThemeId, themeOptions, ThemeOption } from '../data/themes';
import { Language, translations } from '../data/translations';

interface ThemePickerProps {
  currentThemeId: ThemeId;
  onSelectTheme: (themeId: ThemeId) => void;
  lang: Language;
  compact?: boolean;
}

export const ThemePicker: React.FC<ThemePickerProps> = ({
  currentThemeId,
  onSelectTheme,
  lang,
  compact = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const t = translations[lang];

  const currentTheme = themeOptions.find((theme) => theme.id === currentThemeId) || themeOptions[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 rounded-md font-bold text-xs transition-all border shadow-2xs no-print ${
          compact
            ? 'px-2.5 py-1.5 bg-zinc-50 hover:bg-zinc-100 text-zinc-800 border-zinc-200'
            : 'px-3 py-1.5 bg-white hover:bg-zinc-50 text-zinc-800 border-zinc-200'
        }`}
        title={t.themeSelection}
      >
        <div
          className="w-3.5 h-3.5 rounded-full border border-black/20 shadow-2xs shrink-0 transition-transform duration-300"
          style={{ backgroundColor: currentTheme.primaryColor }}
        />
        <span className="hidden sm:inline font-medium">
          {lang === 'en' ? currentTheme.nameEn : currentTheme.nameZh}
        </span>
        <Palette className="w-3.5 h-3.5 text-zinc-500" />
        <ChevronDown className={`w-3 h-3 text-zinc-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Popover Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white border border-zinc-200 rounded-xl shadow-xl z-50 p-3 space-y-2 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-100">
            <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5 text-zinc-500" />
              {t.selectTheme}
            </span>
          </div>

          <div className="grid grid-cols-1 gap-1">
            {themeOptions.map((option) => {
              const isSelected = option.id === currentThemeId;
              const name = lang === 'en' ? option.nameEn : option.nameZh;

              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => {
                    onSelectTheme(option.id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-medium transition-all ${
                    isSelected
                      ? 'bg-zinc-100 text-zinc-900 font-bold border border-zinc-300/80'
                      : 'hover:bg-zinc-50 text-zinc-600 hover:text-zinc-900 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {/* Swatch */}
                    <div className="relative flex items-center justify-center">
                      <div
                        className="w-4 h-4 rounded-full border border-black/10 shadow-2xs"
                        style={{ backgroundColor: option.primaryColor }}
                      />
                      <div
                        className="absolute -right-1 -bottom-0.5 w-2.5 h-2.5 rounded-full border border-white"
                        style={{ backgroundColor: option.accentColor }}
                      />
                    </div>
                    <span>{name}</span>
                  </div>

                  {isSelected && (
                    <Check className="w-3.5 h-3.5 text-zinc-900 stroke-[3]" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
