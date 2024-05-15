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

// const { xAxis, legend, series } = res.data;
export const lineOptions = {
  title: {
    text: '油耗（L/100km）'
  },
  legend: {
    data: ['川A666666', '川E123456']
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
    data: [
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
    ],
    type: 'category'
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [7.14, 6.24, 12.17, 7.14, 11.24, 12.17, 7.14, 11.24, 9.17, 7.14, 11.24, 12.17],
      name: '川A666666',
      type: 'line'
    },
    {
      data: [9.62, 10.53, 8.32, 9.62, 10.53, 6.32, 9.62, 10.53, 8.32, 9.62, 10.53, 8.32],
      name: '川E123456',
      type: 'line'
    }
  ]
}
