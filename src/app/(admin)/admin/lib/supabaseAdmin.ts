import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_URL');
}
if (!supabaseAnonKey) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_ANON_KEY');
}

export const supabase: SupabaseClient = createClient(
  supabaseUrl,
  supabaseAnonKey,
);

let supabaseAdminInstance: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient {
  if (supabaseAdminInstance) {
    return supabaseAdminInstance;
  }

  if (!supabaseAnonKey) {
    console.warn(
      'Supabase Service Role Key is not set. Falling back to anon key for admin client. This might fail depending on RLS policies.',
    );
    // 서비스 키가 없으면 일단 공개 클라이언트를 반환하거나 에러 처리
    // return supabase;
    throw new Error(
      'Missing env.SUPABASE_SERVICE_ROLE_KEY for admin operations.',
    );
  }

  supabaseAdminInstance = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      // 서버 환경에서는 세션 자동 갱신이나 유지가 필요 없을 수 있음
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  return supabaseAdminInstance;
}
