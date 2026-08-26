/// <reference types="vite/client" />
/// <reference types="vite-plugin-pages/client" />
/// <reference types="vite-plugin-vue-layouts/client" />
/// <reference types="vite-plugin-svg-icons/client" />

// 兜底，插件类型失效的时候也不会报红
declare module "virtual:svg-icons-register";
declare module "virtual:generated-pages";
declare module "virtual:generated-layouts";
