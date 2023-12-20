import router from '@/router/index.ts'
import type { RouteRecordRaw } from 'vue-router'
import type { IMeta } from '@/types/login/login.ts'

// 批量收集本地路由
export function loadLocalRoutes() {
  let localRoutes: RouteRecordRaw[] = []

  const modules: Record<string, any> = import.meta.glob('../router/nav-side.ts', {
    eager: true,
    import: 'default'
  })

  for (const key in modules) {
    // console.log(modules[key])
    localRoutes.push(...modules[key])
  }

  return localRoutes
}

// 记录第一个菜单
export let firstMenuItem: any = null

export function initStaticRoutes() {
  // 1、本地的全部路由
  const localRoutes = loadLocalRoutes()

  // 2、暂存的菜单栏数据
  const routeMetas: IMeta[] = []

  localRoutes.forEach((route) => {
    // console.log(route)
    // 记录第一个菜单
    if (!firstMenuItem && route) firstMenuItem = route

    // 视图数据
    const meta = { ...(route.meta as unknown as IMeta), url: route.path }
    routeMetas.push(meta)

    // 批量注册
    router.addRoute('main', route)
  })

  return routeMetas
}
