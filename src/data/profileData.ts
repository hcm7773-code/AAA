import { ProfileData, ExperienceItem, SkillCategory, ProjectItem } from '../types';

export const initialProfile: ProfileData = {
  name: '林書宇',
  englishName: 'Shu-Yu Lin',
  avatarInitials: 'SY',
  title: '高級資深前端架構師',
  titleEn: 'Senior Frontend Architect',
  company: '瑞昱科技',
  companyEn: 'Realtek Microelectronics',
  location: '台灣 台北市',
  locationEn: 'Taipei, Taiwan',
  bio: '專注於前端架構與極簡介面設計。熱衷於透過乾淨的程式碼與直觀的互動，解決複雜的商業問題。目前旅居於台北，持續探索技術與極簡美學的邊界。',
  bioEn: 'Focused on frontend architecture and minimalist UI design. Passionate about solving complex business problems through clean code and intuitive interactions. Currently based in Taipei, exploring the intersection of technology and aesthetics.',
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
    period: '2012 — PRESENT',
    role: '高級前端工程師 / Tech Lead',
    roleEn: 'Senior Frontend Engineer / Tech Lead',
    company: '瑞昱科技 (Realtek Microelectronics)',
    companyEn: 'Realtek Microelectronics',
    description: '主導核心產品前端架構升級與 UI/UX 設計規範制定，帶領 6 人前端團隊開發高效能雲端管理平台。',
    descriptionEn: 'Led the core product frontend architecture upgrade and UI/UX design system, managing a team of 6 frontend developers for a high-performance cloud management platform.',
    highlights: [
      '主導單頁應用 (SPA) 效能最佳化，將首頁 LCP 載入時間降低 45%',
      '建立團隊內部 UI 元件庫 (Design System)，提升跨團隊開發效率 30%',
      '導入 微前端 (Micro-frontends) 架構，實現大型模組獨立部署'
    ],
    highlightsEn: [
      'Led SPA performance optimization, reducing homepage LCP loading time by 45%',
      'Established internal UI Design System, boosting cross-team engineering velocity by 30%',
      'Architected Micro-frontends setup to enable independent module deployments'
    ],
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'GraphQL', 'Micro-frontends'],
    type: 'work',
    achievements: ['🏆 2023 最佳團隊領袖獎', '🚀 首頁 LCP 效能提升 45%', '🏅 內部 Design System 最佳實踐'],
    achievementsEn: ['🏆 2023 Best Team Leader Award', '🚀 45% LCP Performance Boost', '🏅 Internal Design System Benchmark'],
  },
  {
    id: 'exp-2',
    period: '2018 — 2021',
    role: '資深網頁開發者',
    roleEn: 'Senior Web Developer',
    company: '雲端系統軟體科技 (CloudSys Inc.)',
    companyEn: 'CloudSys Inc.',
    description: '負責開發與維護可擴展的 SaaS 後台管理介面與數據視覺化儀表板。',
    descriptionEn: 'Responsible for building and maintaining scalable SaaS dashboard interfaces and real-time data visualization charts.',
    highlights: [
      '利用 D3.js 與 Recharts 開發高互動性實時數據儀表板',
      '設計 RESTful 與 WebSocket 雙向通信機制，處理百萬級即時事件數據',
      '實作自動化 CI/CD pipeline 與 Jest 單元測試，維護品質標準'
    ],
    highlightsEn: [
      'Developed interactive real-time data dashboards using D3.js and Recharts',
      'Designed RESTful & WebSocket bi-directional protocols handling millions of live events',
      'Implemented automated CI/CD pipelines and Jest unit tests to maintain high quality standards'
    ],
    skills: ['Vue.js', 'TypeScript', 'Node.js', 'D3.js', 'WebSocket', 'Docker'],
    type: 'work',
    achievements: ['📊 處理百萬級即時事件流量', '⚡ 團隊 CI/CD 自動化建置標竿'],
    achievementsEn: ['📊 Handled million-level real-time traffic', '⚡ Team CI/CD automation benchmark'],
  },
  {
    id: 'exp-3',
    period: '2016 — 2018',
    role: '前端工程師',
    roleEn: 'Frontend Developer',
    company: '創想數位設計 (Creative Digital Studio)',
    companyEn: 'Creative Digital Studio',
    description: '為跨國品牌客戶量身打造客製化響應式網站與互動式行銷頁面。',
    descriptionEn: 'Crafted bespoke responsive websites and interactive marketing platforms for global brand clients.',
    highlights: [
      '打造超過 20 個高質感品牌 RWD 網站與專案體驗',
      '優化跨瀏覽器相容性與網頁無障礙設計 (WCAG AA)'
    ],
    highlightsEn: [
      'Delivered over 20+ premium responsive brand websites and interactive experiences',
      'Optimized cross-browser compatibility and web accessibility (WCAG AA compliant)'
    ],
    skills: ['JavaScript (ES6+)', 'HTML5/CSS3', 'Sass', 'Webpack', 'Figma'],
    type: 'work',
    achievements: ['⭐ 20+ 跨國品牌專案 100% 準時交付', '♿ WCAG AA 無障礙檢測認證'],
    achievementsEn: ['⭐ 20+ Multinational Projects Delivered On-time', '♿ WCAG AA Accessibility Certified'],
  },
  {
    id: 'exp-edu-1',
    period: '2012 — 2016',
    role: '資訊工程學系 學士',
    roleEn: 'B.S. in Computer Science',
    company: '國立臺灣大學 (National Taiwan University)',
    companyEn: 'National Taiwan University (NTU)',
    description: '主修軟體工程、人機互動 (HCI) 與資料結構。畢業專題獲得校級最佳專題展第一名。',
    descriptionEn: 'Majored in Software Engineering, HCI, and Data Structures. Graduation project won 1st Place in University Senior Exhibition.',
    highlights: [
      '畢業專題：基於 WebGL 的實時 3D 數據視覺化系統',
      '擔任系學會資訊部長，負責院系網站與選課輔助系統開發'
    ],
    highlightsEn: [
      'Senior Thesis: Real-time 3D Data Visualization System based on WebGL',
      'Head of IT, Student Association: Developed department website and course auxiliary system'
    ],
    skills: ['C++', 'Algorithms', 'Web Development', 'HCI Design'],
    type: 'education',
    achievements: ['🥇 校級最佳畢業專題展第一名', '🎓 書院優秀學生獎學金'],
    achievementsEn: ['🥇 1st Place, University Senior Project Expo', '🎓 College Outstanding Student Scholarship'],
  },
];

export const initialSkillCategories: SkillCategory[] = [
  {
    category: '核心前端 (Core Frontend)',
    categoryEn: 'Core Frontend',
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
    categoryEn: 'Backend & Infrastructure',
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
    categoryEn: 'UI/UX & Engineering Tools',
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
    titleEn: 'Minimalist Design System',
    category: 'Frontend',
    description: '專為企業級網頁應用設計的高效能、無障礙 React 元件庫，支援 Tailwind CSS 與完整 TypeScript 型別定義。',
    descriptionEn: 'High-performance, accessible React component library designed for enterprise web apps, with Tailwind CSS and full TypeScript definitions.',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Storybook'],
    year: '2024',
    imageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
    link: 'https://example.com/design-system',
    githubUrl: 'https://github.com/example/design-system',
    details: '此設計系統包含超過 40 個基礎與複合元件，全部通過 WCAG 2.1 AA 規範，支援微小包體與全組件 Tree-shaking。',
    detailsEn: 'Features over 40+ atomic and complex components, fully compliant with WCAG 2.1 AA, supporting tree-shaking and ultra-light bundle size.'
  },
  {
    id: 'proj-2',
    title: 'CloudMetrics 雲端數據即時監控儀表板',
    titleEn: 'CloudMetrics Real-time Monitoring Dashboard',
    category: 'Fullstack',
    description: '高併發即時系統效能監控平台，整合 WebSocket 通訊與可動態擴充的數據視覺化圖表。',
    descriptionEn: 'High-concurrency real-time system performance monitoring platform, integrating WebSocket and dynamic chart visualizations.',
    tags: ['Next.js', 'Node.js', 'WebSocket', 'Recharts', 'Tailwind'],
    year: '2023',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    link: 'https://example.com/cloudmetrics',
    githubUrl: 'https://github.com/example/cloudmetrics',
    details: '提供超低延遲的數據更新，具備卡片自訂、多維度數據過濾與 PDF 報告自動匯出功能。',
    detailsEn: 'Provides ultra-low latency updates, customizable card widgets, multi-dimensional filters, and automated PDF export.'
  },
  {
    id: 'proj-3',
    title: 'ZenNote 沉浸式專註筆記工具',
    titleEn: 'ZenNote Minimalist Distraction-free Notes',
    category: 'UI/UX',
    description: '以極簡主義為核心理念的無干擾寫作平台，支援 Markdown 語法、離線儲存與極致排版美學。',
    descriptionEn: 'Distraction-free writing app centered around minimalism, supporting Markdown syntax, offline storage, and refined typography.',
    tags: ['Vue 3', 'TypeScript', 'IndexedDB', 'Tailwind CSS'],
    year: '2023',
    imageUrl: 'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=800&q=80',
    link: 'https://example.com/zennote',
    githubUrl: 'https://github.com/example/zennote',
    details: '強調毫秒級的打字響應與絲滑的心流體驗，內建暗黑與極簡淺色兩種經典主題。',
    detailsEn: 'Emphasizes millisecond typing response and smooth flow state, featuring dark mode and clean light theme.'
  },
  {
    id: 'proj-4',
    title: 'Aura AI 創意寫作與圖像輔助工作流',
    titleEn: 'Aura AI Creative Writing & Image Workflow',
    category: 'Fullstack',
    description: '結合 AI 生成模型的靈感創作者工作台，整合提示詞編寫與多版本比較介面。',
    descriptionEn: 'Generative AI powered creative workstation integrating prompt engineering and multi-version comparisons.',
    tags: ['React', 'Gemini API', 'Express', 'Tailwind'],
    year: '2024',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    link: 'https://example.com/aura-ai',
    githubUrl: 'https://github.com/example/aura-ai',
    details: '使用者可快速進行文字潤飾、大綱生成與圖像生成，專為文案師與設計師量身打造。',
    detailsEn: 'Allows creators to polish text, generate outlines, and produce AI artwork seamlessly.'
  }
];
