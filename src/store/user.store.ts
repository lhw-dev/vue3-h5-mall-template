import { defineStore } from "pinia";

interface UserState {
  token: string;
  isLogin: false;
  userInfo: {
    id?: number;
    nickname?: string;
    avatar?: string;
  };
}

export const useUserStore = defineStore("user", {
  state: (): UserState => ({
    token: "",
    userInfo: {},
    isLogin: false,
  }),
  actions: {
    setToken(token: string) {
      this.token = token;
    },
    setUserInfo(info: Partial<UserState["userInfo"]>) {
      this.userInfo = { ...this.userInfo, ...info };
    },
    logoutAction() {
      this.token = "";
      this.userInfo = {};
    },
  },
  persist: true, // 开启持久化存储token和用户信息
});
