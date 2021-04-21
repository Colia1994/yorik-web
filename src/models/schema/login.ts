
export interface AjaxResponse<T = any> {
  data: T
  msg: string // 描述性原因
  success: boolean // 是否成功: true or false
}

export interface UserRequest {
  userName: string // 用户名
  password: string // 密码
  confirmPwd: string //确认密码
}


export interface SysUser {
  userName: string // 用户名
}


