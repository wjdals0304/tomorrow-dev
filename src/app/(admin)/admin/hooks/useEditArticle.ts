'use client';

import { Article, updateArticleAction } from '@/app/(admin)/admin/lib/articles';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ChangeEvent, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

interface UseEditArticleProps {
  initialArticle: Article & { article_tags?: { tags: { id: number } }[] };
}
interface ArticleFormValues {
  title: string;
  description: string;
  content: string;
}

export function useEditArticle({ initialArticle }: UseEditArticleProps) {
  const queryClient = useQueryClient();
  const [selectedTags, setSelectedTags] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ArticleFormValues>({
    defaultValues: {
      title: initialArticle.title,
      description: initialArticle.description || '',
      content: initialArticle.content,
    },
  });

  const { data: article, isLoading } = useQuery({
    queryKey: ['article', initialArticle.id],
    queryFn: async () => initialArticle,
    initialData: initialArticle,
  });

  useEffect(() => {
    if (article) {
      setValue('title', article.title);
      setValue('description', article.description || '');
      setValue('content', article.content);
      const initialTagIds = article.article_tags?.map((at) => at.tags.id) || [];
      setSelectedTags(initialTagIds);
    }
  }, [article, setValue]);

  const updateMutation = useMutation({
    mutationFn: updateArticleAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['article', article.id] });
      queryClient.invalidateQueries({ queryKey: ['articles'] });
    },
    onError: (err: Error) => {
      setError(err.message || '게시글 수정 중 알 수 없는 오류가 발생했습니다.');
    },
  });
  const handleTagChange = (event: ChangeEvent<HTMLInputElement>) => {
    const tagId = parseInt(event.target.value, 10);
    setSelectedTags([tagId]);
  };

  const onSubmit: SubmitHandler<ArticleFormValues> = (data) => {
    setError(null);

    const formData = new FormData();
    formData.append('articleId', article.id.toString());
    formData.append('title', data.title);
    formData.append('description', data.description || '');
    formData.append('content', data.content);

    formData.delete('tags');
    selectedTags.forEach((tagId) => {
      formData.append('tags', tagId.toString());
    });

    updateMutation.mutate(formData);
  };

  const currentValues = watch();

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    watch,
    setValue,
    formState: { errors, isSubmitting },

    article,
    isLoading,
    currentValues,
    selectedTags,
    handleTagChange,
    error,
    isPending: updateMutation.isPending,
  };
}
