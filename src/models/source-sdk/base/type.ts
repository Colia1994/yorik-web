/**
 * 环境变量
 */
export enum EnvType {
  Pro = 'production',
  Dev = 'development',
}

/**
 * 每个环境对应的配置
 */
export type EIRequestConfigUrlMap = {
  PROTOCOL: string
  FE_DOMAIN: string[] | string
  BE_DOMAIN: string[] | string
  INNER_URL?: string
  LOGIN_URL?: string
  SERVICE_URL?: string
}

export type EIRequestConfig = Record<EnvType, EIRequestConfigUrlMap>

export type EIRequestCustomConfig = Partial<Record<EnvType, Partial<EIRequestConfigUrlMap>>>

export type EIRequestOnError = (errorMsg?: string, error?: Error) => void

/**
 * fetch api 前端自定义配置项
 *
 * @property resPromise - 是否返回裸的 response body
 * @property withoutCredentials - 是否不携带 cookie
 * @property withoutConvert - 不对传入的数据进行格式化处理
 */
export type EIFetchConfig = {
  resPromise?: boolean
  withoutCredentials?: boolean
  withoutConvert?: boolean
}

/**
 * fetch api 请求方法
 */
export enum FetchMethod {
  Get = 'GET',
  Post = 'POST',
  Put = 'PUT',
  Delete = 'DELETE',
  Patch = 'PATCH',
}

/**
 * fetch api 请求参数
 */
export type FetchOptions = {
  url: string
  body?: any | BodyInit
  options?: RequestInit
  config?: EIFetchConfig
}
