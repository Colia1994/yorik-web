/**
 * 登陆管理
 */
import {
  sourceSDK,
} from '@/models/source-sdk';

import {
  UserRequest,
  SysUser,
} from '../schema/login';

// 登陆
export const loginIn = (body: UserRequest) => {
  return sourceSDK.wrappedRequest<UserRequest>({
    url: 'api/user/login',
    body: body,
  })
};

// 登出
export const logout = () => {
  return sourceSDK.wrappedRequest<UserRequest>({
    url: 'api/user/logout',
  })
};

// 获取登陆用户
export const currentUser = () => {
  return sourceSDK.wrappedRawRequest<SysUser>({
    url: 'api/user/currentUser',
  })
};

// 注册
export const register = (body: UserRequest) => {
  return sourceSDK.wrappedRequest<SysUser>({
    url: 'api/user/register',
    body: body,
  })
};
