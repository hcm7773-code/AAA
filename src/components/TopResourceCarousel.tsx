import React, { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Pause,
  Play,
  Globe,
} from 'lucide-react';
import { FEATURED_CAROUSEL_LINKS } from '../data/luteinReportData';

const AUTO_PLAY_INTERVAL_MS = 2500;

export const TopResourceCarousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const [isUserPaused, setIsUserPaused] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const total = FEATURED_CAROUSEL_LINKS.length;
  const current = FEATURED_CAROUSEL_LINKS[activeIndex];

  useEffect(() => {
    if (isUserPaused || isHovered) return;
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, AUTO_PLAY_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [isUserPaused, isHovered, total]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % total);
  };

  const isImgFailed = !!failedImages[current.id];

  return (
    <section
      aria-label="關聯網站主題頁面輪播"
      className="bg-white border-b border-slate-200 py-3 no-print"
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="overflow-hidden rounded-xl border border-slate-200 bg-white"
        >
          {/* Pure Unobstructed Theme Page Photo Stage (Zero blue overlay) */}
          <div className="relative h-[170px] sm:h-[210px] w-full bg-slate-100">
            <a
              href={current.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`開啟 ${current.title}`}
              className="block w-full h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-slate-900"
            >
              {!isImgFailed ? (
                <img
                  src={current.imageUrl}
                  alt={current.title}
                  referrerPolicy="no-referrer"
                  onError={() =>
                    setFailedImages((prev) => ({ ...prev, [current.id]: true }))
                  }
                  className="w-full h-full object-cover object-center"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-slate-100 text-slate-500">
                  <Globe className="w-8 h-8 text-slate-400" />
                  <span className="text-xs font-medium">{current.title}</span>
                </div>
              )}
            </a>

            {/* Neutral Prev / Next Photo Navigation Buttons */}
            <button
              type="button"
              onClick={handlePrev}
              aria-label="上一則主題頁"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-slate-900 border border-slate-200 shadow-sm inline-flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={handleNext}
              aria-label="下一則主題頁"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-slate-900 border border-slate-200 shadow-sm inline-flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Compact Play/Pause Control on Photo Corner */}
            <button
              type="button"
              onClick={() => setIsUserPaused((prev) => !prev)}
              aria-label={isUserPaused ? '播放輪播' : '暫停輪播'}
              className="absolute right-3 bottom-3 h-8 px-2.5 rounded-lg bg-white/90 hover:bg-white text-slate-900 border border-slate-200 shadow-sm text-xs font-medium inline-flex items-center gap-1 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
            >
              {isUserPaused ? (
                <>
                  <Play className="w-3 h-3" />
                  <span>播放</span>
                </>
              ) : (
                <>
                  <Pause className="w-3 h-3" />
                  <span>暫停</span>
                </>
              )}
            </button>
          </div>

          {/* Slim Neutral Caption & Direct Page Switcher Bar */}
          <div className="px-4 py-2.5 bg-white border-t border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 min-w-0">
              <span className="font-mono text-xs font-semibold text-slate-500 tabular-nums shrink-0">
                {current.index} / 0{total}
              </span>
              <span aria-hidden="true" className="text-slate-300">
                ·
              </span>
              <a
                href={current.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-bold text-slate-900 hover:text-slate-700 truncate"
              >
                {current.title}
              </a>
              <span aria-hidden="true" className="text-slate-300 hidden sm:inline">
                ·
              </span>
              <span className="text-xs text-slate-500 hidden sm:inline truncate">
                {current.sourceName}
              </span>
            </div>

            <div className="flex items-center justify-between md:justify-end gap-3 min-w-0 max-w-full md:shrink-0">
              <div
                role="tablist"
                aria-label="切換連結主題頁面"
                className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200 overflow-x-auto min-w-0"
              >
                {FEATURED_CAROUSEL_LINKS.map((item, idx) => {
                  const active = idx === activeIndex;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setActiveIndex(idx)}
                      className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        active
                          ? 'bg-white text-slate-900 font-semibold shadow-2xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {item.index} {item.category}
                    </button>
                  );
                })}
              </div>

              <a
                href={current.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
              >
                <span>開啟主題頁</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
