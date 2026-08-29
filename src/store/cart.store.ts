import { defineStore } from 'pinia'
import { showToast } from 'vant'
import type { CartItem, CartAddParams } from '@/types/cart'

export const useCartStore = defineStore('cart', {
  state: () => ({ items: [] as CartItem[] }),
  getters: {
    // 选中商品列表
    selectedItems: state => state.items.filter(item => item.selected),
    // 选中商品总数
    selectedCount: state =>
      state.items.filter(item => item.selected).reduce((sum, item) => sum + item.quantity, 0),
    // 选中商品总价
    selectedTotalPrice: state =>
      state.items
        .filter(item => item.selected)
        .reduce((sum, item) => sum + item.price * item.quantity, 0),
    // 是否全选
    isAllSelected: state => state.items.length > 0 && state.items.every(item => item.selected),
    // 购物车总数量
    totalCount: state => state.items.reduce((sum, item) => sum + item.quantity, 0),
  },
  actions: {
    /** 添加商品到购物车 */
    addItem(
      params: CartAddParams & {
        name: string
        cover: string
        specs: string[]
        price: number
        stock: number
      }
    ) {
      const exist = this.items.find(item => item.skuId === params.skuId)
      if (exist) {
        exist.quantity += params.quantity
        if (exist.quantity > exist.stock) {
          exist.quantity = exist.stock
        }
        showToast('购物车数量已更新')
      } else {
        this.items.push({
          goodsId: params.goodsId,
          skuId: params.skuId,
          name: params.name,
          cover: params.cover,
          specs: params.specs,
          price: params.price,
          quantity: params.quantity,
          stock: params.stock,
          selected: true,
        })
        showToast('已加入购物车')
      }
    },
    /** 更新商品数量 */
    updateQuantity(skuId: number, quantity: number) {
      const item = this.items.find(i => i.skuId === skuId)
      if (item) {
        item.quantity = Math.max(1, Math.min(quantity, item.stock))
      }
    },
    /** 切换选中状态 */
    toggleSelect(skuId: number) {
      const item = this.items.find(i => i.skuId === skuId)
      if (item) {
        item.selected = !item.selected
      }
    },
    /** 全选/取消全选 */
    toggleSelectAll() {
      const allSelected = this.isAllSelected
      this.items.forEach(item => (item.selected = !allSelected))
    },
    /** 删除商品 */
    removeItem(skuId: number) {
      const idx = this.items.findIndex(i => i.skuId === skuId)
      if (idx > -1) {
        this.items.splice(idx, 1)
      }
    },
    /** 批量删除 */
    removeItems(skuIds: number[]) {
      this.items = this.items.filter(item => !skuIds.includes(item.skuId))
    },
    /** 清空购物车 */
    clearCart() {
      this.items = []
    },
    /** 设置购物车数据（从接口同步） */
    setCartItems(items: CartItem[]) {
      this.items = items
    },
  },
  persist: true,
})
