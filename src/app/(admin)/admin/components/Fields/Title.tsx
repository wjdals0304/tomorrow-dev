import { useFormContext } from 'react-hook-form';
import { ShortPostForm } from '@/app/(admin)/admin/hooks/useEditShortPostsForm';

function Title() {
  const { register, formState: { errors } } = useFormContext<ShortPostForm>();

  return (
    <div>
      <label
        htmlFor="title"
        className="block text-sm font-medium text-gray-700"
      >
        제목
      </label>
      <input
        type="text"
        id="title"
        {...register('title', { required: '제목을 입력해주세요' })}
        className="px-2 py-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />
      {errors.title && (
        <p className="text-red-500 text-sm">{errors.title.message}</p>
      )}
    </div>
  );
}

export default Title;
