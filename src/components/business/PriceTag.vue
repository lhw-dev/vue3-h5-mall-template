<template>
  <span class="price-tag" :class="size">
    <span v-if="prefix" class="prefix">{{ prefix }}</span>
    <span class="symbol">¥</span>
    <span class="integer">{{ integerPart }}</span>
    <span v-if="showDecimal" class="decimal">.{{ decimalPart }}</span>
    <span v-if="marketPrice && showMarketPrice" class="market-price"
      >¥{{ formatPrice(marketPrice) }}</span
    >
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { formatPrice } from '@/utils'

const props = withDefaults(
  defineProps<{
    price: number
    marketPrice?: number
    size?: 'small' | 'medium' | 'large'
    prefix?: string
    showDecimal?: boolean
    showMarketPrice?: boolean
  }>(),
  {
    size: 'medium',
    showDecimal: true,
    showMarketPrice: false,
  }
)

const integerPart = computed(() => Math.floor(props.price))
const decimalPart = computed(() =>
  String((props.price % 1).toFixed(2))
    .padStart(2, '0')
    .slice(2)
)
</script>

<style lang="scss" scoped>
.price-tag {
  display: inline-flex;
  align-items: baseline;
  color: #ee0a24;
  font-weight: bold;

  .symbol {
    font-size: 0.7em;
    margin-right: 1px;
  }
  .integer {
    font-size: 1em;
  }
  .decimal {
    font-size: 0.75em;
  }

  &.small {
    font-size: 12px;
  }
  &.medium {
    font-size: 16px;
  }
  &.large {
    font-size: 20px;
  }

  .market-price {
    margin-left: 6px;
    font-size: 0.75em;
    color: #999;
    text-decoration: line-through;
    font-weight: normal;
  }

  .prefix {
    margin-right: 4px;
    font-size: 0.75em;
    color: #666;
    font-weight: normal;
  }
}
</style>
