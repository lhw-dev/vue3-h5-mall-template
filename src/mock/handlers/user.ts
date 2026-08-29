import { http, HttpResponse } from 'msw'

const mockUserInfo = {
  id: 1,
  nickname: '用户9527',
  avatar: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
  phone: '13800138000',
}

let mockAddressList = [
  {
    id: 1,
    name: '张三',
    phone: '13800138000',
    province: '广东省',
    city: '深圳市',
    district: '南山区',
    detail: '科技园南路88号',
    isDefault: true,
  },
  {
    id: 2,
    name: '李四',
    phone: '13900139000',
    province: '北京市',
    city: '北京市',
    district: '海淀区',
    detail: '中关村大街1号',
    isDefault: false,
  },
]

export const userHandlers = [
  http.post('/api/user/sendCode', async () => {
    return HttpResponse.json({ code: 200, msg: '验证码已发送', data: true })
  }),

  http.post('/api/user/login', async ({ request }) => {
    const body = (await request.json()) as any
    return HttpResponse.json({
      code: 200,
      msg: '登录成功',
      data: {
        token: 'mock_token_' + Date.now(),
        userInfo: mockUserInfo,
      },
    })
  }),

  http.get('/api/user/info', () => {
    return HttpResponse.json({ code: 200, msg: 'ok', data: mockUserInfo })
  }),

  http.get('/api/address/list', () => {
    return HttpResponse.json({ code: 200, msg: 'ok', data: { list: mockAddressList } })
  }),

  http.post('/api/address/save', async ({ request }) => {
    const body = (await request.json()) as any
    if (body.id) {
      const idx = mockAddressList.findIndex(a => a.id === body.id)
      if (idx > -1) mockAddressList[idx] = body
    } else {
      body.id = Date.now()
      mockAddressList.push(body)
    }
    if (body.isDefault) {
      mockAddressList.forEach(a => (a.isDefault = a.id === body.id))
    }
    return HttpResponse.json({ code: 200, msg: 'ok', data: { id: body.id } })
  }),

  http.post('/api/address/delete', async ({ request }) => {
    const body = (await request.json()) as any
    mockAddressList = mockAddressList.filter(a => a.id !== body.id)
    return HttpResponse.json({ code: 200, msg: 'ok', data: true })
  }),

  http.post('/api/address/setDefault', async ({ request }) => {
    const body = (await request.json()) as any
    mockAddressList.forEach(a => (a.isDefault = a.id === body.id))
    return HttpResponse.json({ code: 200, msg: 'ok', data: true })
  }),
]
