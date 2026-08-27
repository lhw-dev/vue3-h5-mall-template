import { goodsHandlers } from "./handlers/goods";
import { categoryHandler } from "./handlers/category";

export const handlers = [...goodsHandlers, ...categoryHandler];
