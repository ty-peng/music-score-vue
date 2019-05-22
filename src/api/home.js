/**
 * Home模块接口列表
 */

import base from './base' // 导入接口域名列表
import axios from './http' // 导入http中创建的axios实例

const home = {
  // 加载热门列表
  loadHotList (scoresQo) {
    return axios.post(`${base.baseUrl}/scores/hot`, scoresQo)
  },
  // 加载最新列表
  loadNewList (scoresQo) {
    return axios.post(`${base.baseUrl}/scores/new`, scoresQo)
  }
}

export default home
