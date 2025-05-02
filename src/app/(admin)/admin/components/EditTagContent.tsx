import { ChangeEvent } from 'react';
import { Tag } from '../lib/tags';

interface EditTagContentProps {
  tag: Tag;
  selectedTags: number[];
  handleTagChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function EditTagContent({
  tag,
  selectedTags,
  handleTagChange,
}: EditTagContentProps) {
  const { id, name } = tag;
  return (
    <div key={id} className="flex items-center">
      <input
        id={`tag-${id}`}
        name="tags"
        type="checkbox"
        value={id}
        checked={selectedTags.includes(id)}
        onChange={handleTagChange}
        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
      />
      <label htmlFor={`tag-${id}`} className="ml-2 block text-sm text-gray-900">
        {name}
      </label>
    </div>
  );
}
