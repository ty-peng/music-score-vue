/**
 * Home模块接口列表
 */

import base from './base' // 导入接口域名列表
import axios from './http' // 导入http中创建的axios实例
import qs from 'qs' // 根据需求是否导入qs模块（序列化）

const home = {
  // 热门列表
  hotList () {
    return axios.get(`${base.baseUrl}/scores/hot`)
  },
  // 最新列表
  newList () {
    return axios.get(`${base.baseUrl}/scores/new`)
  },
  // 曲谱详情
  scoreDetail (id, params) {
    return axios.get(`${base.baseUrl}/score/${id}`, {
      params: params
    })
  },
  // 登录，post提交token
  login (params) {
    return axios.post(`${base.baseUrl}/login`, qs.stringify(params))
  }
  // 其他接口…………
}

export default home
