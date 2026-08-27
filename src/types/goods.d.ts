export interface GoodsItem {
  id: number
  name: string
  price: number
  marketPrice: number
  cover: string
  stock: number
}

interface GoodsListResp {
  code: number
  msg: string
  data: {
    list: GoodsItem[]
    total: number
  }
}

export interface GoodsDetailType extends GoodsItem {
  gallery: string[]
  skuList: SkuItem[]
  detailDesc: string
}

export interface SkuItem {
  id: number
  specs: string[]
  price: number
  stock: number
}
