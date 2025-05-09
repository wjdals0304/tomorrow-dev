'use server';

import { supabase } from '@/shared/lib/supabase';
import { unstable_noStore as noStore, revalidatePath } from 'next/cache';
import { z } from 'zod';

export interface ShortArticle {
  id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export async function getAdminShortArticlesList(): Promise<ShortArticle[]> {
  noStore();
  const { data, error } = await supabase
    .from('short_posts')
    .select('id, title, content, created_at, updated_at')
    .order('created_at', { ascending: false });

  if (error) {
    console.error(
      'Error fetching short articles list for admin:',
      error.message,
    );
    return [];
  }
  return data || [];
}

export async function getAdminShortPostById(
  id: string,
): Promise<ShortArticle | null> {
  noStore();
  const idInt = parseInt(id, 10);
  if (isNaN(idInt)) {
    console.error('Invalid article ID string:', id);
    return null;
  }

  const { data, error } = await supabase
    .from('short_posts')
    .select('*, short_post_tags(*, tags(*))')
    .eq('id', id)
    .single();

  if (error) {
    console.error(`Error fetching short post with id ${id}:`, error.message);
    if (error.code === 'PGRST116') {
      return null;
    }
    return null;
  }
  return data;
}

const UpdateShortPostSchema = z.object({
  id: z.number().int().positive(),
  title: z.string().min(1, '제목을 입력해주세요.'),
  content: z.string().min(1, '내용을 입력해주세요.'),
  tagIds: z.number().int().positive().optional(),
});

export async function updateShortPostAction(formData: FormData) {
  let validatedData;
  try {
    validatedData = UpdateShortPostSchema.parse({
      id: parseInt(formData.get('shortPostId') as string, 10),
      title: formData.get('title'),
      content: formData.get('content'),
      tagIds: parseInt(formData.get('tags') as string, 10),
    });
  } catch (error) {
    console.error('Error parsing form data:', error);
    throw new Error('입력 데이터 유효성 검사 실패');
  }

  const { id, title, content, tagIds } = validatedData;

  try {
    const { error: shortPostUpdateError } = await supabase
      .from('short_posts')
      .update({
        title,
        content,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id);

    if (shortPostUpdateError) {
      console.error('Error updating short post:', shortPostUpdateError.message);
      throw new Error('짧은 글 업데이트 중 오류가 발생했습니다.');
    }

    const { error: deleteTagsError } = await supabase
      .from('short_post_tags')
      .delete()
      .eq('short_post_id', id);

    if (deleteTagsError) {
      console.error('Error deleting old tags:', deleteTagsError.message);
      throw new Error('기존 태그 삭제 중 오류가 발생했습니다.');
    }

    if (tagIds) {
      const newTagsData = [
        {
          short_post_id: id,
          tag_id: tagIds,
        },
      ];

      const { error: insertTagsError } = await supabase
        .from('short_post_tags')
        .insert(newTagsData);

      if (insertTagsError) {
        console.error('Error inserting new tags:', insertTagsError.message);
        throw new Error('새로운 태그 삽입 중 오류가 발생했습니다.');
      }
    }

    revalidatePath('/admin');
    revalidatePath(`/admin/short_posts/edit/${id}`);
  } catch (error) {
    console.error('Update Short Post Action Error:', error);
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error('알 수 없는 오류가 발생했습니다.');
    }
  }
}
