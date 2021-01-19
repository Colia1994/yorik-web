import { EIRequest } from './base'
import {
  HttpRequestOptions,
  HttpResponse,
  HttpPaginationResponse,
  HttpPaginationOptions,
  HttpRequestMethod,
} from './module'

export class HttpPagination<T> {
  private request: EIRequest
  private httpRequestOptions: HttpRequestOptions
  private paginationRequest: () => Promise<HttpPaginationResponse<T>>
  private pageSize: number = 10
  private pageNum: number = 1
  private hasNextPage: boolean = false
  private isImmutableData: boolean = false
  private dataList: T[] | null = null
  private total?: number

  constructor(
    request: EIRequest,
    httpRequestOptions: HttpRequestOptions,
    paginationOptions?: Partial<HttpPaginationOptions>
  ) {
    this.request = request
    this.httpRequestOptions = httpRequestOptions
    if (paginationOptions) {
      const { pageSize, page, isImmutableData } = paginationOptions
      this.pageSize = pageSize ? pageSize : this.pageSize
      this.pageNum = page ? page : this.pageNum
      this.isImmutableData = isImmutableData ? isImmutableData : this.isImmutableData
    }
    this.paginationRequest = this.loadRequest()
  }

  get data() {
    return this.dataList
  }

  get hasMore() {
    if (this.dataList === null) {
      return true
    }

    return typeof this.total === 'number' ? (this.pageNum - 1) * this.pageSize < this.total : this.hasNextPage
  }

  get totalNum() {
    return this.total
  }

  set page(newPageNum: number) {
    this.pageNum = newPageNum
  }

  private getPageBody(body?: URLSearchParams) {
    return !body
      ? {}
      : {
          ...body,
          page: this.pageNum,
          pageSize: this.pageSize,
        }
  }

  private loadRequest(): () => Promise<HttpPaginationResponse<T>> {
    const { method = HttpRequestMethod.Get, url, body, config, options } = this.httpRequestOptions

    return () => {
      return new Promise((resolve, reject) => {
        (this.request as any)
          [method](url, this.getPageBody(body as URLSearchParams), config, options)
          .then((res: HttpResponse<HttpPaginationResponse<T>>) => {
            if (res && res.success) {
              resolve(res.result!)
            } else {
              reject()
            }
          })
          .catch((e: Error) => reject(e))
      })
    }
  }

  public fetch() {
    return this.paginationRequest().then((res: HttpPaginationResponse<T>) => {
      this.dataList = res.list
      this.pageNum = res.pageNum + 1
      this.total = res.total
      this.hasNextPage = res.hasNextPage
      this.paginationRequest = this.loadRequest()

      return res
    })
  }

  public fetchMore() {
    if (!this.dataList) {
      throw new Error('First time fetch of Pagination hasn’t been triggered yet. Try to call .fetch() instead.')
    }

    return this.paginationRequest().then((res: HttpPaginationResponse<T>) => {
      if (this.isImmutableData) {
        this.dataList!.push(...res.list)
      } else {
        this.dataList = [...this.dataList!, ...(res.list || [])]
      }
      this.pageNum = res.pageNum + 1
      this.total = res.total
      this.hasNextPage = res.hasNextPage
      this.paginationRequest = this.loadRequest()

      return res
    })
  }
}
