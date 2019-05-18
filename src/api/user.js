/**
 * 用户接口列表
 */

import base from './base' // 导入接口域名列表
import axios from './http' // 导入http中创建的axios实例

const user = {
  // 登录，post提交token
  login (params) {
    // TODO 加密
    return axios.post(`${base.baseUrl}/user/login`, params)
  },
  // 注销（让服务器注销token）
  logout (params) {
    return axios.post(`${base.baseUrl}/user/logout`, params)
  },
  // 注册
  register (params) {
    return axios.post(`${base.baseUrl}/user/register`, params)
  },
  // 检查用户名/手机/邮箱是否已被使用
  checkAccount ({ account, type }) {
    return axios.get(`${base.baseUrl}/user/accountCheck`, {
      params: {
        account: account,
        type: type
      }
    })
  }
}

export default user
