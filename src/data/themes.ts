export type ThemeId = 'zinc' | 'navy' | 'emerald' | 'wine' | 'indigo' | 'amber';

export interface ThemeOption {
  id: ThemeId;
  nameZh: string;
  nameEn: string;
  primaryColor: string;      // main brand color (e.g., #18181b)
  primaryHover: string;      // hover state (e.g., #09090b)
  accentColor: string;       // secondary accent (e.g., #27272a)
  accentLight: string;       // light tint background (e.g., #f4f4f5)
  ringColor: string;         // focus ring color (e.g., #a1a1aa)
  dotColor: string;          // color swatch preview
}

export const themeOptions: ThemeOption[] = [
  {
    id: 'zinc',
    nameZh: '極簡深灰',
    nameEn: 'Minimal Charcoal',
    primaryColor: '#18181b',
    primaryHover: '#09090b',
    accentColor: '#3f3f46',
    accentLight: '#f4f4f5',
    ringColor: '#a1a1aa',
    dotColor: '#18181b',
  },
  {
    id: 'navy',
    nameZh: '皇家海軍藍',
    nameEn: 'Royal Navy',
    primaryColor: '#1e3a8a',
    primaryHover: '#172554',
    accentColor: '#2563eb',
    accentLight: '#eff6ff',
    ringColor: '#60a5fa',
    dotColor: '#1e3a8a',
  },
  {
    id: 'emerald',
    nameZh: '深邃森林綠',
    nameEn: 'Forest Emerald',
    primaryColor: '#064e3b',
    primaryHover: '#022c22',
    accentColor: '#059669',
    accentLight: '#ecfdf5',
    ringColor: '#34d399',
    dotColor: '#064e3b',
  },
  {
    id: 'wine',
    nameZh: '勃根地酒紅',
    nameEn: 'Burgundy Wine',
    primaryColor: '#881337',
    primaryHover: '#4c0519',
    accentColor: '#be123c',
    accentLight: '#fff1f2',
    ringColor: '#fb7185',
    dotColor: '#881337',
  },
  {
    id: 'indigo',
    nameZh: '極光靛藍',
    nameEn: 'Deep Indigo',
    primaryColor: '#312e81',
    primaryHover: '#1e1b4b',
    accentColor: '#4f46e5',
    accentLight: '#eef2ff',
    ringColor: '#818cf8',
    dotColor: '#312e81',
  },
  {
    id: 'amber',
    nameZh: '暖陽琥珀',
    nameEn: 'Warm Amber',
    primaryColor: '#78350f',
    primaryHover: '#451a03',
    accentColor: '#d97706',
    accentLight: '#fffbeb',
    ringColor: '#fbbf24',
    dotColor: '#78350f',
  },
];

export const getThemeById = (id: ThemeId): ThemeOption => {
  return themeOptions.find((t) => t.id === id) || themeOptions[0];
};

export const applyThemeToDocument = (theme: ThemeOption) => {
  const root = document.documentElement;
  root.style.setProperty('--theme-primary', theme.primaryColor);
  root.style.setProperty('--theme-primary-hover', theme.primaryHover);
  root.style.setProperty('--theme-accent', theme.accentColor);
  root.style.setProperty('--theme-accent-light', theme.accentLight);
  root.style.setProperty('--theme-ring', theme.ringColor);
  root.setAttribute('data-theme', theme.id);
};
