/**
 * 用户接口列表
 */

import base from './base' // 导入接口域名列表
import axios from './http' // 导入http中创建的axios实例

const user = {
  // 登录，post提交token
  login (params) {
    // TODO 加密
    return axios.post(`${base.baseUrl}/login`, params)
  },
  // 注销（让服务器注销token）
  logout (params) {
    return axios.post(`${base.baseUrl}/logout`, params)
  },
  // 注册
  register (params) {
    return axios.post(`${base.baseUrl}/register`, params)
  },
  // 检查用户名/手机/邮箱是否已被使用
  checkAccount ({ account, type }) {
    return axios.get(`${base.baseUrl}/accountCheck`, {
      params: {
        account: account,
        type: type
      }
    })
  },
  // 加载用户信息
  loadUserInfo (id) {
    return axios.get(`${base.baseUrl}/user/${id}`)
  },
  // 更新用户信息
  updateUser (updatedUserInfo) {
    let id = updatedUserInfo.id
    // patch 部分更新
    return axios.patch(`${base.baseUrl}/user/${id}`, updatedUserInfo)
  }
}

export default user
