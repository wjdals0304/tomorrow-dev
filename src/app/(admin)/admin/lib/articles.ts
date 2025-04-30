// lib/articles.ts
import { supabase } from '@/shared/lib/supabase';
import { unstable_noStore as noStore } from 'next/cache';

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
