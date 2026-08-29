<template>
  <div class="goods-page">
    <!-- 轮播图 -->
    <van-swipe class="goods-swipe" :autoplay="3000" indicator-color="#ee0a24">
      <van-swipe-item v-for="(img, idx) in goodsDetail?.gallery" :key="idx">
        <img :src="img" class="swipe-img" />
      </van-swipe-item>
      <van-swipe-item v-if="!goodsDetail?.gallery?.length">
        <img :src="goodsDetail?.cover" class="swipe-img" />
      </van-swipe-item>
    </van-swipe>

    <!-- 价格信息 -->
    <div class="goods-info">
      <PriceTag
        :price="goodsDetail?.price || 0"
        :market-price="goodsDetail?.marketPrice"
        size="large"
        show-market-price
      />
      <h1 class="goods-name">{{ goodsDetail?.name }}</h1>
      <p class="goods-desc">{{ goodsDetail?.detailDesc }}</p>
    </div>

    <!-- 规格选择 -->
    <van-cell title="选择规格" is-link :value="selectedSkuText" @click="showSku = true" />

    <!-- SKU选择弹窗 -->
    <SkuSelect
      v-model:show="showSku"
      :sku-list="goodsDetail?.skuList || []"
      :cover="goodsDetail?.cover || ''"
      confirm-text="加入购物车"
      @confirm="onSkuConfirm"
    />

    <!-- 商品详情（模拟） -->
    <div class="detail-block">
      <div class="block-title">商品详情</div>
      <div class="detail-content">{{ goodsDetail?.detailDesc }}</div>
    </div>

    <!-- 底部操作栏 -->
    <van-action-bar>
      <van-action-bar-icon icon="chat-o" text="客服" />
      <van-action-bar-icon
        icon="cart-o"
        text="购物车"
        :badge="cartStore.totalCount || ''"
        @click="$router.push('/cart')"
      />
      <van-action-bar-button type="warning" text="加入购物车" @click="showSku = true" />
      <van-action-bar-button
        type="danger"
        text="立即购买"
        @click="$router.push({ path: '/order/list', query: { status: 'pending' } })"
      />
    </van-action-bar>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getGoodsDetailApi } from '@/api/goods'
import type { GoodsDetailType, SkuItem } from '@/types/goods'
import { useCartStore } from '@/store/cart.store'
import PriceTag from '@/components/business/PriceTag.vue'
import SkuSelect from '@/components/business/SkuSelect.vue'

const route = useRoute()
const cartStore = useCartStore()

const goodsDetail = ref<GoodsDetailType>()
const showSku = ref(false)

const selectedSkuText = computed(() => '请选择规格')

const onSkuConfirm = (sku: SkuItem, quantity: number) => {
  cartStore.addItem({
    goodsId: goodsDetail.value!.id,
    skuId: sku.id,
    name: goodsDetail.value!.name,
    cover: goodsDetail.value!.cover,
    specs: sku.specs,
    price: sku.price,
    stock: sku.stock,
    quantity,
  })
}

onMounted(async () => {
  const id = Number(route.params.id)
  const res = await getGoodsDetailApi(id)
  goodsDetail.value = res.data
})
</script>

<style lang="scss" scoped>
.goods-page {
  padding-bottom: 50px;
  background: #f7f8fa;
  min-height: 100vh;
}

.goods-swipe {
  height: 375px;
  .swipe-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.goods-info {
  background: #fff;
  padding: 12px 16px;
  .goods-name {
    font-size: 16px;
    font-weight: bold;
    color: #333;
    margin: 8px 0 4px;
    line-height: 1.4;
  }
  .goods-desc {
    font-size: 13px;
    color: #999;
  }
}

.detail-block {
  margin-top: 10px;
  background: #fff;
  padding: 16px;
  .block-title {
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 12px;
  }
  .detail-content {
    font-size: 13px;
    color: #666;
    line-height: 1.6;
  }
}

:deep(.van-action-bar) {
  z-index: 2;
}
</style>
