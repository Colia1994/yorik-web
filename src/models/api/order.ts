/**
 * 订单管理
 */
import {
  sourceSDK,
} from '@afe/ei-source-sdk'

import {
  QueryOrderIncRequest,
  订单列表,
  QueryOrderRangeRequest,
} from '../schema/order'

// 查询增量订单
export const getIncOrderList = (body: QueryOrderIncRequest) => {
  return sourceSDK.wrappedRequest<订单列表>({
    url: 'api/order/queryIncOrder',
    body: body,
  })
}

// 用时间段查询推广订单
export const getOrderListByTime = (body: QueryOrderRangeRequest) => {
  return sourceSDK.wrappedRequest<订单列表>({
    url: 'api/order/queryOrderByTime',
    body: body,
  })
}
