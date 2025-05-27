import { useForm } from 'react-hook-form';

export interface ShortPostForm {
  title: string;
  content: string;
  tag: number | null;
}


function useEditShortPostsForm(defaultValues: ShortPostForm) {
  return useForm<ShortPostForm>({
    defaultValues,
  });
}

export default useEditShortPostsForm;
