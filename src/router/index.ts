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

export default router
