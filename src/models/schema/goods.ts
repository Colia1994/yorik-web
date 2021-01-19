
export interface AjaxResponse<T = any> {
  data: T
  msg: string // 描述性原因
  success: boolean // 是否成功: true or false
}

export interface GoodsCatDTO {
  catId: number // 商品类目ID
  catName: string // 商品类目名称
}

export interface GoodsCatsDTO {
  goodsCatsList: GoodsCatDTO[] // 类目树对象
}

export interface GoodsDetailDTO {
  catId: string // 商品类目id
  catIds: number[] // 商品一~四级类目ID列表
  categoryId: string // 类目id
  categoryName: string // 分类名称
  couponDiscount: number // 优惠券面额,单位为分
  couponEndTime: number // 优惠券失效时间,UNIX时间戳
  couponMinOrderAmount: number // 优惠券门槛价格,单位为分
  couponPrice: number // 优惠券金额
  couponRemainQuantity: number // 优惠券剩余数量
  couponStartTime: number // 优惠券生效时间,UNIX时间戳
  couponTotalQuantity: number // 优惠券总数量
  goodsDesc: string // 商品描述
  goodsFactPrice: number // 商品实际价格
  goodsGalleryUrls: string[] // 商品详情图列表
  goodsId: number // 商品id
  goodsImageUrl: string // 商品主图
  goodsMarkPrice: number // 商品标准价格
  goodsName: string // 商品名称
  goodsThumbnailUrl: string // 商品缩略图
  goodsType: number // 商品类型
  hasCoupon: boolean // 商品是否带券,true-带券,false-不带券
  mallId: number // 商家id
  mallName: string // 店铺名称
  merchantType: string // 商家类型
  minGroupPrice: number // 最小成团价格，单位分
  minNormalPrice: number // 最小单买价格，单位分
  optId: string // 商品标签类目ID,使用pdd.goods.opt.get获取
  promotionRate: number
  salesTip: string // 销售量
  searchId: string // 搜索id，建议生成推广链接时候填写，提高收益。
  shareDesc: string // 分享描述
}

export interface GoodsDetailRequest {
  goodsId: number // 商品id
  pid: string // 推广位id
  planType: number // 佣金优惠券对应推广类型，3：专属 4：招商
  searchId: string // 搜索id
  sourceType: number // 数据源类型 1 pdd 2 淘宝
}

export interface GoodsListDTO {
  current: number
  listId: string
  records: GoodsDetailDTO[]
  searchId: string // 搜索id，建议生成推广链接时候填写，提高收益
  total: number
}

export interface GoodsRecommendRequest {
  catId: number // 猜你喜欢场景的商品类目，20100-百货，20200-母婴，20300-食品，20400-女装，20500-电器，20600-鞋包，20700-内衣，20800-美妆，20900-男装，21000-水果，21100-家纺，21200-文具,21300-运动,21400-虚拟,21500-汽车,21600-家装,21700-家具,21800-医药;
  channelType: number // 0-1.9包邮, 1-今日爆款, 2-品牌清仓,3-相似商品推荐,4-猜你喜欢,5-实时热销,6-实时收益,7-今日畅销,8-高佣榜单，默认1
  listId: string // pdd翻页需要传入上一页返回的listId
  pageNo: number // 页码
  pageSize: number // 每页行数
  sourceType: number // 数据源类型 1 pdd 2 淘宝
}

export interface GoodsSearchRequest {
  activityTags: number[] // 商品活动标记数组，例：[4,7]，4-秒杀 7-百亿补贴等
  catId: number // 商品类目id
  goodsIdList: number[] // goods_id_list
  isBrandGoods: boolean // 是否为品牌商品
  keyword: string // 商品关键词，与opt_id字段选填一个或全部填写
  listId: string // pdd翻页需要传入上一页返回的listId
  merchantType: number // 店铺类型，1-个人，2-企业，3-旗舰店，4-专卖店，5-专营店，6-普通店（未传为全部
  merchantTypeList: number[] // 店铺类型数组
  optId: number // 商品标签类目ID
  pageNo: number // 页码
  pageSize: number // 每页行数
  pid: string // 推广位id
  rangeList: RangeListItem[] // range_list
  sortType: number // 排序方式:0-综合排序;1-按佣金比率升序;2-按佣金比例降序;3-按价格升序;4-按价格降序;5-按销量升序;6-按销量降序;7-优惠券金额排序升序;8-优惠券金额排序降序;9-券后价升序排序;10-券后价降序排序;11-按照加入多多进宝时间升序;12-按照加入多多进宝时间降序;13-按佣金金额升序排序;14-按佣金金额降序排序;15-店铺描述评分升序;16-店铺描述评分降序;17-店铺物流评分升序;18-店铺物流评分降序;19-店铺服务评分升序;20-店铺服务评分降序;27-描述评分击败同类店铺百分比升序，28-描述评分击败同类店铺百分比降序，29-物流评分击败同类店铺百分比升序，30-物流评分击败同类店铺百分比降序，31-服务评分击败同类店铺百分比升序，32-服务评分击败同类店铺百分比降序
  sourceType: number // 数据源类型 1 pdd 2 淘宝
  withCoupon: boolean // 是否只返回优惠券的商品，false返回所有商品，true只返回有优惠券的商品
}

export interface RangeListItem {
  rangeFrom: number // 区间的开始值
  rangeId: number // 0，最小成团价 1，券后价 2，佣金比例 3，优惠券价格 4，广告创建时间 5，销量 6，佣金金额 7，店铺描述分 8，店铺物流分 9，店铺服务分 10， 店铺描述分击败同行业百分比 11， 店铺物流分击败同行业百分比 12，店铺服务分击败同行业百分比 13，商品分 17 ，优惠券/最小团购价 18，过去两小时pv 19，过去两小时销量
  rangeTo: number // 区间的结束值
}
