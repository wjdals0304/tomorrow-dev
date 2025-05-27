import { useQuery } from '@tanstack/react-query';
import { ChangeEvent, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { ShortArticle } from '../lib/shortArticles';
import { ShortPostForm } from '@/app/(admin)/admin/hooks/useEditShortPostsForm';

interface UseEditShortPostsProps {
  initialShortPost: ShortArticle & {
    short_post_tags?: { tags: { id: number } }[];
  };
}

export function useEditShortPosts({
  initialShortPost,
}: UseEditShortPostsProps) {
  const [selectedTags, setSelectedTags] = useState<number | null>(null);
  const { setValue } = useFormContext<ShortPostForm>();

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

  const handleTagChange = (event: ChangeEvent<HTMLInputElement>) => {
    const tagId = parseInt(event.target.value, 10);
    setSelectedTags(tagId);
  };

  return {
    shortPost,
    isLoading,
    selectedTags,
    handleTagChange,
  };
}
