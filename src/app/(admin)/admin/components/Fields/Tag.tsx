import type { Tag } from '../../lib/tags';
import EditShortTags from '@/app/(admin)/admin/components/EditShortTags';

interface TagProps {
  tags: Tag[];
}

function Tag({ tags }: TagProps) {
  return (
    <div>
      <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
        태그
      </label>
      <div className="mt-2 space-y-2">
        <EditShortTags tags={tags} />
      </div>
    </div>
  );
}

export default Tag;
