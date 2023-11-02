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
      path: '/home',
      component: () => import('../view/home/home.vue')
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

// 设置全局前置守卫
router.beforeEach((to, from) => {
  const token = localCache.getCache(LOGIN_TOKEN)

  // 进入后台token判断
  if (to.path.startsWith('/home') && !token) {
    return '/login'
  }
})

export default router
