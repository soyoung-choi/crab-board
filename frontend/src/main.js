import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import Toasted from 'vue-toasted'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/ko'
import VueCookies from 'vue-cookies'
import dayjs from 'dayjs'

Vue.use(Toasted, {
	duration: 5000,
	theme: 'bubble',
	fitToScreen: false,
	position: 'top-center',
})
Vue.use(ElementUI, { locale })
Vue.use(VueCookies)

Vue.$cookies.config('7d') // 쿠키 만료일 7일로 설정

Vue.prototype.$http = axios
Vue.prototype.$dayjs = dayjs

Vue.config.productionTip = false

new Vue({
	router,
	store,
	render: h => h(App),
}).$mount('#app')
