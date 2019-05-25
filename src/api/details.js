/**
 * 曲谱详情接口
 */

import base from './base' // 导入接口域名列表
import axios from './http' // 导入http中创建的axios实例

const user = {
  loadScoreDetails (scoreId, userId) {
    return axios.get(`${base.baseUrl}/score/${scoreId}`, {
      params: {
        userId: userId
      }
    })
  }
}

export default user
