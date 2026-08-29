/** 购物车商品项（加入购物车的SKU）*/
export interface CartItem {
  goodsId: number
  skuId: number
  name: string
  cover: string
  specs: string[]
  price: number
  quantity: number
  stock: number
  selected: boolean
}

/** 购物车列表响应 */
export interface CartListResp {
  list: CartItem[]
  totalCount: number
  totalPrice: number
}

/** 添加/更新购物车参数 */
export interface CartAddParams {
  goodsId: number
  skuId: number
  quantity: number
}

/** 购物车删除参数 */
export interface CartDeleteParams {
  skuIds: number[]
}

/** 购物车结算参数 */
export interface CartCheckoutParams {
  skuIds: number[]
}
