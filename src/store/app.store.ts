import { defineStore } from 'pinia'
import i18n from '@/i18n/index'
type Theme = 'light' | 'dark'
type Locale = 'zh-CN' | 'en-US'

export const useAppStore = defineStore('app', {
  state: () => ({
    theme: (localStorage.getItem('theme') as Theme) || 'light',
    locale: (localStorage.getItem('locale') as Locale) || 'zh-CN',
    loading: false,
    searchHistory: [] as string[],
  }),
  getters: { isDark: state => state.theme === 'dark' },
  actions: {
    /** 切换主题 */
    toggleTheme() {
      this.theme = this.theme === 'light' ? 'dark' : 'light'
      this.setTheme(this.theme)
    },

    /** 设置主题 */
    setTheme(theme: Theme) {
      this.theme = theme
      document.documentElement.classList.toggle('dark', this.isDark)
    },

    /** 设置语言 */
    setLocale(lang: 'zh-CN' | 'en-US') {
      this.locale = lang
      i18n.global.locale.value = lang
      localStorage.setItem('locale', lang)
    },

    /** 设置加载状态 */
    setLoading(loading: boolean) {
      this.loading = loading
    },

    /** 添加搜索历史 */
    addSearchHistory(keyword: string) {
      if (!keyword.trim()) return
      const idx = this.searchHistory.indexOf(keyword)
      if (idx > -1) {
        this.searchHistory.splice(idx, 1)
      }
      this.searchHistory.unshift(keyword)
      if (this.searchHistory.length > 10) {
        this.searchHistory.pop()
      }
    },

    /** 清空搜索历史 */
    clearSearchHistory() {
      this.searchHistory = []
    },

    /** 删除单条搜索历史 */
    removeSearchHistory(keyword: string) {
      const idx = this.searchHistory.indexOf(keyword)
      if (idx > -1) {
        this.searchHistory.splice(idx, 1)
      }
    },
  },
  persist: true,
})
