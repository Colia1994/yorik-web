import { EnvType, EIRequestConfig } from './type'

export const DEFAULT_REQUEST_CONFIG: EIRequestConfig = {
  [EnvType.Pro]: {
    PROTOCOL: 'https',
    FE_DOMAIN: 'hydodo.com',
    BE_DOMAIN: 'www.hydodo.com',
    INNER_URL: 'http://192.168.8.104/ei-ob/moon',
  },
  [EnvType.Dev]: {
    PROTOCOL: 'https',
    FE_DOMAIN: 'hydodo-dev.com',
    BE_DOMAIN: 'www.hydodo.com',
    // BE_DOMAIN: '192.168.31.24:8080'
  },
}

export const SSO_CONFIG = {
  [EnvType.Pro]: {
    LOGIN_URL: 'https://hydodo.com/cas/login',
    SERVICE_URL: '',
  },
  [EnvType.Dev]: {
    LOGIN_URL: 'https://hydodo.com/cas/login',
    SERVICE_URL: '',
  },
}

export const LOGOUT_SERVICE_URL = 'ei-oaac/cas/logout'

export enum EIStatusCode {
  NoSSO = 278,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
}

export enum EIErrorCode {
  SiteVPNForbidden = 800010006, // 站点级别vpn禁止访问
  PageVPNForbidden = 800010010, // 页面级别vpn禁止访问
  SiteVPNApply = 800010005, // 站点级别vpn可申请访问
  PageVPNApply = 800010009, // 页面级别vpn可申请访问
  SiteForbidden = 800010008, // 站点级别403
  PageForbidden = 800010001, // 页面级别403
  ErrorForbidden = 800010007, // 报错提示无权限
}
