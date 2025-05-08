import Link from 'next/link';

export default function AdminPage() {
  return (
    <nav className="bg-white-500 h-screen p-4">
      <ol className="flex flex-col gap-4">
        <li>
          <Link
            href="/admin/posts"
            className="hover:bg-gray-100 p-2 rounded-md"
          >
            게시글 관리
          </Link>
        </li>
        <li>
          <Link
            href="/admin/short_posts"
            className="hover:bg-gray-100 p-2 rounded-md"
          >
            짧은 글 관리
          </Link>
        </li>
      </ol>
    </nav>
  );
}
