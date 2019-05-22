import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Scores from '@/pages/Scores'
import Details from '@/pages/Details'
import Cate from '@/pages/Cate'
import Search from '@/pages/Search'
import Cates from '@/pages/Cates'
import Collection from '@/pages/Collection'
import LoginPage from '@/pages/LoginPage'
import Register from '@/pages/Register'
import User from '@/pages/User'
import Upload from '@/pages/Upload'
import ScoresList from '@/components/ScoresList'
import NotFound from '@/pages/NotFound'

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
      path: '/scores',
      component: Scores,
      meta: {
        title: '谱库 - 有谱'
      },
      children: [
        {
          path: 'piano',
          name: 'piano',
          component: ScoresList,
          meta: {
            title: '钢琴曲谱'
          }
        },
        {
          path: 'guitar',
          component: ScoresList
        },
        {
          path: 'ukulele',
          component: ScoresList
        },
        {
          path: '',
          redirect: 'piano'
        }
      ]
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
      path: '/search',
      name: 'search',
      component: Search,
      meta: {
        title: '搜索 - 有谱'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
      meta: {
        title: '登录 - 有谱'
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        title: '注册 - 有谱'
      }
    },
    {
      path: '/user/:account',
      name: 'user',
      component: User,
      meta: {
        title: '个人中心 - 有谱',
        requireAuth: true
      }
    },
    {
      path: '/upload',
      name: 'upload',
      component: Upload,
      meta: {
        title: '上传曲谱 - 有谱',
        requireAuth: true
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
      path: '/cates',
      name: 'cates',
      component: Cates,
      meta: {
        title: '分类列表 - 有谱'
      }
    },
    {
      path: '/user/:account/collection',
      name: 'collection',
      component: Collection,
      meta: {
        title: '我的收藏 - 有谱',
        requireAuth: true
      }
    },
    {
      path: '*',
      name: '404',
      component: NotFound
    }
  ]
})
