import { http, HttpResponse } from 'msw'

// 模拟分类和分类商品数据
const categoryData = [
  { id: 1, name: '服饰' },
  { id: 2, name: '数码' },
  { id: 3, name: '家居' },
  { id: 4, name: '食品' },
  { id: 5, name: '美妆' },
  { id: 6, name: '运动' },
]

const mockGoods = [
  {
    id: 1001,
    title: '纯棉短袖T恤',
    price: 59.9,
    pic: 'https://picsum.photos/seed/tshirt/200/200',
  },
  {
    id: 1002,
    title: '休闲运动长裤',
    price: 89,
    pic: 'https://picsum.photos/seed/pants/200/200',
  },
  {
    id: 1003,
    title: '轻薄防晒外套',
    price: 129,
    pic: 'https://picsum.photos/seed/jacket/200/200',
  },
  {
    id: 1004,
    title: '简约棒球帽',
    price: 29.9,
    pic: 'https://picsum.photos/seed/cap/200/200',
  },
]

export const categoryHandler = [
  http.get('/api/category/list', () => {
    return HttpResponse.json({
      code: 200,
      data: categoryData,
      msg: 'ok',
    })
  }),

  http.get('/api/category/goods', async () => {
    const list = mockGoods.map(item => ({
      ...item,
      id: item.id,
    }))
    return HttpResponse.json({
      code: 200,
      data: list,
      msg: 'ok',
    })
  }),
]
