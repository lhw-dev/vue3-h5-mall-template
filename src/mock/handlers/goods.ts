import { http, HttpResponse } from "msw";

// mock商品数据
const mockGoodsData = [
  {
    id: 1001,
    name: "夏季纯棉短袖T恤",
    price: 59.9,
    marketPrice: 99,
    cover: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
    stock: 100,
    gallery: ["https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"],
    skuList: [
      { id: 1, specs: ["M", "白色"], price: 59.9, stock: 30 },
      { id: 2, specs: ["L", "黑色"], price: 59.9, stock: 50 },
    ],
    detailDesc: "商品详情描述文本...",
  },
  {
    id: 1002,
    name: "运动休闲长裤",
    price: 89,
    marketPrice: 139,
    cover: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
    stock: 60,
    gallery: [],
    skuList: [],
    detailDesc: "裤子详情",
  },
];

export const goodsHandlers = [
  // 商品列表接口
  http.get("/api/goods/list", async ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page")) || 1;
    const pageSize = Number(url.searchParams.get("pageSize")) || 10;
    return HttpResponse.json({
      code: 200,
      msg: "ok",
      data: {
        list: mockGoodsData.slice(0, pageSize),
        total: mockGoodsData.length,
      },
    });
  }),
  // 商品详情接口
  http.get("/api/goods/detail", async ({ request }) => {
    const url = new URL(request.url);
    const id = Number(url.searchParams.get("id"));
    const goods = mockGoodsData.find((g) => g.id === id);
    if (!goods) {
      return HttpResponse.json({ code: 400, msg: "商品不存在", data: null });
    }
    return HttpResponse.json({
      code: 200,
      msg: "ok",
      data: goods,
    });
  }),
];
