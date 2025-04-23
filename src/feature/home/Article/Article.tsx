'use client';

import { useArticles } from '@/hooks/useArticles';
import { ArticleContent } from './ArticleContent';

export function Article() {
  const { data: articles, isError, error } = useArticles();

  if (isError) {
    console.error('Error fetching articles:', error);
    return (
      <div className="flex justify-center items-center p-5 h-screen">
        <p className="text-red-500">
          아티클을 불러오는 데 실패했습니다: {error.message}
        </p>
      </div>
    );
  }

  if (!articles || articles.length === 0) {
    return (
      <div className="flex justify-center items-center  p-5 h-screen">
        <p className="text-gray-500">표시할 아티클이 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-5">
      <ArticleContent articles={articles} />
    </div>
  );
}
