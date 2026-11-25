import React, { useState, useRef, useEffect } from 'react';
import { TopResourceCarousel } from './components/TopResourceCarousel';

const IMAGE_PATH = '/assets/aistudio/Screenshot_20261125-105938__3___1___1___3___1__8b8f2ca6.png';
const FALLBACK_PATH =
  './assets/aistudio/Screenshot_20261125-105938__3___1___1___3___1__8b8f2ca6.png';

export function App() {
  const [src, setSrc] = useState(IMAGE_PATH);
  const [imageReady, setImageReady] = useState(false);
  const [showFade, setShowFade] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imgRef.current?.complete && imgRef.current.naturalWidth > 0) {
      setImageReady(true);
    }
  }, [src]);

  useEffect(() => {
    if (!imageReady) return;
    const timer = window.setTimeout(() => {
      setShowFade(true);
    }, 180);
    return () => window.clearTimeout(timer);
  }, [imageReady]);

  return (
    <main className="min-h-screen w-full bg-white px-3 py-4 sm:px-6 sm:py-6 flex flex-col items-center gap-5 sm:gap-6">
      {/* 網頁上方：循環播放連結網頁主題圖片頁面 */}
      <TopResourceCarousel />

      {/* 網頁下方：單張上傳圖檔搭配延長加強淡入效果 */}
      <section aria-label="單張圖片展示" className="w-full max-w-2xl mx-auto flex justify-center">
        <img
          ref={imgRef}
          src={src}
          alt="葉黃素市場聲量與社群口碑摘要平台"
          onLoad={() => setImageReady(true)}
          onError={() => {
            if (src !== FALLBACK_PATH) {
              setImageReady(false);
              setShowFade(false);
              setSrc(FALLBACK_PATH);
            }
          }}
          className={`w-full max-w-2xl h-auto object-contain block rounded-2xl ${
            showFade ? 'animate-enhanced-image-fade' : 'opacity-0'
          }`}
        />
      </section>
    </main>
  );
}

export default App;
