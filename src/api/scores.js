/**
 * Home模块接口列表
 */

import base from './base' // 导入接口域名列表
import axios from './http' // 导入http中创建的axios实例

const scores = {
  // 加载列表
  loadList (scoresQo) {
    return axios.post(`${base.baseUrl}/scores/${scoresQo.cate}`, scoresQo)
  },
  // 曲谱详情
  scoreDetail (id, params) {
    return axios.get(`${base.baseUrl}/score/${id}`, {
      params: params
    })
  }
}

export default scores
