/// <reference types="vite/client" />

declare module '*.mjs'

// vite 共享选项
declare const __APP_INFO__: {
  pkg: {
    name: string
    version: string
    dependencies: Recordable<string>
    devDependencies: Recordable<string>
  }
  lastBuildTime: string
}
