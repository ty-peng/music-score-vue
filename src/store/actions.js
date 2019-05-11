/**
 * 异步操作在action中完成
 */
import { CHANGE_TOKEN, CHANGE_USER_INFO } from './mutation-type'

export default {
  login ({ commit }, token, userInfo) {
    commit(CHANGE_TOKEN, token)
    commit(CHANGE_USER_INFO, userInfo)
  }
}
