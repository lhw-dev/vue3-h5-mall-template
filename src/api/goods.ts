import { useHttp } from '../utils/request'
import type { GoodsListResp, GoodsDetailType } from '@/types/goods'

const { get } = useHttp()

// 商品列表
export function getGoodsListApi(params: { categoryId?: number; page: number; pageSize: number }) {
  return get<GoodsListResp>('/api/goods/list', params)
}

// 商品详情
export function getGoodsDetailApi(goodsId: number) {
  return get<GoodsDetailType>('/api/goods/detail', { id: goodsId })
}
