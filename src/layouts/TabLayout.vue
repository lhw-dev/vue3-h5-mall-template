<template>
  <div class="min-h-[100vh] flex flex-col">
    <main class="flex-1 overflow-auto pb-[50px] bg-[#f7f8fa]">
      <router-view />
    </main>
    <!-- vant底部tabbar -->
    <van-tabbar v-model="activeTab" route>
      <van-tabbar-item to="/" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/category" icon="apps-o">分类</van-tabbar-item>
      <van-tabbar-item to="/cart" icon="shopping-cart-o"
        >购物车</van-tabbar-item
      >
      <van-tabbar-item to="/user" icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script setup lang="ts">
const activeTab = ref(0);
</script>
