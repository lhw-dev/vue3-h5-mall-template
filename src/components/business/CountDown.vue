<template>
  <span class="count-down">
    <span v-if="props.showLabel" class="label">{{ props.label }}</span>
    <span class="time-box">{{ hours }}</span>
    <span class="sep">:</span>
    <span class="time-box">{{ minutes }}</span>
    <span class="sep">:</span>
    <span class="time-box">{{ seconds }}</span>
  </span>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = withDefaults(
  defineProps<{
    endTime: number // 结束时间戳
    label?: string
    showLabel?: boolean
  }>(),
  {
    label: '距结束',
    showLabel: true,
  }
)

const emit = defineEmits<{
  finish: []
}>()

const remain = ref(0)
let timer: ReturnType<typeof setInterval> | null = null

const hours = computed(() => String(Math.floor(remain.value / 3600)).padStart(2, '0'))
const minutes = computed(() => String(Math.floor((remain.value % 3600) / 60)).padStart(2, '0'))
const seconds = computed(() => String(remain.value % 60).padStart(2, '0'))

const calcRemain = () => {
  const diff = Math.max(0, Math.floor((props.endTime - Date.now()) / 1000))
  remain.value = diff
  if (diff === 0) {
    emit('finish')
    if (timer) clearInterval(timer)
  }
}

onMounted(() => {
  calcRemain()
  timer = setInterval(calcRemain, 1000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<style lang="scss" scoped>
.count-down {
  display: inline-flex;
  align-items: center;
  font-size: 12px;
  color: #ee0a24;

  .label {
    margin-right: 4px;
  }
  .time-box {
    background: #ee0a24;
    color: #fff;
    padding: 1px 3px;
    border-radius: 3px;
    min-width: 18px;
    text-align: center;
  }
  .sep {
    margin: 0 2px;
  }
}
</style>
