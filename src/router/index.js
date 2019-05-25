import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Scores from '@/pages/Scores'
import Details from '@/pages/Details'
import Cate from '@/pages/Cate'
import Search from '@/pages/Search'
import Cates from '@/pages/Cates'
import LoginPage from '@/pages/LoginPage'
import Register from '@/pages/Register'
import User from '@/pages/User'
import UserInfo from '@/components/UserInfo'
import UserSetting from '@/components/UserSetting'
import UserCollection from '@/components/UserCollection'
import UserUploads from '@/components/UserUploads'
import Upload from '@/pages/Upload'
import UserSpace from '@/pages/UserSpace'
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
          name: 'guitar',
          component: ScoresList
        },
        {
          path: 'ukulele',
          name: 'ukulele',
          component: ScoresList
        },
        {
          path: '',
          redirect: 'piano'
        }
      ]
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
      path: '/account',
      name: 'account',
      component: User,
      meta: {
        title: '个人中心 - 有谱',
        requireAuth: true
      },
      children: [
        {
          path: 'info',
          name: 'info',
          component: UserInfo,
          meta: {
            title: '个人信息 - 有谱',
            requireAuth: true
          }
        },
        {
          path: 'setting',
          name: 'setting',
          component: UserSetting,
          meta: {
            title: '账号管理 - 有谱',
            requireAuth: true
          }
        },
        {
          path: 'collection',
          name: 'collection',
          component: UserCollection,
          meta: {
            title: '我的收藏 - 有谱',
            requireAuth: true
          }
        },
        {
          path: 'uploads',
          name: 'uploads',
          component: UserUploads,
          meta: {
            title: '我的收藏 - 有谱',
            requireAuth: true
          }
        }
      ]
    },
    {
      path: '/user/:id',
      name: 'user',
      component: UserSpace,
      meta: {
        title: '用户空间 - 有谱'
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
      path: '/search',
      name: 'search',
      component: Search,
      meta: {
        title: '搜索 - 有谱'
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
      path: '/tutorial',
      name: 'tutorial'
    },
    {
      path: '/video',
      name: 'video'
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
      path: '*',
      name: '404',
      component: NotFound
    }
  ]
})
