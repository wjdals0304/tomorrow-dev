import { useMemo } from 'react';

export interface EChartsOption {
  backgroundColor: string;
  grid: {
    left: string;
    right: string;
    top: string;
    bottom: string;
  };
  xAxis: {
    type: string;
    data: string[];
    axisLine: {
      lineStyle: {
        color: string;
      };
    };
    axisLabel: {
      color: string;
    };
  };
  yAxis: {
    type: string;
    min: number;
    max: number;
    interval: number;
    axisLine: {
      show: boolean;
    };
    axisLabel: {
      color: string;
      formatter: (value: number) => string;
    };
  };
  series: Array<{
    type: string;
    data: number[];
    smooth: boolean;
    symbol: string;
    symbolSize: number;
    itemStyle: {
      color: string;
    };
    lineStyle: {
      color: string;
      width: number;
    };
  }>;
  tooltip: {
    trigger: string;
    backgroundColor: string;
    borderColor: string;
    padding: number[];
    formatter: (params: { axisValue: string; value: number }[]) => string;
  };
}

interface UseChartOptionProps {
  dates: string[];
  values: number[];
  maxValue: number;
}

export function useChartOption({
  dates,
  values,
  maxValue,
}: UseChartOptionProps): EChartsOption {
  return useMemo(() => {
    const roundedMax = Math.ceil(maxValue / 500) * 500;

    return {
      backgroundColor: 'transparent',
      grid: {
        left: '10%',
        right: '5%',
        top: '10%',
        bottom: '10%',
      },
      xAxis: {
        type: 'category',
        data: dates,
        axisLine: {
          lineStyle: {
            color: '#333',
          },
        },
        axisLabel: {
          color: '#666',
        },
      },
      yAxis: {
        type: 'value',
        min: 0,
        max: roundedMax,
        interval: roundedMax / 5,
        axisLine: {
          show: false,
        },
        axisLabel: {
          color: '#666',
          formatter: (value: number) => value.toLocaleString(),
        },
      },
      series: [
        {
          type: 'line',
          data: values,
          smooth: true,
          symbol: 'circle',
          symbolSize: 8,
          itemStyle: {
            color: '#ff4d4f',
          },
          lineStyle: {
            color: '#ff4d4f',
            width: 3,
          },
        },
      ],
      tooltip: {
        trigger: 'axis',
        backgroundColor: '#1a1a1a',
        borderColor: '#ff4d4f',
        padding: [8, 12],
        formatter: (params) => {
          const value = params[0].value;
          const [month, day] = params[0].axisValue.split('.');
          return `${month}월 ${day}일 ${value.toLocaleString()}명`;
        },
      },
    };
  }, [dates, values, maxValue]);
}
