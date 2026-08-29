import { useHttp } from '@/utils/request'
import type {
  CartListResp,
  CartAddParams,
  CartDeleteParams,
  CartCheckoutParams,
} from '@/types/cart'

const { get, post, del } = useHttp()

// 获取购物车列表
export function getCartListApi() {
  return get<CartListResp>('/api/cart/list')
}

// 添加商品到购物车
export function addCartApi(params: CartAddParams) {
  return post<{ data: boolean }>('/api/cart/add', params)
}

// 更新购物车数量
export function updateCartQuantityApi(skuId: number, quantity: number) {
  return post<{ data: boolean }>('/api/cart/update', { skuId, quantity })
}

// 删除购物车商品
export function deleteCartApi(params: CartDeleteParams) {
  return del<{ data: boolean }>('/api/cart/delete', params)
}

// 购物车结算预览
export function checkoutCartApi(params: CartCheckoutParams) {
  return post<{ data: { list: any[]; totalAmount: number; freight: number } }>(
    '/api/cart/checkout',
    params
  )
}
