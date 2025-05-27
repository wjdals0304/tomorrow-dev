import { Tag } from '../lib/tags';
import EditShortTagContent from './EditShortTagContent';

interface EditShortTagsProps {
  tags: Tag[];
}

export default function EditShortTags({ tags }: EditShortTagsProps) {
  return (
    <>
      {tags.map((tag) => (
        <EditShortTagContent
          key={tag.id}
          tag={tag}
        />
      ))}
    </>
  );
}
