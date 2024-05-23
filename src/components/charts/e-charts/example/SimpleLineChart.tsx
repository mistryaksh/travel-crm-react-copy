import React from 'react';
import ReactEChartsCore from 'echarts-for-react/lib/core';
import * as echarts from 'echarts/core';
import { getDates } from 'helpers/utils';
import dayjs from 'dayjs';
import { useAppContext } from 'providers/AppProvider';
import {
  GridComponent,
  // LegendComponent,
  // TitleComponent,
  TooltipComponent
} from 'echarts/components';
import { LineChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import { ThemeVariant } from 'config';
import { tooltipFormatterList } from 'helpers/echart-utils';

echarts.use([
  // TitleComponent,
  TooltipComponent,
  GridComponent,
  LineChart,
  CanvasRenderer
  // LegendComponent
]);

const dates = getDates(
  new Date('8/1/2022'),
  new Date('8/10/2022'),
  1000 * 60 * 60 * 24
);

const currentMonthData = [
  100, 200, 300, 150, 250, 380, 400, 400, 300, 100, 200, 300
];

const getDefaultOptions = (
  theme: ThemeVariant,
  getThemeColor: (name: string) => string
) => ({
  color: ['#d6630a'],
  tooltip: {
    trigger: 'axis',
    padding: 10,
    backgroundColor: getThemeColor('body-highlight-bg'),
    borderColor: getThemeColor('tertiary-bg'),
    textStyle: { color: getThemeColor('light-text-emphasis') },
    borderWidth: 1,
    transitionDuration: 0,
    axisPointer: {
      type: 'none'
    },
    formatter: tooltipFormatterList
  },
  xAxis: [
    {
      type: 'category',
      data: dates,
      axisLabel: {
        formatter: (value: Date) => dayjs(value).format('DD MMM'),
        interval: 13,
        showMinLabel: true,
        showMaxLabel: false,
        color: getThemeColor('secondary-color'),
        align: 'left',
        fontFamily: 'Nunito Sans',
        fontWeight: 600,
        fontSize: 12.8
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: getThemeColor('secondary-bg')
        }
      },
      axisTick: {
        show: false
      },
      splitLine: {
        show: false,
        interval: 0,
        lineStyle: {
          color:
            theme === 'dark'
              ? getThemeColor('body-highlight-bg')
              : getThemeColor('secondary-bg')
        }
      },
      boundaryGap: false
    },
    {
      type: 'category',
      position: 'bottom',
      // data: dates,
      axisLabel: {
        show: false
      },
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      splitLine: {
        show: false
      },
      boundaryGap: false
    }
  ],
  yAxis: {
    position: 'right',
    // axisPointer: { type: 'none' },
    // axisTick: 'none',
    splitLine: {
      show: false
    },
    axisLine: { show: false },
    axisLabel: { show: false }
  },
  series: [
    {
      type: 'line',
      data: currentMonthData,
      showSymbol: false,
      symbol: 'circle'
    }
  ],
  grid: {
    right: 2,
    left: 5,
    bottom: '20px',
    top: '2%',
    containLabel: false
  },
  animation: false
});

const SimpleLineChart = () => {
  const {
    config: { theme },
    getThemeColor
  } = useAppContext();

  return (
    <ReactEChartsCore
      echarts={echarts}
      option={getDefaultOptions(theme, getThemeColor)}
    />
  );
};

export default SimpleLineChart;
