import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'main',
		component: () => import('@/views/main.vue'),
	},
	{
		path: '/post',
		name: 'post',
		component: () => import('@/views/post.vue'),
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
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
})

export default router
