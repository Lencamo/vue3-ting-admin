import type { RouteRecordRaw } from 'vue-router'

// 批量收集本地路由
function loadLocalRoutes() {
  const localRoutes: RouteRecordRaw[] = []

  // - webpack中使用 require.context()、vite中使用import.meta.glob()
  const modules: Record<string, any> = import.meta.glob('@/router/**/*.ts', {
    eager: true
  })

  for (const key in modules) {
    const module = modules[key]

    if (key !== '../../router/index.ts') {
      // console.log(module.default)
      localRoutes.push(module.default)
    }
  }

  return localRoutes
}

// 记录第一个菜单
export let firstMenuItem: any = null

export function mapMenusToRoutes(userRoleMenu: any[]) {
  // 1、本地的全部路由
  const localRoutes = loadLocalRoutes()

  // 2、根据菜单匹配的路由
  const routes: RouteRecordRaw[] = []

  for (const menu of userRoleMenu) {
    for (const subItem of menu.children) {
      const route = localRoutes.find((item) => item.path === subItem.url)

      // 存储匹配的路由
      if (route) routes.push(route)

      // 记录第一个菜单
      if (!firstMenuItem && route) firstMenuItem = subItem
    }
  }

  return routes
}
