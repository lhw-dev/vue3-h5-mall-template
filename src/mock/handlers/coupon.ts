import { http, HttpResponse } from 'msw'

type CouponType = 'full_reduction' | 'discount'
type CouponStatus = 'unused' | 'used'

const mockCouponList: Array<{
  id: number
  name: string
  type: CouponType
  value: number
  threshold: number
  startTime: string
  endTime: string
  status: CouponStatus
  description: string
}> = [
  {
    id: 1,
    name: '新人满减券',
    type: 'full_reduction',
    value: 20,
    threshold: 100,
    startTime: '2024-01-01',
    endTime: '2024-12-31',
    status: 'unused',
    description: '满100元可用',
  },
  {
    id: 2,
    name: '全场8折券',
    type: 'discount',
    value: 80,
    threshold: 0,
    startTime: '2024-01-01',
    endTime: '2024-12-31',
    status: 'unused',
    description: '无门槛，最高抵扣50元',
  },
  {
    id: 3,
    name: '运费券',
    type: 'full_reduction',
    value: 6,
    threshold: 0,
    startTime: '2024-01-01',
    endTime: '2024-06-30',
    status: 'used',
    description: '免运费',
  },
]

let userCoupons = [...mockCouponList]

// 根据endTime判断是否过期
function isCouponExpired(endTime: string): boolean {
  return new Date(endTime).getTime() < Date.now()
}

export const couponHandlers = [
  http.get('/api/coupon/list', () => {
    return HttpResponse.json({
      code: 200,
      msg: 'ok',
      data: { list: mockCouponList, total: mockCouponList.length },
    })
  }),

  http.get('/api/coupon/userList', () => {
    // 按照时间动态划分过期，不再依赖status字段
    const unused = userCoupons.filter(c => c.status === 'unused' && !isCouponExpired(c.endTime))
    const used = userCoupons.filter(c => c.status === 'used')
    const expired = userCoupons.filter(c => c.status === 'unused' && isCouponExpired(c.endTime))

    return HttpResponse.json({
      code: 200,
      msg: 'ok',
      data: { unused, used, expired },
    })
  }),

  http.post('/api/coupon/receive', async ({ request }) => {
    const body = (await request.json()) as { couponId: number }
    const coupon = mockCouponList.find(c => c.id === body.couponId)
    if (coupon) {
      userCoupons.unshift({ ...coupon, status: 'unused' })
    }
    return HttpResponse.json({ code: 200, msg: '领取成功', data: true })
  }),

  http.get('/api/coupon/available', ({ request }) => {
    const url = new URL(request.url)
    const amount = Number(url.searchParams.get('orderAmount')) || 0
    // 可用：未使用 + 未过期 + 满足门槛
    const list = userCoupons.filter(
      c => c.status === 'unused' && !isCouponExpired(c.endTime) && c.threshold <= amount
    )
    return HttpResponse.json({ code: 200, msg: 'ok', data: list })
  }),
]
