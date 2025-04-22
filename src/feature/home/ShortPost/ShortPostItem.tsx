import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import Link from 'next/link';
import { ShortPostData } from '../../../shared/types/shortPostData';

interface ShortPostItemProps {
  post: ShortPostData;
}

export function ShortPostItem({ post }: ShortPostItemProps) {
  const { id, tagname, title, updated_at } = post;
  const timeAgo = formatDistanceToNow(new Date(updated_at), {
    addSuffix: true,
    locale: ko,
  });

  return (
    <Link
      key={id}
      href={`/`}
      className="relative flex items-center gap-2.5 pb-2.5 before:content-[''] before:absolute before:bottom-0 before:left-0 before:right-0 before:h-[1px] before:bg-white/10"
    >
      <span className="text-dark bg-red-500 text-xs px-[5px] py-[7px] rounded">
        {tagname}
      </span>
      <div className="text-base text-white-900 ">{title}</div>
      <div className="grow" />
      <div className="text-xs shrink-0 text-white-500">
        <span>{timeAgo}</span>
      </div>
    </Link>
  );
}
