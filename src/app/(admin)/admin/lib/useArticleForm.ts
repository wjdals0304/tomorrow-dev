// src/hooks/useArticleForm.ts
'use client';

import { useActionState, useState } from 'react';

export interface ArticleFormState {
  message: string | null;
  errors?: {
    title?: string[];
    description?: string[];
    content?: string[];
    thumbnail_url?: string[];
    tag_ids?: string[];
  };
}

export function useArticleForm(
  action: (
    prevState: ArticleFormState,
    formData: FormData,
  ) => Promise<ArticleFormState>,
) {
  const initialState: ArticleFormState = { message: null, errors: {} };
  const [state, formAction] = useActionState(action, initialState);
  const [markdownContent, setMarkdownContent] = useState<string | undefined>(
    '',
  );

  return { state, formAction, markdownContent, setMarkdownContent };
}
