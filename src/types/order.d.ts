/** 订单状态 */
export type OrderStatus = 'pending' | 'paid' | 'shipped' | 'received' | 'completed' | 'cancelled'

/** 订单商品项 */
export interface OrderGoodsItem {
  goodsId: number
  skuId: number
  name: string
  cover: string
  specs: string[]
  price: number
  quantity: number
}

/** 订单项 */
export interface OrderItem {
  id: string
  orderNo: string
  status: OrderStatus
  goodsList: OrderGoodsItem[]
  totalAmount: number
  discountAmount: number
  freightAmount: number
  payAmount: number
  createTime: string
  payTime?: string
  shipTime?: string
  receiveTime?: string
  address: { name: string; phone: string; fullAddress: string }
  remark?: string
}

/** 订单列表响应 */
export interface OrderListResp {
  list: OrderItem[]
  total: number
}

/** 创建订单参数 */
export interface OrderCreateParams {
  skuIds: number[]
  addressId: number
  couponId?: number
  remark?: string
}

/** 订单创建响应 */
export interface OrderCreateResp {
  orderId: string
  orderNo: string
  payAmount: number
}

/** 支付参数 */
export interface OrderPayParams {
  orderId: string
  payType: 'wechat' | 'alipay'
}

/** 订单状态数量 */
export interface OrderStatusCount {
  pending: number
  paid: number
  shipped: number
  received: number
}
