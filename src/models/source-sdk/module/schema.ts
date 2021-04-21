import { EnvType, EIFetchConfig, EIStatusCode } from '../base'

/**
 * Request
 */

export enum HttpRequestMethod {
  Get = 'get',
  Post = 'post',
  Put = 'put',
  Delete = 'delete',
  Patch = 'patch',
}

export type HttpRequestOptions = {
  url: string
  method?: HttpRequestMethod
  body?: any | BodyInit
  options?: RequestInit
  config?: EIFetchConfig
}

/**
 * 文件服务请求选项
 *
 * @property url - ei 业务端通用的存储格式，通常是 api/*** 形式
 * @property urlSuffix - 移动端需要手传
 * @property token - 获取token的方法或者token
 * @property tokenRequest - 获取token的参数
 * @property onError - 报错回调
 */
export type HttpFileServerOptions<T> = {
  url: string
  urlSuffix?: string
  token?: string | ((tokenRequest?: T) => Promise<string>)
  tokenRequest?: T
  onError?: (errorMsg?: string, error?: Error) => void
  method?: HttpRequestMethod
  body?: any | BodyInit
}

/**
 * 上传服务请求选项
 */
export type HttpFileUploadOptions = {
  api: string
  env: EnvType
  onProgress: (event: { percent: number }) => void
  onError: (event: ProgressEvent<EventTarget> | Error | string, body?: any) => void
  onSuccess: (body: any, xhr?: XMLHttpRequest) => void
  data: any
  filename: string
  file: File
  withCredentials: boolean
  action: string
  headers: any
}

/**
 * 分页接口请求选项
 *
 * @property isImmutableData - 分页数据是否每次请求引用不可变
 */
export type HttpPaginationOptions = {
  page: number
  pageSize: number
  isImmutableData: boolean
}

/**
 * Query
 */

export type HttpPageRequestQuery = {
  page: number
  pageSize: number
}

export type HttpSearchRequestQuery = {
  query?: string
}

/**
 * Response
 */

/**
 * 后端返回体
 *
 * @property success - 业务请求成功 标志位
 * @property result - 数据
 * @property arguments - 后端报错相关参数，useless in FE
 * @property errorCode - json 后端 错误码
 * @property errorMsg - 后端返回错误信息 4XX or 5XX
 * @property ssoRefuse - sso 校验失败标志位
 * @property statusCode - HTTP status code
 */
export type HttpResponse<T> = {
  success: boolean
  data: T | null
  msg: string
  arguments: any | null
  errorCode: number
  errorMsg: string
  ssoRefuse?: boolean
  statusCode: number
}

/**
 * 后端分页返回体
 *
 * @property list - 数据列表
 * @property pageSize - 每页个数
 * @property pageNum - 第几页
 * @property total - 数据总量，查找开销过大时省略
 */
export type HttpPaginationResponse<T> = {
  list: T[]
  pageSize: number
  pageNum: number
  hasPreviousPage: boolean
  hasNextPage: boolean
  total?: number
}

/**
 * 事件监听标识符，用于监听后端报错码，errorCode等，处理回调
 */
export type RemoteErrorSymbol = EIStatusCode | number | string | EIStatusCode[] | number[] | string[]
