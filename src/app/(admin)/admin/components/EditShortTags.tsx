import { ChangeEvent } from 'react';
import { Tag } from '../lib/tags';
import EditShortTagContent from './EditShortTagContent';

interface EditShortTagsProps {
  tags: Tag[];
  selectedTags: number | null;
  handleTagChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function EditShortTags({
  tags,
  selectedTags,
  handleTagChange,
}: EditShortTagsProps) {
  return (
    <>
      {tags.map((tag) => (
        <EditShortTagContent
          key={tag.id}
          tag={tag}
          selectedTags={selectedTags}
          handleTagChange={handleTagChange}
        />
      ))}
    </>
  );
}
