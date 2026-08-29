import { http, HttpResponse } from 'msw'
import type { CartItem } from '@/types/cart'

let mockCartData: CartItem[] = [
  {
    goodsId: 1001,
    skuId: 1,
    name: '夏季纯棉短袖T恤',
    cover: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
    specs: ['M', '白色'],
    price: 59.9,
    quantity: 2,
    stock: 30,
    selected: true,
  },
  {
    goodsId: 1001,
    skuId: 2,
    name: '夏季纯棉短袖T恤',
    cover: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
    specs: ['L', '黑色'],
    price: 59.9,
    quantity: 1,
    stock: 50,
    selected: false,
  },
]

export const cartHandlers = [
  http.get('/api/cart/list', () => {
    const totalPrice = mockCartData
      .filter(i => i.selected)
      .reduce((sum, i) => sum + i.price * i.quantity, 0)
    return HttpResponse.json({
      code: 200,
      msg: 'ok',
      data: {
        list: mockCartData,
        totalCount: mockCartData.reduce((sum, i) => sum + i.quantity, 0),
        totalPrice,
      },
    })
  }),

  http.post('/api/cart/add', async ({ request }) => {
    const body = (await request.json()) as any
    const exist = mockCartData.find(i => i.skuId === body.skuId)
    if (exist) {
      exist.quantity += body.quantity
    }
    return HttpResponse.json({ code: 200, msg: 'ok', data: true })
  }),

  http.post('/api/cart/update', async ({ request }) => {
    const body = (await request.json()) as any
    const item = mockCartData.find(i => i.skuId === body.skuId)
    if (item) item.quantity = body.quantity
    return HttpResponse.json({ code: 200, msg: 'ok', data: true })
  }),

  http.delete('/api/cart/delete', async ({ request }) => {
    const body = (await request.json()) as any
    mockCartData = mockCartData.filter(i => !body.skuIds.includes(i.skuId))
    return HttpResponse.json({ code: 200, msg: 'ok', data: true })
  }),

  http.post('/api/cart/checkout', async ({ request }) => {
    const body = (await request.json()) as any
    const list = mockCartData.filter(i => body.skuIds.includes(i.skuId))
    const totalAmount = list.reduce((sum, i) => sum + i.price * i.quantity, 0)
    return HttpResponse.json({
      code: 200,
      msg: 'ok',
      data: { list, totalAmount, freight: totalAmount >= 99 ? 0 : 6 },
    })
  }),
]
