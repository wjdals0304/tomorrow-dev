'use client';

import { Article, updateArticleAction } from '@/app/(admin)/admin/lib/articles';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

interface UseEditArticleProps {
  initialArticle: Article & { article_tags?: { tags: { id: number } }[] };
}

export function useEditArticle({ initialArticle }: UseEditArticleProps) {
  const queryClient = useQueryClient();

  const [title, setTitle] = useState(initialArticle.title);
  const [description, setDescription] = useState(
    initialArticle.description || '',
  );
  const [content, setContent] = useState(initialArticle.content);
  const [selectedTags, setSelectedTags] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);

  const { data: article, isLoading } = useQuery({
    queryKey: ['article', initialArticle.id],
    queryFn: async () => initialArticle,
    initialData: initialArticle,
  });

  useEffect(() => {
    if (article) {
      setTitle(article.title);
      setDescription(article.description || '');
      setContent(article.content);
      const initialTagIds = article.article_tags?.map((at) => at.tags.id) || [];
      setSelectedTags(initialTagIds);
    }
  }, [article]);

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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.currentTarget);
    formData.append('articleId', article.id.toString());
    formData.delete('tags');
    selectedTags.forEach((tagId) => {
      formData.append('tags', tagId.toString());
    });

    updateMutation.mutate(formData);
  };

  return {
    article,
    isLoading,
    title,
    setTitle,
    description,
    setDescription,
    content,
    setContent,
    selectedTags,
    handleTagChange,
    handleSubmit,
    error,
    isPending: updateMutation.isPending,
  };
}
