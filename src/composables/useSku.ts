import { ref, computed } from 'vue'
import type { SkuItem } from '@/types/goods'

export function useSku(skuList: SkuItem[]) {
  const selectedSpecs = ref<string[]>([])
  const quantity = ref(1)

  const specList = computed(() => {
    if (!skuList.length) return []
    const map = new Map<string, Set<string>>()
    skuList.forEach(sku => {
      sku.specs.forEach((s, i) => {
        const key = `规格${i + 1}`
        if (!map.has(key)) map.set(key, new Set())
        map.get(key)!.add(s)
      })
    })
    return Array.from(map.entries()).map(([name, options]) => ({
      name,
      options: Array.from(options),
    }))
  })

  const selectedSku = computed(() => {
    if (selectedSpecs.value.length !== specList.value.length) return null
    return skuList.find(sku => sku.specs.every((s, i) => s === selectedSpecs.value[i]))
  })

  const selectSpec = (sIdx: number, opt: string) => {
    selectedSpecs.value[sIdx] = opt
  }

  const reset = () => {
    selectedSpecs.value = []
    quantity.value = 1
  }

  return {
    selectedSpecs,
    quantity,
    specList,
    selectedSku,
    selectSpec,
    reset,
  }
}
