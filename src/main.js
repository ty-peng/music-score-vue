// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import './../src/assets/css/iview-theme.less'
import './../src/assets/css/coverIview.css'
import './../src/assets/css/normal.css'
// 部分引入，注意更改 .babelrc 文件配置
/* import { Row } from 'iview'
Vue.component('Row', Row)
 */

Vue.use(iView)

Vue.prototype.$http = axios
Vue.prototype.$Loading = iView.LoadingBar
Vue.prototype.$Notice = iView.Notice
Vue.prototype.$Message = iView.Message
// Vue.prototype.$IVIEW = {}

iView.Notice.config({
  top: 200,
  duration: 2
})

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
