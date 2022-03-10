<template>
	<div class="main">
		<input type="text" v-model="title" placeholder="포스트 제목" />
		<input type="file" accept=".jpg, .jpeg, .png" @change="onImageChange" />
		<button @click.prevent="submitForm">등록</button>
	</div>
</template>

<script>
import { uploadImage } from '@/api/post'

export default {
	data() {
		return {
			title: '',
			upload_image: '',
		}
	},
	methods: {
		onImageChange(e) {
			this.upload_image = e.target.files[0]
		},
		async submitForm() {
			const form = new FormData()
			form.append('title', this.title)
			form.append('upload_image', this.upload_image)

			for (let key of form.entries()) {
				console.log(key)
			}

			await uploadImage(form, {
				headers: { 'Content-Type': 'multipart/form-data' },
			})
				.then(res => {
					this.$toasted.show(res.data.message)
				})
				.catch(error => {
					console.error(error)
				})
		},
	},
}
</script>
