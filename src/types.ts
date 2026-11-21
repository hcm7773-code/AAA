export type CaliberId = 'annual' | 'quarterly' | 'sentiment' | 'competitor';

export interface DataCaliber {
  id: CaliberId;
  label: string;
  period: string;
  totalCount: number;
  unit: string;
  headlineMetric: string;
  summary: string;
  caveat: string;
  breakdown: {
    label: string;
    value: string;
    share?: string;
    tone: 'positive' | 'neutral' | 'negative' | 'primary';
  }[];
}

export interface MonthlyTopicVolume {
  month: string;
  periodLabel: string;
  count: number;
  isPeak: boolean;
  note: string;
}

export interface PeakEvent {
  id: string;
  date: string;
  type: '日聲量高峰' | '週聲量高峰' | '負面文章高峰';
  count: number;
  unit: string;
  driver: string;
  actionNote: string;
  tone: 'primary' | 'negative';
}

export interface SentimentSlice {
  id: 'positive' | 'neutral' | 'negative';
  label: string;
  count: number;
  percentage: number;
  interpretation: string;
  riskFocus: string;
}

export interface HotKeyword {
  term: string;
  cluster: '產品與成分' | '使用情境' | '品牌與通路' | '醫療與手術';
  context: string;
  strategicImplication: string;
}

export interface HotTopicCluster {
  id: string;
  title: string;
  examples: string[];
  consumerDriver: string;
}

export interface CommunityPerspective {
  id: string;
  title: string;
  summary: string;
}

export interface PurchaseFactor {
  index: string;
  title: string;
  detail: string;
  communicationRule: string;
}

export interface SourceChannelItem {
  name: string;
  category: '品牌自有社群' | '內容創作平台' | '社群論壇' | '新聞與媒體';
  reportedCount?: number;
  rankNote: string;
  natureNote: string;
  caution: string;
}

export interface KolArchetype {
  id: string;
  category: string;
  platform: string;
  contentFocus: string;
  recommendedFormat: string;
  targetAction: string;
  testingProtocol: string;
}

export interface CrisisStage {
  step: number;
  phase: string;
  focus: string;
  triggers: string[];
  actions: string[];
  horizon: '即時監測' | '短期應變' | '中長期建設';
}

export interface StrategicAction {
  id: string;
  pillar: string;
  title: string;
  recommendation: string;
  targetAudience: string;
  kpiFocus: string;
}

export interface FeaturedCarouselLink {
  id: string;
  index: string;
  sourceName: string;
  domain: string;
  category: string;
  title: string;
  summary: string;
  url: string;
  imageUrl: string;
}


