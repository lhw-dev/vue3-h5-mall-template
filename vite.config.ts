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
    // @ts-expect-error
    // upstream vite-plugin-vue-layouts type bug https://github.com/johncampionjr/vite-plugin-vue-layouts/issues/165
    // vue‑tsc命令行校验正常，仅VSCode project‑reference编辑器TS识别异常
    Layouts({
      layoutsDirs: 'src/layouts',
      defaultLayout: 'TabLayout',
    }),
    // API自动导入，不需要手动 import ref/computed等
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        'pinia',
        '@vueuse/core',
        {
          'vue-i18n': ['useI18n'],
        },
      ],
      resolvers: [VantResolver()],
      dts: 'src/auto-imports.d.ts',
      vueTemplate: true,
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
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    // 打包优化
    minify: 'esbuild',
    // 拆分大模块，分包输出
    rollupOptions: {
      output: {
        // 分包策略：第三方库单独拆包
        manualChunks: {
          vueVendor: ['vue', 'vue-router', 'pinia'],
          vant: ['vant'],
          i18n: ['vue-i18n'],
        },
        // 静态资源文件名格式化
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      },
    },
    // 大于4kb资源转为base64，小图片内联，减少http请求
    assetsInlineLimit: 4096,
  },
  // 服务配置
  server: {
    host: '0.0.0.0',
    port: 9527,
  },
})
