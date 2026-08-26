import type { Router } from "vue-router";
import { useUserStore } from "@/store/user.store";

export function setupRouterGuard(router: Router) {
  router.beforeEach((to, _from, next) => {
    const userStore = useUserStore();
    // 需要登录的页面
    const needLoginPages = [
      "/order/confirm",
      "/order/list",
      "/user",
      "/coupon",
      "/address",
    ];
    if (needLoginPages.some((path) => to.path.startsWith(path))) {
      if (!userStore.isLogin) {
        // 记录跳转来源，登录成功回跳
        next({ path: "/login", query: { redirect: to.fullPath } });
        return;
      }
    }
    next();
  });
}
