import { LoadingSpinner } from '@/components/LoadingSpinner';
import React from 'react';
import { Article } from './Article/Article';
import { Chart } from './Chart';
import { ShortPost } from './ShortPost/ShortPost';

export function Main() {
  return (
    <main className="bg-dark h-full pt-[60px]">
      <div className="flex flex-col md:flex-row md:justify-between gap-5 px-5 m-auto w-full mb-3">
        <Chart />
        <ShortPost />
      </div>
      <React.Suspense fallback={<LoadingSpinner />}>
        <Article />
      </React.Suspense>
    </main>
  );
}
