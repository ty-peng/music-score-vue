// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import api from './api'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import './assets/css/iview-theme.less'
import './assets/css/normal.css'

Vue.use(iView)

Vue.prototype.$api = api
Vue.prototype.$Loading = iView.LoadingBar
Vue.prototype.$Notice = iView.Notice
Vue.prototype.$Message = iView.Message

iView.Notice.config({
  top: 200,
  duration: 2
})

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  // title
  if (to.meta.title) {
    document.title = to.meta.title
  }
  // 需要登录
  if (to.meta.requireAuth) {
    // 已登录
    if (store.getters.isLogin) {
      next()
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    }
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
