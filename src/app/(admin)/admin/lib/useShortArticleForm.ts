'use client';

import { useActionState, useState } from 'react';

export interface ShortArticleFormState {
  message: string | null;
  errors?: {
    title?: string[];
    content?: string[];
    tag_ids?: string[];
  };
}

export function useShortArticleForm(
  action: (
    prevState: ShortArticleFormState,
    formData: FormData,
  ) => Promise<ShortArticleFormState>,
) {
  const initialState: ShortArticleFormState = { message: null, errors: {} };
  const [state, formAction] = useActionState(action, initialState);
  const [markdownContent, setMarkdownContent] = useState<string | undefined>(
    '',
  );

  return { state, formAction, markdownContent, setMarkdownContent };
}
