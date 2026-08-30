import { useAppStore } from '@/store/app.store'

export function useDark() {
  const appStore = useAppStore()

  const isDark = computed(() => appStore.isDark)

  const toggle = () => appStore.toggleTheme()

  return {
    isDark,
    toggle,
  }
}
