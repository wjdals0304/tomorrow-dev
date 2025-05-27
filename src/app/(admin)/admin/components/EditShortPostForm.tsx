'use client';

import { ShortArticle } from '@/app/(admin)/admin/lib/shortArticles';
import { useEditShortPosts } from '../hooks/useEditShortPosts';
import useEditShortPostsForm, { ShortPostForm } from '@/app/(admin)/admin/hooks/useEditShortPostsForm';
import { FormProvider } from 'react-hook-form';
import Title from './Fields/Title';
import Content from './Fields/Content';
import Tag from './Fields/Tag';
import useHandleSubmit from '@/app/(admin)/admin/hooks/useHandleSubmit';

interface EditShortPostFormProps {
  shortPost: ShortArticle & { short_post_tags?: { tags: { id: number } }[] };
  tags: Tag[];
}

export default function EditShortPostForm({
  shortPost: initialShortPost,
  tags,
}: EditShortPostFormProps) {

  const defaultValues: ShortPostForm = {
    title: initialShortPost.title,
    content: initialShortPost.content,
    tag: tags[0].id,
  };

  const methods = useEditShortPostsForm(defaultValues);
  const { onSubmit } = useHandleSubmit();
  const {
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;
  const error = errors.root?.message;

  const { isLoading } = useEditShortPosts({ initialShortPost });
  const isPending = isLoading || isSubmitting;

  if (isLoading) return <div>로딩 중...</div>;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <Title />
        <Content />
        <Tag tags={tags} />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button
        type="submit"
        disabled={isPending}
        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
      >
        {isPending ? '수정 중...' : '수정하기'}
      </button>
    </form>
    </FormProvider>
  );
}
