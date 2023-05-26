import * as echarts from 'echarts';

export const initChart = (el, option) => {
  const myChart = echarts.init(el);
  myChart.setOption(option);
};
