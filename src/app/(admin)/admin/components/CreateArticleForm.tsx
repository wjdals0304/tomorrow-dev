'use client';

import MDEditor from '@uiw/react-md-editor';
import '@uiw/react-md-editor/markdown-editor.css';
import { useActionState, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { createArticle } from '../posts/actions';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      aria-disabled={pending}
      className="mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {pending ? '저장 중...' : '글 작성'}
    </button>
  );
}

export interface ArticleFormState {
  message: string | null;
  errors?: {
    title?: string[];
    description?: string[];
    content?: string[];
    thumbnail_url?: string[];
  };
}

export default function CreateArticleForm() {
  const initialState: ArticleFormState = { message: null, errors: {} };

  const [state, dispatch] = useActionState(createArticle, initialState);

  const [markdownContent, setMarkdownContent] = useState<string | undefined>(
    '',
  );

  return (
    <form
      action={dispatch}
      className="space-y-6 p-6 bg-white rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">새 글 작성</h2>
      <div className="mb-4">
        <label
          htmlFor="title"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          제목:
        </label>
        <input
          type="text"
          id="title"
          name="title"
          required
          aria-describedby="title-error"
          className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
        <div
          id="title-error"
          aria-live="polite"
          aria-atomic="true"
          className="mt-1"
        >
          {state?.errors?.title &&
            state.errors.title.map((error: string) => (
              <p key={`title-error-${error}`} className="text-sm text-red-600">
                {error}
              </p>
            ))}
        </div>
      </div>
      <div className="mb-4">
        <label
          htmlFor="description"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          요약 (선택 사항):
        </label>
        <textarea
          id="description"
          name="description"
          aria-describedby="description-error"
          className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          rows={3}
        ></textarea>
        <div
          id="description-error"
          aria-live="polite"
          aria-atomic="true"
          className="mt-1"
        >
          {state?.errors?.description &&
            state.errors.description.map((error: string) => (
              <p key={`desc-error-${error}`} className="text-sm text-red-600">
                {error}
              </p>
            ))}
        </div>
      </div>
      <div className="mb-4">
        <label
          htmlFor="content-editor"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          내용 (Markdown):
        </label>
        <MDEditor
          value={markdownContent}
          onChange={setMarkdownContent}
          preview="live"
          height={400}
          id="content-editor"
          aria-describedby="content-error"
        />
        <input type="hidden" name="content" value={markdownContent || ''} />
        <div
          id="content-error"
          aria-live="polite"
          aria-atomic="true"
          className="mt-1"
        >
          {state?.errors?.content &&
            state.errors.content.map((error: string) => (
              <p
                key={`content-error-${error}`}
                className="text-sm text-red-600"
              >
                {error}
              </p>
            ))}
        </div>
      </div>
      <div className="mb-4">
        <label
          htmlFor="thumbnail_url"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          썸네일 URL (선택 사항):
        </label>
        <input
          type="url"
          id="thumbnail_url"
          name="thumbnail_url"
          aria-describedby="thumbnail_url-error"
          className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" // 다크모드 스타일
        />
        <div
          id="thumbnail_url-error"
          aria-live="polite"
          aria-atomic="true"
          className="mt-1"
        >
          {state?.errors?.thumbnail_url &&
            state.errors.thumbnail_url.map((error: string) => (
              <p key={`thumb-error-${error}`} className="text-sm text-red-600">
                {error}
              </p>
            ))}
        </div>
      </div>
      <div aria-live="polite" aria-atomic="true">
        {state?.message && (
          <p className="text-sm text-red-600">{state.message}</p>
        )}
      </div>
      <SubmitButton />
    </form>
  );
}
