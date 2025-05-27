import { SubmitHandler, useFormContext } from 'react-hook-form';
import { ShortPostForm } from '@/app/(admin)/admin/hooks/useEditShortPostsForm';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateShortPostAction } from '@/app/(admin)/admin/lib/shortArticles';
import { useParams } from 'next/navigation';

function useHandleSubmit() {
  const queryClient = useQueryClient();
  const { setError } = useFormContext<ShortPostForm>();
  const { id } = useParams();

  const { mutate } = useMutation({
    mutationFn: (data: ShortPostForm) => updateShortPostAction(Number(id), data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shortPost', id] });
      queryClient.invalidateQueries({ queryKey: ['shortPosts'] });
    },
    onError: (err: Error) => {
      setError('root', {
        message: err.message || '짧은 글 수정 중 알 수 없는 오류가 발생했습니다.',
      });
    },
  });

  const onSubmit: SubmitHandler<ShortPostForm> = (data) => {
    mutate(data);
  };

  return {
    onSubmit
  }
}

export default useHandleSubmit;
