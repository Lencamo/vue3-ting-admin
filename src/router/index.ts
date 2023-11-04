import { LOGIN_TOKEN } from '@/config/constants'
import { localCache } from '@/utils/cache'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/login',
      component: () => import('../view/login/login.vue')
    },
    {
      path: '/main',
      name: 'main',
      component: () => import('../view/home/home.vue')
      // children: [
      //   {
      //     path: '/main/analysis/overview',
      //     component: () => import('../components/analysis/overview/overview.vue')
      //   },
      //   {
      //     path: '/main/analysis/dashboard',
      //     component: () => import('../components/analysis/dashboard/dashboard.vue')
      //   }
      // ]
    },
    {
      path: '/demo',
      component: () => import('../view/demo/demo.vue')
    },
    // 含有通配符的路由应该放在最后 !!!
    {
      path: '/:pathMatch(.*)',
      component: () => import('../view/404/not-found.vue')
    }
  ]
})

const localRoutes = [
  {
    path: '/main/analysis/overview',
    component: () => import('../components/analysis/overview/overview.vue')
  },
  {
    path: '/main/analysis/dashboard',
    component: () => import('../components/analysis/dashboard/dashboard.vue')
  },
  // ======
  {
    path: '/main/system/user',
    component: () => import('../components/system/user/user.vue')
  },
  {
    path: '/main/system/department',
    component: () => import('../components/system/department/department.vue')
  },
  {
    path: '/main/system/menu',
    component: () => import('../components/system/menu/menu.vue')
  },
  {
    path: '/main/system/role',
    component: () => import('../components/system/role/role.vue')
  }
]

router.addRoute('main', localRoutes[0])
router.addRoute('main', localRoutes[1])
router.addRoute('main', localRoutes[2])
router.addRoute('main', localRoutes[3])
router.addRoute('main', localRoutes[4])
router.addRoute('main', localRoutes[5])

// 设置全局前置守卫
router.beforeEach((to, from) => {
  const token = localCache.getCache(LOGIN_TOKEN)

  // 进入后台token判断
  if (to.path.startsWith('/home') && !token) {
    return '/login'
  }
})

export default router
