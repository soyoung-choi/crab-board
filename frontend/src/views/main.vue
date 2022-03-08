<template>
	<div class="main">
		<input
			ref="upload_image"
			type="file"
			accept=".jpg, .jpeg, .png"
			@change="onImageChange"
		/>
		<button @click.prevent="submitForm">등록</button>
	</div>
</template>

<script>
import { uploadImage } from '@/api/post'

export default {
	data() {
		return {
			upload_image: '',
		}
	},
	methods: {
		onImageChange(e) {
			this.upload_image = e.target.files[0]
		},
		async submitForm() {
			const form_data = new FormData()
			form_data.append('upload_image', this.upload_image)

			for (let key of form_data.entries()) {
				console.log(key)
			}

			await uploadImage(form_data, {
				headers: { 'Content-Type': 'multipart/form-data' },
			})
				.then(res => {
					console.log(res)
				})
				.catch(error => {
					console.error(error)
				})
		},
	},
}
</script>
