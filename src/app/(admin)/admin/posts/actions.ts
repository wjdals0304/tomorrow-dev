'use server';

import { getSupabaseAdmin } from '@/app/(admin)/admin/lib/supabaseAdmin';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { ArticleFormState } from '../lib/useArticleForm';

const ArticleSchema = z.object({
  title: z.string().min(1, { message: '제목을 입력해주세요.' }),
  content: z.string().min(1, { message: '내용을 입력해주세요.' }),
  description: z.string().optional(),
  thumbnail_url: z
    .string()
    .url({ message: '유효한 URL을 입력해주세요.' })
    .optional()
    .or(z.literal('')),
  tag_ids: z.array(z.string()).optional(),
});

async function checkAdminAuth() {
  console.log('경고: 실제 관리자 인증 로직이 필요합니다!');
  return true;
}

export async function createArticle(
  prevState: ArticleFormState,
  formData: FormData,
): Promise<ArticleFormState> {
  try {
    await checkAdminAuth();

    const supabaseAdmin = getSupabaseAdmin();

    const tagIds = formData.getAll('tag_ids');

    const validatedFields = ArticleSchema.safeParse({
      title: formData.get('title'),
      content: formData.get('content'),
      description: formData.get('description'),
      thumbnail_url: formData.get('thumbnail_url'),
      tag_ids: tagIds,
    });

    if (!validatedFields.success) {
      console.error(
        'Validation Errors:',
        validatedFields.error.flatten().fieldErrors,
      );
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: '입력 값을 확인해주세요.',
      };
    }

    const {
      title,
      content,
      description,
      thumbnail_url,
      tag_ids: validatedTagIds,
    } = validatedFields.data;

    const { data: articleData, error: articleError } = await supabaseAdmin
      .from('articles')
      .insert({
        title,
        content,
        description: description || null,
        thumbnail_url: thumbnail_url || null,
      })
      .select('id')
      .single();

    if (articleError) {
      console.error('Supabase Insert Article Error:', articleError);
      return { message: `게시글 저장 실패: ${articleError.message}` };
    }

    const articleId = articleData.id;

    if (validatedTagIds && validatedTagIds.length > 0) {
      const tagsToInsert = validatedTagIds.map((tagId) => ({
        article_id: articleId,
        tag_id: parseInt(tagId, 10),
      }));

      const { error: tagsError } = await supabaseAdmin
        .from('article_tags')
        .insert(tagsToInsert);

      if (tagsError) {
        console.error('Supabase Insert Tags Error:', tagsError);
        return { message: `태그 연결 실패: ${tagsError.message}` };
      }
    }

    revalidatePath('/admin');
    revalidatePath('/blog');
    if (articleId) {
      revalidatePath(`/blog/${articleId.toString()}`);
    }
  } catch (e: unknown) {
    console.error('Create Article Error:', e);
    return {
      message: `오류가 발생했습니다: ${e instanceof Error ? e.message : '알 수 없는 오류'}`,
    };
  }
  redirect('/admin');
}
