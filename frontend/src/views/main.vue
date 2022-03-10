<template>
	<div class="main">
		<input type="text" v-model="title" placeholder="포스트 제목" />
		<input type="text" v-model="contents" placeholder="포스트 내용" />
		<input
			type="file"
			accept=".jpg, .jpeg, .png, .gif"
			@change="onImageChange"
		/>
		<button @click.prevent="submitForm">등록</button>

		<img :src="path" />
	</div>
</template>

<script>
import { uploadPost } from '@/api/post'

export default {
	data() {
		return {
			title: '',
			contents: '',
			upload_image: '',
			path: '',
		}
	},
	methods: {
		onImageChange(e) {
			this.upload_image = e.target.files[0]
		},
		async submitForm() {
			const form = new FormData()
			form.append('title', this.title)
			form.append('contents', this.contents)
			form.append('upload_image', this.upload_image)

			for (let key of form.entries()) {
				console.log(key)
			}

			await uploadPost(form, {
				headers: { 'Content-Type': 'multipart/form-data' },
			})
				.then(res => {
					let buff = new Buffer(res.data.image, 'base64')
					let text = buff.toString('ascii')
					this.path = `data:image/png;base64,${text}`

					this.$toasted.show(res.data.message)
				})
				.catch(error => {
					console.error(error)
				})
		},
	},
}
</script>
