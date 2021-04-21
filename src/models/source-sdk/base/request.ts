import { request } from 'ice';
import { AxiosResponse } from 'axios';

import {
  EnvType,
  EIRequestConfig,
  EIRequestCustomConfig,
  EIFetchConfig,
  EIRequestOnError,
  FetchOptions,
  FetchMethod,
} from './type'
import { DEFAULT_REQUEST_CONFIG, SSO_CONFIG, LOGOUT_SERVICE_URL, EIStatusCode } from './constants'
import { deepMergeConfig } from './util'

// 本地服务https调试
// const https = require('https')
// const agent = new https.Agent({
//   rejectUnauthorized: false,
// }

// 支持受控
export class EIRequest {
  private _envType: EnvType | null
  private config: EIRequestConfig
  private onErrorCallback: EIRequestOnError | null = null

  constructor(config: EIRequestConfig) {
    this._envType = null
    this.config = config || DEFAULT_REQUEST_CONFIG
  }

  get envConfig() {
    if (!this.envType) {
      return DEFAULT_REQUEST_CONFIG[EnvType.Dev]
    }

    const cfg = this.config[this.envType]
    return {
      ...cfg,
      ...SSO_CONFIG[this.envType],
    }
  }

  /**
   * 重新自定义实例的配置项
   *
   * @param value {EIRequestCustomConfig}
   */
  set customConfig(value: EIRequestCustomConfig) {
    const original = this.envType ? this.config : DEFAULT_REQUEST_CONFIG
    this.config = deepMergeConfig(original, value)
  }

  get envType() {
    // customize
    if (this._envType) {
      return this._envType
    }

    // server side
    if (typeof window == 'undefined') {
      // 金丝雀配环境变量注意，请保持一致 development, uat, production
      return process.env.NODE_ENV as EnvType
    }

    // client side
    const host = window.location?.host
    for (const env in this.config) {
      if (this.config.hasOwnProperty(env)) {
        const envConfig = (this.config as any)[env]
        const { FE_DOMAIN } = envConfig
        if (Array.isArray(FE_DOMAIN) && FE_DOMAIN.find((domain: string) => domain === host)) {
          return env as EnvType
        } else if (typeof FE_DOMAIN === 'string' && FE_DOMAIN === host) {
          return env as EnvType
        }
      }
    }

    // default
    return EnvType.Dev
  }

  /**
   * @param value {ENV_TYPE}
   */
  set envType(value: EnvType | null) {
    this._envType = value
  }

  get backendDomain() {
    const { BE_DOMAIN, FE_DOMAIN, PROTOCOL } = this.envConfig
    const host = window.location?.host
    let requestUrl = BE_DOMAIN
    if (Array.isArray(BE_DOMAIN) && Array.isArray(FE_DOMAIN)) {
      const target = FE_DOMAIN.findIndex((domain: string) => domain === host)
      if (target > -1) {
        requestUrl = BE_DOMAIN[target]
      }
    }
    return `${PROTOCOL}://${requestUrl}`
  }

  set onError(callback: EIRequestOnError) {
    this.onErrorCallback = callback
  }

  getBaseRequestUrl(api: string, config?: EIFetchConfig) {
    if (/^[a-zA-Z]+:\/\//.test(api) || api.indexOf('//') === 0) {
      return api
    }
    // if (!this.envConfig) return '';
    // server inner url for production env
    if (typeof window == 'undefined' && config && this.envConfig.INNER_URL) {
      return `${this.envConfig.INNER_URL}/${api}`
    }
    return `${this.backendDomain}/${api}`
  }

  getFileFullUrl(backendShortUri: string) {
    return this.getBaseRequestUrl(`ei-ob-file/${backendShortUri}`)
  }

  logOut() {
    const baseUrl = this.backendDomain.replace(/\/(moon|sun)\/?[a-z-]*$/, '/sun')
    if (typeof window != 'undefined') {
      window.open(`${baseUrl}/${LOGOUT_SERVICE_URL}`, '_self')
    }
  }

  destroy() {
    this.onErrorCallback = null
  }

  handleSSORedirect() {
    // sso service url always support outer network visit
    const sunUrl = this.backendDomain.replace(/\/(moon|sun)\/?[a-z-]*$/, '/sun')
    const ssoServiceUrl = `${sunUrl}/ei-oaac/login/cas`
    const errorPage = `${window.location.origin}/error`
    const redirectUrl = `${window.location.href}&error_page=${errorPage}`
    const service = `${ssoServiceUrl}?redirect=${encodeURIComponent(redirectUrl)}`
    window.open(`${this.envConfig.LOGIN_URL}?service=${encodeURIComponent(service)}`, '_self')
  }


  private async fetch(url: string, options: RequestInit, config: EIFetchConfig = {}) {
    const fetchUrl = this.getBaseRequestUrl(url, config)
    // this.envType === ENV_TYPE.DEV && (opt.value = { agent });
    let opt = {
      ...options,
      url: fetchUrl,
      data: options.body,
      header: { ...options.headers },
      withCredentials: true,
      credentials: config.withoutCredentials ? undefined : 'include',
    }
    return await request(opt)
  }

  async get({ url, options, config = {} }: FetchOptions) {
    const opt: RequestInit = {
      ...options,
      method: FetchMethod.Get,
      headers: { 'Content-Type': 'application/json', ...(options && options.headers) },
      credentials: config.withoutCredentials ? undefined : 'include',
    }
    return await this.fetch(url, opt, config)
  }

  async post({ url, body, options, config = {} }: FetchOptions) {
    const isFormData = Object.prototype.toString.apply(body) === '[object FormData]'
    const opt: RequestInit = {
      ...options,
      method: FetchMethod.Post,
      body: isFormData || config.withoutConvert ? body! : JSON.stringify(body),
      headers: isFormData
        ? options && options.headers
        : { 'Content-Type': 'application/json', ...(options && options.headers) },
      credentials: config.withoutCredentials ? undefined : 'include',
    }

    return await this.fetch(url, opt, config)
  }

  async put({ url, body, options, config = {} }: FetchOptions) {
    const opt: RequestInit = {
      ...options,
      method: FetchMethod.Put,
      body: config.withoutConvert ? body : JSON.stringify(body),
      headers: { 'Content-Type': 'application/json', ...(options && options.headers) },
      credentials: 'include',
    }
    return await this.fetch(url, opt, config)
  }

  async patch({ url, body, options, config = {} }: FetchOptions) {
    const opt: RequestInit = {
      ...options,
      method: FetchMethod.Patch,
      body: config.withoutConvert ? body : JSON.stringify(body),
      headers: { 'Content-Type': 'application/json', ...(options && options.headers) },
      credentials: 'include',
    }
    return await this.fetch(url, opt, config)
  }

  async del({ url, body, options, config = {} }: FetchOptions) {
    const opt: RequestInit = {
      ...options,
      method: FetchMethod.Delete,
      body: config.withoutConvert ? body : JSON.stringify(body),
      headers: { 'Content-Type': 'application/json', ...(options && options.headers) },
      credentials: 'include',
    }
    return await this.fetch(url, opt, config)
  }

  static createRequest(config?: EIRequestConfig) {
    if (!config && typeof window == 'undefined') {
      console.warn("App's ei-source-sdk will use default config!!!")
    }
    return new EIRequest({ ...DEFAULT_REQUEST_CONFIG, ...config })
  }
}
