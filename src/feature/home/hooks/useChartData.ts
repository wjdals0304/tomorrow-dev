'use client';

import { useChartOption } from './useChartOption';
import { useDailyStatsQuery } from './useDailyStatsQuery';
import { useMetricSelection } from './useMetricSelection';
import { useStatsCalculation } from './useStatsCalculation';

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
