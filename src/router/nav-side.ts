export default [
  {
    path: '/main/analysis',
    component: () => import('@/pages/analysis/analysis.vue'),
    meta: {
      id: 1,
      title: '数据分析',
      icon: 'Histogram'
    }
  },
  {
    path: '/main/order',
    component: () => import('@/pages/order/order.vue'),
    meta: {
      id: 2,
      title: '订单管理',
      icon: 'Printer'
    }
  },
  {
    path: '/main/food',
    component: () => import('@/pages/food/food.vue'),
    meta: {
      id: 3,
      title: '菜品管理',
      icon: 'Dish'
    }
  },
  {
    path: '/main/category',
    component: () => import('@/pages/category/category.vue'),
    meta: {
      id: 4,
      title: '菜品类目',
      icon: 'Menu'
    }
  },
  {
    path: '/main/table',
    component: () => import('@/pages/table/table.vue'),
    meta: {
      id: 5,
      title: '桌号管理',
      icon: 'Place'
    }
  },
  {
    path: '/main/setting',
    component: () => import('@/pages/setting/setting.vue'),
    meta: {
      id: 6,
      title: '店铺设置',
      icon: 'Shop'
    }
  }
]
