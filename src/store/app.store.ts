import { defineStore } from 'pinia'
type Theme = 'light' | 'dark'
export const useAppStore = defineStore('app', {
  state: () => ({
    theme: 'light' as Theme,
    loading: false,
    tabBarActive: 0,
    searchHistory: [] as string[],
  }),
  getters: { isDark: state => state.theme === 'dark' },
  actions: {
    /** 切换主题 */
    toggleTheme() {
      this.theme = this.theme === 'light' ? 'dark' : 'light'
      document.documentElement.setAttribute('data-theme', this.theme)
    },
    /** 设置主题 */ setTheme(theme: Theme) {
      this.theme = theme
      document.documentElement.setAttribute('data-theme', theme)
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
    /** 清空搜索历史 */ clearSearchHistory() {
      this.searchHistory = []
    },
    /** 删除单条搜索历史 */ removeSearchHistory(keyword: string) {
      const idx = this.searchHistory.indexOf(keyword)
      if (idx > -1) {
        this.searchHistory.splice(idx, 1)
      }
    },
  },
  persist: true,
})
