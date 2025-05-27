import { useFormContext } from 'react-hook-form';
import { ShortPostForm } from '@/app/(admin)/admin/hooks/useEditShortPostsForm';

function Content() {
  const { register, formState: { errors } } = useFormContext<ShortPostForm>();

  return (
    <div>
      <label
        htmlFor="content"
        className="block text-sm font-medium text-gray-700"
      >
        내용
      </label>
      <textarea
        id="content"
        {...register('content', { required: '내용을 입력해주세요' })}
        className="px-2 py-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />
      {errors.content && (
        <p className="text-red-500 text-sm">{errors.content.message}</p>
      )}
    </div>
  )
}

export default Content;
