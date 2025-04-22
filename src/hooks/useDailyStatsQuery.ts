import { useQuery } from '@tanstack/react-query';

export interface DailyStats {
  views: number;
  users: number;
  date: string;
}

async function fetchDailyStats(): Promise<DailyStats[]> {
  const response = await fetch('/api/dailyStats');
  if (!response.ok) {
    throw new Error('API 요청 실패');
  }
  const data = await response.json();

  return data.sort(
    (a: DailyStats, b: DailyStats) =>
      new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export function useDailyStatsQuery() {
  return useQuery<DailyStats[], Error>({
    queryKey: ['dailyStats'],
    queryFn: fetchDailyStats,
  });
}
