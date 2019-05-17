/**
 * 只能是同步事务操作state
 */
import * as types from './mutationType'
import qs from 'qs' // qs模块（序列化）

export default {
  // 登录 成功将 token 保存在 localStorage 中，刷新后state初始化时从localStorage 中取值
  [types.LOGIN]: (state, data) => {
    localStorage.token = data.token
    state.token = data.token
    let user = qs.stringify(data) // 要转化成String
    localStorage.userInfo = user
    state.userInfo = data
  },
  // 退出登录 将 token 清空
  [types.LOGOUT]: state => {
    localStorage.removeItem('token')
    state.token = null
    localStorage.removeItem('userInfo')
    state.userInfo = null
  }
}
