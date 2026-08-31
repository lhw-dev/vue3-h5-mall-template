<template>
  <div class="order-confirm-page">
    <van-nav-bar title="确认订单" fixed placeholder left-arrow @click-left="$router.back()" />

    <!-- 地址卡片 -->
    <van-cell v-if="selectedAddress" class="address-card" is-link @click="showAddress = true">
      <template #title>
        <div class="addr-name">{{ selectedAddress.name }} {{ selectedAddress.phone }}</div>
        <div class="addr-detail">
          {{ selectedAddress.province }}{{ selectedAddress.city }}{{ selectedAddress.district
          }}{{ selectedAddress.detail }}
        </div>
      </template>
    </van-cell>
    <van-cell v-else title="请选择收货地址" is-link @click="showAddress = true" />

    <!-- 商品列表 -->
    <div class="goods-card">
      <van-card
        v-for="item in checkoutList"
        :key="item.skuId"
        :num="item.quantity"
        :price="item.price"
        :title="item.name"
        :thumb="item.cover"
        :desc="item.specs.join('，')"
      />
    </div>

    <!-- 优惠券 -->
    <van-cell title="优惠券" is-link :value="couponText" @click="showCoupon = true" />

    <!-- 金额明细 -->
    <van-cell-group class="amount-group">
      <van-cell title="商品总额" :value="`¥${totalAmount.toFixed(2)}`" />
      <van-cell
        title="运费"
        :value="freightAmount === 0 ? '免运费' : `¥${freightAmount.toFixed(2)}`"
      />
      <van-cell title="优惠" :value="`-¥${discountAmount.toFixed(2)}`" />
      <van-cell title="实付金额" :value="`¥${payAmount.toFixed(2)}`" class="pay-cell" />
    </van-cell-group>

    <!-- 备注 -->
    <van-field v-model="remark" label="订单备注" placeholder="请输入备注" />

    <!-- 提交栏 -->
    <van-submit-bar :price="payAmount * 100" button-text="提交订单" @submit="onSubmit" />

    <!-- 地址选择 -->
    <van-popup v-model:show="showAddress" position="bottom" round :style="{ height: '70%' }">
      <AddressSelect @select="onAddressSelect" />
    </van-popup>

    <!-- 优惠券选择 -->
    <van-popup v-model:show="showCoupon" position="bottom" round :style="{ height: '70%' }">
      <div class="coupon-popup">
        <van-radio-group v-model="selectedCouponId">
          <van-cell-group>
            <van-cell title="不使用优惠券" clickable @click="selectedCouponId = null">
              <template #right-icon>
                <van-radio :name="null" />
              </template>
            </van-cell>
            <van-cell
              v-for="c in availableCoupons"
              :key="c.id"
              :title="c.name"
              :label="c.description"
              clickable
              @click="selectedCouponId = c.id"
            >
              <template #right-icon>
                <van-radio :name="c.id" />
              </template>
            </van-cell>
          </van-cell-group>
        </van-radio-group>
        <div class="popup-btn">
          <van-button block type="danger" round @click="showCoupon = false">确定</van-button>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useCartStore } from '@/store/cart.store'
// import { useCouponStore } from '@/store/coupon.store'
import { getAddressListApi } from '@/api/user'
import { createOrderApi } from '@/api/order'
import { getAvailableCouponApi } from '@/api/coupon'
import type { AddressItem } from '@/types/user'
import AddressSelect from '../address/index.vue'

const cartStore = useCartStore()
// const couponStore = useCouponStore()

const checkoutList = computed(() => cartStore.selectedItems)
const totalAmount = computed(() =>
  checkoutList.value.reduce((sum, i) => sum + i.price * i.quantity, 0)
)
const freightAmount = computed(() => (totalAmount.value >= 99 ? 0 : 6))
const discountAmount = computed(() => {
  if (!selectedCoupon.value) return 0
  if (
    selectedCoupon.value.type === 'full_reduction' ||
    selectedCoupon.value.type === 'no_threshold'
  ) {
    return selectedCoupon.value.value
  }
  if (selectedCoupon.value.type === 'discount') {
    return Math.min(totalAmount.value * (1 - selectedCoupon.value.value / 100), 50)
  }
  return 0
})
const payAmount = computed(() =>
  Math.max(0, totalAmount.value + freightAmount.value - discountAmount.value)
)

const selectedAddress = ref<AddressItem | null>(null)
const remark = ref('')
const showAddress = ref(false)
const showCoupon = ref(false)
const selectedCouponId = ref<number | null>(null)
const availableCoupons = ref<any[]>([])

const selectedCoupon = computed(() =>
  availableCoupons.value.find(c => c.id === selectedCouponId.value)
)
const couponText = computed(() =>
  selectedCoupon.value ? selectedCoupon.value.name : '不使用优惠券'
)

const onAddressSelect = (addr: AddressItem) => {
  selectedAddress.value = addr
  showAddress.value = false
}

const onSubmit = async () => {
  if (!selectedAddress.value) {
    showToast('请选择收货地址')
    return
  }
  await createOrderApi({
    skuIds: checkoutList.value.map(i => i.skuId),
    addressId: selectedAddress.value.id,
    couponId: selectedCouponId.value || undefined,
    remark: remark.value,
  })
  showToast('订单创建成功')
  // 清除已结算的购物车商品
  cartStore.removeItems(checkoutList.value.map(i => i.skuId))
  // 跳转到支付或订单详情
}

onMounted(async () => {
  // 加载默认地址
  const addrRes = await getAddressListApi()
  const list = addrRes.data.list
  selectedAddress.value = list.find(a => a.isDefault) || list[0] || null

  // 加载可用优惠券
  const couponRes = await getAvailableCouponApi(totalAmount.value)
  availableCoupons.value = couponRes.data
})
</script>

<style lang="scss" scoped>
.order-confirm-page {
  min-height: 100vh;
  background: #f7f8fa;
  padding-bottom: 100px;
}

.address-card {
  .addr-name {
    font-size: 15px;
    font-weight: bold;
    color: #333;
  }
  .addr-detail {
    font-size: 13px;
    color: #666;
    margin-top: 4px;
  }
}

.goods-card {
  margin-top: 10px;
  background: #fff;
}

.amount-group {
  margin-top: 10px;
  .pay-cell {
    :deep(.van-cell__value) {
      color: #ee0a24;
      font-weight: bold;
      font-size: 16px;
    }
  }
}

.coupon-popup {
  padding: 16px;
  .popup-btn {
    margin-top: 16px;
  }
}
</style>
