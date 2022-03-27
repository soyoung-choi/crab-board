<template>
	<div class="container">
		<section>
			<div class="title-wrap">
				<h1 class="title">로그인</h1>
			</div>

			<form>
				<div class="form-item">
					<input
						type="email"
						v-model="email"
						name="email"
						placeholder="이메일"
						ref="email"
					/>
				</div>
				<div class="form-item">
					<input
						type="password"
						v-model="password"
						name="password"
						placeholder="패스워드"
					/>
				</div>
				<div class="btn-wrap">
					<button
						class="btn-gra btn-full"
						@click.prevent="submitForm"
						@:keyup.enter="submitForm"
						:disabled="!email || !password"
					>
						로그인
					</button>
				</div>
			</form>
			<a href="http://localhost:5001/api/auth/kakao">카카오로그인</a>
		</section>
	</div>
</template>

<script>
import { createToken } from '@/api/auth'
import { saveAuthToCookie, saveNicknameToCookie } from '@/utils/cookies'

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
			try {
				await createToken({
					email: this.email,
					password: this.password,
				}).then(res => {
					this.$toasted.show(res.data.message)

					saveAuthToCookie(res.data.access_token)
					saveNicknameToCookie(res.data.nickname)
					this.$store.commit('MU_ACCESS_TOKEN', res.data.access_token)
					this.$store.commit('MU_NICKNAME', res.data.nickname)
				})
			} catch (error) {
				this.$toasted.show(error.response.data.message)
			} finally {
				this.$router.push('/')
			}
		},
	},
}
</script>

<style scoped>
section {
	width: 500px;
	margin: 0 auto;
}

@media (max-width: 768px) {
	section {
		width: 100%;
	}
}
</style>
