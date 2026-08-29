import { computed } from 'vue'
import { useCartStore } from '@/store/cart.store'
import { addCartApi, updateCartQuantityApi, deleteCartApi } from '@/api/cart'

export function useCart() {
  const cartStore = useCartStore()

  const selectedSkuIds = computed(() => cartStore.selectedItems.map(item => item.skuId))

  const addToCart = async (params: {
    goodsId: number
    skuId: number
    name: string
    cover: string
    specs: string[]
    price: number
    stock: number
    quantity: number
  }) => {
    cartStore.addItem(params)
    // 可选：同步到服务端
    // await addCartApi({ goodsId: params.goodsId, skuId: params.skuId, quantity: params.quantity })
  }

  const toggleItemSelect = (skuId: number) => {
    cartStore.toggleSelect(skuId)
  }

  const updateQuantity = async (skuId: number, quantity: number) => {
    cartStore.updateQuantity(skuId, quantity)
    // await updateCartQuantityApi(skuId, quantity)
  }

  const removeItem = async (skuId: number) => {
    cartStore.removeItem(skuId)
    // await deleteCartApi({ skuIds: [skuId] })
  }

  return {
    cartStore,
    selectedSkuIds,
    addToCart,
    toggleItemSelect,
    updateQuantity,
    removeItem,
  }
}
