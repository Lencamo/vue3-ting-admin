import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { createStyleImportPlugin, ElementPlusResolve } from 'vite-plugin-style-import'

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
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
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
      })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  }
})
