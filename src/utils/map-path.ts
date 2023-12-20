export function mapPathToMenu(path: string, routeMetas: any[]) {
  for (const route of routeMetas) {
    if (route.url === path) {
      return route
    }
  }
}
