import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play, ExternalLink } from 'lucide-react';
import goldNewsImg from '../assets/images/theme_gold_news_lutein_1795585560661.jpg';
import eyemallEventsImg from '../assets/images/theme_eyemall_events_promo_1795585560315.jpg';
import eyemallGoldImg from '../assets/images/theme_eyemall_gold_series_1795585560986.jpg';
import locationImg from '../assets/images/theme_eyeglasses_location_1795584359295.jpg';
import luteinGuideImg from '../assets/images/theme_lutein_guide_1795584359388.jpg';

export interface CarouselSlide {
  id: string;
  indexLabel: string;
  title: string;
  tag: string;
  url: string;
  imageUrl: string;
}

const SLIDES: CarouselSlide[] = [
  {
    id: 'slide-1',
    indexLabel: '01',
    title: '大學眼鏡 Gold 葉黃素最新消息',
    tag: '01 品牌最新消息',
    url: 'https://www.eyeglasses.com.tw/Gold/news',
    imageUrl: goldNewsImg,
  },
  {
    id: 'slide-2',
    indexLabel: '02',
    title: 'eyemall 配鏡與葉黃素主題優惠活動',
    tag: '02 優惠活動主題',
    url: 'https://www.eyemall.com.tw/Events?themeID=1',
    imageUrl: eyemallEventsImg,
  },
  {
    id: 'slide-3',
    indexLabel: '03',
    title: 'eyemall Gold 大學金三明葉黃素旗艦館',
    tag: '03 Gold 旗艦專區',
    url: 'https://www.eyemall.com.tw/Gold',
    imageUrl: eyemallGoldImg,
  },
  {
    id: 'slide-4',
    indexLabel: '04',
    title: '大學眼鏡 全台門市據點查詢',
    tag: '04 門市服務據點',
    url: 'https://www.eyeglasses.com.tw/Location',
    imageUrl: locationImg,
  },
  {
    id: 'slide-5',
    indexLabel: '05',
    title: '葉黃素推薦與選購指南專題',
    tag: '05 專題評比文章',
    url: 'https://medicalnewstw.com/article/01-lutein-best/?prod=lutein&pg=best&act=all&site=mdn&kw=%E8%91%89%E9%BB%83%E7%B4%A0&gad_source=1&gad_camp=1&gad_619435551&gbraid=0AAAAAqKr4A-0cb3g6-wy-6gyKMuiLOuyF&gclid=CjwKCAiAn4XYBhA-EiwaA8176FYLY53CTADjSuCXsnwCT89jpyzBXX6DSBwThv_fmfCzhK4PZJtih3xoCNbwQAvD_BwE',
    imageUrl: luteinGuideImg,
  },
];

const AUTOPLAY_INTERVAL_MS = 2500;

export const TopResourceCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const total = SLIDES.length;

  useEffect(() => {
    if (isPaused || total <= 1) return;
    const timer = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
    }, AUTOPLAY_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [isPaused, total]);

  const currentSlide = SLIDES[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  return (
    <section aria-label="主題網頁圖片輪播" className="w-full max-w-2xl mx-auto">
      <div className="rounded-2xl border border-slate-200 bg-white shadow-xs overflow-hidden">
        {/* Photographic Theme Page Frame (No Blue Overlay, Clickable to Open Theme Page) */}
        <div className="relative h-52 sm:h-64 w-full bg-slate-100 overflow-hidden border-b border-slate-100">
          <a
            href={currentSlide.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full h-full"
            title={currentSlide.title}
          >
            <img
              key={currentSlide.id}
              src={currentSlide.imageUrl}
              alt={currentSlide.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover animate-carousel-slide"
            />
          </a>

          {/* Left / Right Circular Controls */}
          <button
            type="button"
            onClick={handlePrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/95 hover:bg-white text-slate-800 shadow-md border border-slate-200/80 flex items-center justify-center transition-transform hover:scale-105 cursor-pointer"
            aria-label="上一頁"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/95 hover:bg-white text-slate-800 shadow-md border border-slate-200/80 flex items-center justify-center transition-transform hover:scale-105 cursor-pointer"
            aria-label="下一頁"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Bottom-Right Play / Pause Pill */}
          <button
            type="button"
            onClick={() => setIsPaused((prev) => !prev)}
            className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 hover:bg-white text-slate-800 text-xs font-semibold shadow-md border border-slate-200/80 cursor-pointer"
          >
            {isPaused ? (
              <>
                <Play className="w-3.5 h-3.5" />
                <span>播放</span>
              </>
            ) : (
              <>
                <Pause className="w-3.5 h-3.5" />
                <span>暫停</span>
              </>
            )}
          </button>
        </div>

        {/* Bottom Metadata & Theme Page Link Row */}
        <div className="p-4 sm:p-5 space-y-3.5">
          <div className="flex items-center gap-3">
            <span className="font-mono-tech text-sm font-medium text-slate-500 tracking-wider">
              {currentSlide.indexLabel} / {String(total).padStart(2, '0')}
            </span>
            <div className="flex items-center gap-1.5">
              {SLIDES.map((slide, idx) => (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`切換至第 ${idx + 1} 頁`}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    idx === currentIndex
                      ? 'w-5 bg-[#4F46E5]'
                      : 'w-1.5 bg-slate-200 hover:bg-slate-300'
                  }`}
                />
              ))}
            </div>
          </div>

          <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight leading-snug">
            {currentSlide.title}
          </h2>

          <div className="flex flex-wrap items-center justify-between gap-2.5 pt-0.5">
            <span className="inline-flex items-center px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm font-semibold text-slate-700">
              {currentSlide.tag}
            </span>

            <a
              href={currentSlide.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0F172A] hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold transition-colors shadow-xs"
            >
              <span>開啟主題頁</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
