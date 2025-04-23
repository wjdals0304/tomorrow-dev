import { useState } from 'react';

export type MetricType = 'views' | 'users';

export function useMetricSelection(initialMetric: MetricType = 'views') {
  const [selectedMetric, setSelectedMetric] =
    useState<MetricType>(initialMetric);

  return {
    selectedMetric,
    setSelectedMetric,
  };
}
