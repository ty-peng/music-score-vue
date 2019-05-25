/**
 * api接口的统一出口
 */
import home from '@/api/home'
import user from '@/api/user'
import scores from '@/api/scores'
import details from '@/api/details'

// 导出接口
export default {
  home,
  user,
  scores,
  details
}
