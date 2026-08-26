<template>
  <div class="home-page">
    <!-- 顶部搜索栏 -->
    <div class="home-search-wrap">
      <van-search
        readonly
        placeholder="搜索商品"
        @click="$router.push('/search')"
      />
    </div>

    <!-- 轮播图 -->
    <van-swipe
      class="home-swipe"
      :autoplay="3500"
      :duration="500"
      indicator-color="#ffffff"
      indicator-size="10px"
      lazy-render
      loop
    >
      <van-swipe-item>
        <div class="banner-item banner-1">
          <div class="banner-text">春季大促活动</div>
        </div>
      </van-swipe-item>
      <van-swipe-item>
        <div class="banner-item banner-2">
          <div class="banner-text">限时秒杀专区</div>
        </div>
      </van-swipe-item>
      <van-swipe-item>
        <div class="banner-item banner-3">
          <div class="banner-text">新品上市</div>
        </div>
      </van-swipe-item>
    </van-swipe>

    <!-- 功能入口图标区 -->
    <div class="home-grid">
      <van-grid :column-num="4" :border="false">
        <van-grid-item icon="coupon-o" text="优惠券" to="/coupon" />
        <van-grid-item icon="clock-o" text="秒杀" />
        <van-grid-item icon="search" text="搜索" to="/search" />
        <van-grid-item icon="balance-list-o" text="订单" to="/order/list" />
      </van-grid>
    </div>

    <!-- 秒杀标题 -->
    <div class="home-title">
      <span class="title-text">限时秒杀</span>
      <span class="more-text">更多 ></span>
    </div>

    <!-- 商品列表 -->
    <div class="goods-list">
      <van-card
        v-for="item in goodsList"
        :key="item.id"
        :title="item.name"
        :desc="`¥${item.price}`"
        :thumb="item.cover"
        class="goods-card"
        @click="goDetail(item.id)"
      >
        <template #tags>
          <van-tag plain type="danger">热卖</van-tag>
        </template>
      </van-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useHttp } from "@/api/request";
import type { GoodsItem } from "@/api/goods";
import { useRouter } from "vue-router";
const router = useRouter();
const { get } = useHttp();
const goodsList = ref<GoodsItem[]>([]);

interface GoodsListResp {
  code: number;
  msg: string;
  data: {
    list: GoodsItem[];
    total: number;
  };
}

// 跳商品详情
const goDetail = (id: number) => {
  router.push(`/goods/${id}`);
};

onMounted(async () => {
  try {
    // 泛型传完整响应类型 GoodsListResp
    const res = await get<GoodsListResp>("/api/goods/list", {
      page: 1,
      pageSize: 10,
    });
    goodsList.value = res.data.list;
    console.log("首页商品数据", res);
  } catch (err) {
    console.error("首页商品加载失败", err);
  }
});
</script>

<style scoped>
.home-page {
  background-color: #f7f8fa;
  min-height: 100%;
  padding-bottom: 10px;
}

/* 搜索栏 */
.home-search-wrap {
  background: linear-gradient(135deg, #ff5050, #ff7849);
  padding: 10px 14px 14px;
}

/* 轮播图 */
.home-swipe {
  height: 180px;
}
.banner-item {
  width: 100%;
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 20px;
  font-weight: 600;
}
.banner-1 {
  background: linear-gradient(120deg, #ff7a7a, #ff4444);
}
.banner-2 {
  background: linear-gradient(120deg, #ffb354, #ff8800);
}
.banner-3 {
  background: linear-gradient(120deg, #54a8ff, #247bff);
}

.home-grid {
  background: #ffffff;
  margin: 10px 12px;
  border-radius: 10px;
  padding: 8px 0;
}

.home-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
}
.title-text {
  font-size: 17px;
  font-weight: bold;
  color: #222;
}
.more-text {
  font-size: 13px;
  color: #999;
}

.goods-list {
  padding: 4px 12px 20px;
}
.goods-card {
  border-radius: 10px;
  margin-bottom: 10px;
  background-color: #fff;
}
:deep(.van-card__thumb) {
  border-radius: 8px;
}
</style>
