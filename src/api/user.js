/**
 * 用户接口列表
 */

import base from './base' // 导入接口域名列表
import axios from './http' // 导入http中创建的axios实例
import qs from 'qs' // 根据需求是否导入qs模块（序列化）

const user = {
  // 登录，post提交token
  login (params) {
    return axios.post(`${base.baseUrl}/login`, qs.stringify(params))
  },
  // 注销（让服务器注销token）
  logout (params) {
    return axios.post(`${base.baseUrl}/logout`, qs.stringify(params))
  }
}

export default user
