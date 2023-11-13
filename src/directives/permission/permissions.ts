import useloginStore from '@/stores/login/login'
// import { useRouter } from 'vue-router'

type actionType = 'create' | 'delete' | 'update' | 'query'
type effectType = 'disabled'

function haspermissionHandle(route, action) {
  // 用户操作权限 数组
  const loginStore = useloginStore()
  const { userRolePermission } = loginStore

  // 当前路由path
  // const router = useRouter()
  // const [, ,parentName, currentName] = router.currentRoute.value.path.split('/')
  const [, , parentName, currentName] = route.path.split('/')

  return !!userRolePermission.find((item) =>
    item.includes(`${parentName}:${currentName}:${action}`)
  )
}

export function permissions(el, binding) {
  const route = binding.value.route
  const action: actionType = binding.value.action
  const effect: effectType = binding.value.effect

  const hasPermission = haspermissionHandle(route, action)

  // element元素操作

  if (!hasPermission) {
    if (effect === 'disabled') {
      // v-permissions="{ route, action: 'delete', effect: 'disabled' }"

      el.disabled = true // 禁用
      el.classList.add('is-disabled') // 追加element-plus样式
    } else {
      // v-permissions="{ route, action: 'create' }"

      el.parentNode && el.parentNode.removeChild(el) // 删除
    }
  }
}
