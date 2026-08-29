import { useHttp } from '@/utils/request'
import type {
  OrderListResp,
  OrderCreateParams,
  OrderCreateResp,
  OrderPayParams,
  OrderStatusCount,
} from '@/types/order'

const { get, post } = useHttp()

// 创建订单
export function createOrderApi(params: OrderCreateParams) {
  return post<{ data: OrderCreateResp }>('/api/order/create', params)
}

// 订单列表
export function getOrderListApi(params: { status?: string; page: number; pageSize: number }) {
  return get<{ data: OrderListResp }>('/api/order/list', params)
}

// 订单详情
export function getOrderDetailApi(orderId: string) {
  return get<{ data: any }>('/api/order/detail', { orderId })
}

// 支付订单
export function payOrderApi(params: OrderPayParams) {
  return post<{ data: boolean }>('/api/order/pay', params)
}

// 取消订单
export function cancelOrderApi(orderId: string) {
  return post<{ data: boolean }>('/api/order/cancel', { orderId })
}

// 确认收货
export function confirmReceiveApi(orderId: string) {
  return post<{ data: boolean }>('/api/order/confirmReceive', { orderId })
}

// 订单状态数量统计
export function getOrderStatusCountApi() {
  return get<{ data: OrderStatusCount }>('/api/order/statusCount')
}
