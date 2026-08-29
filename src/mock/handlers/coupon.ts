import { http, HttpResponse } from 'msw'

const mockCouponList = [
  {
    id: 1,
    name: '新人满减券',
    type: 'full_reduction' as const,
    value: 20,
    threshold: 100,
    startTime: '2024-01-01',
    endTime: '2024-12-31',
    status: 'unused' as const,
    description: '满100元可用',
  },
  {
    id: 2,
    name: '全场8折券',
    type: 'discount' as const,
    value: 80,
    threshold: 0,
    startTime: '2024-01-01',
    endTime: '2024-12-31',
    status: 'unused' as const,
    description: '无门槛，最高抵扣50元',
  },
  {
    id: 3,
    name: '运费券',
    type: 'no_threshold' as const,
    value: 6,
    threshold: 0,
    startTime: '2024-01-01',
    endTime: '2024-06-30',
    status: 'used' as const,
    description: '免运费',
  },
]

let userCoupons = [...mockCouponList]

export const couponHandlers = [
  http.get('/api/coupon/list', () => {
    return HttpResponse.json({
      code: 200,
      msg: 'ok',
      data: { list: mockCouponList, total: mockCouponList.length },
    })
  }),

  http.get('/api/coupon/userList', () => {
    return HttpResponse.json({
      code: 200,
      msg: 'ok',
      data: {
        unused: userCoupons.filter(c => c.status === 'unused'),
        used: userCoupons.filter(c => c.status === 'used'),
        expired: userCoupons.filter(c => c.status === 'expired'),
      },
    })
  }),

  http.post('/api/coupon/receive', async ({ request }) => {
    const body = (await request.json()) as any
    const coupon = mockCouponList.find(c => c.id === body.couponId)
    if (coupon) {
      userCoupons.unshift({ ...coupon, status: 'unused' })
    }
    return HttpResponse.json({ code: 200, msg: '领取成功', data: true })
  }),

  http.get('/api/coupon/available', ({ request }) => {
    const url = new URL(request.url)
    const amount = Number(url.searchParams.get('orderAmount')) || 0
    const list = userCoupons.filter(c => c.status === 'unused' && c.threshold <= amount)
    return HttpResponse.json({ code: 200, msg: 'ok', data: list })
  }),
]
