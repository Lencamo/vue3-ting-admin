export function mapPathToMenu(path: string, userRoleMenu: any[]) {
  for (const menu of userRoleMenu) {
    for (const subItem of menu.children) {
      if (subItem.url === path) {
        return subItem
      }
    }
  }
}

interface IBreadcrumbs {
  name: string
  path: string
}
export function mapPathToBreadcrumbs(path: string, userMenus: any[]) {
  // 1.定义面包屑
  const breadcrumbs: IBreadcrumbs[] = []

  // 2.遍历获取面包屑层级
  for (const menu of userMenus) {
    for (const subItem of menu.children) {
      if (subItem.url === path) {
        // 1.父级菜单
        breadcrumbs.push({ name: menu.name, path: menu.url })
        // 2.item子菜单
        breadcrumbs.push({ name: subItem.name, path: subItem.url })
      }
    }
  }
  return breadcrumbs
}
