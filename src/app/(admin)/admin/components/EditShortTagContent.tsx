import { ChangeEvent } from 'react';
import { Tag } from '../lib/tags';

interface EditShortTagContentProps {
  tag: Tag;
  selectedTags: number | null;
  handleTagChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function EditShortTagContent({
  tag,
  selectedTags,
  handleTagChange,
}: EditShortTagContentProps) {
  const { id, name } = tag;
  return (
    <div key={id} className="flex items-center">
      <input
        id={`tag-${id}`}
        type="radio"
        name="tags"
        value={id}
        checked={selectedTags === id}
        onChange={handleTagChange}
        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
      />
      <label htmlFor={`tag-${id}`} className="ml-2 block text-sm text-gray-900">
        {name}
      </label>
    </div>
  );
}
