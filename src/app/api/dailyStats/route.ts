import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export interface DailyStats {
  id: number;
  views: number;
  users: number;
  date: string;
  created_at: string;
}

export async function GET() {
  try {
    if (
      !process.env.NEXT_PUBLIC_SUPABASE_URL ||
      !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    ) {
      console.error('Supabase 환경변수가 설정되지 않았습니다.');
      return NextResponse.json(
        { error: 'Supabase 설정이 없습니다.' },
        { status: 500 },
      );
    }
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    );

    const { data, error } = await supabase
      .from('daily_stats')
      .select('*')
      .order('date', { ascending: true });

    if (error) {
      console.error('Supabase 쿼리 에러:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data) {
      console.log('데이터가 없습니다.');
      return NextResponse.json([]);
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('API 에러:', error);
    return NextResponse.json(
      { error: '데이터를 가져오는데 실패했습니다.' },
      { status: 500 },
    );
  }
}
