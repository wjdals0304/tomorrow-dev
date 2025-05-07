'use server';

import { getSupabaseAdmin } from '@/app/(admin)/admin/lib/supabaseAdmin';

export interface Tag {
  id: number;
  name: string;
}

export async function getTagsList(): Promise<Tag[]> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.from('tags').select('id, name');

  if (error) {
    console.error('Error fetching tags:', error);
    return [];
  }

  return data || [];
}
