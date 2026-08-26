export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    "postcss-px-to-viewport-8-plugin": {
      viewportWidth: 375, // 设计稿宽度
      unitToConvert: "px",
      viewportUnit: "vw",
      fontViewportUnit: "vw",
      selectorBlackList: [".ignore-vw"], // 写这个class的元素不做vw转换
      minPixelValue: 1,
      mediaQuery: false, // 媒体查询内部px不转换
      replace: true,
      exclude: [], // 排除某些目录
    },
  },
};
