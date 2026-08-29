import { goodsHandlers } from './handlers/goods'
import { categoryHandler } from './handlers/category'
import { cartHandlers } from './handlers/cart'
import { userHandlers } from './handlers/user'
import { orderHandlers } from './handlers/order'
import { couponHandlers } from './handlers/coupon'

export const handlers = [
  ...goodsHandlers,
  ...categoryHandler,
  ...cartHandlers,
  ...userHandlers,
  ...orderHandlers,
  ...couponHandlers,
]
