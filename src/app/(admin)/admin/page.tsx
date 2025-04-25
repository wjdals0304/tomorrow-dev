import {
  Article,
  getAdminArticlesList,
} from '@/app/(admin)/admin/lib/articles';
import Link from 'next/link';
import CreateArticleForm from './components/CreateArticleForm';

export default async function AdminPage() {
  const articles: Omit<Article, 'content'>[] = await getAdminArticlesList();

  return (
    <div className="bg-white-500 h-full">
      <h1>관리자 페이지</h1>
      <CreateArticleForm />

      <hr style={{ margin: '2rem 0' }} />

      <h2>작성된 글 목록</h2>
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
  );
}
