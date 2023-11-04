import { mapMenusToRoutes } from './map-menus.ts'
import router from '@/router'

// ……

// 动态路由注册
export function initDynamicRoutes(userRoleMenu: any[]) {
  // 根据菜单匹配的路由
  const routes = mapMenusToRoutes(userRoleMenu)

  // 对匹配的路由进行注册
  routes.forEach((route) => router.addRoute('main', route))
}
