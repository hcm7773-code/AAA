import { ProfileData, ExperienceItem, SkillCategory, ProjectItem } from '../types';
import designSystemImg from '../assets/images/project_design_system_1795535712710.jpg';
import analyticsSaasImg from '../assets/images/project_analytics_saas_1795535713307.jpg';
import fintechMobileImg from '../assets/images/project_fintech_mobile_1795535713495.jpg';
import collabCanvasImg from '../assets/images/project_collab_canvas_1795535713461.jpg';

export const initialProfile: ProfileData = {
  name: '陳柏翰',
  englishName: 'Alex Chen',
  avatarInitials: 'AC',
  title: '資深前端架構師 & 產品工程師',
  titleEn: 'Senior Frontend Architect & Product Engineer',
  company: 'Linearity Studio',
  companyEn: 'Linearity Studio',
  location: '台北，台灣',
  locationEn: 'Taipei, Taiwan',
  bio: '擁有 7 年以上網頁架構與設計系統開發經驗，專注於打造高效能、高可維護性且具備極致細節的現代化數位產品。擅長 React、TypeScript、設計系統與前瞻性互動介面開發。',
  bioEn: '7+ years of experience crafting high-performance web applications, scalable design systems, and refined product interfaces with React, TypeScript, and modern web standards.',
  email: 'alex.chen@linearity.dev',
  phone: '+886 912-345-678',
  github: 'https://github.com/alexchen-dev',
  linkedin: 'https://linkedin.com/in/alexchen-dev',
  behance: 'https://behance.net/alexchen',
  blog: 'https://alexchen.dev/notes',
  yearsExperience: 7,
  completedProjects: 24,
  openToWork: true,
};

export const initialExperiences: ExperienceItem[] = [
  {
    id: 'exp-1',
    period: '2022.04 - Present',
    role: '資深前端架構師',
    roleEn: 'Senior Frontend Architect',
    company: 'Linearity Studio',
    companyEn: 'Linearity Studio',
    description:
      '主導企業級 SaaS 產品線的前端技術演進與設計系統建置，帶領 6 人前端團隊建立跨產品線的開發規範與自動化品質管線。',
    descriptionEn:
      'Lead frontend architecture and unified design system adoption across enterprise SaaS products, mentoring a 6-engineer team and establishing automated CI quality gates.',
    highlights: [
      '從零建置 Quantum Design System（45+ 無障礙基礎元件），讓跨團隊 UI 開發效率提升 50%',
      '重構核心儀表板資料管線與虛擬化表格，首頁 LCP 由 3.4s 縮短至 1.1s',
      '導入端對端測試與視覺回歸測試機制，將正式環境線上缺陷率降低 62%',
    ],
    highlightsEn: [
      'Architected Quantum Design System (45+ accessible components), accelerating cross-team UI delivery by 50%',
      'Rebuilt core analytics table virtualization and caching layer, reducing LCP from 3.4s to 1.1s',
      'Introduced Playwright E2E and visual regression pipelines, cutting production regressions by 62%',
    ],
    skills: ['React 19', 'TypeScript', 'Tailwind CSS', 'Vite', 'Design Systems'],
    type: 'work',
    achievements: ['開發效率 +50%', 'LCP 效能提升 68%', '線上缺陷率 -62%'],
    achievementsEn: ['+50% UI Velocity', '68% Faster LCP', '-62% Prod Bugs'],
  },
  {
    id: 'exp-2',
    period: '2019.08 - 2022.03',
    role: '資深全端產品工程師',
    roleEn: 'Senior Fullstack Product Engineer',
    company: 'FinSight Technologies',
    companyEn: 'FinSight Technologies',
    description:
      '負責即時金融資產看板與個人理財行動網頁之端對端開發，協作設計師、後端與資料團隊完成多項關鍵產品里程碑。',
    descriptionEn:
      'Owned end-to-end delivery of real-time portfolio telemetry dashboards and responsive wealth-management flows in close partnership with product design.',
    highlights: [
      '設計 WebSocket 增量更新架構，穩定承載每秒 2,000+ 筆行情與資產狀態推送',
      '主導前端微服務拆分與 Node.js BFF 層優化，減少 40% 冗餘 API 往返時間',
      '協助團隊導入 TypeScript 嚴格模式與共用 API 型別契約，加速前後端聯調',
    ],
    highlightsEn: [
      'Engineered delta-based WebSocket streaming supporting 2,000+ live telemetry updates per second',
      'Led Node.js BFF aggregation layer optimization, eliminating 40% redundant client round-trips',
      'Drove full TypeScript strict-mode migration and shared OpenAPI schema contracts',
    ],
    skills: ['TypeScript', 'Next.js', 'Node.js', 'PostgreSQL', 'WebSocket'],
    type: 'work',
    achievements: ['日活躍用戶 120K+', 'API 延遲降低 40%'],
    achievementsEn: ['120K+ DAU', '-40% API Latency'],
  },
  {
    id: 'exp-3',
    period: '2017.07 - 2019.07',
    role: '前端工程師',
    roleEn: 'Frontend Engineer',
    company: 'CraftWeb Digital',
    companyEn: 'CraftWeb Digital',
    description:
      '參與多項品牌旗艦網站與電商結帳流程重構，專注於響應式排版、流暢微互動動畫與搜尋引擎最佳化。',
    descriptionEn:
      'Built high-conversion e-commerce storefronts and interactive brand experiences with focus on responsive layout systems, motion craft, and technical SEO.',
    highlights: [
      '打造模組化結帳流程，將行動端結帳轉換率提升 18.5%',
      '實作自動化圖片最佳化與關鍵 CSS 內嵌策略，Lighthouse 評分穩定達 96+',
    ],
    highlightsEn: [
      'Redesigned modular mobile checkout flow, improving conversion rate by 18.5%',
      'Implemented responsive image pipelines and critical CSS inlining, scoring 96+ on Lighthouse',
    ],
    skills: ['React', 'JavaScript', 'SCSS', 'Motion', 'SEO'],
    type: 'work',
    achievements: ['結帳轉換率 +18.5%', 'Lighthouse 96+'],
    achievementsEn: ['+18.5% Checkout CVR', 'Lighthouse 96+'],
  },
  {
    id: 'edu-1',
    period: '2013.09 - 2017.06',
    role: '資訊工程學系 學士',
    roleEn: 'B.S. in Computer Science & Information Engineering',
    company: '國立台灣科技大學',
    companyEn: 'National Taiwan University of Science and Technology',
    description:
      '主修軟體工程、人機互動介面設計與分散式系統，畢業專題獲得系上優等實作獎。',
    descriptionEn:
      'Focused on Software Engineering, Human-Computer Interaction, and Distributed Systems. Awarded Outstanding Capstone Project.',
    highlights: [
      '擔任資訊社網頁開發工作坊講師，指導超過 80 位同學完成個人網站作品',
      '畢業專題：即時多人協作白板系統，採用 WebRTC 與 OT 同步演算法',
    ],
    highlightsEn: [
      'Lead instructor at the Web Engineering Club, mentoring 80+ students in modern web fundamentals',
      'Capstone: Real-time collaborative canvas powered by WebRTC and operational transformation',
    ],
    skills: ['Computer Science', 'HCI', 'Algorithms', 'WebRTC'],
    type: 'education',
    achievements: ['畢業專題優等獎', '書卷獎 2 次'],
    achievementsEn: ['Honors Capstone', "2x Dean's List"],
  },
];

export const initialSkillCategories: SkillCategory[] = [
  {
    category: '前端核心與架構',
    categoryEn: 'Frontend Core & Architecture',
    skills: [
      { name: 'React / Next.js', level: 96, tag: 'Expert', years: 7 },
      { name: 'TypeScript', level: 95, tag: 'Expert', years: 6 },
      { name: 'Tailwind CSS / Design Tokens', level: 94, tag: 'Expert', years: 5 },
      { name: 'State Management & Caching', level: 90, tag: 'Advanced', years: 6 },
    ],
  },
  {
    category: '後端、API 與系統整合',
    categoryEn: 'Backend, API & Infrastructure',
    skills: [
      { name: 'Node.js / Express', level: 86, tag: 'Proficient', years: 5 },
      { name: 'PostgreSQL / Prisma', level: 80, tag: 'Proficient', years: 4 },
      { name: 'RESTful / GraphQL / WebSocket', level: 88, tag: 'Advanced', years: 5 },
      { name: 'CI/CD & Docker', level: 78, tag: 'Intermediate', years: 3 },
    ],
  },
  {
    category: 'UI/UX 與工程品質',
    categoryEn: 'UI/UX Craft & Quality',
    skills: [
      { name: 'Figma & Component Specs', level: 88, tag: 'Advanced', years: 5 },
      { name: 'Web Performance & Core Web Vitals', level: 92, tag: 'Expert', years: 5 },
      { name: 'Accessibility (WCAG 2.1)', level: 85, tag: 'Proficient', years: 4 },
      { name: 'Vitest / Playwright Testing', level: 84, tag: 'Proficient', years: 4 },
    ],
  },
];

export const initialProjects: ProjectItem[] = [
  {
    id: 'proj-1',
    title: 'Quantum 企業設計系統與元件庫',
    titleEn: 'Quantum Enterprise Design System',
    category: 'UI/UX',
    description:
      '一套為跨團隊多產品線打造的零依賴設計系統與互動文件平台，涵蓋語意化 Design Tokens、無障礙元件規範與即時程式碼預覽。',
    descriptionEn:
      'A multi-product design system and interactive documentation workbench featuring semantic tokens, WCAG AA components, and live playground previews.',
    tags: ['React', 'TypeScript', 'Design Tokens', 'Storybook', 'WCAG'],
    year: '2024',
    imageUrl: designSystemImg,
    link: 'https://quantum-ds.example.dev',
    githubUrl: 'https://github.com/alexchen-dev/quantum-design-system',
    details:
      '針對多條產品線風格分歧與重複造輪子問題，統整 120+ 語意化色彩與間距 Token，實作 45 個支援鍵盤導覽與螢幕閱讀器的基礎元件，並透過自動化腳本將 Figma 變數同步至 NPM 套件。',
    detailsEn:
      'Unified 120+ semantic tokens and 45 keyboard-accessible primitives across four product squads, with automated Figma-to-NPM variable synchronization.',
  },
  {
    id: 'proj-2',
    title: 'Metriq SaaS 營運指標與即時分析看板',
    titleEn: 'Metriq SaaS Revenue & Telemetry Suite',
    category: 'Fullstack',
    description:
      '專為成長型 SaaS 團隊打造的即時營收、留存與訂閱轉換率分析平台，支援自訂維度切片、高密度虛擬表格與 PDF 報告輸出。',
    descriptionEn:
      'Real-time SaaS MRR, cohort retention, and subscription telemetry platform built with high-density virtualized tables and instant executive reporting.',
    tags: ['Next.js', 'TypeScript', 'PostgreSQL', 'SVG Charts', 'Tailwind CSS'],
    year: '2024',
    imageUrl: analyticsSaasImg,
    link: 'https://metriq-app.example.dev',
    githubUrl: 'https://github.com/alexchen-dev/metriq-analytics',
    details:
      '採用串流 SSR 與增量資料快取策略，讓十萬筆級訂閱明細在毫秒間完成篩選與聚合；圖表全面使用輕量客製化 SVG 與平滑貝茲曲線渲染，確保行動裝置亦能流暢互動。',
    detailsEn:
      'Combines streaming SSR with incremental query caching so 100k+ subscription records filter in milliseconds, backed by lightweight custom SVG data visualizations.',
  },
  {
    id: 'proj-3',
    title: 'FlowMap 即時多人協作流程畫布',
    titleEn: 'FlowMap Collaborative Diagram Workspace',
    category: 'Frontend',
    description:
      '支援多人游標同步、節點自動對齊與版本快照的網頁端架構圖與系統流程繪製工具，提供如原生桌面軟體般的 60fps 縮放體驗。',
    descriptionEn:
      'Multiplayer browser canvas supporting live cursor presence, smart snap-to-grid vector nodes, and smooth 60fps pan/zoom interactions.',
    tags: ['React', 'WebSocket', 'Canvas/SVG', 'CRDT', 'TypeScript'],
    year: '2023',
    imageUrl: collabCanvasImg,
    link: 'https://flowmap.example.dev',
    githubUrl: 'https://github.com/alexchen-dev/flowmap-canvas',
    details:
      '實作基於 CRDT 的無衝突狀態同步層與空間四叉樹碰撞偵測，即使畫布上同時存在上千個節點與連線，拖曳與框選操作仍維持穩定 60fps。',
    detailsEn:
      'Engineered a CRDT conflict-free state engine and spatial quadtree hit-testing so panning and selection stay locked at 60fps even with 1,000+ nodes.',
  },
  {
    id: 'proj-4',
    title: 'FinSight 行動財富管理應用程式介面',
    titleEn: 'FinSight Mobile Wealth & Banking UI',
    category: 'Mobile',
    description:
      '以極簡瑞士排版美學重塑個人數位銀行體驗，整合多幣別帳戶總覽、即時消費分類追蹤與儲蓄目標進度視覺化。',
    descriptionEn:
      'Minimalist digital banking interface redesign unifying multi-currency balances, automated expense categorization, and savings goal trackers.',
    tags: ['React Native', 'TypeScript', 'Motion', 'Fintech UX'],
    year: '2023',
    imageUrl: fintechMobileImg,
    link: 'https://finsight-mobile.example.dev',
    details:
      '透過清晰數字層級與手勢互動設計降低金融操作焦慮感，使用者測試顯示完成跨行轉帳平均耗時縮短 35%，並在產品上線首季取得 4.9 星商店評價。',
    detailsEn:
      'Reduced transfer flow completion time by 35% through crisp numeric hierarchy and fluid gesture navigation, earning a 4.9-star launch rating.',
  },
];
