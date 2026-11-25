import React from 'react';
import { TopResourceCarousel } from './components/TopResourceCarousel';
import { LuteinGuideSection } from './components/LuteinGuideSection';

export function App() {
  return (
    <main className="min-h-screen w-full bg-white px-3 py-4 sm:px-6 sm:py-6 flex flex-col items-center gap-5 sm:gap-6">
      {/* 網頁上方：五個指定主題網頁輪播 */}
      <TopResourceCarousel />

      {/* 輪播區塊下方：葉黃素推薦與選購指南專題 */}
      <LuteinGuideSection />
    </main>
  );
}

export default App;
