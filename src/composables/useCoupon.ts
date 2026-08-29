import { showToast } from 'vant'
import { useCouponStore } from '@/store/coupon.store'
import { receiveCouponApi } from '@/api/coupon'

export function useCoupon() {
  const couponStore = useCouponStore()

  const receiveCoupon = async (couponId: number) => {
    const res = await receiveCouponApi({ couponId })
    if (res) {
      showToast('领取成功')
    }
    return res
  }

  const selectCoupon = (id: number | null) => {
    couponStore.selectCoupon(id)
  }

  return {
    couponStore,
    receiveCoupon,
    selectCoupon,
  }
}
