import Link from 'next/link';
import CreateShortArticleForm from '../components/CreateShortArticleForm';
import { getAdminShortArticlesList, ShortArticle } from '../lib/shortArticles';
import { getTagsList, Tag } from '../lib/tags';

export default async function ShortPostsPage() {
  const [shortPosts, tags]: [ShortArticle[], Tag[]] = await Promise.all([
    getAdminShortArticlesList(),
    getTagsList(),
  ]);

  return (
    <div className="bg-white-500 min-h-screen">
      <h1 className="text-2xl font-bold text-center py-4">관리자 페이지</h1>
      <CreateShortArticleForm tags={tags} />

      <div className="p-3">
        <h2 className="text-xl font-bold  py-4">작성된 글 목록</h2>
        {shortPosts && shortPosts.length > 0 ? (
          <ul>
            {shortPosts.map((shortPost) => (
              <li key={shortPost.id}>
                <Link
                  href={`/admin/short_posts/edit/${shortPost.id.toString()}`}
                >
                  {shortPost.title}
                </Link>
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
