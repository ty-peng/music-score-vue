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
  // 搜索
  search (scoresQo) {
    return axios.post(`${base.baseUrl}/search`, scoresQo)
  },
  // 曲谱详情 加载一次views浏览次数+1
  loadDetails (id) {
    return axios.get(`${base.baseUrl}/score/${id}`)
  },
  // 上传曲谱
  uploadScore (scoreInfo) {
    return axios.post(`${base.baseUrl}/score/`, scoreInfo)
  }
}

export default scores
