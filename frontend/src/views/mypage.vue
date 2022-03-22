<template>
	<div class="container">
		<section>
			<div class="title-wrap">
				<h1 class="title">마이페이지</h1>
			</div>

			<form @submit.prevent="findPassword">
				<input
					type="email"
					v-model="email"
					placeholder="이메일을 입력해주세요."
					class="form-item"
				/>

				<button class="btn-full btn-main">비밀번호 찾기</button>
			</form>
		</section>

		<!-- 글쓰기 팝업 -->
		<el-dialog title="비밀번호 재설정" :visible.sync="modal_reset_password">
			<form @submit.prevent="resetPassword">
				<input
					type="email"
					v-model="email"
					placeholder="이메일을 입력해주세요."
				/>
				<input
					type="text"
					v-model="token"
					placeholder="인증코드를 입력해주세요."
				/>
				<input
					type="password"
					v-model="password"
					placeholder="비밀번호를 입력해주세요."
				/>
				<button class="btn-full btn-main">재설정</button>
			</form>
		</el-dialog>
	</div>
</template>

<script>
import { findPassword, resetPassword } from '@/api/user'

export default {
	data() {
		return {
			email: '',
			token: '',
			password: '',
			modal_reset_password: false,
		}
	},
	methods: {
		async findPassword() {
			try {
				await findPassword({
					email: this.email,
					code: this.code,
				}).then(res => {
					this.$toasted.success(res.data.message)
					this.modal_reset_password = true
				})
			} catch (e) {
				this.$toasted.error(e.response.data.message)
			}
		},
		async resetPassword() {
			try {
				await resetPassword({
					email: this.email,
					token: this.token,
					password: this.password,
				}).then(res => {
					this.$toasted.success(res.data.message)
					this.modal_reset_password = false
					this.$router.push({ name: '/login' })
				})
			} catch (e) {
				this.$toasted.error(e.response.data.message)
			}
		},
	},
}
</script>

<style scoped></style>
