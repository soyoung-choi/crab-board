<template>
	<header id="header">
		<div class="container">
			<div class="logo-wrap">
				<h1 class="logo">
					<router-link to="/">
						<img src="@/assets/images/logo.svg" alt="로고" />
					</router-link>
				</h1>
			</div>
			<nav id="nav">
				<template v-if="GET_ACCESS_TOKEN">
					<span>
						<span class="color-main">{{ GET_NICKNAME }}</span
						>님 환영합니다!
					</span>
					<router-link :to="{ name: 'mypage' }">마이페이지</router-link>
					<a href="#" @click.prevent="handleLogout">로그아웃</a>
				</template>
				<template v-else>
					<router-link :to="{ name: 'signup' }">회원가입</router-link>
					<router-link :to="{ name: 'login' }">로그인</router-link>
				</template>
			</nav>
		</div>
	</header>
</template>

<script>
import { mapGetters } from 'vuex'
import { logout } from '@/api/auth'

export default {
	data() {
		return {}
	},
	computed: {
		...mapGetters(['GET_ACCESS_TOKEN', 'GET_NICKNAME']),
	},
	methods: {
		async handleLogout() {
			await logout().then(() => {
				this.$store.dispatch('AC_LOGOUT')
				this.$router.push({ name: 'login' })
			})
		},
	},
}
</script>

<style scoped>
#header {
	box-shadow: 10px 10px 10px #f4f4f4;
	padding: 15px 0 5px;
	box-sizing: border-box;
	overflow: hidden;
	background-color: #fff;
}

#header .logo-wrap {
	float: left;
	width: 200px;
	display: inline-block;
}

#header #nav {
	float: right;
	padding: 5px 0 15px;
}

#header #nav a {
	margin-left: 20px;
}

#header #nav a {
	font-size: 15px;
	position: relative;
	text-decoration: none;
	padding-bottom: 1px;
}

#header #nav a.router-link-exact-active {
	color: #3d73ff;
}
</style>
