import { ArticleData } from '@/shared/types/articleData';
import Image from 'next/image';
import Link from 'next/link';

export function ArticleItem({ article }: { article: ArticleData }) {
  const {
    id,
    title,
    thumbnailUrl = '/images/default-image.jpg',
    tagname,
    content,
  } = article;
  return (
    <div key={id} className="flex flex-col gap-6">
      <Link href={`/article/${id}`}>
        <div className="relative">
          <Image
            src={thumbnailUrl}
            alt={title}
            width={370}
            height={180}
            className="w-full rounded-xl object-cover"
          />
          <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded-full">
            {tagname}
          </div>
        </div>
        <div className="flex flex-col gap-1 mt-2">
          <h3 className="w-full text-xl leading-tight font-semibold text-white-500 truncate">
            {title}
          </h3>
          <p className="text-white-900 text-xs mt-1">{content}</p>
        </div>
      </Link>
    </div>
  );
}
