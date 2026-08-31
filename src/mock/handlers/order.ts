import { http, HttpResponse } from 'msw'

const mockOrders = [
  {
    id: 'ORD202401010001',
    orderNo: 'ORD202401010001',
    status: 'pending',
    goodsList: [
      {
        goodsId: 1001,
        skuId: 1,
        name: '夏季纯棉短袖T恤',
        cover: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
        specs: ['M', '白色'],
        price: 59.9,
        quantity: 2,
      },
    ],
    totalAmount: 119.8,
    discountAmount: 0,
    freightAmount: 6,
    payAmount: 125.8,
    createTime: '2024-01-01 10:00:00',
    address: {
      name: '张三',
      phone: '13800138000',
      fullAddress: '广东省深圳市南山区科技园南路88号',
    },
    remark: '',
  },
  {
    id: 'ORD202401020002',
    orderNo: 'ORD202401020002',
    status: 'shipped',
    goodsList: [
      {
        goodsId: 1002,
        skuId: 3,
        name: '运动休闲长裤',
        cover: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
        specs: ['L', '灰色'],
        price: 89,
        quantity: 1,
      },
    ],
    totalAmount: 89,
    discountAmount: 10,
    freightAmount: 0,
    payAmount: 79,
    createTime: '2024-01-02 14:30:00',
    shipTime: '2024-01-03 09:00:00',
    address: {
      name: '张三',
      phone: '13800138000',
      fullAddress: '广东省深圳市南山区科技园南路88号',
    },
  },
]

export const orderHandlers = [
  http.post('/api/order/create', async () => {
    // const body = (await request.json()) as any
    const orderId = 'ORD' + Date.now()
    return HttpResponse.json({
      code: 200,
      msg: 'ok',
      data: { orderId, orderNo: orderId, payAmount: 99.9 },
    })
  }),

  http.get('/api/order/list', ({ request }) => {
    const url = new URL(request.url)
    const status = url.searchParams.get('status')
    let list = mockOrders
    if (status) {
      list = mockOrders.filter(o => o.status === status)
    }
    return HttpResponse.json({ code: 200, msg: 'ok', data: { list, total: list.length } })
  }),

  http.get('/api/order/detail', ({ request }) => {
    const url = new URL(request.url)
    const orderId = url.searchParams.get('orderId')
    const order = mockOrders.find(o => o.id === orderId)
    return HttpResponse.json({ code: 200, msg: 'ok', data: order || null })
  }),

  http.post('/api/order/pay', async () => {
    return HttpResponse.json({ code: 200, msg: '支付成功', data: true })
  }),

  http.post('/api/order/cancel', async () => {
    return HttpResponse.json({ code: 200, msg: 'ok', data: true })
  }),

  http.post('/api/order/confirmReceive', async () => {
    return HttpResponse.json({ code: 200, msg: 'ok', data: true })
  }),

  http.get('/api/order/statusCount', () => {
    return HttpResponse.json({
      code: 200,
      msg: 'ok',
      data: { pending: 1, paid: 0, shipped: 1, received: 0 },
    })
  }),
]
