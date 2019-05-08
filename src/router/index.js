import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Details from '@/pages/Details'
import Cate from '@/pages/Cate'
import Search from '@/pages/Search'
import Cates from '@/pages/Cates'
import Collection from '@/pages/Collection'
import LoginPage from '@/pages/LoginPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        title: '首页 - 有谱'
      }
    },
    {
      path: '/details/:id',
      name: 'details',
      component: Details,
      meta: {
        title: '曲谱详情 - 有谱'
      }
    },
    {
      path: '/cate/:cateId',
      name: 'cate',
      component: Cate,
      meta: {
        title: '指定分类 - 有谱'
      }
    },
    {
      path: '/cate/:cateId/:cateSubId',
      name: 'cate-sub',
      component: Cate
    },
    {
      path: '/search',
      name: 'search',
      component: Search,
      meta: {
        title: '搜索 - 有谱'
      }
    },
    {
      path: '/cates',
      name: 'cates',
      component: Cates,
      meta: {
        title: '分类列表 - 有谱'
      }
    },
    {
      path: '/collection',
      name: 'collection',
      component: Collection,
      meta: {
        title: '我的收藏 - 有谱'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
      meta: {
        title: '登录 - 有谱'
      }
    }
  ]
})
