import { defineStore } from 'pinia'
import type { CouponItem } from '@/types/coupon'
export const useCouponStore = defineStore('coupon', {
  state: () => ({
    // 用户已领取的优惠券
    userCoupons: [] as CouponItem[],
    // 当前订单可使用的优惠券
    availableCoupons: [] as CouponItem[],
    // 当前选中的优惠券
    selectedCouponId: null as number | null,
  }),
  getters: {
    // 未使用的优惠券
    unusedCoupons: state => state.userCoupons.filter(c => c.status === 'unused'),
    // 已使用的优惠券
    usedCoupons: state => state.userCoupons.filter(c => c.status === 'used'),
    // 已过期的优惠券
    expiredCoupons: state => state.userCoupons.filter(c => c.status === 'expired'),
    // 选中的优惠券
    selectedCoupon: state => state.userCoupons.find(c => c.id === state.selectedCouponId),
  },
  actions: {
    /** 设置用户优惠券 */
    setUserCoupons(coupons: CouponItem[]) {
      this.userCoupons = coupons
    },
    /** 添加优惠券 */
    addCoupon(coupon: CouponItem) {
      this.userCoupons.unshift(coupon)
    },
    /** 选择优惠券 */ selectCoupon(id: number | null) {
      this.selectedCouponId = id
    },
    /** 使用优惠券 */ useCoupon(couponId: number) {
      const coupon = this.userCoupons.find(c => c.id === couponId)
      if (coupon) {
        coupon.status = 'used'
      }
    },
    /** 设置可用优惠券（订单页） */ setAvailableCoupons(coupons: CouponItem[]) {
      this.availableCoupons = coupons
    },
  },
  persist: true,
})
