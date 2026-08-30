<template>
  <div class="settings-page">
    <van-nav-bar
      :title="$t('setting.title')"
      fixed
      placeholder
      left-arrow
      @click-left="$router.back()"
    />
    <van-cell-group inset class="!mt-5">
      <van-cell center :title="$t('setting.language')">
        <template #right-icon>
          <van-radio-group v-model="currentLang" @change="handleChangeLang">
            <van-radio name="zh-CN">中文</van-radio>
            <van-radio name="en-US">English</van-radio>
          </van-radio-group>
        </template>
      </van-cell>
      <van-cell center :title="$t('setting.darkMode')">
        <template #right-icon>
          <van-switch v-model="localDark" @change="handleToggleDark" />
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store/app.store'
import { useDark } from '@/composables/useDark'
const appStore = useAppStore()
const { isDark, toggle } = useDark()

const currentLang = ref(appStore.locale)

const localDark = ref(isDark.value)

watch(isDark, val => {
  localDark.value = val
})

function handleChangeLang(val: 'zh-CN' | 'en-US') {
  appStore.setLocale(val)
}

function handleToggleDark() {
  toggle()
}
</script>

<style lang="scss" scoped>
.settings-page {
  height: calc(100vh - 50px);
}
</style>
