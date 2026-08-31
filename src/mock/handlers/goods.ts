import { http, HttpResponse } from 'msw'

// mock商品数据
const mockGoodsData = [
  {
    id: 1001,
    name: '夏季纯棉短袖T恤',
    price: 59.9,
    marketPrice: 99,
    cover: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
    stock: 100,
    gallery: ['https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg'],
    skuList: [
      { id: 1, specs: ['M', '白色'], price: 59.9, stock: 30 },
      { id: 2, specs: ['L', '黑色'], price: 59.9, stock: 50 },
    ],
    detailDesc: '商品详情描述文本...',
  },
  {
    id: 1002,
    name: '运动休闲长裤',
    price: 89,
    marketPrice: 139,
    cover: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
    stock: 60,
    gallery: [],
    skuList: [],
    detailDesc: '运动休闲裤子详情',
  },
  {
    id: 1003,
    name: '轻薄防晒外套',
    price: 129,
    marketPrice: 59,
    cover: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
    stock: 5,
    gallery: [],
    skuList: [],
    detailDesc: '夏季轻薄防晒外套详情',
  },
  {
    id: 1004,
    name: '简约棒球帽',
    price: 29.9,
    marketPrice: 159,
    cover: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
    stock: 10,
    gallery: [],
    skuList: [],
    detailDesc: '简约棒球帽详情',
  },
]

export const goodsHandlers = [
  // 商品列表接口
  http.get('/api/goods/list', async ({ request }) => {
    const url = new URL(request.url)
    const pageSize = Number(url.searchParams.get('pageSize')) || 10
    return HttpResponse.json({
      code: 200,
      msg: 'ok',
      data: {
        list: mockGoodsData.slice(0, pageSize),
        total: mockGoodsData.length,
      },
    })
  }),
  // 商品详情接口
  http.get('/api/goods/detail', async ({ request }) => {
    const url = new URL(request.url)
    const id = Number(url.searchParams.get('id'))
    const goods = mockGoodsData.find(g => g.id === id)
    if (!goods) {
      return HttpResponse.json({ code: 400, msg: '商品不存在', data: null })
    }
    return HttpResponse.json({
      code: 200,
      msg: 'ok',
      data: goods,
    })
  }),
]
