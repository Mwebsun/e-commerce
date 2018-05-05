import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import infiniteSocrll from 'vue-infinite-scroll'

import './assets/css/reset.css'
import 'swiper/dist/css/swiper.css'
import './../node_modules/font-awesome/css/font-awesome.css'


Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(VueAwesomeSwiper)
Vue.use(infiniteSocrll)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})


