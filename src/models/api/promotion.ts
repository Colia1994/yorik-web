/**
 * 链接生成管理
 */
import {
  sourceSDK,
} from '@afe/ei-source-sdk'

import {
  ConvertUrlRequest,
  UrlDTO,
  PromotionUrlRequest,
} from '../schema/promotion'

// 转换链接
export const convertUrl = (body: ConvertUrlRequest) => {
  return sourceSDK.wrappedRequest<UrlDTO>({
    url: 'api/promotion/convertUrl',
    body: body,
  })
}

// 生成推广链接
export const generateUrl = (body: PromotionUrlRequest) => {
  return sourceSDK.wrappedRequest<UrlDTO>({
    url: 'api/promotion/generateUrl',
    body: body,
  })
}
