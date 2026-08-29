/** 用户信息 */
export interface UserInfo {
  id: number
  nickname: string
  avatar: string
  phone: string
  gender?: 'male' | 'female' | ''
}

/** 登录参数 */
export interface LoginParams {
  phone: string
  code: string
}

/** 登录响应 */
export interface LoginResp {
  token: string
  userInfo: UserInfo
}

/** 收货地址 */
export interface AddressItem {
  id: number
  name: string
  phone: string
  province: string
  city: string
  district: string
  detail: string
  isDefault: boolean
}

/** 地址列表响应 */
export interface AddressListResp {
  list: AddressItem[]
}

/** 保存地址参数 */
export interface AddressSaveParams {
  id?: number
  name: string
  phone: string
  province: string
  city: string
  district: string
  detail: string
  isDefault: boolean
}

/** 发送验证码参数 */
export interface SendCodeParams {
  phone: string
}
