<template>
	<div>
		<div class="container">
			<div class="title-wrap">
				<h1 class="title">로그인</h1>
			</div>

			<form @click.prevent="submitForm">
				<div class="form-item">
					<input
						type="email"
						v-model="email"
						placeholder="이메일"
						ref="email"
					/>
				</div>
				<div class="form-item">
					<input type="password" v-model="password" placeholder="패스워드" />
				</div>
				<div class="btn-wrap">
					<button type="submit" class="btn-gra btn-full">로그인</button>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
import { createToken } from '@/api/auth'

export default {
	data() {
		return {
			email: '',
			password: '',
		}
	},
	mounted() {
		this.$refs.email.focus()
	},
	methods: {
		async submitForm() {
			await createToken({
				email: this.email,
				password: this.password,
			})
				.then(res => {
					console.log(res.data.message)
				})
				.catch(error => {
					console.error(error)
				})
		},
	},
}
</script>

<style scoped>
.login .container {
	width: 500px;
	margin: 0 auto;
}
</style>
