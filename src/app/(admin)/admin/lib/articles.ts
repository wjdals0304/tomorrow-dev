'use server';

import { supabase } from '@/shared/lib/supabase';
import { unstable_noStore as noStore, revalidatePath } from 'next/cache';
import { z } from 'zod';

export interface Article {
  id: number;
  title: string;
  description: string | null;
  content: string;
  thumbnail_url: string | null;
  views: number;
  likes: number;
  created_at: string;
  updated_at: string;
}

export async function getAdminArticlesList(): Promise<
  Omit<Article, 'content'>[]
> {
  noStore();
  const { data, error } = await supabase
    .from('articles')
    .select(
      'id, title, description, created_at, updated_at, views, likes, thumbnail_url',
    )
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching articles list for admin:', error.message);
    return [];
  }
  return data || [];
}

export async function getAllArticleIds(): Promise<{ slug: string }[]> {
  const { data, error } = await supabase.from('articles').select('id');

  if (error) {
    console.error('Error fetching all article IDs:', error.message);
    return [];
  }

  return data.map((article) => ({
    slug: article.id.toString(),
  }));
}

const UpdateArticleSchema = z.object({
  id: z.number().int().positive(),
  title: z.string().min(1, '제목을 입력해주세요.'),
  description: z.string().nullable(),
  content: z.string().min(1, '내용을 입력해주세요.'),
  tagIds: z.array(z.number().int().positive()).optional(),
});

export async function updateArticleAction(formData: FormData) {
  let validatedData;
  try {
    validatedData = UpdateArticleSchema.parse({
      id: parseInt(formData.get('articleId') as string, 10),
      title: formData.get('title'),
      description: formData.get('description') || null,
      content: formData.get('content'),
      tagIds: formData
        .getAll('tags')
        .map((tagId) => parseInt(tagId as string, 10)),
    });
  } catch (error) {
    console.error('Validation Error:', error);
    throw new Error('입력 데이터 유효성 검사 실패');
  }

  const { id, title, description, content, tagIds = [] } = validatedData;

  try {
    const { error: articleUpdateError } = await supabase
      .from('articles')
      .update({
        title,
        description,
        content,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id);

    if (articleUpdateError) {
      console.error('Error updating article:', articleUpdateError.message);
      throw new Error('게시글 업데이트 중 오류가 발생했습니다.');
    }

    const { error: deleteTagsError } = await supabase
      .from('article_tags')
      .delete()
      .eq('article_id', id);

    if (deleteTagsError) {
      console.error('Error deleting old tags:', deleteTagsError.message);
      throw new Error('기존 태그 삭제 중 오류가 발생했습니다.');
    }

    if (tagIds.length > 0) {
      const newTagsData = tagIds.map((tagId) => ({
        article_id: id,
        tag_id: tagId,
      }));
      const { error: insertTagsError } = await supabase
        .from('article_tags')
        .insert(newTagsData);

      if (insertTagsError) {
        console.error('Error inserting new tags:', insertTagsError.message);
        throw new Error('새로운 태그 추가 중 오류가 발생했습니다.');
      }
    }

    revalidatePath('/admin');
    revalidatePath(`/admin/posts/edit/${id}`);
  } catch (error) {
    console.error('Update Article Action Error:', error);
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error('알 수 없는 오류가 발생했습니다.');
    }
  }
}

export async function getAdminArticleById(
  idString: string,
): Promise<Article | null> {
  noStore();

  const id = parseInt(idString, 10);
  if (isNaN(id)) {
    console.error('Invalid article ID string:', idString);
    return null;
  }

  const { data, error } = await supabase
    .from('articles')
    .select('*, article_tags(*, tags(*))')
    .eq('id', id)
    .single();

  if (error) {
    console.error(`Error fetching article with id ${id}:`, error.message);
    if (error.code === 'PGRST116') {
      return null;
    }
    return null;
  }

  return data;
}
