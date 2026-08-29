<template>
  <div class="coupon-card" :class="[status, { disabled: isDisabled }]">
    <div class="coupon-left">
      <div class="value">
        <span v-if="coupon.type === 'discount'" class="unit">{{ coupon.value / 10 }}折</span>
        <template v-else>
          <span class="symbol">¥</span>
          <span class="amount">{{ coupon.value }}</span>
        </template>
      </div>
      <div class="threshold">
        {{ coupon.threshold > 0 ? `满${coupon.threshold}元可用` : '无门槛' }}
      </div>
    </div>
    <div class="coupon-right">
      <div class="name">{{ coupon.name }}</div>
      <div class="desc">{{ coupon.description }}</div>
      <div class="time">{{ coupon.startTime }} 至 {{ coupon.endTime }}</div>
      <van-button v-if="showAction" size="mini" :type="actionType" @click="onAction">
        {{ actionText }}
      </van-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { CouponItem } from '@/types/coupon'

const props = defineProps<{
  coupon: CouponItem
  showAction?: boolean
}>()

const emit = defineEmits<{
  action: [coupon: CouponItem]
}>()

const status = computed(() => props.coupon.status)
const isDisabled = computed(() => props.coupon.status !== 'unused')

const actionText = computed(() => {
  switch (props.coupon.status) {
    case 'unused':
      return '去使用'
    case 'used':
      return '已使用'
    case 'expired':
      return '已过期'
    default:
      return ''
  }
})

const actionType = computed(() => (props.coupon.status === 'unused' ? 'danger' : 'default'))

const onAction = () => {
  if (props.coupon.status === 'unused') {
    emit('action', props.coupon)
  }
}
</script>

<style lang="scss" scoped>
.coupon-card {
  display: flex;
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);

  &.disabled {
    opacity: 0.6;
  }

  .coupon-left {
    width: 100px;
    background: linear-gradient(135deg, #ff5050, #ff7849);
    color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 12px;

    .value {
      .symbol {
        font-size: 14px;
      }
      .amount {
        font-size: 28px;
        font-weight: bold;
      }
      .unit {
        font-size: 20px;
        font-weight: bold;
      }
    }
    .threshold {
      font-size: 11px;
      margin-top: 4px;
      opacity: 0.9;
    }
  }

  .coupon-right {
    flex: 1;
    padding: 12px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .name {
      font-size: 14px;
      font-weight: bold;
      color: #333;
    }
    .desc {
      font-size: 12px;
      color: #666;
      margin-top: 4px;
    }
    .time {
      font-size: 11px;
      color: #999;
      margin-top: 4px;
    }
    .van-button {
      margin-top: 8px;
      align-self: flex-start;
    }
  }
}
</style>
