import type { ICountCard } from './dashboard'

export const countCardList: ICountCard[] = [
  {
    name: 'visit',
    title: '访问数',
    value: '435',
    total: '23423',
    icon: 'Bell',
    color: '#f4af72'
  },
  {
    name: 'money',
    title: '营业额',
    value: '9533',
    total: '8343423',
    icon: 'Money',
    color: '#6ee584'
  },
  {
    name: 'order',
    title: '订单量',
    value: '1323',
    total: '645324',
    icon: 'ShoppingCart',
    color: '#e9608f'
  },
  {
    name: 'deal',
    title: '成交率',
    value: '93',
    total: '89',
    icon: 'PieChart',
    color: '#00cae9'
  }
]

// ============ 双x轴柱状图 ============

// 样式优化：https://www.isqqw.com/viewer?id=42724

const xData = [
  '04-18',
  '04-19',
  '04-20',
  '04-21',
  '04-22',
  '04-23',
  '04-24',
  '04-25',
  '04-26',
  '04-27',
  '04-28',
  '04-29',
  '04-30',
  '05-01',
  '05-02',
  '05-03',
  '05-04',
  '05-05',
  '05-06',
  '05-07',
  '05-08',
  '05-09',
  '05-10',
  '05-11',
  '05-12',
  '05-13',
  '05-14',
  '05-15',
  '05-16',
  '05-17'
]

const moenyData = [
  3500, 4200, 3800, 4100, 3900, 4100, 4500, 4800, 5200, 5100, 4900, 5200, 5400, 5800, 6000, 6200,
  6400, 6700, 7000, 7300, 7000, 6800, 7100, 7500, 7800, 8100, 8200, 8400, 8600, 8800
]
const profitData = [
  0, 20.0, -9.5, 7.9, -4.9, 5.1, 9.8, 6.7, 8.3, -2.0, -3.9, 6.1, 3.8, 7.4, 3.4, 3.3, 3.2, 4.7, 4.5,
  4.1, -4.1, -2.9, 4.4, 5.6, 4.0, 3.8, 1.2, 2.4, 2.3, 2.3
]

export const barOptions_1 = {
  grid: {
    left: '3%',
    right: '4%',
    bottom: '15%',
    top: '4%',
    containLabel: true
  },
  legend: {
    data: ['营业额', '毛利率'],
    bottom: '2%'
  },
  xAxis: {
    type: 'category',
    data: xData
  },
  tooltip: {
    trigger: 'item' // 注意这里是item，不是axis
  },
  yAxis: [
    // 双y轴设置
    {
      type: 'value',
      name: '营业额',
      position: 'left',
      axisLabel: {
        formatter: '{value}元'
      }
    },
    {
      type: 'value',
      name: '毛利率',
      position: 'right',
      axisLabel: {
        formatter: '{value}%'
      }
    }
  ],
  series: [
    {
      name: '营业额',
      yAxisIndex: 0,
      data: moenyData,
      type: 'bar',
      color: '#e9608f',
      itemStyle: {
        normal: {
          barBorderRadius: [20, 20, 0, 0]
        }
      }
    },
    {
      name: '毛利率',
      yAxisIndex: 1,
      data: profitData,
      type: 'line',
      color: '#6ee584'
    }
  ]
}

// ============ 饼图 1 ============

const proportion = 90

export const pieOptions_1 = {
  title: {
    text: proportion + '%',
    left: 'center',
    top: 'center',
    textStyle: {
      fontWeight: '500',
      fontSize: '35',
      textAlign: 'center'
    }
  },

  series: [
    {
      name: '背景饼图',
      type: 'pie',
      radius: ['65%', '80%'],
      itemStyle: {
        normal: {
          color: '#f4f6f9',
          label: {
            show: false
          },
          labelLine: {
            show: false
          }
        }
      },
      animation: false,
      data: [100]
    },
    {
      name: '数据饼图',
      type: 'pie',
      radius: ['65%', '80%'],
      itemStyle: {
        normal: {
          label: {
            show: false
          },
          labelLine: {
            show: false
          }
        }
      },
      hoverAnimation: false,
      data: [
        {
          value: proportion,
          itemStyle: {
            normal: {
              color: {
                colorStops: [
                  {
                    offset: 0,
                    color: '#00cae9' // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: '#f4f6f9' // 100% 处的颜色
                  }
                ]
              },
              borderRadius: ['50%', '50%']
            }
          }
        },
        {
          value: 100 - proportion,
          itemStyle: {
            normal: {
              color: 'transparent',
              borderCap: 'round'
            }
          }
        }
      ]
    }
  ]
}

// ============ 饼图 2 ============
// const { data, total } = res.data;

const pieData2 = [
  { value: 1048, name: 'A 区域' },
  { value: 735, name: 'B 区域' },
  { value: 580, name: 'C 区域' },
  { value: 484, name: 'D 区域' },
  { value: 300, name: 'E 区域' }
]

const total = 2450
const title = '设施总数量'

export const pieOptions_2 = {
  color: ['#f4af72', '#6ee584', '#e9608f', '#00cae9'],
  title: {
    text: title,
    subtext: total,
    left: 'center',
    top: '37%',
    textStyle: {
      fontSize: '20',
      textAlign: 'center'
    },
    subtextStyle: {
      fontSize: '20',
      textAlign: 'center',
      fontWeight: '500'
    }
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    top: 'center',
    left: '1%'
  },
  series: [
    {
      type: 'pie',
      radius: ['65%', '90%'],
      center: ['50%', '50%'],
      padAngle: 3, // item间间距
      itemStyle: {
        borderRadius: 6
      },
      label: {
        show: false,
        position: 'center'
      },
      data: pieData2
    }
  ]
}

// ============ 饼图 3 ============

const pieData3 = [
  { value: 1048, name: 'A 区域' },
  { value: 735, name: 'B 区域' },
  { value: 580, name: 'C 区域' },
  { value: 484, name: 'D 区域' },
  { value: 300, name: 'E 区域' }
]

export const pieOptions_3 = {
  color: ['#f4af72', '#6ee584', '#e9608f', '#00cae9'],
  // 提示框
  tooltip: {
    trigger: 'item'
  },
  // 饼图数据
  series: [
    {
      type: 'pie',
      radius: ['10%', '80%'],
      center: ['50%', '50%'],
      roseType: 'area', // 南丁格尔图
      label: {
        fontSize: '15'
      },
      data: pieData3
    }
  ]
}

// ============ 饼图 3 ============

const pieData4 = [
  { value: 1048, name: 'A 级' },
  { value: 254, name: 'B 级' }
]

export const pieOptions_4 = {
  color: ['#e9608f', '#00cae9', '#f4af72', '#6ee584'],
  // 提示框
  tooltip: {
    trigger: 'item'
  },
  legend: {
    left: 'center'
  },
  // 饼图数据
  series: [
    {
      type: 'pie',
      radius: '50%',
      label: {
        fontSize: '15'
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      },
      data: pieData4
    }
  ]
}

// ============ 雷达图 ============

const radarData = [
  { name: '销售', value: 4200, max: 6500 },
  { name: '管理', value: 3000, max: 16000 },
  { name: '信息技术', value: 20000, max: 30000 },
  { name: '客服', value: 35000, max: 38000 },
  { name: '开发', value: 50000, max: 52000 },
  { name: '市场', value: 18000, max: 25000 }
]

export const radarOptions = {
  color: ['#e9608f', '#f4af72', '#6ee584', '#00cae9'],
  radar: {
    indicator: radarData.map((item) => {
      return {
        name: item.name,
        max: item.max
      }
    })
  },
  series: [
    {
      type: 'radar',
      areaStyle: {
        opacity: 0.7
      },
      label: {
        normal: {
          show: true,
          formatter: (params) => {
            return ((params.value / radarData[params.dimensionIndex].max) * 100).toFixed(2) + '%'
          }
        }
      },
      data: [
        {
          value: radarData.map((item) => item.value)
        }
      ]
    }
  ]
}

// ============ 折线图 ============

const xAxis = [
  '2024-01',
  '2024-02',
  '2024-03',
  '2024-04',
  '2024-05',
  '2024-06',
  '2024-07',
  '2024-08',
  '2024-09',
  '2024-10',
  '2024-11',
  '2024-12'
]

const yAxis = [6.5, 6.55, 6.58, 6.6, 6.63, 6.66, 6.68, 6.71, 6.74, 6.77, 6.8, 6.82]

export const lineOptions = {
  title: {
    text: '人民币兑美元汇率'
  },
  tooltip: {
    trigger: 'axis'
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  dataZoom: [
    {
      type: 'inside', // 缩放的🚩类型  slide代表滑块  inside代表依靠鼠标滚轮
      xAxisIndex: 0
    }
  ],
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    boundaryGap: false,
    data: xAxis,
    type: 'category'
  },
  yAxis: {
    type: 'value',
    min: 6 // 方便观察，设置y轴最小值
  },
  series: [
    {
      type: 'line',
      data: yAxis,
      color: '#00cae9'
    }
  ]
}

// ============ 柱状图 ============

const xAxis2 = [
  '2024-01',
  '2024-02',
  '2024-03',
  '2024-04',
  '2024-05',
  '2024-06',
  '2024-07',
  '2024-08',
  '2024-09',
  '2024-10',
  '2024-11',
  '2024-12'
]

const yAxis2 = [25000, 28000, 32000, 29000, 34000, 38000, 42000, 40000, 37000, 34000, 30000, 28000]

export const barOptions = {
  title: {
    text: '奶茶店营业额'
  },
  tooltip: {
    trigger: 'axis'
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  dataZoom: [
    {
      type: 'inside', // 缩放的🚩类型  slide代表滑块  inside代表依靠鼠标滚轮
      xAxisIndex: 0
    }
  ],
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    // boundaryGap: false,
    data: xAxis2,
    type: 'category',
    axisLabel: { interval: 0, rotate: 30 }
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      type: 'bar',
      data: yAxis2,
      color: '#6ee584'
    }
  ]
}
