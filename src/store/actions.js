/**
 * 异步操作在action中完成
 */
import mutationType from './mutation-type'

export default {
  login ({ commit }, token, userInfo) {
    commit(mutationType.CHANGE_TOKEN, token)
    commit(mutationType.CHANGE_USER_INFO, userInfo)
  }
}
