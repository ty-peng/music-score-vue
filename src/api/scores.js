/**
 * Home模块接口列表
 */

import base from './base' // 导入接口域名列表
import axios from './http' // 导入http中创建的axios实例

const home = {
  // 热门列表
  hotList (scoresQo) {
    return axios.post(`${base.baseUrl}/scores/hot`, scoresQo)
  },
  // 最新列表
  newList (scoresQo) {
    return axios.post(`${base.baseUrl}/scores/new`, scoresQo)
  },
  // 曲谱详情
  scoreDetail (id, params) {
    return axios.get(`${base.baseUrl}/score/${id}`, {
      params: params
    })
  }
}

export default home
