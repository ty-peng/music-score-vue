/**
 * 只能是同步事务操作state
 */
import { CHANGE_TOKEN, CHANGE_USER_INFO } from './mutation-type'

export default {
  [CHANGE_TOKEN] (state, token) {
    state.token = token
  },
  [CHANGE_USER_INFO] (state, userInfo) {
    state.userInfo = userInfo
  }
}
