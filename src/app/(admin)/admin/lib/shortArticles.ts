'use server';

import { supabase } from '@/shared/lib/supabase';
import { unstable_noStore as noStore } from 'next/cache';

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
