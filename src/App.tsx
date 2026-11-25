import React, { useState, useRef, useEffect } from 'react';

const IMAGE_PATH = '/assets/aistudio/Screenshot_20261125-105938__3___1___1__13a776d8.png';
const FALLBACK_PATH = './assets/aistudio/Screenshot_20261125-105938__3___1___1__13a776d8.png';

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
    }, 100);
    return () => window.clearTimeout(timer);
  }, [imageReady]);

  return (
    <main className="min-h-screen w-full bg-white flex items-center justify-center p-2 sm:p-4">
      <img
        ref={imgRef}
        src={src}
        alt="個人履歷與作品集"
        onLoad={() => setImageReady(true)}
        onError={() => {
          if (src !== FALLBACK_PATH) {
            setImageReady(false);
            setShowFade(false);
            setSrc(FALLBACK_PATH);
          }
        }}
        className={`max-h-[96dvh] max-w-full w-auto h-auto object-contain block ${
          showFade ? 'animate-single-image-fade' : 'opacity-0'
        }`}
      />
    </main>
  );
}

export default App;
