import { useMemo } from 'react';
import type { DailyStats } from './useDailyStatsQuery';

export function useStatsCalculation(statsData: DailyStats[] = []) {
  const calculations = useMemo(() => {
    if (!statsData || statsData.length === 0) {
      return {
        dates: [],
        viewsData: [],
        usersData: [],
        maxValue: 1, 
        latestStats: { views: 0, users: 0 },
        viewsChange: 0,
        usersChange: 0,
      };
    }

    const dates = statsData
      .map((item) => {
        const date = new Date(item.date);
        return `${date.getMonth() + 1}.${date.getDate()}`;
      })
      .reverse(); 

    const viewsData = statsData.map((item) => item.views).reverse();
    const usersData = statsData.map((item) => item.users).reverse();
    const maxValue = Math.max(
      ...statsData.map((item) => item.views),
      ...statsData.map((item) => item.users),
      1,
    );

    const latestStats = {
      views: statsData[0].views,
      users: statsData[0].users,
    };

    const getPercentageChange = (metric: 'views' | 'users') => {
      if (statsData.length < 2) return 0;
      const current = statsData[0][metric];
      const previous = statsData[1][metric];
      if (previous === 0) return current > 0 ? 100 : 0;
      return Number((((current - previous) / previous) * 100).toFixed(1));
    };

    const viewsChange = getPercentageChange('views');
    const usersChange = getPercentageChange('users');

    return {
      dates,
      viewsData,
      usersData,
      maxValue,
      latestStats,
      viewsChange,
      usersChange,
    };
  }, [statsData]);

  return calculations;
}
