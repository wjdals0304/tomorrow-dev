'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { getSupabaseAdmin } from '../lib/supabaseAdmin';
import { ShortArticleFormState } from '../lib/useShortArticleForm';

const ShortArticleSchema = z.object({
  title: z.string().min(1, { message: '제목을 입력해주세요.' }),
  content: z.string().min(1, { message: '내용을 입력해주세요.' }),
  tag_ids: z.array(z.string()).optional(),
});

async function checkAdminAuth() {
  console.log('경고: 실제 관리자 인증 로직이 필요합니다!');
  return true;
}

export async function createShortArticle(
  prevState: ShortArticleFormState,
  formData: FormData,
): Promise<ShortArticleFormState> {
  try {
    await checkAdminAuth();
    const tagIds = formData.getAll('tag_ids');

    const validatedFields = ShortArticleSchema.safeParse({
      title: formData.get('title'),
      content: formData.get('content'),
      tag_ids: tagIds,
    });

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: '입력 값을 확인해주세요.',
      };
    }

    const { title, content, tag_ids } = validatedFields.data;

    const supabaseAdmin = getSupabaseAdmin();

    const { data: shortPostData, error: shortPostError } = await supabaseAdmin
      .from('short_posts')
      .insert({
        title,
        content,
      })
      .select('id')
      .single();

    if (shortPostError) {
      return {
        errors: { content: [shortPostError.message] },
        message: '짧은 글 저장 실패',
      };
    }

    const shortPostId = shortPostData.id;

    if (tag_ids && tag_ids.length > 0) {
      const tagsToInsert = tag_ids.map((tagId) => ({
        short_post_id: shortPostId,
        tag_id: parseInt(tagId, 10),
      }));

      const { error: tagsError } = await supabaseAdmin
        .from('short_post_tags')
        .insert(tagsToInsert);

      if (tagsError) {
        return {
          errors: { content: [tagsError.message] },
          message: '태그 연결 실패',
        };
      }
    }

    revalidatePath('/admin');
    return { message: null, errors: {} };
  } catch (error) {
    console.error('짧은 글 저장 실패:', error);

    return {
      errors: { content: ['짧은 글 저장 실패'] },
      message: '짧은 글 저장 실패',
    };
  }
}
