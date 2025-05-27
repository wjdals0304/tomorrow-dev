import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ChangeEvent, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ShortArticle, updateShortPostAction } from '../lib/shortArticles';

interface ShortPostFormValues {
  title: string;
  content: string;
}

interface UseEditShortPostsProps {
  initialShortPost: ShortArticle & {
    short_post_tags?: { tags: { id: number } }[];
  };
}

export function useEditShortPosts({
  initialShortPost,
}: UseEditShortPostsProps) {
  const queryClient = useQueryClient();
  const [selectedTags, setSelectedTags] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ShortPostFormValues>({
    defaultValues: {
      title: initialShortPost.title,
      content: initialShortPost.content,
    },
  });

  const { data: shortPost, isLoading } = useQuery({
    queryKey: ['shortPost', initialShortPost.id],
    queryFn: async () => initialShortPost,
    initialData: initialShortPost,
  });

  useEffect(() => {
    if (shortPost) {
      setValue('title', shortPost.title);
      setValue('content', shortPost.content);
      const initialTagIds = shortPost.short_post_tags?.map((st) => st.tags.id);
      setSelectedTags(initialTagIds?.[0] || null);
    }
  }, [shortPost, setValue]);

  const updateMutation = useMutation({
    mutationFn: updateShortPostAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shortPost', shortPost.id] });
      queryClient.invalidateQueries({ queryKey: ['shortPosts'] });
    },
    onError: (err: Error) => {
      setError(
        err.message || '짧은 글 수정 중 알 수 없는 오류가 발생했습니다.',
      );
    },
  });
  const handleTagChange = (event: ChangeEvent<HTMLInputElement>) => {
    const tagId = parseInt(event.target.value, 10);
    setSelectedTags(tagId);
  };

  const onSubmit: SubmitHandler<ShortPostFormValues> = (data) => {
    setError(null);
    const formData = new FormData();
    formData.append('shortPostId', shortPost.id.toString());
    formData.append('title', data.title);
    formData.append('content', data.content);

    formData.delete('tags');
    if (selectedTags) {
      formData.append('tags', selectedTags.toString());
    }

    updateMutation.mutate(formData);
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    watch,
    setValue,
    formState: { errors, isSubmitting },

    shortPost,
    isLoading,
    selectedTags,
    handleTagChange,
    error,
    isPending: isLoading || isSubmitting,
  };
}
