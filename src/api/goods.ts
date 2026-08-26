import { useHttp } from "./request";

const { get, post } = useHttp();

// 商品详情
export function getGoodsDetailApi(goodsId: number) {
  return get<GoodsDetailType>("/api/goods/detail", { id: goodsId });
}

// 商品列表
export function getGoodsListApi(params: {
  categoryId?: number;
  page: number;
  pageSize: number;
}) {
  return get<{ list: GoodsItem[]; total: number }>("/api/goods/list", params);
}

// TS类型可以单独抽types/goods.d.ts
export interface GoodsItem {
  id: number;
  name: string;
  price: number;
  marketPrice: number;
  cover: string;
  stock: number;
}

export interface GoodsDetailType extends GoodsItem {
  gallery: string[];
  skuList: SkuItem[];
  detailDesc: string;
}

export interface SkuItem {
  id: number;
  specs: string[];
  price: number;
  stock: number;
}
