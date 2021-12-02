import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router=new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/page/index')
    },
    {
      path: '/index',
      name: 'index',
      component: () => import('@/page/index')
    },
    {
      path: '/orderlist',
      name: 'orderlist',
      component: () => import('@/page/orderlist')
    },
    {
      path: '/my',
      name: 'my',
      component: () => import('@/page/my')
    },
    {
      path: '/shop/:id',
      name: 'shop',
      component: () => import('@/page/shop')
    },
    {
      path: '/goodsdetail/:id',
      name: 'goodsdetail',
      component: () => import('@/page/goodsdetail')
    },
    {
      path: '/order',
      name: 'order',
      component: () => import('@/page/order')
    },
    {
      path: '/addresslist/:from',
      name: 'addresslist',
      component: () => import('@/page/addresslist')
    },
    {
      path: '/addressedit',
      name: 'addressedit',
      component: () => import('@/page/addressedit')
    },
    {
      path: '/payment/:orderid',
      name: 'payment',
      component: () => import('@/page/payment')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/page/login')
    },
    {
      path: '/shopcart',
      name: 'shopcart',
      component: () => import('@/page/shopcart')
    },
    {
      path: '/article/:id',
      name: 'article',
      component: () => import('@/page/article')
    },
    {
      path: '/setting',
      name: 'setting',
      component: () => import('@/page/setting')
    },
    {
      path: '/paymentresult/:paystatus',
      name: 'paymentresult',
      component: () => import('@/page/paymentresult')
    },
    {
      path: '/orderdetail/:id',
      name: 'orderdetail',
      component: () => import('@/page/orderdetail')
    },
    {
      path: '/cartorder',
      name: 'cartorder',
      component: () => import('@/page/cartorder')
    }
  ]
})

router.afterEach(() => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
})

export default router

