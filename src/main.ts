import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { createRouter, createWebHistory } from 'vue-router'
// vite-plugin-pages自动生成的路由
import generatedRoutes from 'virtual:generated-pages'
import { setupLayouts } from 'virtual:generated-layouts'
import { setupRouterGuard } from '@/router'

import 'virtual:svg-icons-register'
import '@/assets/styles/index.scss'
// Vant4 函数式API样式兜底导入
import 'vant/es/toast/style'
import 'vant/es/dialog/style'
import 'vant/es/notify/style'
import 'vant/es/image-preview/style'
import 'vant/es/action-sheet/style'
import 'vant/es/picker/style'
import 'vant/es/date-picker/style'

import i18n from '@/i18n'
import App from './App.vue'

// MSW Mock仅开发环境启用
if (import.meta.env.DEV) {
  const { worker } = await import('@/mock/browser')
  await worker.start({
    onUnhandledRequest: 'bypass',
  })
}

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

// 把自动生成的routes加上layout布局
const routes = setupLayouts(generatedRoutes)

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// 注册路由守卫
setupRouterGuard(router)

app.use(pinia)
app.use(router)
app.use(i18n)

app.mount('#app')
