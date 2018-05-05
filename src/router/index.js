import Vue from 'vue'
import Router from 'vue-router'
import GoodsList from '@/views/GoodsList'
import Detail from '@/views/Detail'
import Cart from '@/views/Cart'
import Address from '@/views/Address'
import Order from '@/views/Order'
import Success from '@/views/Success'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'GoodsList',
      component: GoodsList
    },
    {
      path: '/detail/:goodsId',
      name: 'Detail',
      component:Detail
    },
    {
      path: '/cart',
      name: 'Cart',
      component:Cart
    },
    {
      path: '/address',
      name: 'Address',
      component:Address
    },
    {
      path: '/orderConfirm',
      name: 'Order',
      component:Order
    },
    {
      path: '/success',
      name: 'Success',
      component:Success
    }
  ]
})
