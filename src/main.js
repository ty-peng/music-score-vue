// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import './../src/assets/css/iview-theme.less'
import './../src/assets/css/coverIview.css'
import './../src/assets/css/normal.css'
// 部分引入，注意更改 .babelrc 文件配置
/* import {
  Row,
  Col,
  Icon,
  Card,
  Input,
  Button,
  LoadingBar,
  CellGroup,
  Cell,
  Spin,
  BackTop,
  Carousel,
  CarouselItem,
  Checkbox,
  Notice,
  Message,
  Modal,
  Form
} from 'iview'

Vue.component('Row', Row)
Vue.component('Col', Col)
Vue.component('Icon', Icon)
Vue.component('Card', Card)
Vue.component('Input', Input)
Vue.component('Button', Button)
Vue.component('CellGroup', CellGroup)
Vue.component('Cell', Cell)
Vue.component('Spin', Spin)
Vue.component('BackTop', BackTop)
Vue.component('Carousel', Carousel)
Vue.component('CarouselItem', CarouselItem)
Vue.component('Checkbox', Checkbox)
Vue.component('Notice', Notice)
Vue.component('Message', Message)
Vue.component('Modal', Modal)
Vue.component('Form', Form) */

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
  render: h => h(App)
})
