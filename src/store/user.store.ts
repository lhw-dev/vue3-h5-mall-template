import { defineStore } from 'pinia'

interface UserState {
  token: string
  isLogin: Boolean
  userInfo: {
    id?: number
    nickname?: string
    phone?: String
    avatar?: string
  }
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    token: '',
    isLogin: false,
    userInfo: {},
  }),
  actions: {
    setToken(token: string) {
      this.token = token
      this.isLogin = !!token
    },

    setUserInfo(info: Partial<UserState['userInfo']>) {
      this.userInfo = { ...this.userInfo, ...info }
    },
    logoutAction() {
      this.token = ''
      this.isLogin = false
      this.userInfo = {}
    },
  },
  persist: true, // 开启持久化存储token和用户信息
})
