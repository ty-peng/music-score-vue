/**
 * 只能是同步事务操作state
 */
import mutationType from './mutation-type'

export default {
  [mutationType.CHANGE_TOKEN] (state, token) {
    state.token = token
  },
  [mutationType.CHANGE_USER_INFO] (state, userInfo) {
    state.userInfo = userInfo
  }
}
