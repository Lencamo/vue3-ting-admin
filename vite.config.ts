import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// 自动导入API
import AutoImport from 'unplugin-auto-import/vite'

// 自动导入样式
import { createStyleImportPlugin, ElementPlusResolve } from 'vite-plugin-style-import'

// 自动导入组件
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// iconify 组件
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'

// ================

import { readPackageJSON } from 'pkg-types'
import dayjs from 'dayjs'

// 定义一些共享数据
async function createDefineData() {
  try {
    const pkgJson = await readPackageJSON(process.cwd())
    const { dependencies, devDependencies, name, version } = pkgJson

    const __APP_INFO__ = {
      pkg: { dependencies, devDependencies, name, version },
      lastBuildTime: dayjs().format('YYYY-MM-DD HH:mm:ss')
    }
    return {
      __APP_INFO__: JSON.stringify(__APP_INFO__)
    }
  } catch (error) {
    return {}
  }
}

// ================

// https://vitejs.dev/config/
export default defineConfig(async () => {
  const defineData = await createDefineData()

  return {
    // 使用共享选项
    define: defineData,
    plugins: [
      vue(),
      AutoImport({
        // Vue 相关函数，如：ref, computed
        imports: ['vue'],

        resolvers: [
          // Element Plus 相关函数，如：ElMessage, ElMessageBox
          ElementPlusResolver()
        ]
      }),
      Components({
        resolvers: [
          // 1、element-plus组件
          ElementPlusResolver(),

          // 2、iconify图标组件
          IconsResolver({
            prefix: false, // 不要默认的前缀

            // 本地图标集
            customCollections: ['ting'],
            // 在线图标集
            enabledCollections: ['ep']
          })
        ]
      }),
      createStyleImportPlugin({
        resolves: [ElementPlusResolve()],
        libs: [
          {
            libraryName: 'element-plus',
            esModule: true,
            resolveStyle: (name) => {
              return `element-plus/theme-chalk/${name}.css`
            }
          }
        ]
      }),
      Icons({
        autoInstall: true,

        // 定义本地图标集
        customCollections: {
          ting: FileSystemIconLoader('src/assets/svg/icon', (svg) =>
            svg.replace(/^<svg /, '<svg fill="currentColor" ')
          )
        }
      })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  }
})
