import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'

Vue.use(VueRouter)

const requireAuth = () => (to, from, next) => {
	if (store.state.access_token !== '') {
		return next()
	}
	next('/login')
}

const routes = [
	{
		path: '/',
		name: 'main',
		component: () => import('@/views/main.vue'),
		beforeEnter: requireAuth(),
	},
	{
		path: '/post/:id',
		name: 'post-detail',
		component: () => import('@/views/post-detail.vue'),
		beforeEnter: requireAuth(),
	},
	{
		path: '/login',
		name: 'login',
		component: () => import('@/views/login.vue'),
	},
	{
		path: '/signup',
		name: 'signup',
		component: () => import('@/views/signup.vue'),
	},
	{
		path: '/mypage',
		name: 'mypage',
		component: () => import('@/views/mypage.vue'),
		beforeEnter: requireAuth(),
	},
	{
		path: '*',
		component: () => import('@/views/_404.vue'),
	},
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
})

export default router
