'use client';

import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useChartOption } from './useChartOption';

interface DailyStats {
  views: number;
  users: number;
  date: string;
}

async function fetchDailyStats(): Promise<DailyStats[]> {
  const response = await fetch('/api/dailyStats');
  if (!response.ok) {
    throw new Error('API 요청 실패');
  }
  return response.json();
}

export function useChartData() {
  const [selectedMetric, setSelectedMetric] = useState<'views' | 'users'>(
    'views',
  );

  const { data: statsData = [], isLoading } = useQuery({
    queryKey: ['dailyStats'],
    queryFn: fetchDailyStats,
  });

  const dates = statsData.map((item) => {
    const date = new Date(item.date);
    return `${date.getMonth() + 1}.${date.getDate()}`;
  });

  const viewsData = statsData.map((item) => item.views);
  const usersData = statsData.map((item) => item.users);
  const currentData = selectedMetric === 'views' ? viewsData : usersData;
  const maxValue = Math.max(...viewsData, ...usersData, 1);

  const option = useChartOption({
    dates,
    values: currentData,
    maxValue,
  });

  const getLatestStats = () => {
    if (statsData.length === 0) return { views: 0, users: 0 };
    return {
      views: statsData[0].views,
      users: statsData[0].users,
    };
  };

  const getPercentageChange = (metric: 'views' | 'users') => {
    if (statsData.length < 2) return 0;
    const current = statsData[0][metric];
    const previous = statsData[1][metric];
    return Number((((current - previous) / previous) * 100).toFixed(1));
  };

  const latestStats = getLatestStats();
  const viewsChange = getPercentageChange('views');
  const usersChange = getPercentageChange('users');

  return {
    option,
    isLoading,
    statsData,
    selectedMetric,
    setSelectedMetric,
    latestStats,
    viewsChange,
    usersChange,
  };
}
