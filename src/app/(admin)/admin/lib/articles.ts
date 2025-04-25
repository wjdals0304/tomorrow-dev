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

// // 개별 글 상세 데이터 가져오기 (공개 페이지용)
// export async function getArticleData(id: string): Promise<Article | null> {
//   noStore(); // 개별 글은 조회수 등 때문에 캐시 비활성화 권장

//   const numericId = parseInt(id, 10);
//   if (isNaN(numericId)) {
//     console.error('Invalid article ID format passed:', id);
//     return null;
//   }

//   const { data, error } = await supabase
//     .from('articles')
//     .select('*') // 개별 글은 모든 정보 필요
//     .eq('id', numericId)
//     .single(); // id는 PK이므로 single() 사용

//   if (error) {
//     // PGRST116: Row not found (결과 없음) - 404 처리 필요
//     if (error.code === 'PGRST116') {
//       console.log(`Article with id ${numericId} not found.`);
//       return null;
//     }
//     // 다른 종류의 DB 에러
//     console.error(
//       `Error fetching article data for id ${numericId}:`,
//       error.message,
//     );
//     throw new Error(`Database error fetching article ${numericId}`);
//   }

//   // 조회수 증가 (백그라운드에서 실행, 실패해도 글 로딩은 계속되도록)
//   if (data) {
//     // Supabase RPC 함수 'increment_views' 가 있다고 가정
//     // CREATE OR REPLACE FUNCTION increment_views(row_id bigint) ..
//     //
//     // .

//     await supabase
//       .rpc('increment_views', { row_id: numericId })
//       .catch((rpcError: unknown) =>
//         console.error(
//           `Failed to increment views for article ${numericId}:`,
//           rpcError,
//         ),
//       );
//   }

//   return data;
// }

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
