import { EIRequest, EIStatusCode } from './base';
import { Message } from '@alifd/next';
import {
  HttpRequestMethod,
  HttpRequestOptions,
  HttpPaginationOptions,
  HttpFileServerOptions,
  HttpResponse,
  RemoteErrorSymbol,
  FILE_SERVER_SUFFIX,
  FILE_SERVER_NAME,
} from './module';
import { isValidSymbol } from './util';
import { HttpPagination } from './pagination';

export class SourceSDK {
  public request: EIRequest
  public callbacks: {
    [method: string]: ((...params: any[]) => void) | null
  } = Object.create(null)

  constructor(request: EIRequest) {
    this.request = request
  }

  get remote() {
    return { on: this.on.bind(this), off: this.off.bind(this) }
  }

  public wrappedRequest = <T>({
    method = HttpRequestMethod.Post,
    url,
    body,
    options,
    config,
  }: HttpRequestOptions): Promise<T> => {
    return new Promise((resolve, reject) => {
      (this.request as any)
        [method]({ url, body, config, options })
        .then((res: HttpResponse<T>) => {
          this.emitRemoteCallback(res)
          if (res.statusCode && res.statusCode === EIStatusCode.Forbidden) {
            reject(res)
          }
          if (config && config.resPromise) {
            // @ts-ignore
            resolve(res)
          }
          if (res && res.success) {
            resolve(res.data!)
          } else {
            // sso 278
            if (res && res.ssoRefuse) {
              return
            }
            // 200 success，业务层应该或有可能需要对该场景进行处理，比如 submit 后端校验失败
            // resolve(res.data!)
            // resolve(res)
            Message.error(res.msg);
            reject(res)
          }
        })
        .catch((e: Error) =>{
          // json failed
          reject(e);
        })
    })
  }

  public wrappedRawRequest = <T>({
    method = HttpRequestMethod.Get,
    url,
    body,
    options,
    config,
  }: HttpRequestOptions): Promise<T> => {
    return new Promise((resolve, reject) => {
      (this.request as any)
        [method]({ url, body, config, options })
        .then((res: HttpResponse<T>) => {
        
          if (res && res.success) {
            resolve(res.data!)
          } else {
            // sso 278
            if (res && res.ssoRefuse) {
              return
            }
            // 200 success，业务层应该或有可能需要对该场景进行处理，比如 submit 后端校验失败
            // resolve(res.data!)
            // resolve(res)
            Message.error(res.msg);
            reject(res)
          }
        })
        .catch((e: Error) => reject(e))
    })
  }

  public wrappedPaginationRequest = <T>(
    httpRequestOptions: HttpRequestOptions,
    paginationOptions?: Partial<HttpPaginationOptions>
  ): HttpPagination<T> => {
    return new HttpPagination(this.request, httpRequestOptions, paginationOptions)
  }

  public fileServerRequest = async <T>({
    token,
    tokenRequest,
    url,
    urlSuffix,
    onError,
    method = HttpRequestMethod.Get,
    body,
  }: HttpFileServerOptions<T>) => {
    const config = Object.assign({ resPromise: true })
    let options = {}
    if (!url) {
      onError && onError('未取到下载url')
      return
    }
    // url
    let fileUrl = `${urlSuffix || `${FILE_SERVER_SUFFIX}/${FILE_SERVER_NAME}/`}${url}`
    if (/^[a-zA-Z]+:\/\//.test(url) || url.indexOf('//') === 0) {
      fileUrl = url
    }
    // 获取token
    if (token) {
      let fileToken
      if (typeof token === 'function') {
        fileToken = await Promise.resolve(token(tokenRequest))
      } else {
        fileToken = token
      }
      if (!fileToken || typeof fileToken !== 'string') {
        onError && onError('获取token错误')
        return
      }
      options = { ...options, headers: { 'Content-Authority': fileToken } }
    }

    const res = (await this.wrappedRawRequest({
      url: fileUrl,
      method,
      body,
      config,
      options,
    })) as any

    if (!res) {
      onError && onError('接口错误')
      return
    }

    if (res.headers.get('Content-Type').indexOf('application/json') > -1 || !res.ok) {
      if (res.status !== EIStatusCode.Unauthorized && res.status !== EIStatusCode.Forbidden) {
        const resJSON = await res.json()
        const errorMsg = resJSON.msg || resJSON.message || resJSON.errorMsg || '接口错误'
        onError && onError(errorMsg, Error(errorMsg))
      }
      return
    }

    const fileBlob = await res.blob()
    const fileBlobSrc = URL.createObjectURL(fileBlob)
    return {
      file: fileBlobSrc,
      contentType: res.headers.get('Content-Type'),
    }
  }

  public destroy() {
    this.callbacks = Object.create(null)
    this.request && this.request.destroy()
  }

  private on(status: RemoteErrorSymbol, callback: (res: Response | HttpResponse<any>) => void) {
    if (Array.isArray(status)) {
      (status as any[]).forEach((s) => {
        if (isValidSymbol(s)) {
          this.callbacks[s.toString()] = callback
        } else {
          console.warn(`Listener Symbol is INVALID: ${s}`)
        }
      })
    } else if (isValidSymbol(status)) {
      this.callbacks[status.toString()] = callback
    } else {
      console.warn(`Listener Symbol is INVALID: ${status}`)
    }
  }

  private off(status: RemoteErrorSymbol) {
    if (Array.isArray(status)) {
      (status as any[]).forEach((s) => {
        if (isValidSymbol(s) && this.callbacks[s.toString()]) {
          this.callbacks[s.toString()] = null
        }
      })
    } else {
      if (this.callbacks[status.toString()]) {
        this.callbacks[status.toString()] = null
      }
    }
  }

  private emitRemoteCallback<T>(res: HttpResponse<T>) {
    if (res.statusCode != undefined && this.callbacks[`${res.statusCode}`]) {
      this.callbacks[`${res.statusCode}`]!(res)
    }
    if (res.errorCode != undefined && this.callbacks[`${res.errorCode}`]) {
      this.callbacks[`${res.errorCode}`]!(res)
    }
  }
}
