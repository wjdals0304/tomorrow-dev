import { ChangeEvent } from 'react';
import { Tag } from '../lib/tags';
import EditTagContent from './EditTagContent';

interface EditTagsProps {
  tags: Tag[];
  selectedTags: number[];
  handleTagChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function EditTags({
  tags,
  selectedTags,
  handleTagChange,
}: EditTagsProps) {
  return (
    <>
      {tags.map((tag) => (
        <EditTagContent
          key={tag.id}
          tag={tag}
          selectedTags={selectedTags}
          handleTagChange={handleTagChange}
        />
      ))}
    </>
  );
}
