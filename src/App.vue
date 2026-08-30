<template>
  <van-config-provider :theme="appStore.theme">
    <router-view />
  </van-config-provider>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store/app.store'
const appStore = useAppStore()
</script>

<style>
#app {
  width: 100%;
  min-height: 100vh;
}
</style>
