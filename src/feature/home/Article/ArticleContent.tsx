import { ArticleData } from '@/shared/types/articleData';
import { ArticleItem } from './ArticleItem';

export function ArticleContent({ articles }: { articles: ArticleData[] }) {
  return (
    <>
      {articles.map((article: ArticleData) => (
        <ArticleItem key={article.id} article={article} />
      ))}
    </>
  );
}
