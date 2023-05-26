import * as echarts from 'echarts';

export const barChart = {
  backgroundColor: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
    { offset: 0, color: 'rgba(16, 29, 64, 0.23)' },
    { offset: 1, color: 'rgb(0, 33, 75)' }
  ]),
  color: ['rgb(100, 136, 199)', 'rgb(100, 168, 199)', 'rgb(100, 199, 190)'],
  legend: {
    icon: 'rect',
    textStyle: {
      color: '#fff'
    },
    x: 'right',
    padding: [20, 20, 0, 0],
    itemHeight: 8,
    data: ['预警', '报警', '控制']
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
      shadowStyle: {
        color: 'rgba(0, 0, 0, 0.2)'
      }
    }
  },

  xAxis: {
    type: 'category',
    data: ['石梅湾', '邦溪白', '海口绕城', '屯昌琼中'],
    axisLine: {
      lineStyle: {
        color: '#fff'
      }
    }
  },
  yAxis: {
    type: 'value',
    axisLine: {
      lineStyle: {
        color: '#fff'
      }
    }
  },
  series: [
    {
      name: '预警',
      data: [50, 200, 150, 80],
      type: 'bar'
    },
    {
      name: '报警',
      data: [120, 200, 150, 80],
      type: 'bar'
    },
    {
      name: '控制',
      data: [120, 200, 150, 80],
      type: 'bar'
    }
  ]
};

// 平均速度
export const lineChart = {
  backgroundColor: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
    { offset: 0, color: 'rgba(16, 29, 64, 0.23)' },
    { offset: 1, color: 'rgb(0, 33, 75)' }
  ]),
  color: ['rgb(23, 100, 201)', 'rgb(128, 201, 23)', 'rgb(251, 142, 0)'],
  legend: {
    icon: 'rect',
    textStyle: {
      color: '#fff'
    },
    x: 'right',
    padding: [20, 20, 0, 0],
    itemHeight: 8,
    data: ['大型车', '中型车', '小型车']
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
      shadowStyle: {
        color: 'rgba(0, 0, 0, 0.2)'
      }
    }
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    axisLine: {
      lineStyle: {
        color: '#fff'
      }
    },
    data: ['00:05', '00:10', '00:15', '00:20', '00:25']
  },
  yAxis: {
    type: 'value',
    axisLine: {
      lineStyle: {
        color: '#fff'
      }
    }
  },
  series: [
    {
      name: '大型车',
      type: 'line',
      smooth: 0.6,
      showSymbol: false,
      data: [120, 132, 101, 134, 90, 230, 210]
    },
    {
      name: '中型车',
      type: 'line',
      smooth: 0.6,
      showSymbol: false,
      data: [220, 182, 191, 234, 290, 330, 310]
    },
    {
      name: '小型车',
      type: 'line',
      smooth: 0.6,
      showSymbol: false,
      data: [150, 232, 201, 154, 190, 330, 410]
    }
  ]
};

// 预测小时交通量
export const lineSingleChart = {
  backgroundColor: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
    { offset: 0, color: 'rgba(16, 29, 64, 0.23)' },
    { offset: 1, color: 'rgb(0, 33, 75)' }
  ]),
  color: ['rgb(249, 139, 0)'],
  legend: {
    icon: 'circle',
    textStyle: {
      color: '#fff'
    },
    x: 'right',
    padding: [20, 20, 0, 0],
    itemHeight: 14,
    data: ['数据显示']
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
      shadowStyle: {
        color: 'rgba(0, 0, 0, 0.2)'
      }
    }
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    axisLine: {
      lineStyle: {
        color: '#fff'
      }
    },
    data: ['00:05', '00:10', '00:15', '00:20', '00:25']
  },
  yAxis: {
    type: 'value',
    axisLine: {
      lineStyle: {
        color: '#fff'
      }
    }
  },
  series: [
    {
      name: '数据显示',
      type: 'line',
      smooth: 0.6,
      showSymbol: false,
      data: [120, 132, 101, 134, 90, 230, 210],
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
          { offset: 0, color: 'rgba(249, 139, 0, 0.2)' },
          { offset: 1, color: 'rgba(249, 139, 0, 0.8)' }
        ])
      }
    }
  ]
};
