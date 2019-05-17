import qs from 'qs' // qs模块（序列化）

// 防止浏览器禁用localStorage或隐身模式时出错
let token = null
let userInfo = null
try {
  // 优先从localStorage中取值，避免刷新页面后修改复原，应用中直接取state值
  if (localStorage.getItem('token')) {
    token = localStorage.getItem('token')
  }
  if (localStorage.getItem('userInfo')) {
    userInfo = qs.parse(localStorage.getItem('userInfo'))
  }
} catch (e) {
  console.log('localStorage 被禁用！')
}

export default {
  token: token,
  userInfo: userInfo,
  title: ''
}
