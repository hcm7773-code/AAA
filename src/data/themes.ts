export type ThemeId = 'zinc' | 'navy' | 'emerald' | 'wine' | 'indigo' | 'amber';

export interface ThemeOption {
  id: ThemeId;
  name: string;
  nameEn: string;
  primary: string;
  primaryHover: string;
  accent: string;
  accentLight: string;
  ring: string;
}

export const themeOptions: ThemeOption[] = [
  {
    id: 'zinc',
    name: '極簡深灰',
    nameEn: 'Minimal Charcoal',
    primary: '#18181b',
    primaryHover: '#09090b',
    accent: '#3f3f46',
    accentLight: '#f4f4f5',
    ring: '#a1a1aa',
  },
  {
    id: 'navy',
    name: '皇家海軍藍',
    nameEn: 'Royal Navy',
    primary: '#1e3a8a',
    primaryHover: '#172554',
    accent: '#1d4ed8',
    accentLight: '#eff6ff',
    ring: '#93c5fd',
  },
  {
    id: 'emerald',
    name: '深邃森林綠',
    nameEn: 'Forest Emerald',
    primary: '#064e3b',
    primaryHover: '#022c22',
    accent: '#047857',
    accentLight: '#ecfdf5',
    ring: '#6ee7b7',
  },
  {
    id: 'wine',
    name: '勃根地酒紅',
    nameEn: 'Burgundy Wine',
    primary: '#881337',
    primaryHover: '#4c0519',
    accent: '#be123c',
    accentLight: '#fff1f2',
    ring: '#fda4af',
  },
  {
    id: 'indigo',
    name: '極光靛藍',
    nameEn: 'Deep Indigo',
    primary: '#312e81',
    primaryHover: '#1e1b4b',
    accent: '#4338ca',
    accentLight: '#eef2ff',
    ring: '#a5b4fc',
  },
  {
    id: 'amber',
    name: '暖陽琥珀',
    nameEn: 'Warm Amber',
    primary: '#78350f',
    primaryHover: '#451a03',
    accent: '#b45309',
    accentLight: '#fffbeb',
    ring: '#fcd34d',
  },
];

export function getThemeById(id?: ThemeId): ThemeOption {
  return themeOptions.find((t) => t.id === id) || themeOptions[0];
}

export function applyThemeToDocument(themeId: ThemeId): void {
  const theme = getThemeById(themeId);
  const root = document.documentElement;
  root.style.setProperty('--theme-primary', theme.primary);
  root.style.setProperty('--theme-primary-hover', theme.primaryHover);
  root.style.setProperty('--theme-accent', theme.accent);
  root.style.setProperty('--theme-accent-light', theme.accentLight);
  root.style.setProperty('--theme-ring', theme.ring);
}
