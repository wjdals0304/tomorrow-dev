import { Tag } from '../lib/tags';
import { useFormContext, useWatch } from 'react-hook-form';
import { ShortPostForm } from '@/app/(admin)/admin/hooks/useEditShortPostsForm';

interface EditShortTagContentProps {
  tag: Tag;
}

export default function EditShortTagContent({ tag }: EditShortTagContentProps) {
  const { control, register } = useFormContext<ShortPostForm>();
  const selectedTag = useWatch<ShortPostForm>({ control, name: 'tag' });

  const { id, name } = tag;
  return (
    <div key={id} className="flex items-center">
      <input
        id={`tag-${id}`}
        type="radio"
        value={id}
        checked={selectedTag === id}
        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
        {...register('tag')}
      />
      <label htmlFor={`tag-${id}`} className="ml-2 block text-sm text-gray-900">
        {name}
      </label>
    </div>
  );
}
