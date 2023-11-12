import { permissions } from '@/directives/permission/permissions'
import type { App } from 'vue'

const registerDirective = (app: App<Element>) => {
  app.directive('permissions', permissions)
}

export default registerDirective
