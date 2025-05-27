import Link from 'next/link';

export default async function ShortPostsPage() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">짧은 글 관리</h1>
        <Link
          href="/admin/short_posts/create"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          새 짧은 글 작성
        </Link>
      </div>
    </div>
  );
}
