<template>
	<header id="header">
		<div class="container">
			<div class="logo-wrap">
				<h1 class="logo">
					<router-link to="/">게시판</router-link>
				</h1>
			</div>
			<nav id="nav">
				<router-link :to="{ name: 'signup' }">회원가입</router-link>
				<router-link :to="{ name: 'login' }">로그인</router-link>
			</nav>
		</div>
	</header>
</template>

<script>
export default {}
</script>

<style scoped>
#header {
	border-bottom: 1px solid #e5e5e5;
	padding: 5px;
	box-sizing: border-box;
	overflow: hidden;
}

#header .logo-wrap {
	float: left;
}

#header #nav {
	float: right;
	padding: 15px 0;
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
