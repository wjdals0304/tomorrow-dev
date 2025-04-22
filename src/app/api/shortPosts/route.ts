import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const supabase = createRouteHandlerClient({ cookies });

    const { data, error } = await supabase.from('short_posts').select(`
        id,
        title,
        updated_at,
        short_post_tags!inner (
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
          short_post_tags: {
            tags: {
              name: string;
            };
          }[];
        };
        return {
          id: typedPost.id,
          title: typedPost.title,
          updated_at: typedPost.updated_at,
          tagname: typedPost.short_post_tags?.[0]?.tags?.name,
        };
      }) ?? [];

    return NextResponse.json(formattedData);
  } catch (error) {
    console.error('Error fetching short posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch short posts' },
      { status: 500 },
    );
  }
}
