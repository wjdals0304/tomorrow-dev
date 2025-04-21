'use client';

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
        <div className="text-gray-400">데이터 로딩중...</div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-dark py-5 pr-5">
      <div className="flex gap-10">
        <div className="flex flex-col gap-5">
          <button
            className={`flex flex-col gap-2 text-left ${
              selectedMetric === 'views' ? 'opacity-100' : 'opacity-50'
            }`}
            onClick={() => setSelectedMetric('views')}
          >
            <div className="text-gray-400">조회수</div>
            <div className="flex items-baseline gap-2">
              <span className="text-white text-2xl font-bold">
                {latestStats.views.toLocaleString()}
              </span>
              <span
                className={viewsChange >= 0 ? 'text-green-500' : 'text-red-500'}
              >
                {viewsChange > 0 ? '+' : ''}
                {viewsChange}%
              </span>
            </div>
          </button>

          <button
            className={`flex flex-col gap-2 text-left ${
              selectedMetric === 'users' ? 'opacity-100' : 'opacity-50'
            }`}
            onClick={() => setSelectedMetric('users')}
          >
            <div className="text-gray-400">사용자</div>
            <div className="flex items-baseline gap-2">
              <span className="text-white text-2xl font-bold">
                {latestStats.users.toLocaleString()}
              </span>
              <span
                className={usersChange >= 0 ? 'text-green-500' : 'text-red-500'}
              >
                {usersChange > 0 ? '+' : ''}
                {usersChange}%
              </span>
            </div>
          </button>
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
