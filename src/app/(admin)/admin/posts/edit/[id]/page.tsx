import EditArticleForm from '@/app/(admin)/admin/components/EditArticleForm';
import { getAdminArticleById } from '@/app/(admin)/admin/lib/articles';
import { getTagsList } from '@/app/(admin)/admin/lib/tags';

type PostEditPageProps = {
  params: {
    id: string;
  };
};

export default async function PostEditPage({ params }: PostEditPageProps) {

  const article = await getAdminArticleById(params.id);
  if (!article) {
    return <div>게시글을 찾을 수 없습니다.</div>;
  }
  const tags = await getTagsList();

  return (
    <div className="bg-white-500 h-full p-4">
      <h1 className="text-2xl font-bold mb-4">{article.title} - 수정</h1>
      <div className="mb-4 p-4 border rounded bg-gray-50">
        <h2 className="text-lg font-semibold mb-2">현재 내용</h2>
        <div dangerouslySetInnerHTML={{ __html: article.content }} />
        <p className="text-sm text-gray-600 mt-2">
          작성일: {new Date(article.created_at).toLocaleDateString()}
        </p>
      </div>
      <EditArticleForm article={article} tags={tags} />
    </div>
  );
}
