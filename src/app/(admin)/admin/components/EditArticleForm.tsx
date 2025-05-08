'use client';

import { Article } from '@/app/(admin)/admin/lib/articles';
import { Tag } from '@/app/(admin)/admin/lib/tags';
import { useEditArticle } from '../hooks/useEditArticle';
import EditTags from './EditTags';

interface EditArticleFormProps {
  article: Article & { article_tags?: { tags: { id: number } }[] };
  tags: Tag[];
}

export default function EditArticleForm({
  article: initialArticle,
  tags,
}: EditArticleFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    selectedTags,
    handleTagChange,
    error,
    isPending,
    isLoading,
  } = useEditArticle({ initialArticle });

  if (isLoading) return <div>로딩 중...</div>;

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
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

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          설명 (선택)
        </label>
        <input
          type="text"
          id="description"
          {...register('description')}
          className="px-2 py-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

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
          rows={10}
          className="px-2 py-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.content && (
          <p className="text-red-500 text-sm">{errors.content.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">태그</label>
        <div className="mt-2 space-y-2">
          <EditTags
            tags={tags}
            selectedTags={selectedTags}
            handleTagChange={handleTagChange}
          />
        </div>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
      >
        {isPending ? '수정 중...' : '수정하기'}
      </button>
    </form>
  );
}
