'use client';

import { useChartOption } from '@/hooks/useChartOption';
import { useDailyStatsQuery } from '@/hooks/useDailyStatsQuery';
import { useMetricSelection } from '@/hooks/useMetricSelection';
import { useStatsCalculation } from '@/hooks/useStatsCalculation';

export function useChartData() {
  const { data: statsData = [], isLoading } = useDailyStatsQuery();
  const { selectedMetric, setSelectedMetric } = useMetricSelection();
  const {
    dates,
    viewsData,
    usersData,
    maxValue,
    latestStats,
    viewsChange,
    usersChange,
  } = useStatsCalculation(statsData);

  const currentData = selectedMetric === 'views' ? viewsData : usersData;

  const option = useChartOption({
    dates,
    values: currentData,
    maxValue,
  });

  return {
    option,
    isLoading,
    selectedMetric,
    setSelectedMetric,
    latestStats,
    viewsChange,
    usersChange,
  };
}
