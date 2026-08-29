/** 优惠券类型 */
export type CouponType = 'full_reduction' | 'discount' | 'no_threshold'

/** 优惠券状态 */
export type CouponStatus = 'unused' | 'used' | 'expired'

/** 优惠券项 */
export interface CouponItem {
  id: number
  name: string
  type: CouponType
  value: number
  startTime: string
  endTime: string
  status: CouponStatus
  description: string
  threshold: number
}

// /** 可领取优惠券列表响应 */
export interface CouponListResp {
  list: CouponItem[]
  total: number
}

/** 用户优惠券列表响应 */
export interface UserCouponListResp {
  unused: CouponItem[]
  used: CouponItem[]
  expired: CouponItem[]
}

/** 领取优惠券参数 */
export interface CouponReceiveParams {
  couponId: number
}

/** 使用优惠券参数 */
export interface CouponUseParams {
  couponId: number
  orderId: number
}
