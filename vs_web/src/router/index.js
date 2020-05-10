import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/carManagement',
    children: [
      {
        path: '/carManagement',
        name: 'carManagement',
        component: () => import('../components/carManage.vue')
      },
      {
        path: '/dispatcharManage',
        name: 'dispatcharManage',
        component: () => import('../components/dispatcharManage.vue')
      },
      {
        path: '/driverManage',
        name: 'driverManage',
        component: () => import('../components/driverManage.vue')
      },
      {
        path: '/orderManage',
        name: 'orderManage',
        component: () => import('../components/orderManege.vue')
      },
      {
        path: '/formManage',
        name: 'formManage',
        component: () => import('../components/formManage.vue')
      },
      {
        path: '/orderVerify',
        name: 'orderVerify',
        component: () => import('../components/orderVerify.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(function (to, from, next) {
  // 判断用户是否登录
  if (to.path === '/login') {
    if (sessionStorage.user) {
      // 跳转登录页，但是已登录 跳转设备页
      next('/')
    } else {
      // 跳转登录页，但是未登录 跳转登录页
      next()
    }
  } else {
    if (sessionStorage.user) {
      // 跳转其他页面 已登录 正常跳转
      next()
    } else {
      // 跳转其他页面 未登录 跳转login页
      next('/login')
    }
  }
})

export default router
