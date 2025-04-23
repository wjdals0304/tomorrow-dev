import { ArticleData } from '@/shared/types/articleData';
import { useQuery } from '@tanstack/react-query';

const fetchArticles = async (): Promise<ArticleData[]> => {
  const res = await fetch(`/api/article`, {});

  if (!res.ok) {
    const errorBody = await res.text();
    console.error('Failed to fetch articles:', errorBody);
    throw new Error('Failed to fetch articles');
  }
  return res.json();
};

export function useArticles() {
  return useQuery<ArticleData[], Error>({
    queryKey: ['articles'],
    queryFn: fetchArticles,
  });
}
