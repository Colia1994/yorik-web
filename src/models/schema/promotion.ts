
export interface AjaxResponse<T = any> {
  data: T
  msg: string // 描述性原因
  success: boolean // 是否成功: true or false
}

export interface ConvertUrlRequest {
  customParameters: string // 自定义参数
  sourceType: number // 数据源类型 1 pdd 2 淘宝
  sourceUrl: string // 原链接
}

export interface PromotionUrlRequest {
  customParameters: string // 自定义参数
  generateMallCollectCoupon: boolean // 是否生成店铺收藏券推广链接
  generateQqApp: boolean // 是否生成qq小程序
  generateSchemaUrl: boolean // 是否返回 schema URL
  generateShortUrl: boolean // 是否生成短链接，true-是，false-否
  generateWeApp: boolean // 是否生成小程序推广
  generateWeappWebview: boolean // 是否生成唤起微信客户端链接，true-是，false-否，默认false
  generateWeiboappWebview: boolean // 是否生成微博推广链接
  goodsId: number // 商品ID，仅支持单个查询
  multiGroup: boolean // true--生成多人团推广链接 false--生成单人团推广链接（默认false）1、单人团推广链接：用户访问单人团推广链接，可直接购买商品无需拼团。2、多人团推广链接：用户访问双人团推广链接开团，若用户分享给他人参团，则开团者和参团者的佣金均结算给推手
  searchId: string // 搜索id 通过推荐和搜索接口获取 增加收益
  sourceType: number // 数据源类型 1 pdd 2 淘宝
}

export interface UrlDTO {
  pddShortUrl: string // 唤醒拼多多app的推广短链接
  pddUrl: string // 唤醒拼多多app的推广长链接
  schemaUrl: string // schema的链接
  shortUrl: string // 推广短链接
  url: string // 推广长链接
  weAppInfo: WeAppInfoDTO // 微信小程序相关信息
  weAppWebViewShortUrl: string // 唤起微信app推广短链接
  weAppWebViewUrl: string // 唤起微信app推广链接
}

export interface WeAppInfoDTO {
  appId: string // 拼多多小程序id
  bannerUrl: string // Banner图
  desc: string // 描述
  pagePath: string // 小程序path值
  sourceDisplayName: string // 来源名
  title: string // 小程序标题
  userName: string // 用户名
  weAppIconUrl: string // 小程序图片
}
