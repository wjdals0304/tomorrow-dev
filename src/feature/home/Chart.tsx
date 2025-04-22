'use client';

import { LoadingSpinner } from '@/components/LoadingSpinner';
import { cn } from '@/shared/lib/tailWindMerge';
import ReactECharts from 'echarts-for-react';
import { useChartData } from './hooks/useChartData';

export function Chart() {
  const {
    option,
    isLoading,
    selectedMetric,
    setSelectedMetric,
    latestStats,
    viewsChange,
    usersChange,
  } = useChartData();

  if (isLoading) {
    return (
      <div className="flex-1 bg-dark p-5 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  const metricButtons = [
    {
      key: 'views',
      label: '조회수',
      value: latestStats.views,
      change: viewsChange,
    },
    {
      key: 'users',
      label: '사용자',
      value: latestStats.users,
      change: usersChange,
    },
  ];

  return (
    <div className="flex-1 bg-dark py-5 pr-5">
      <div className="flex gap-5">
        <div className="flex flex-col gap-5">
          {metricButtons.map((metric) => (
            <button
              key={metric.key}
              className={cn(
                'flex flex-col gap-2 text-left',
                selectedMetric !== metric.key && 'opacity-50',
              )}
              onClick={() => setSelectedMetric(metric.key as 'views' | 'users')}
            >
              <div className="text-gray-400">{metric.label}</div>
              <div className="flex items-baseline gap-2">
                <span className="text-white-900 text-2xl font-bold">
                  {metric.value.toLocaleString()}
                </span>
                <span
                  className={cn(
                    metric.change >= 0 ? 'text-green-500' : 'text-red-500',
                  )}
                >
                  {metric.change > 0 ? '+' : ''}
                  {metric.change}%
                </span>
              </div>
            </button>
          ))}
        </div>

        <div className="flex-1">
          <ReactECharts
            option={option}
            style={{ height: '300px', width: '100%' }}
            theme="dark"
          />
        </div>
      </div>
    </div>
  );
}
