<template>
  <div class="min-h-[100vh] flex flex-col">
    <main class="flex-1 overflow-auto pb-[50px] bg-[#f7f8fa]">
      <router-view />
    </main>
    <!-- vant底部tabbar -->
    <van-tabbar v-model="activeTab" route>
      <van-tabbar-item to="/" icon="home-o">{{ $t('tabbar.home') }}</van-tabbar-item>
      <van-tabbar-item to="/category" icon="apps-o">{{ $t('tabbar.category') }}</van-tabbar-item>
      <van-tabbar-item to="/cart" icon="shopping-cart-o">{{ $t('tabbar.cart') }}</van-tabbar-item>
      <van-tabbar-item to="/user" icon="user-o">{{ $t('tabbar.user') }}</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script setup lang="ts">
const activeTab = ref(0)
</script>
