import { useHttp } from '@/utils/request'
import type { CouponListResp, UserCouponListResp, CouponReceiveParams } from '@/types/coupon'

const { get, post } = useHttp()

// 可领取优惠券列表
export function getCouponListApi() {
  return get<{ data: CouponListResp }>('/api/coupon/list')
}

// 用户优惠券列表
export function getUserCouponApi() {
  return get<{ data: UserCouponListResp }>('/api/coupon/userList')
}

// 领取优惠券
export function receiveCouponApi(params: CouponReceiveParams) {
  return post<{ data: boolean }>('/api/coupon/receive', params)
}

// 获取订单可用优惠券
export function getAvailableCouponApi(orderAmount: number) {
  return get<{ data: any[] }>('/api/coupon/available', { orderAmount })
}
