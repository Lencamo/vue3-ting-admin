export function mapPathToMenu(path: string, userRoleMenu: any[]) {
  for (const menu of userRoleMenu) {
    for (const subItem of menu.children) {
      if (subItem.url === path) {
        return subItem
      }
    }
  }
}
