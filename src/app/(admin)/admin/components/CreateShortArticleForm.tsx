'use client';

import MDEditor from '@uiw/react-md-editor';
import { useFormStatus } from 'react-dom';
import { Tag } from '../lib/tags';
import { useShortArticleForm } from '../lib/useShortArticleForm';
import { createShortArticle } from '../short_posts/actions';

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

interface CreateShortArticleFormProps {
  tags: Tag[];
}

export default function CreateShortArticleForm({
  tags,
}: CreateShortArticleFormProps) {
  const { state, formAction, markdownContent, setMarkdownContent } =
    useShortArticleForm(createShortArticle);

  return (
    <form
      action={formAction}
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
        <label className="block mb-2 text-sm font-medium text-gray-700">
          태그 선택:
        </label>
        <div className="flex flex-wrap gap-2" aria-describedby="tags-error">
          {tags.map((tag) => (
            <div key={tag.id} className="flex items-center">
              <input
                type="checkbox"
                id={`tag-${tag.id}`}
                name="tag_ids"
                value={tag.id.toString()}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label
                htmlFor={`tag-${tag.id}`}
                className="ml-2 text-sm text-gray-700"
              >
                {tag.name}
              </label>
            </div>
          ))}
        </div>
        <div
          id="tags-error"
          aria-live="polite"
          aria-atomic="true"
          className="mt-1"
        >
          {state?.errors?.tag_ids &&
            state.errors.tag_ids.map((error: string) => (
              <p key={`tag-error-${error}`} className="text-sm text-red-600">
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
