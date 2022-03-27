<template>
	<div class="container" v-loading="loading">
		<section>
			<div class="title-wrap">
				<h1 class="title">마이페이지</h1>
			</div>

			<table>
				<tr>
					<td>이메일</td>
					<td>{{ profile.email }}</td>
				</tr>
				<tr>
					<td>닉네임</td>
					<td>{{ profile.nickname }}</td>
				</tr>
				<tr>
					<td>가입 경로</td>
					<td>{{ profile.provider }}</td>
				</tr>
				<tr>
					<td>가입일</td>
					<td>{{ $dayjs(profile.created_at).format('YYYY.MM.DD HH:mm') }}</td>
				</tr>
			</table>
		</section>

		<section>
			<button class="btn-outline btn-main" @click="findPassword">
				비밀번호 변경
			</button>
		</section>
		<!-- 글쓰기 팝업 -->
		<el-dialog title="비밀번호 재설정" :visible.sync="modal_reset_password">
			<form @submit.prevent="resetPassword">
				<div class="form-item">
					<input
						type="text"
						v-model="token"
						placeholder="인증코드를 입력해주세요."
					/>
				</div>
				<div class="form-item">
					<input
						type="password"
						v-model="password"
						placeholder="새로운 비밀번호를 입력해주세요."
					/>
				</div>
				<button class="btn-full btn-main">확인</button>
			</form>
		</el-dialog>
	</div>
</template>

<script>
import { fetchUserProfile, findPassword, resetPassword } from '@/api/user'
import { mapGetters } from 'vuex'

export default {
	data() {
		return {
			email: '',
			token: '',
			password: '',
			modal_reset_password: false,
			profile: null,
		}
	},
	computed: {
		...mapGetters(['GET_EMAIL']),
	},
	mounted() {
		this.fetchData()
	},
	methods: {
		async fetchData() {
			try {
				await fetchUserProfile().then(res => {
					this.loading = true
					this.profile = res.data.profile

					this.loading = false
				})
			} catch (error) {
				console.error(error)
			}
		},
		async findPassword() {
			try {
				await findPassword({
					email: this.profile.email,
				}).then(res => {
					this.$toasted.success(`${this.profile.email}로 ${res.data.message}`)
					this.modal_reset_password = true
				})
			} catch (error) {
				this.$toasted.error(error.response.data.message)
			}
		},
		async resetPassword() {
			try {
				await resetPassword({
					token: this.token,
					password: this.password,
				}).then(res => {
					this.$toasted.success(res.data.message)
					this.modal_reset_password = false

					this.$store.dispatch('AC_LOGOUT')
					this.$router.push({ name: 'login' })
				})
			} catch (error) {
				this.$toasted.error(error.response.data.message)
			}
		},
	},
}
</script>

<style scoped></style>
