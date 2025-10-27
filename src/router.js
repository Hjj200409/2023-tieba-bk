import { createRouter, createWebHistory } from 'vue-router'
import { loadComponent } from 'veaury'

// 懒加载组件
const HomePage = () => import('./vue-components/HomePage.vue')
const TiebaDetail = () => import('./vue-components/TiebaDetail.vue')
const UserCenter = () => import('./vue-components/UserCenter.vue')

// 混合组件路由 - 同时使用Vue和React组件
const CreatePost = () => Promise.resolve({
  default: loadComponent({
    vue: () => import('./pages/CreatePost.vue'),
    react: () => import('./react-components/RichEditor.jsx')
  })
})

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
    meta: {
      title: '百度贴吧 - 全球最大的中文社区',
      keepAlive: true
    }
  },
  {
    path: '/tieba/:id',
    name: 'TiebaDetail',
    component: TiebaDetail,
    props: true,
    meta: {
      title: '贴吧详情 - 百度贴吧',
      keepAlive: false
    }
  },
  {
    path: '/create-post',
    name: 'CreatePost',
    component: CreatePost,
    meta: {
      title: '发布新帖 - 百度贴吧',
      keepAlive: false,
      requiresAuth: true
    }
  },
  {
    path: '/user/:id?',
    name: 'UserCenter',
    component: UserCenter,
    props: true,
    meta: {
      title: '个人中心 - 百度贴吧',
      keepAlive: true,
      requiresAuth: true
    }
  },
  // 404页面
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
    meta: {
      title: '页面不存在 - 百度贴吧'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  // 滚动行为
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// 路由前置守卫
router.beforeEach((to, from, next) => {
  // 设置页面标题
  document.title = to.meta.title || '百度贴吧'
  
  // 检查是否需要登录
  if (to.meta.requiresAuth) {
    // 模拟检查登录状态，实际项目中应该检查localStorage中的token
    const isLoggedIn = localStorage.getItem('userToken') !== null
    if (!isLoggedIn) {
      // 如果未登录，可以跳转到登录页或提示用户
      console.log('需要登录')
      // 实际项目中应该使用: next('/login')
      // 这里为了演示，直接允许访问
    }
  }
  
  next()
})

export default router