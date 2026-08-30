<template>
  <div class="cart-page">
    <van-nav-bar title="购物车" fixed placeholder left-arrow @click-left="$router.back()" />

    <div v-if="cartStore.items.length" class="cart-list">
      <van-swipe-cell v-for="item in cartStore.items" :key="item.skuId">
        <div class="cart-item">
          <van-checkbox v-model="item.selected" />
          <img :src="item.cover" class="item-img" @click="$router.push(`/goods/${item.goodsId}`)" />
          <div class="item-info">
            <div class="name">{{ item.name }}</div>
            <div class="specs">{{ item.specs.join('，') }}</div>
            <div class="price-row">
              <PriceTag :price="item.price" size="small" />
              <van-stepper
                v-model="item.quantity"
                :min="1"
                :max="item.stock"
                @change="(v: number) => cartStore.updateQuantity(item.skuId, v)"
              />
            </div>
          </div>
        </div>
        <template #right>
          <van-button
            square
            text="删除"
            type="danger"
            class="delete-btn"
            @click="cartStore.removeItem(item.skuId)"
          />
        </template>
      </van-swipe-cell>
    </div>

    <van-empty v-else description="购物车是空的" />

    <!-- 底部结算栏 -->
    <van-submit-bar
      v-if="cartStore.items.length"
      :price="cartStore.selectedTotalPrice * 100"
      button-text="结算"
      @submit="onSubmit"
    >
      <van-checkbox :model-value="cartStore.isAllSelected" @click="cartStore.toggleSelectAll()"
        >全选</van-checkbox
      >
    </van-submit-bar>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '@/store/cart.store'
import PriceTag from '@/components/business/PriceTag.vue'
import { useRouter } from 'vue-router'

const cartStore = useCartStore()
const router = useRouter()

const onSubmit = () => {
  if (!cartStore.selectedCount) {
    showToast('请选择商品')
    return
  }
  router.push('/order/confirm')
}
</script>

<style lang="scss" scoped>
.cart-page {
  min-height: 100vh;
  padding-bottom: 100px;
}

.cart-item {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  background: var(--color-block-background);

  .item-img {
    width: 80px;
    height: 80px;
    border-radius: 6px;
    object-fit: cover;
    margin: 0 10px;
  }

  .item-info {
    flex: 1;
    .name {
      font-size: 14px;
      color: #333;
      line-height: 1.3;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .specs {
      font-size: 12px;
      color: #999;
      margin-top: 4px;
    }
    .price-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 8px;
    }
  }
}

.delete-btn {
  height: 100%;
}
</style>
