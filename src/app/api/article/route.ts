import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const supabase = createRouteHandlerClient({ cookies });

    const { data, error } = await supabase.from('articles').select(`
        id,
        title,
        content,
        updated_at,
        thumbnail_url,
        article_tags!inner (
          tags (
            name
          )
        )
      `);

    if (error) {
      console.error('Supabase query error:', error);
      throw error;
    }

    const formattedData =
      data?.map((post) => {
        const typedPost = post as unknown as {
          id: string;
          title: string;
          updated_at: string;
          content: string;
          thumbnail_url: string;
          article_tags: {
            tags: {
              name: string;
            };
          }[];
        };
        return {
          id: typedPost.id,
          title: typedPost.title,
          updated_at: typedPost.updated_at,
          content: typedPost.content,
          thumbnail_url: typedPost.thumbnail_url,
          tagname: typedPost.article_tags?.[0]?.tags?.name,
        };
      }) ?? [];

    return NextResponse.json(formattedData);
  } catch (error) {
    console.error('Error fetching articles:', error);
    return NextResponse.json(
      { error: 'Failed to fetch articles' },
      { status: 500 },
    );
  }
}
