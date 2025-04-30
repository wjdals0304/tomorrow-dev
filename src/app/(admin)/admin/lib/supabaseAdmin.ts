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
    throw new Error(
      'Missing env.SUPABASE_SERVICE_ROLE_KEY for admin operations.',
    );
  }

  supabaseAdminInstance = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  return supabaseAdminInstance;
}
