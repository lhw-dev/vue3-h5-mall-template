# 🛒 Vue3 H5 Mall Template

> 🔥 **Vue3 + Vite6 + TS + Vant4 + Pinia + ofetch 开箱即用 H5 商城模板**
>
> 不同于通用空模板，**内置完整商城业务 + 顶级工程化规范**，可直接用于商业二次开发 / 毕业设计 / 简历项目展示

[![Vue3](https://img.shields.io/badge/Vue-3.5-green.svg)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF.svg)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg)](https://www.typescriptlang.org/)
[![Vant](https://img.shields.io/badge/Vant-4.9-07c160.svg)](https://vant-ui.github.io/)
[![Pinia](https://img.shields.io/badge/Pinia-2.3-yellow.svg)](https://pinia.vuejs.org/)
[![ofetch](https://img.shields.io/badge/ofetch-1.4-000000.svg)](https://github.com/unjs/ofetch)
[![License](https://img.shields.io/badge/License-MIT-orange.svg)](LICENSE)

## 在线预览

📱 **扫码体验** 或点击 [在线预览](https://vue3-h5-mall-template.pages.dev/)

![QR Code](https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://vue3-h5-mall-template.pages.dev/)

## 项目特性

### 技术栈升级

| 技术        | 版本   | 说明                           |
| ----------- | ------ | ------------------------------ |
| Vue         | 3.5.13 | 组合式 API，性能优化           |
| Vite        | 6.0    | 极速构建，比 Vite5 更快        |
| TypeScript  | 5.9    | 严格类型检查                   |
| Vant        | 4.9    | 有赞官方移动端组件库           |
| Pinia       | 2.3    | 状态管理 + 持久化              |
| ofetch      | 1.4    | 现代 HTTP 请求库（替代 Axios） |
| Tailwindcss | 3.4    | 原子化 CSS                     |
| MSW         | 2.7    | Mock Service Worker 模拟数据   |

### 工程化特性

- ⚡ **Vite6** 极速冷启动 + HMR
- 🗂️ **文件自动路由** (`vite-plugin-pages`)，扫描目录 `src/views`，新建页面自动注册路由
- 🔌 **组件自动导入** (`unplugin-vue-components`)，无需手动 import Vant 组件
- 📝 **API 自动导入** (`unplugin-auto-import`)，直接使用 `ref`, `computed`, `useRoute` 等
- 🧩 Layout布局系统：`TabLayout`（带底部TabBar） / `BlankLayout`空白布局
- 📦 ofetch完整封装：请求拦截、token携带、重复请求取消、业务/网络错误统一toast提示
- 🎨 **SVG 图标自动注册**，直接 `<svg-icon name="cart" />`
- 🌓 **深色模式** 一键切换，CSS 变量驱动
- 🌍 **i18n 国际化** ，内置中文/英文双语切换
- 📱 **vw移动端适配**，基于`postcss‑px‑to‑viewport‑8‑plugin`，设计稿375px
- 🧪 **MSW Mock 数据** 开发环境零后端依赖
- 🛡️ **ESLint + Prettier** 代码规范

### 商城业务特性

| 功能                  | 说明                               |
| --------------------- | ---------------------------------- |
| 🛒 **完整购物车逻辑** | 增删改、全选、价格计算、持久化     |
| 🎨 **SKU 选择器**     | 多规格联动、库存判断、价格实时计算 |
| 💰 **价格组件**       | 统一价格显示、划线价、大小规格     |
| ⏰ **倒计时组件**     | 秒杀活动倒计时                     |
| 🏷️ **优惠券系统**     | 满减/折扣、使用条件、状态管理      |
| 📦 **订单流程**       | 待付款/待发货/待收货/已完成        |
| 📍 **地址管理**       | 默认地址、选择地址                 |
| 🔍 **搜索功能**       | 历史记录、热门搜索、结果列表       |

## 页面清单

| 页面     | 路径             | 说明                             |
| -------- | ---------------- | -------------------------------- |
| 首页     | `/`              | 轮播、分类、秒杀、推荐商品       |
| 分类     | `/category`      | 左侧分类树 + 右侧商品            |
| 搜索     | `/search`        | 历史记录、热门搜索、结果列表     |
| 商品详情 | `/goods/:id`     | 轮播、SKU 选择、加入购物车       |
| 购物车   | `/cart`          | 商品列表、编辑、结算             |
| 订单确认 | `/order/confirm` | 地址、商品、优惠券、金额计算     |
| 订单列表 | `/order/list`    | 全部/待付款/待发货/待收货/已完成 |
| 个人中心 | `/user`          | 用户信息、订单入口、菜单         |
| 优惠券   | `/coupon`        | 未使用/已使用/已过期             |
| 收货地址 | `/address`       | 地址列表、选择、编辑             |
| 登录     | `/login`         | 表单验证、登录拦截跳转           |

## 快速开始

### 环境要求

- Node.js >= 22
- pnpm >= 10（推荐）

### 安装

```bash
# 克隆项目
git clone https://github.com/lhw-dev/vue3-h5-mall-template.git
cd vue3-h5-mall-template

# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 浏览器访问 http://localhost:9527
```

### 构建

```bash
# 生产构建
pnpm build

# 测试环境构建
pnpm build:test

# 预览生产构建
pnpm preview
```

### 其他命令

```bash
pnpm lint          # ESLint 代码检查
pnpm lint:fix      # ESLint 自动修复
pnpm format        # Prettier 格式化
pnpm typecheck     # TypeScript 类型检查
```

## 项目结构

```
├── public/                    # 静态资源
├── src/
│   ├── api/                   # 接口模块
│   │   ├── modules/           # 各业务api：goods / cart / user
│   ├── assets/               # 图片、字体、SVG 图标
│   │   └── icons/           # SVG 图标目录
│   ├── components/           # 组件
│   │   ├── business/        # 业务组件
│   │   │   ├── CartBar/    # 底部购物车栏
│   │   │   ├── GoodsCard/  # 商品卡片
│   │   │   ├── SearchBar/  # 搜索栏
│   │   │   └── SkuSelector/# SKU 选择器（核心）
│   │   └── common/          # 通用组件
│   │       ├── CountDown/  # 倒计时
│   │       ├── Price/      # 价格显示
│   │       └── Skeleton/   # 骨架屏
│   ├── composables/         # 组合式函数
│   │   ├── useNetwork.ts   # 网络状态监听
│   │   └── useScroll.ts    # 滚动监听
│   ├── layouts/             # 布局
│   │   ├── TabLayout.vue      # 默认布局，带底部TabBar
│   │   └── BlankLayout.vue    # 空白布局（登录页使用）
│   ├── mock/               # Mock 数据
│   │   ├── browser.ts      # MSW 浏览器端启动
│   │   └── handlers/       # Mock 请求处理器
│   ├── views/               # 页面（文件路由自动生成）
│   │   ├── index.vue       # 首页
│   │   ├── category.vue    # 分类
│   │   ├── search.vue      # 搜索
│   │   ├── cart.vue        # 购物车
│   │   ├── user.vue        # 个人中心
│   │   ├── login.vue       # 登录
│   │   ├── coupon.vue      # 优惠券
│   │   ├── address.vue     # 收货地址
│   │   ├── goods/
│   │   │   └── [id].vue   # 商品详情（动态路由）
│   │   └── order/
│   │       ├── confirm.vue # 订单确认
│   │       └── list.vue    # 订单列表
│   ├── router/              # 路由配置
│   │   └── index.ts        # 路由守卫 + 自动路由
│   ├── stores/              # Pinia 状态管理
│   │   └── modules/
│   │       ├── cart.ts     # 购物车状态（含计算属性）
│   │       ├── global.ts   # 全局状态（主题、加载）
│   │       └── user.ts     # 用户状态（持久化）
│   ├── styles/              # 全局样式
│   │   ├── index.scss      # 入口样式
│   │   └── variables.scss  # SCSS 变量 + CSS 变量
│   ├── types/               # TypeScript 类型
│   │   └── index.ts        # 商品/购物车/订单/优惠券/地址类型
│   ├── utils/               # 工具函数
│   │   ├── index.ts        # 通用工具
│   │   └── request.ts      # ofetch 封装
│   ├── App.vue              # 根组件
│   ├── auto-imports.d.ts   # 自动导入类型声明（自动生成）
│   ├── components.d.ts     # 组件自动导入声明（自动生成）
│   ├── main.ts              # 入口文件
│   └── vite-env.d.ts       # Vite 类型声明
├── .env.development         # 开发环境变量
├── .env.production          # 生产环境变量
├── .env.test                # 测试环境变量
├── .eslintrc.cjs           # ESLint 配置
├── .prettierrc             # Prettier 配置
├── index.html              # HTML 入口
├── LICENSE                 # MIT 协议
├── package.json            # 依赖
├── postcss.config.js       # PostCSS 配置
├── README.md               # 本文件
├── tailwind.config.js      # Tailwind 配置
├── tsconfig.json           # TypeScript 配置
└── vite.config.ts          # Vite 配置
```

## 核心模块说明

### 1. 文件自动路由

无需手动配置路由，在 `src/views/` 下新建 `.vue` 文件即可自动生成路由：

```
src/views/index.vue        -> 路由: /
src/views/goods/[id].vue   -> 路由: /goods/:id
src/views/order/list.vue   -> 路由: /order/list
```

页面内通过`definePageMeta`指定布局：

```vue
<script setup lang="ts">
// 登录页面使用空白布局，不渲染底部TabBar
definePageMeta({
  layout: 'BlankLayout',
})
</script>
```

### 2. Pinia 状态 + 持久化

```typescript
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()
// persist:true开启持久化存储到localStorage
```

### 3. ofetch 请求封装

```vue
- 统一拦截请求，自动注入 token - 相同请求 key 做 AbortController 取消重复请求 - 业务 code 非 200
统一 toast 提示；401 登录过期自动跳转登录，携带 redirect 回跳地址 -
区分业务错误、网络错误、手动取消请求三种 error type
```

### 4. Mock 数据（MSW）

开发环境自动拦截请求，无需后端即可开发：

```typescript
// src/mocks/handlers/index.ts
http.get('/api/goods/list', () => {
  return HttpResponse.json({
    code: 200,
    data: { list: [...], total: 20 }
  })
})
```

### 5. 深色模式

```typescript
import { useGlobalStore } from '@/stores'

const globalStore = useGlobalStore()
globalStore.toggleTheme() // 切换 light/dark
```

通过 CSS 变量实现，所有颜色使用 `var(--color-*)`：

```scss
body {
  color: var(--color-text);
  background: var(--color-bg);
}
```

## 浏览器兼容

- iOS Safari >= 12
- Chrome >= 80
- 微信内置浏览器
- 企业微信内置浏览器

## 开源协议

[MIT](LICENSE) License

## 贡献指南

欢迎提交 Issue 和 PR！

1. Fork 本仓库
2. 创建你的分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 致谢

本项目基于以下开源项目构建，感谢它们的优秀工作：

- [Vue](https://vuejs.org/)
- [Vite](https://vitejs.dev/)
- [Vant](https://vant-ui.github.io/)
- [Pinia](https://pinia.vuejs.org/)
- [Tailwindcss](https://tailwindcss.com/)
- [MSW](https://mswjs.io/)

---

> 如果这个项目对你有帮助，请给个 ⭐️ Star 支持一下！
