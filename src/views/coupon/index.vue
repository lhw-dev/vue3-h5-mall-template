<template>
  <div class="coupon-page">
    <van-nav-bar title="我的优惠券" fixed placeholder left-arrow @click-left="$router.back()" />

    <van-tabs v-model:active="activeTab" sticky offset-top="46">
      <van-tab title="未使用">
        <div class="coupon-list">
          <CouponCard
            v-for="item in couponStore.unusedCoupons"
            :key="item.id"
            :coupon="item"
            show-action
            @action="onUseCoupon"
          />
          <van-empty v-if="!couponStore.unusedCoupons.length" description="暂无可用优惠券" />
        </div>
      </van-tab>
      <van-tab title="已使用">
        <div class="coupon-list">
          <CouponCard v-for="item in couponStore.usedCoupons" :key="item.id" :coupon="item" />
          <van-empty v-if="!couponStore.usedCoupons.length" description="暂无已使用优惠券" />
        </div>
      </van-tab>
      <van-tab title="已过期">
        <div class="coupon-list">
          <CouponCard v-for="item in couponStore.expiredCoupons" :key="item.id" :coupon="item" />
          <van-empty v-if="!couponStore.expiredCoupons.length" description="暂无过期优惠券" />
        </div>
      </van-tab>
    </van-tabs>

    <!-- 领券中心入口 -->
    <div class="receive-entry" @click="showReceive = true">
      <van-button block type="danger" round>去领券中心</van-button>
    </div>

    <!-- 领券弹窗 -->
    <van-popup v-model:show="showReceive" position="bottom" round :style="{ height: '70%' }">
      <div class="receive-popup">
        <div class="popup-title">领券中心</div>
        <CouponCard
          v-for="item in availableList"
          :key="item.id"
          :coupon="item"
          show-action
          @action="onReceive"
        />
      </div>
    </van-popup>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useCouponStore } from '@/store/coupon.store'
import { getUserCouponApi, getCouponListApi, receiveCouponApi } from '@/api/coupon'
import CouponCard from '@/components/business/CouponCard.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const couponStore = useCouponStore()
const activeTab = ref(0)
const showReceive = ref(false)
const availableList = ref<any[]>([])

const onUseCoupon = () => {
  router.push('/')
}

const onReceive = async (coupon: any) => {
  await receiveCouponApi({ couponId: coupon.id })
  showToast('领取成功')
  const res = await getUserCouponApi()
  couponStore.setUserCoupons([...res.data.unused, ...res.data.used, ...res.data.expired])
}

onMounted(async () => {
  const res = await getUserCouponApi()
  couponStore.setUserCoupons([...res.data.unused, ...res.data.used, ...res.data.expired])
  const listRes = await getCouponListApi()
  availableList.value = listRes.data.list
})
</script>

<style lang="scss" scoped>
.coupon-page {
  min-height: 100vh;
  background: #f7f8fa;
  padding-bottom: 80px;
}

.coupon-list {
  padding: 12px;
}

.receive-entry {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 5px 16px;
  background: var(--color-block-background);
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.04);
  z-index: 2;
}

.receive-popup {
  padding: 16px;
  .popup-title {
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 16px;
  }
}
</style>
