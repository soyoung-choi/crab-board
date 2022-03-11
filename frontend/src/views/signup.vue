<template>
	<div class="login">
		<div class="container">
			<h1 class="title">회원가입</h1>

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
					<input type="text" v-model="nickname" placeholder="닉네임" />
				</div>
				<div class="form-item">
					<input type="password" v-model="password" placeholder="패스워드" />
				</div>
				<div class="form-item">
					<input
						type="password"
						v-model="confirm_password"
						placeholder="패스워드 확인"
					/>
				</div>
				<div class="btn-wrap">
					<button type="submit" class="btn-gra btn-full">회원가입</button>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
import { createUser } from '@/api/user'

export default {
	data() {
		return {
			email: '',
			nickname: '',
			password: '',
			confirm_password: '',
		}
	},
	mounted() {
		this.$refs.email.focus()
	},
	methods: {
		async submitForm() {
			await createUser({
				email: this.email,
				nickname: this.nickname,
				password: this.password,
				confirm_password: this.confirm_password,
			})
				.then(res => {
					this.$toasted.show(res.data.message)
					this.$router.push({ name: 'login' })
				})
				.catch(error => {
					console.error(error)
				})
		},
	},
}
</script>
