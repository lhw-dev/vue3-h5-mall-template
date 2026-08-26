/** @type {import('tailwindcss').Config} */
export default {
  // 扫描哪些文件里使用tailwind类名
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
  // 移动端优先，推荐开启
  corePlugins: {
    preflight: true,
  },
};
