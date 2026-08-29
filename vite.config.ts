import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from '@vant/auto-import-resolver'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'node:path'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [
    vue(),
    // 文件自动路由，src/views下面新建页面自动生成路由
    Pages({
      dirs: 'src/views',
      importMode: 'async',
    }),
    (Layouts as any)({
      layoutsDirs: 'src/layouts',
      defaultLayout: 'TabLayout',
    }),
    // API自动导入，不需要手动 import ref/computed等
    AutoImport({
      imports: ['vue', 'vue-router', 'pinia', '@vueuse/core'],
      resolvers: [VantResolver()],
      dts: 'src/auto-imports.d.ts',
      eslintrc: {
        enabled: true,
      },
    }),
    // 组件自动导入：Vant组件 + src/components全局组件
    Components({
      resolvers: [VantResolver()],
      dirs: ['src/components'],
      dts: 'src/components.d.ts',
    }),
    // SVG图标自动注册，图标放在 src/assets/icons
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      symbolId: 'icon-[dir]-[name]',
    }),
  ],
  // 移动端开发服务配置
  server: {
    host: '0.0.0.0',
    port: 9527,
  },
})
