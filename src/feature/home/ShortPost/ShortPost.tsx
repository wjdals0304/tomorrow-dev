'use client';

import { ShortPostContent } from './ShortPostContent';

export function ShortPost() {
  return (
    <div className="flex-1 h-300 py-5 pr-5">
      <div className="flex flex-col p-2.5 shrink-0">
        <div className="flex justify-between items-start pb-3">
          <span className="text-white-900 text-xl mb-2.5">최신 짧은 글</span>
        </div>
        <div className="relative flex-grow-1 flex flex-col gap-2.5">
          <ShortPostContent />
        </div>
      </div>
    </div>
  );
}
