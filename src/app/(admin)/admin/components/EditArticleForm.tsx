'use client';

import { Article, updateArticleAction } from '@/app/(admin)/admin/lib/articles';
import { Tag } from '@/app/(admin)/admin/lib/tags';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import EditTags from './EditTags';

interface EditArticleFormProps {
  article: Article & { article_tags?: { tags: { id: number } }[] };
  tags: Tag[];
}

export default function EditArticleForm({
  article,
  tags,
}: EditArticleFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState(article.title);
  const [description, setDescription] = useState(article.description || '');
  const [content, setContent] = useState(article.content);
  const [selectedTags, setSelectedTags] = useState<number[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initialTagIds = article.article_tags?.map((at) => at.tags.id) || [];
    setSelectedTags(initialTagIds);
  }, [article]);

  const handleTagChange = (event: ChangeEvent<HTMLInputElement>) => {
    const tagId = parseInt(event.target.value, 10);
    if (event.target.checked) {
      setSelectedTags((prev) => [...prev, tagId]);
    } else {
      setSelectedTags((prev) => prev.filter((id) => id !== tagId));
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    formData.append('articleId', article.id.toString());
    formData.delete('tags');
    selectedTags.forEach((tagId) => {
      formData.append('tags', tagId.toString());
    });

    try {
      await updateArticleAction(formData);
      router.refresh();
    } catch (err) {
      console.error('Error updating article:', err);
      setError(
        err instanceof Error
          ? err.message
          : '게시글 수정 중 알 수 없는 오류가 발생했습니다.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

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
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="px-2 py-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
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
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={10}
          required
          className="px-2 py-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
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
        disabled={isSubmitting}
        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
      >
        {isSubmitting ? '수정 중...' : '수정하기'}
      </button>
    </form>
  );
}
