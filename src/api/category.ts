import { useHttp } from '@/utils/request'
import type { CategoryItem, CategoryGoodsItem } from '@/types/category'

const { get } = useHttp()

// 一级分类列表
export function getCategoryApi() {
  return get<{ data: CategoryItem[] }>('/api/category/list')
}

// 根据分类ID获取商品
export function getCategoryGoodsApi(categoryId: number) {
  return get<{ data: CategoryGoodsItem[] }>('/api/category/goods', {
    categoryId,
  })
}
