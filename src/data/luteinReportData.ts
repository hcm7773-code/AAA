import {
  DataCaliber,
  MonthlyTopicVolume,
  PeakEvent,
  SentimentSlice,
  HotKeyword,
  HotTopicCluster,
  CommunityPerspective,
  PurchaseFactor,
  SourceChannelItem,
  KolArchetype,
  CrisisStage,
  StrategicAction,
  FeaturedCarouselLink,
} from '../types';
import themeEyeglassesNewsImg from '../assets/images/theme_eyeglasses_news_1795290790430.jpg';
import themeEyemallEventsImg from '../assets/images/theme_eyemall_events_1795290790181.jpg';
import themeEyeglassesLocationImg from '../assets/images/theme_eyeglasses_location_1795290790322.jpg';
import themeLuteinGuideImg from '../assets/images/theme_lutein_guide_1795290790531.jpg';

export const REPORT_META = {
  platformTitle: '葉黃素市場聲量與社群口碑摘要平台',
  dataProvider: 'OpView 社群口碑資料庫',
  primaryPeriod: '2026 年 8 月 – 10 月',
  annualPeriod: '2025 年 10 月 – 2026 年 10 月',
  coreDirection: '透明溝通、精準內容、持續監測',
  caliberPrinciple: '年度關鍵字、三個月社群主題、品牌比較與情緒分類樣本之統計範圍與口徑不同，解讀時應分開看待。',
};

export const RESEARCH_MOTIVATIONS = [
  {
    index: '01',
    title: '數位設備高頻用眼趨勢',
    detail: '手機、電腦等 3C 設備融入日常，長時間用眼使眼睛保健成為持續升溫的消費議題。',
  },
  {
    index: '02',
    title: '配方多元與選購比較成本高',
    detail: '葉黃素品牌與複方配方多元，消費者高度比較成分、含量、劑量、價格、產品型態及網路評價。',
  },
  {
    index: '03',
    title: '曝光量不等於好感度',
    detail: '高曝光不代表高好感，必須同步剖析正負面情緒、熱門話題與社群擴散路徑以指導輿情管理。',
  },
];

export const DATA_CALIBERS: DataCaliber[] = [
  {
    id: 'annual',
    label: '年度關鍵字總聲量',
    period: '2025/10 – 2026/10',
    totalCount: 384830,
    unit: '則',
    headlineMetric: '384,830 則',
    summary: '補足年度長週期視野，追蹤葉黃素關鍵字大盤聲量與年度正負面情緒基線變化。',
    caveat: '此為年度大盤關鍵字統計口徑，不可與三個月主題樣本直接相除或混算比例。',
    breakdown: [
      { label: '年度關鍵字總聲量', value: '384,830 則', tone: 'primary' },
      { label: '年度正面聲量', value: '118,820 則', share: '30.9% 顯性正面', tone: 'positive' },
      { label: '年度負面聲量', value: '10,851 則', share: '2.8% 顯性負面', tone: 'negative' },
    ],
  },
  {
    id: 'quarterly',
    label: '三個月社群主題資料',
    period: '2026/08 – 2026/10',
    totalCount: 591,
    unit: '筆',
    headlineMetric: '591 筆',
    summary: '核心分析區間之社群主題討論量，9 月達 229 筆形成季內討論高峰。',
    caveat: '統計口徑為三個月主題擷取筆數（8 月 180 + 9 月 229 + 10 月 182）。',
    breakdown: [
      { label: '2026 年 8 月', value: '180 筆', share: '30.5%', tone: 'neutral' },
      { label: '2026 年 9 月（討論高峰）', value: '229 筆', share: '38.7%', tone: 'primary' },
      { label: '2026 年 10 月', value: '182 筆', share: '30.8%', tone: 'neutral' },
    ],
  },
  {
    id: 'sentiment',
    label: '情緒分類樣本',
    period: '2026/08 – 2026/10',
    totalCount: 576,
    unit: '篇',
    headlineMetric: '576 篇',
    summary: '整體以正面討論為主（72%），但 10% 負面評價集中於「效果不明顯」引發之期待落差。',
    caveat: '此為情緒標註有效文章樣本數，分母為 576 篇。',
    breakdown: [
      { label: '正面文章', value: '416 篇', share: '72%', tone: 'positive' },
      { label: '中立文章', value: '103 篇', share: '18%', tone: 'neutral' },
      { label: '負面文章', value: '57 篇', share: '10%', tone: 'negative' },
    ],
  },
  {
    id: 'competitor',
    label: '品牌比較資料',
    period: '2026/08 – 2026/10',
    totalCount: 284,
    unit: '則',
    headlineMetric: '284 則',
    summary: '聚焦品牌間討論與平台表現比較，整合受眾性別、頻道特色與競爭力矩陣。',
    caveat: '品牌自有貼文、論壇討論與新聞轉載性質不同，判讀須檢視互動品質而非單看曝光量。',
    breakdown: [
      { label: '品牌比較總資料量', value: '284 則', tone: 'primary' },
      { label: '大研生醫 FB 粉絲團（榜首）', value: '12 則', share: '約為第二名方格子 2 倍', tone: 'positive' },
      { label: '關鍵評比維度', value: '性別 / 頻道 / 風暴圖 / 矩陣', tone: 'neutral' },
    ],
  },
];

export const MONTHLY_TOPIC_VOLUMES: MonthlyTopicVolume[] = [
  {
    month: '2026/08',
    periodLabel: '8 月',
    count: 180,
    isPeak: false,
    note: '夏季 3C 用眼保健與常態討論基準',
  },
  {
    month: '2026/09',
    periodLabel: '9 月',
    count: 229,
    isPeak: true,
    note: '單日高峰（9/8）與週高峰（9/16 當週）集中帶動討論升溫',
  },
  {
    month: '2026/10',
    periodLabel: '10 月',
    count: 182,
    isPeak: false,
    note: '討論回穩至常態區間，延續選購成分與促銷話題',
  },
];

export const PEAK_EVENTS: PeakEvent[] = [
  {
    id: 'daily-peak',
    date: '2026/09/08',
    type: '日聲量高峰',
    count: 37,
    unit: '筆',
    driver: '須回查當日熱門貼文、品牌活動、促銷檔期及新聞事件以確認聲量推升來源。',
    actionNote: '不應僅把聲量高峰視為曝光紅利，須同步確認討論性質與導流成效。',
    tone: 'primary',
  },
  {
    id: 'weekly-peak',
    date: '2026/09/16 當週',
    type: '週聲量高峰',
    count: 30,
    unit: '篇',
    driver: '週度社群話題集中發酵，涵蓋節慶促銷與品牌社群操作。',
    actionNote: '檢核當週跨平台轉載與真實消費者留言互動比例。',
    tone: 'primary',
  },
  {
    id: 'negative-peak',
    date: '2026/09/17',
    type: '負面文章高峰',
    count: 6,
    unit: '篇',
    driver: '多數負面回饋集中於「產品效果不明顯」，反映消費者期待高於實際感受。',
    actionNote: '若品牌未提供清楚且可查證的科學或檢驗說明，將進一步侵蝕品牌信任。',
    tone: 'negative',
  },
];

export const SENTIMENT_BREAKDOWN: SentimentSlice[] = [
  {
    id: 'positive',
    label: '正面文章',
    count: 416,
    percentage: 72,
    interpretation: '整體社群討論維持高比例正面基調，多肯定日常護眼習慣建立與特定配方體驗。',
    riskFocus: '須區分品牌自有宣傳聲量與真實消費口碑，避免過度樂觀解讀。',
  },
  {
    id: 'neutral',
    label: '中立文章',
    count: 103,
    percentage: 18,
    interpretation: '集中於成分規格比較、價格查詢、iHerb/電商選購請益與一般保健科普轉載。',
    riskFocus: '為選購指引內容策略的核心轉化受眾，須提供易比較、可查證的資訊。',
  },
  {
    id: 'negative',
    label: '負面文章',
    count: 57,
    percentage: 10,
    interpretation: '核心痛點為體感效果不明顯、宣傳承諾與實際體驗落差，以及品質檢驗疑慮。',
    riskFocus: '9 月 17 日單日達 6 篇負評高峰，需啟動專責回應與專業可查證資料澄清。',
  },
];

export const HOT_KEYWORDS: HotKeyword[] = [
  {
    term: '葉黃素',
    cluster: '產品與成分',
    context: '核心品類錨點詞，串聯每日攝取量、游離型與酯化型比較討論。',
    strategicImplication: '內容須直接回答「怎麼挑」與「吃多少才夠」。',
  },
  {
    term: '日常',
    cluster: '使用情境',
    context: '反映消費者將葉黃素視為長期每日補充品，而非短期急救藥品。',
    strategicImplication: '溝通應強調長期穩定保養與合理體感期待管理。',
  },
  {
    term: '游離型',
    cluster: '產品與成分',
    context: '高頻技術規格關鍵字，消費者重視吸收率與分子型態差異。',
    strategicImplication: '以圖解與白話說明原料型態與吸收機制，降低認知門檻。',
  },
  {
    term: '眼睛',
    cluster: '使用情境',
    context: '連結眼睛乾澀、疲勞與長時間盯看 3C 螢幕之核心生理訴求。',
    strategicImplication: '避免誇大「改善視力」療效，聚焦數位用眼情境舒緩與保健。',
  },
  {
    term: '品牌',
    cluster: '品牌與通路',
    context: '消費者跨品牌橫向評比意圖強烈，重視品牌誠信與口碑累積。',
    strategicImplication: '建立透明成分標示與第三方檢驗揭露，強化品牌信任護城河。',
  },
  {
    term: '手術',
    cluster: '醫療與手術',
    context: '部分討論涉及眼科手術前後之營養補充與醫師衛教詢問。',
    strategicImplication: '嚴守保健食品宣稱邊界，建議特殊族群諮詢專業醫療人員。',
  },
  {
    term: 'iHerb',
    cluster: '品牌與通路',
    context: '跨境電商比價與海外高劑量／高 CP 值商品選購討論熱度高。',
    strategicImplication: '本土品牌須凸顯安心檢驗、即時客服與繁體中文透明資訊優勢。',
  },
  {
    term: '維他命',
    cluster: '產品與成分',
    context: '常與綜合維他命或複方營養素（如花青素、蝦紅素）搭配討論。',
    strategicImplication: '清楚拆解複方協同作用與每日建議攝取上限，避免重複補充。',
  },
  {
    term: '善存',
    cluster: '品牌與通路',
    context: '大型知名品牌成為消費者選購時的重要參照基準與討論對象。',
    strategicImplication: '在比較框架中以明確劑量、型態與價格透明度建立差異化。',
  },
  {
    term: '商品',
    cluster: '品牌與通路',
    context: '對應開箱實測、促銷組合、膠囊／軟膠囊／飲品等型態選擇。',
    strategicImplication: '明確標示產品型態與適用族群（如不擅吞嚥者適合飲品或軟膠囊）。',
  },
  {
    term: '配方',
    cluster: '產品與成分',
    context: '消費者特別關注葉黃素與玉米黃素黃金比例及複方設計邏輯。',
    strategicImplication: '將複雜配方轉化為消費者看得懂、能比較的視覺化比較表。',
  },
  {
    term: '成分',
    cluster: '產品與成分',
    context: '選購決策核心，包含主成分純度、添加物來源與檢驗報告真實性。',
    strategicImplication: '主動公開原料來源與逐批檢驗資訊，回應成分疑慮。',
  },
];

export const HOT_TOPIC_CLUSTERS: HotTopicCluster[] = [
  {
    id: 'sports-cobrand',
    title: '運動與品牌聯名',
    examples: ['味全龍封王帶動品牌合作話題', '體育賽事主題活動'],
    consumerDriver: '透過熱血賽事與聯名話題快速放大觸及，創造品牌曝光記憶點。',
  },
  {
    id: 'crossborder-promo',
    title: '跨境電商與節慶促銷',
    examples: ['iHerb 折扣討論', 'Coupang 優惠活動', '節慶檔期囤貨'],
    consumerDriver: '價格敏感與比價族群於促銷期間湧入討論，帶動跨通路比較聲量。',
  },
  {
    id: 'eye-care-core',
    title: '葉黃素與 3C 眼睛保健本身',
    examples: ['眼睛乾澀與疲勞', '長時間使用 3C 設備', '成分規格與選購比較'],
    consumerDriver: '最核心的剛性健康需求，決定消費者最終購買考量與長期留存。',
  },
];

export const COMMUNITY_PERSPECTIVES: CommunityPerspective[] = [
  {
    id: 'guide',
    title: '選購指引需求',
    summary: '消費者極度需要容易理解的成分、比例及每日含量比較框架。',
  },
  {
    id: 'recommend',
    title: '產品推薦與實測',
    summary: '不同品牌口碑與真實使用經驗分享，直接影響潛在買家評估清單。',
  },
  {
    id: 'health',
    title: '健康與護眼剛需',
    summary: '長時間使用手機與電腦等 3C 設備，持續驅動日常護眼保養討論。',
  },
  {
    id: 'expectation',
    title: '情緒與期待落差',
    summary: '消費者對改善眼部不適抱持高期待，若無顯著體感容易轉為負評疑慮。',
  },
];

export const PURCHASE_FACTORS: PurchaseFactor[] = [
  {
    index: '01',
    title: '葉黃素含量及每日攝取量',
    detail: '關注單顆／單份實際含量是否符合日常保健所需，並比較單位價格性價比。',
    communicationRule: '直接標示每日份量與實際毫克數，避免以總重混淆有效劑量。',
  },
  {
    index: '02',
    title: '產品型態適配性',
    detail: '依個人吞嚥習慣與方便性，在膠囊、軟膠囊或機能飲品間做選擇。',
    communicationRule: '說明不同劑型的吸收特性與適用情境（如上班族攜帶、親子飲用）。',
  },
  {
    index: '03',
    title: '葉黃素與玉米黃素比例及複方',
    detail: '檢視黃金比例搭配與複方協同設計，評估配方專業度。',
    communicationRule: '將複雜比例轉化為易懂圖表與科學依據摘要。',
  },
  {
    index: '04',
    title: '其他關鍵添加物',
    detail: '比較花青素、蝦紅素等輔助成分是否能對應乾澀或疲勞痛點。',
    communicationRule: '清楚說明各添加物的對應機制，不誇大超越保健食品的療效宣稱。',
  },
  {
    index: '05',
    title: '原料、品質與檢驗資訊',
    detail: '確認國際專利原料來源、第三方安全檢驗與品質可查證性。',
    communicationRule: '提供可點擊查證的檢驗報告與批次資訊，建立長期信任基礎。',
  },
];

export const SOURCE_CHANNELS: SourceChannelItem[] = [
  {
    name: '大研生醫 Facebook 粉絲團',
    category: '品牌自有社群',
    reportedCount: 12,
    rankNote: '來源頻道排行居首（12 則），約為第二名方格子的兩倍',
    natureNote: '品牌官方高頻發布活動、衛教與產品資訊，推升自有頻道聲量領先。',
    caution: '屬於品牌自有貼文，不能直接將曝光量等同於消費者自發口碑。',
  },
  {
    name: '方格子 (Vocus)',
    category: '內容創作平台',
    reportedCount: 6,
    rankNote: '來源頻道排行第二名（約為榜首一半），網站排行亦名列前茅',
    natureNote: '以深度長文評比、成分解析與選購指南為主，長尾搜尋影響力高。',
    caution: '須留意業配開箱與客觀評測之內容品質差異。',
  },
  {
    name: 'LINE TODAY',
    category: '新聞與媒體',
    rankNote: '網站排行突出平台之一，新聞與保健專欄觸及廣大行動受眾',
    natureNote: '扮演大眾衛教知識與品牌新聞稿擴散節點。',
    caution: '新聞轉載性質偏單向曝光，需搭配留言區輿情檢視受眾真實反應。',
  },
  {
    name: 'PTT / Dcard / Threads',
    category: '社群論壇',
    rankNote: '真實消費者提問、品牌反推、效果心得與負評發酵的核心場域',
    natureNote: '高互動、高匿名真實度，左右「選購前最後一哩路」信任判斷。',
    caution: '負面效果疑慮容易在論壇串聯擴散，須高頻監測並及時提供可查證回應。',
  },
];

export const ANALYTICAL_FRAMEWORKS = [
  { name: '受眾性別分布', desc: '辨識不同通路與品牌討論族群性別輪廓，校準內容語氣。' },
  { name: '頻道特色分析', desc: '區分品牌自有貼文、深度內容平台、論壇與新聞轉載的傳播角色。' },
  { name: '競爭風暴圖', desc: '掌握競品在聲量規模與正負討論張力上的即時位階。' },
  { name: '社群競爭力矩陣', desc: '綜合評估聲量與互動品質，定位品牌在市場中的競爭位置。' },
];

export const KOL_ARCHETYPES: KolArchetype[] = [
  {
    id: 'beauty-health',
    category: '美妝保健類 Instagram KOL',
    platform: 'Instagram',
    contentFocus: '視覺質感呈現、成分透明拆解與日常保健儀式感。',
    recommendedFormat: '新品開箱與成分重點圖卡解析',
    targetAction: '設計留言互動、收藏懶人包與專屬體驗導流連結',
    testingProtocol: '先進行小規模試投，追蹤留言提問率與導流轉換表現後再決定是否擴編預算。',
  },
  {
    id: 'lifestyle-3c',
    category: '生活與 3C 用眼類 Instagram KOL',
    platform: 'Instagram',
    contentFocus: '長時間盯看電腦、手機與數位工作者的真實用眼疲勞情境。',
    recommendedFormat: '3C 高強度用眼實測與日常保養經驗分享',
    targetAction: '鼓勵受眾分享用眼時數、參與話題標籤與試用回饋',
    testingProtocol: '結合科技或職場話題操作，驗證受眾與產品情境契合度及真實互動品質。',
  },
  {
    id: 'parenting',
    category: '育兒生活類 Instagram KOL',
    platform: 'Instagram',
    contentFocus: '家庭健康管理、學齡孩童或長輩日常護眼補給與吞嚥劑型考量。',
    recommendedFormat: '親子共同體驗活動與劑型便利性開箱',
    targetAction: '設計家庭體驗報名、分享抽獎與口碑心得徵集',
    testingProtocol: '嚴格檢視貼文後社群留言情緒，確保劑量與適用年齡說明清楚無誤。',
  },
];

export const TOPIC_OPERATION_HOOKS = [
  { title: '體育賽事', detail: '結合封王或大型賽事熱度，設計即時應援互動與導流任務。' },
  { title: '節慶促銷', detail: '配合檔期優惠設計清楚的選購規格指南，防止僅陷入低價競爭。' },
  { title: '創新科技', detail: '扣合數位生活與 3C 護眼議題，以科學原料與製程視角建立專業度。' },
];

export const CRISIS_STAGES: CrisisStage[] = [
  {
    step: 1,
    phase: '監測',
    focus: '聲量、情緒及平台同步追蹤',
    triggers: ['促銷檔期前後', 'KOL 合作貼文發布後', '單日聲量異常高峰日（如 9/8 單日 37 筆）'],
    actions: [
      '建立固定週期之關鍵字聲量與正負情緒儀表板監測',
      '同步追蹤 FB、方格子、Threads、PTT、Dcard 與 LINE TODAY 異動',
    ],
    horizon: '即時監測',
  },
  {
    step: 2,
    phase: '判斷',
    focus: '評估議題內容、影響程度與擴散情形',
    triggers: ['產品效果爭議（如 9/17 負面高峰 6 篇）', '品牌信任或品質檢驗質疑', '社會責任期待升溫'],
    actions: [
      '區分單點個人體感落差與系統性品質或宣稱爭議',
      '評估負評是否從單一論壇跨平台擴散至新聞與主流社群',
    ],
    horizon: '短期應變',
  },
  {
    step: 3,
    phase: '回應',
    focus: '官方聲明、專責客服與專家可查證資訊',
    triggers: ['高聲量負評出現', '消費者對成分劑量或檢驗真實性提出具體疑問'],
    actions: [
      '啟動專責回覆小組主動回應高聲量負評，避免沉默擴大猜疑',
      '發布官方清楚說明，並邀請營養師／眼科等專業人士提供可查證資訊',
    ],
    horizon: '短期應變',
  },
  {
    step: 4,
    phase: '檢視',
    focus: '回溯檢視品質、內部流程與產品包裝標示',
    triggers: ['連續出現相同負面回饋（如效果期待落差、吞嚥不便或標示不清）'],
    actions: [
      '依消費者真實回饋檢視配方設計、產品型態與外包裝標示透明度',
      '檢討行銷承諾是否超過消費者實際可期待之保健效果，進行文案校正',
    ],
    horizon: '中長期建設',
  },
  {
    step: 5,
    phase: '追蹤',
    focus: '持續追蹤口碑及信任變化並迭代改善',
    triggers: ['危機回應發布後 7–30 天', '定期品質檢測報告更新週期'],
    actions: [
      '定期檢測並公開品質檢驗資訊，讓消費者參與產品改進流程',
      '培訓客服團隊提升跨渠道回應一致性，持續追蹤負面聲量占比是否回落',
    ],
    horizon: '中長期建設',
  },
];

export const STRATEGIC_ACTIONS: StrategicAction[] = [
  {
    id: 'content',
    pillar: '01 · 內容策略',
    title: '將複雜配方轉譯為可比較的選購資訊',
    recommendation: '以葉黃素含量、每日攝取量、產品型態（膠囊／軟膠囊／飲品）、玉米黃素比例及檢驗資訊直接回應消費者選購疑問。',
    targetAudience: '成分比對型與首次選購消費者',
    kpiFocus: '選購指南收藏率、疑問回覆滿意度',
  },
  {
    id: 'audience',
    pillar: '02 · 受眾策略',
    title: '聚焦 3C 高強度用眼與家庭健康情境',
    recommendation: '針對長時間使用手機電腦之族群與親子／家庭補給情境，設計差異化溝通腳本與劑型建議，避免泛泛而談。',
    targetAudience: '數位上班族、3C 重度使用者、家庭採購者',
    kpiFocus: '情境貼文互動率、各受眾分群導流表現',
  },
  {
    id: 'collaboration',
    pillar: '03 · 合作策略',
    title: 'KOL 小規模實測驗證後再放大',
    recommendation: '先針對美妝保健、生活 3C 與育兒三類 Instagram KOL 進行小規模合作測試，依據互動品質與轉換成果決定是否擴大。',
    targetAudience: 'Instagram 跨圈層潛在買家',
    kpiFocus: '留言／分享參與度、實際轉換率',
  },
  {
    id: 'monitoring',
    pillar: '04 · 監測策略',
    title: '建立固定週期監控與峰值歸因機制',
    recommendation: '維持固定週期的聲量與正負情緒追蹤，遇異常高峰日（如 9/8、9/17）立即回查熱門貼文、促銷與負評成因。',
    targetAudience: '品牌行銷與輿情管理團隊',
    kpiFocus: '異常聲量回應時效、負評擴散攔截率',
  },
  {
    id: 'trust',
    pillar: '05 · 信任策略',
    title: '公開品質檢驗並管理合理效果期待',
    recommendation: '主動公開原料與定期檢驗資訊；對「效果不明顯」等負面評價提供及時、透明且可查證的專業回應，不誇大健康宣稱。',
    targetAudience: '高疑慮觀望族群與既有回購客',
    kpiFocus: '正面口碑佔比穩定度、品牌信任度指標',
  },
];

export const FEATURED_CAROUSEL_LINKS: FeaturedCarouselLink[] = [
  {
    id: 'eyeglasses-gold-news',
    index: '01',
    sourceName: '寶島眼鏡官網',
    domain: 'www.eyeglasses.com.tw/Gold/news',
    category: '品牌最新消息',
    title: '寶島眼鏡 Gold 最新消息主題頁',
    summary: '掌握視光通路最新品牌活動、會員動態與護眼衛教情報。',
    url: 'https://www.eyeglasses.com.tw/Gold/news',
    imageUrl: themeEyeglassesNewsImg,
  },
  {
    id: 'eyemall-events',
    index: '02',
    sourceName: 'EYEmall 線上商城',
    domain: 'www.eyemall.com.tw/Events',
    category: '電商主題活動',
    title: 'EYEmall 精選護眼主題活動頁',
    summary: '瀏覽視光電商平台促銷檔期、主題組合與線上選購活動規劃。',
    url: 'https://www.eyemall.com.tw/Events?themeID=1',
    imageUrl: themeEyemallEventsImg,
  },
  {
    id: 'eyeglasses-location',
    index: '03',
    sourceName: '寶島眼鏡官網',
    domain: 'www.eyeglasses.com.tw/Location',
    category: '實體門市據點',
    title: '寶島眼鏡全台門市據點主題頁',
    summary: '查詢全台門市位置與線下驗光諮詢體驗服務節點。',
    url: 'https://www.eyeglasses.com.tw/Location',
    imageUrl: themeEyeglassesLocationImg,
  },
  {
    id: 'medicalnewstw-lutein',
    index: '04',
    sourceName: 'MedicalNewsTW',
    domain: 'medicalnewstw.com/article/01-lutein-best',
    category: '葉黃素評比專欄',
    title: '葉黃素推薦評比與選購專欄主題頁',
    summary: '對照游離型成分、含量劑量與跨品牌評比資訊。',
    url: 'https://medicalnewstw.com/article/01-lutein-best/?prod=lutein&pg=best&act=all&site=mdn&kw=%E8%91%89%E9%BB%83%E7%B4%A0&gad_source=1&gad_camp=1&gad_619435551&gbraid=0AAAAAqKr4A-0cb3g6-wy-6gyKMuiLOuyF&gclid=CjwKCAiAn4XYBhA-EiwA8176FYLY53CTADjSuCXsnwCT89jpyzBXX6DSBwThv_fmfCzhK4PZJtih3xoCNbwQAvD_BwE',
    imageUrl: themeLuteinGuideImg,
  },
];


