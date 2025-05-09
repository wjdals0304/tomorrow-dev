import { getAdminShortPostById } from '@/app/(admin)/admin/lib/shortArticles';
import { getTagsList } from '@/app/(admin)/admin/lib/tags';
import EditShortPostForm from '../../../components/EditShortPostForm';

type ShortPostEditPageProps = {
  params: {
    id: string;
  };
};

export default async function ShortPostEditPage({
  params,
}: ShortPostEditPageProps) {
  const shortPost = await getAdminShortPostById(params.id);
  if (!shortPost) {
    return <div>짧은 글을 찾을 수 없습니다.</div>;
  }
  const tags = await getTagsList();

  return (
    <div className="bg-white-500 min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">{shortPost.title} - 수정</h1>
      <div className="mb-8 p-4 border rounded bg-gray-50">
        <h2 className="text-lg font-semibold mb-2">현재 내용</h2>
        <div dangerouslySetInnerHTML={{ __html: shortPost.content }} />
        <p className="text-sm text-gray-600 mt-2">
          작성일: {new Date(shortPost.created_at).toLocaleDateString()}
        </p>
      </div>
      <EditShortPostForm shortPost={shortPost} tags={tags} />
    </div>
  );
}
