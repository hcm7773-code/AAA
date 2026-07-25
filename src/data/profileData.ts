import { ProfileData, ExperienceItem, SkillCategory, ProjectItem } from '../types';

export const initialProfile: ProfileData = {
  name: '林書宇',
  englishName: 'Shu-Yu Lin',
  avatarInitials: 'SY',
  title: '高級資深前端架構師 / Senior Frontend Architect',
  company: '瑞昱科技',
  location: '台灣 台北市',
  bio: '專注於前端架構與極簡介面設計。熱衷於透過乾淨的程式碼與直觀的互動，解決複雜的商業問題。目前旅居於台北，持續探索技術與極簡美學的邊界。',
  email: 'shuyu.lin.dev@example.com',
  phone: '+886 912-345-678',
  github: 'https://github.com',
  linkedin: 'https://linkedin.com',
  behance: 'https://behance.net',
  blog: 'https://techblog.example.com',
  yearsExperience: 7,
  completedProjects: 45,
  openToWork: true,
};

export const initialExperiences: ExperienceItem[] = [
  {
    id: 'exp-1',
    period: '2021 — PRESENT',
    role: '高級前端工程師 / Tech Lead',
    company: '瑞昱科技 (Realtek Microelectronics)',
    description: '主導核心產品前端架構升級與 UI/UX 設計規範制定，帶領 6 人前端團隊開發高效能雲端管理平台。',
    highlights: [
      '主導單頁應用 (SPA) 效能最佳化，將首頁 LCP 載入時間降低 45%',
      '建立團隊內部 UI 元件庫 (Design System)，提升跨團隊開發效率 30%',
      '導入 微前端 (Micro-frontends) 架構，實現大型模組獨立部署'
    ],
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'GraphQL', 'Micro-frontends'],
    type: 'work',
  },
  {
    id: 'exp-2',
    period: '2018 — 2021',
    role: '資深網頁開發者',
    company: '雲端系統軟體科技 (CloudSys Inc.)',
    description: '負責開發與維護可擴展的 SaaS 後台管理介面與數據視覺化儀表板。',
    highlights: [
      '利用 D3.js 與 Recharts 開發高互動性實時數據儀表板',
      '設計 RESTful 與 WebSocket 雙向通信機制，處理百萬級即時事件數據',
      '實作自動化 CI/CD pipeline 與 Jest 單元測試，維護品質標準'
    ],
    skills: ['Vue.js', 'TypeScript', 'Node.js', 'D3.js', 'WebSocket', 'Docker'],
    type: 'work',
  },
  {
    id: 'exp-3',
    period: '2016 — 2018',
    role: '前端工程師',
    company: '創想數位設計 (Creative Digital Studio)',
    description: '為跨國品牌客戶量身打造客製化響應式網站與互動式行銷頁面。',
    highlights: [
      '打造超過 20 個高質感品牌 RWD 網站與專案體驗',
      '優化跨瀏覽器相容性與網頁無障礙設計 (WCAG AA)'
    ],
    skills: ['JavaScript (ES6+)', 'HTML5/CSS3', 'Sass', 'Webpack', 'Figma'],
    type: 'work',
  },
  {
    id: 'exp-edu-1',
    period: '2012 — 2016',
    role: '資訊工程學系 學士',
    company: '國立臺灣大學 (National Taiwan University)',
    description: '主修軟體工程、人機互動 (HCI) 與資料結構。畢業專題獲得校級最佳專題展第一名。',
    highlights: [
      '畢業專題：基於 WebGL 的實時 3D 數據視覺化系統',
      '擔任系學會資訊部長，負責院系網站與選課輔助系統開發'
    ],
    skills: ['C++', 'Algorithms', 'Web Development', 'HCI Design'],
    type: 'education',
  },
];

export const initialSkillCategories: SkillCategory[] = [
  {
    category: '核心前端 (Core Frontend)',
    skills: [
      { name: 'TypeScript', level: 95, tag: 'Expert', years: 6 },
      { name: 'React / Next.js', level: 92, tag: 'Expert', years: 6 },
      { name: 'Tailwind CSS', level: 95, tag: 'Expert', years: 5 },
      { name: 'Vue.js / Nuxt', level: 85, tag: 'Advanced', years: 4 },
      { name: 'HTML5 & Semantic Standard', level: 98, tag: 'Master', years: 7 },
      { name: 'CSS Architecture & Animation', level: 90, tag: 'Advanced', years: 7 },
    ],
  },
  {
    category: '後端與架構 (Backend & Infra)',
    skills: [
      { name: 'Node.js / Express', level: 88, tag: 'Advanced', years: 5 },
      { name: 'RESTful API & GraphQL', level: 90, tag: 'Advanced', years: 5 },
      { name: 'PostgreSQL / Firestore', level: 80, tag: 'Proficient', years: 4 },
      { name: 'Docker & Containerization', level: 75, tag: 'Proficient', years: 3 },
      { name: 'Vite & Webpack Build Optimization', level: 88, tag: 'Advanced', years: 5 },
    ],
  },
  {
    category: 'UI/UX 與 工具 (Design & Tools)',
    skills: [
      { name: 'Figma Design System', level: 88, tag: 'Advanced', years: 5 },
      { name: 'Git / GitHub Workflow', level: 95, tag: 'Expert', years: 7 },
      { name: 'Jest / Vitest / Playwright', level: 82, tag: 'Proficient', years: 4 },
      { name: 'CI/CD Pipelines (GitHub Actions)', level: 80, tag: 'Proficient', years: 3 },
      { name: 'WCAG Accessibility Standards', level: 85, tag: 'Advanced', years: 4 },
    ],
  },
];

export const initialProjects: ProjectItem[] = [
  {
    id: 'proj-1',
    title: 'Minimalist Design System (極簡設計系統)',
    category: 'Frontend',
    description: '專為企業級網頁應用設計的高效能、無障礙 React 元件庫，支援 Tailwind CSS 與完整 TypeScript 型別定義。',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Storybook'],
    year: '2024',
    imageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
    link: 'https://example.com/design-system',
    githubUrl: 'https://github.com/example/design-system',
    details: '此設計系統包含超過 40 個基礎與複合元件，全部通過 WCAG 2.1 AA 規範，支援微小包體與全組件 Tree-shaking。'
  },
  {
    id: 'proj-2',
    title: 'CloudMetrics 雲端數據即時監控儀表板',
    category: 'Fullstack',
    description: '高併發即時系統效能監控平台，整合 WebSocket 通訊與可動態擴充的數據視覺化圖表。',
    tags: ['Next.js', 'Node.js', 'WebSocket', 'Recharts', 'Tailwind'],
    year: '2023',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    link: 'https://example.com/cloudmetrics',
    githubUrl: 'https://github.com/example/cloudmetrics',
    details: '提供超低延遲的數據更新，具備卡片自訂、多維度數據過濾與 PDF 報告自動匯出功能。'
  },
  {
    id: 'proj-3',
    title: 'ZenNote 沉浸式專註筆記工具',
    category: 'UI/UX',
    description: '以極簡主義為核心理念的無干擾寫作平台，支援 Markdown 語法、離線儲存與極致排版美學。',
    tags: ['Vue 3', 'TypeScript', 'IndexedDB', 'Tailwind CSS'],
    year: '2023',
    imageUrl: 'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=800&q=80',
    link: 'https://example.com/zennote',
    githubUrl: 'https://github.com/example/zennote',
    details: '強調毫秒級的打字響應與絲滑的心流體驗，內建暗黑與極簡淺色兩種經典主題。'
  },
  {
    id: 'proj-4',
    title: 'Aura AI 創意寫作與圖像輔助工作流',
    category: 'Fullstack',
    description: '結合 AI 生成模型的靈感創作者工作台，整合提示詞編寫與多版本比較介面。',
    tags: ['React', 'Gemini API', 'Express', 'Tailwind'],
    year: '2024',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    link: 'https://example.com/aura-ai',
    githubUrl: 'https://github.com/example/aura-ai',
    details: '使用者可快速進行文字潤飾、大綱生成與圖像生成，專為文案師與設計師量身打造。'
  }
];
