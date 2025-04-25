'use server';

import { getSupabaseAdmin } from '@/app/(admin)/admin/lib/supabaseAdmin';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { ArticleFormState } from '../components/CreateArticleForm';

const ArticleSchema = z.object({
  title: z.string().min(1, { message: '제목을 입력해주세요.' }),
  content: z.string().min(1, { message: '내용을 입력해주세요.' }),
  description: z.string().optional(),
  thumbnail_url: z
    .string()
    .url({ message: '유효한 URL을 입력해주세요.' })
    .optional()
    .or(z.literal('')),
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

    const validatedFields = ArticleSchema.safeParse({
      title: formData.get('title'),
      content: formData.get('content'),
      description: formData.get('description'),
      thumbnail_url: formData.get('thumbnail_url'),
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

    const { title, content, description, thumbnail_url } = validatedFields.data;

    const { data, error } = await supabaseAdmin
      .from('articles')
      .insert({
        title,
        content,
        description: description || null,
        thumbnail_url: thumbnail_url || null,
      })
      .select('id')
      .single();

    if (error) {
      console.error('Supabase Insert Error:', error);
      return { message: `데이터베이스 저장 실패: ${error.message}` };
    }

    revalidatePath('/admin');
    if (data?.id) {
      revalidatePath(`/blog/${data.id.toString()}`);
    }
  } catch (e: unknown) {
    console.error('Create Article Error:', e);
    return {
      message: `오류가 발생했습니다: ${e instanceof Error ? e.message : '알 수 없는 오류'}`,
    };
  }
  redirect('/admin');
}
