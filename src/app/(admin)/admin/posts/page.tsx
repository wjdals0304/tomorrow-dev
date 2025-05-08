import {
  Article,
  getAdminArticlesList,
} from '@/app/(admin)/admin/lib/articles';
import Link from 'next/link';
import CreateArticleForm from '../components/CreateArticleForm';
import { getTagsList, Tag } from '../lib/tags';

export default async function AdminPostsPage() {
  const [articles, tags]: [Omit<Article, 'content'>[], Tag[]] =
    await Promise.all([getAdminArticlesList(), getTagsList()]);

  return (
    <div className="bg-white-500 h-full">
      <h1 className="text-2xl font-bold text-center py-4">관리자 페이지</h1>
      <CreateArticleForm tags={tags} />

      <div className="m-3">
        <h2 className="text-xl font-bold  py-4">작성된 글 목록</h2>
        {articles && articles.length > 0 ? (
          <ul>
            {articles.map((article) => (
              <li key={article.id}>
                <Link href={`/admin/posts/edit/${article.id.toString()}`}>
                  {article.title}
                </Link>
                <span>
                  {' '}
                  - {new Date(article.created_at).toLocaleDateString()}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p>작성된 글이 없습니다.</p>
        )}
      </div>
    </div>
  );
}
