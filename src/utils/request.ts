import { ofetch, type FetchOptions } from 'ofetch'
import { showToast } from 'vant'
import { useUserStore } from '@/store/user.store'

// 后端约定业务返回体类型
export interface ApiResponse<T = any> {
  code: number
  data: T
  msg: string
}

// 存放正在进行中的请求，用于取消重复请求
const pendingRequestMap = new Map<string, AbortController>()

// 生成请求唯一key
function generateRequestKey(url: string, method: string, params?: any) {
  return `${method}-${url}-${JSON.stringify(params || {})}`
}

const http = ofetch.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 12000,
  // 不直接解析，交给onResponse做业务层判断
  parseResponse: text => {
    try {
      return JSON.parse(text)
    } catch {
      return text
    }
  },

  // ========= 请求拦截 =========
  onRequest({ options, request }) {
    const userStore = useUserStore()
    const url = String(request)
    const method = options.method || 'GET'

    // 取消重复请求：相同url+method+params，取消上一次未完成请求
    const reqKey = generateRequestKey(url, method, options.params || options.body)
    if (pendingRequestMap.has(reqKey)) {
      const oldAbort = pendingRequestMap.get(reqKey)
      oldAbort?.abort()
      pendingRequestMap.delete(reqKey)
    }

    // 新建abort控制器，保存到map
    const abortController = new AbortController()
    options.signal = abortController.signal
    pendingRequestMap.set(reqKey, abortController)

    // token注入
    if (userStore.token) {
      options.headers.set('Authorization', `Bearer ${userStore.token}`)
    }
    options.headers.set('Content-Type', 'application/json')
  },

  // ========= 响应成功拦截 =========
  async onResponse({ response, options, request }) {
    const url = String(request)
    const method = options.method || 'GET'
    const reqKey = generateRequestKey(url, method, options.params || options.body)
    // 请求完成，移除pending记录
    pendingRequestMap.delete(reqKey)

    const resData = response._data as ApiResponse

    // http状态码2xx，但是业务code非0/200代表业务失败
    if (resData.code !== 200) {
      // token失效 401，清空用户信息跳登录
      if (resData.code === 401) {
        const userStore = useUserStore()
        userStore.logoutAction()
        showToast('登录已过期，请重新登录')
        // 保留当前页面地址，登录完成后回跳
        const router = await import('vue-router').then(m => m.useRouter())
        router.push({
          path: '/login',
          query: { redirect: router.currentRoute.value.fullPath },
        })
      } else {
        showToast(resData.msg || '业务请求异常')
      }
      // 抛出业务错误，上层catch捕获
      return Promise.reject({ type: 'business', ...resData })
    }
    // 业务成功，直接返回data字段
    return resData.data
  },

  // ========= 网络层面错误拦截（断网、超时、500、404） =========
  onResponseError({ response, options, request, error }) {
    const url = String(request)
    const method = options.method || 'GET'
    const reqKey = generateRequestKey(url, method, options.params || options.body)
    pendingRequestMap.delete(reqKey)

    if (error?.name === 'AbortError') {
      // 手动取消的请求，不弹toast
      return Promise.reject({ type: 'cancel', message: '请求被取消' })
    }

    let errMsg = '网络异常，请稍后重试'
    if (!response) {
      errMsg = '网络连接失败，请检查网络'
    } else {
      switch (response.status) {
        case 404:
          errMsg = '请求资源不存在(404)'
          break
        case 500:
          errMsg = '服务器内部错误(500)'
          break
        case 403:
          errMsg = '没有访问权限(403)'
          break
      }
    }
    showToast(errMsg)
    return Promise.reject({ type: 'network', message: errMsg, error })
  },
})

// 封装通用方法，带上泛型
export function useHttp() {
  return {
    get: <T = any>(url: string, params?: Record<string, any>, opts?: FetchOptions<'json'>) => {
      return http<T>(url, { ...opts, method: 'GET', params })
    },
    post: <T = any>(url: string, body?: Record<string, any>, opts?: FetchOptions<'json'>) => {
      return http<T>(url, { ...opts, method: 'POST', body })
    },
    put: <T = any>(url: string, body?: Record<string, any>, opts?: FetchOptions<'json'>) => {
      return http<T>(url, { ...opts, method: 'PUT', body })
    },
    del: <T = any>(url: string, body?: Record<string, any>, opts?: FetchOptions<'json'>) => {
      return http<T>(url, { ...opts, method: 'DELETE', body })
    },
  }
}

export default http
