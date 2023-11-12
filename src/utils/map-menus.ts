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
      if (route) {
        // 追加父级菜单路由-重定向到第一个menuItem（供面包屑使用）
        if (!routes.find((item) => item.path === menu.url)) {
          routes.push({ path: menu.url, redirect: route.path })
        }

        routes.push(route)
      }

      // 记录第一个菜单
      if (!firstMenuItem && route) firstMenuItem = subItem
    }
  }

  return routes
}

// 将经过处理的globalMenuList树映射为id数组
export function mapMenuToIds(roleMenu: any) {
  const deepestMenuIds: number[] = []
  const allMenuIds: number[] = [] // 只获取根节点（供tree控件回显）

  function getDeepestMenuId(menus) {
    menus.forEach((item) => {
      allMenuIds.push(item.id)

      if (item.children) {
        getDeepestMenuId(item.children)
      } else {
        deepestMenuIds.push(item.id)
      }
    })
  }
  getDeepestMenuId(roleMenu)

  return { deepestMenuIds, allMenuIds }
}
