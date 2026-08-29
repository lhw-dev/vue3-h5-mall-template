<template>
  <van-action-sheet v-model:show="visible" title="选择规格" close-on-click-overlay>
    <div class="sku-select">
      <div class="goods-info">
        <img :src="selectedSkuPic" class="thumb" />
        <div class="info">
          <div class="price">¥{{ selectedPrice }}</div>
          <div class="stock">库存 {{ selectedStock }} 件</div>
          <div class="selected">{{ selectedText }}</div>
        </div>
      </div>

      <div v-for="(spec, sIdx) in specList" :key="sIdx" class="spec-row">
        <div class="spec-name">{{ spec.name }}</div>
        <div class="spec-options">
          <span
            v-for="opt in spec.options"
            :key="opt"
            class="spec-tag"
            :class="{
              active: selectedSpecs[sIdx] === opt,
              disabled: !isOptionAvailable(sIdx, opt),
            }"
            @click="selectSpec(sIdx, opt)"
          >
            {{ opt }}
          </span>
        </div>
      </div>

      <div class="quantity-row">
        <span>数量</span>
        <van-stepper v-model="quantity" :min="1" :max="selectedStock" />
      </div>

      <van-button type="danger" round block class="confirm-btn" @click="onConfirm">
        {{ confirmText }}
      </van-button>
    </div>
  </van-action-sheet>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { showToast } from 'vant'
import type { SkuItem } from '@/types/goods'

const props = defineProps<{
  show: boolean
  skuList: SkuItem[]
  cover: string
  confirmText?: string
}>()

const emit = defineEmits<{
  'update:show': [val: boolean]
  confirm: [sku: SkuItem, quantity: number]
}>()

const visible = computed({
  get: () => props.show,
  set: val => emit('update:show', val),
})

const quantity = ref(1)
const selectedSpecs = ref<string[]>([])

// 解析规格维度
const specList = computed(() => {
  if (!props.skuList.length) return []
  const specsMap = new Map<string, Set<string>>()
  props.skuList.forEach(sku => {
    sku.specs.forEach((s, i) => {
      const key = `规格${i + 1}`
      if (!specsMap.has(key)) specsMap.set(key, new Set())
      specsMap.get(key)!.add(s)
    })
  })
  return Array.from(specsMap.entries()).map(([name, options]) => ({
    name,
    options: Array.from(options),
  }))
})

// 当前选中的SKU
const selectedSku = computed(() => {
  if (!props.skuList.length) return null
  if (selectedSpecs.value.length !== specList.value.length) return null
  return props.skuList.find(sku => sku.specs.every((s, i) => s === selectedSpecs.value[i]))
})

const selectedPrice = computed(() => selectedSku.value?.price ?? 0)
const selectedStock = computed(() => selectedSku.value?.stock ?? 0)
const selectedSkuPic = computed(() => (selectedSku.value ? props.cover : props.cover))
const selectedText = computed(() => {
  if (!selectedSku.value) return '请选择规格'
  return `已选：${selectedSpecs.value.join('，')}`
})

watch(
  () => props.show,
  val => {
    if (val) {
      quantity.value = 1
      selectedSpecs.value = []
    }
  }
)

const isOptionAvailable = (sIdx: number, opt: string) => {
  // 简化：只要存在包含该选项的SKU即认为可用
  return props.skuList.some(sku => sku.specs[sIdx] === opt)
}

const selectSpec = (sIdx: number, opt: string) => {
  selectedSpecs.value[sIdx] = opt
}

const onConfirm = () => {
  if (!selectedSku.value) {
    showToast('请选择完整规格')
    return
  }
  emit('confirm', selectedSku.value, quantity.value)
  visible.value = false
}
</script>

<style lang="scss" scoped>
.sku-select {
  padding: 16px;

  .goods-info {
    display: flex;
    margin-bottom: 16px;

    .thumb {
      width: 90px;
      height: 90px;
      border-radius: 8px;
      object-fit: cover;
      margin-right: 12px;
    }
    .info {
      .price {
        color: #ee0a24;
        font-size: 20px;
        font-weight: bold;
      }
      .stock {
        font-size: 12px;
        color: #999;
        margin-top: 4px;
      }
      .selected {
        font-size: 13px;
        color: #666;
        margin-top: 4px;
      }
    }
  }

  .spec-row {
    margin-bottom: 12px;

    .spec-name {
      font-size: 13px;
      color: #666;
      margin-bottom: 8px;
    }
    .spec-options {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;

      .spec-tag {
        padding: 6px 14px;
        border-radius: 4px;
        background: #f2f3f5;
        font-size: 13px;
        color: #333;

        &.active {
          background: #ee0a24;
          color: #fff;
        }
        &.disabled {
          opacity: 0.4;
          pointer-events: none;
        }
      }
    }
  }

  .quantity-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 16px 0;
    font-size: 14px;
  }

  .confirm-btn {
    margin-top: 8px;
  }
}
</style>
