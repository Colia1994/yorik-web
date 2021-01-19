
export interface AjaxResponse<T = any> {
  data: T
  msg: string // 描述性原因
  success: boolean // 是否成功: true or false
}

export interface QueryOrderIncRequest {
  endTime: string // 截止时间
  page: number // 页码
  pageSize: number // 每页数目
  sourceType: number // 数据源类型 1 pdd 2 淘宝
  startTime: string // 开始时间
}

export interface QueryOrderRangeRequest {
  endTime: string // 截止时间
  lastOrderId: string // 第二页后传回上次的订单id（每次查询会返回）
  pageSize: number // 每次查询数目
  sourceType: number // 数据源类型 1 pdd 2 淘宝
  startTime: string // 开始时间
}

export interface 订单列表 {
  lastOrderId: string // 查询最后一个订单id，用于下一页
  orderList: 订单详情[] // 订单集合
  totalCount: number // 数目
}

export interface 订单详情 {
  authDuoId: number
  batchNo: string
  catIds: number[]
  cpaNew: number
  customParameters: string
  failReason: string
  goodsId: number // 商品id
  goodsName: string
  goodsPrice: number
  goodsQuantity: number
  goodsThumbnailUrl: string
  groupId: number
  isDirect: number
  orderAmount: number
  orderCreateTime: number
  orderGroupSuccessTime: number
  orderModifyAt: number
  orderPayTime: number
  orderReceiveTime: number
  orderSettleTime: number
  orderSn: string
  orderStatus: number
  orderStatusDesc: string
  orderVerifyTime: number
  pid: string
  promotionAmount: number
  promotionRate: number
  type: number
  zsDuoId: number
}
