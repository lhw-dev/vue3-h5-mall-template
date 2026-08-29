import { useHttp } from '@/utils/request'
import type {
  LoginParams,
  LoginResp,
  AddressListResp,
  AddressSaveParams,
  SendCodeParams,
} from '@/types/user'

const { get, post } = useHttp()

// 发送验证码
export function sendCodeApi(params: SendCodeParams) {
  return post<{ data: boolean }>('/api/user/sendCode', params)
}

// 手机号登录
export function loginApi(params: LoginParams) {
  return post<{ data: LoginResp }>('/api/user/login', params)
}

// 获取用户信息
export function getUserInfoApi() {
  return get<{ data: { id: number; nickname: string; avatar: string; phone: string } }>(
    '/api/user/info'
  )
}

// 地址列表
export function getAddressListApi() {
  return get<{ data: AddressListResp }>('/api/address/list')
}

// 保存地址
export function saveAddressApi(params: AddressSaveParams) {
  return post<{ data: { id: number } }>('/api/address/save', params)
}

// 删除地址
export function deleteAddressApi(id: number) {
  return post<{ data: boolean }>('/api/address/delete', { id })
}

// 设置默认地址
export function setDefaultAddressApi(id: number) {
  return post<{ data: boolean }>('/api/address/setDefault', { id })
}
