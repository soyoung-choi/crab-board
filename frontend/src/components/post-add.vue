<template>
	<form enctype="multipart/form-data">
		<div class="form-item">
			<input
				type="text"
				v-model="title"
				placeholder="포스트 제목"
				ref="title"
			/>
		</div>
		<div class="form-item">
			<input type="text" v-model="contents" placeholder="포스트 내용" />
		</div>
		<div class="form-item">
			<input
				type="file"
				accept=".jpg, .jpeg, .png, .gif"
				@change="onImageChange"
			/>
		</div>
		<div class="btn-wrap">
			<button
				class="btn-gra btn-full"
				@click.prevent="submitForm"
				@:keyup.enter="submitForm"
			>
				등록
			</button>
		</div>
	</form>
</template>

<script>
import { createPost } from '@/api/post'

export default {
	data() {
		return {
			title: '',
			contents: '',
			upload_image: '',
			image_path: '',
		}
	},
	mounted() {
		this.$refs.title.focus()
	},
	methods: {
		onImageChange(e) {
			this.upload_image = e.target.files[0]
		},
		async submitForm() {
			try {
				const form = new FormData()
				form.append('title', this.title)
				form.append('contents', this.contents)
				form.append('upload_image', this.upload_image)

				if (form) {
					for (let key of form.entries()) {
						console.log(key)
					}
				}

				await createPost(form, {
					headers: { 'Content-Type': 'multipart/form-data' },
				}).then(res => {
					this.image_path = `data:image/png;base64,${res.data.image}`

					this.$toasted.show(res.data.message)
				})
			} catch (error) {
				console.error(error)
			} finally {
				this.initForm()
				window.location.reload(true)
			}
		},
		initForm() {
			this.title = ''
			this.contents = ''
			this.upload_image = ''
			this.image_path = ''
		},
	},
}
</script>

<style scoped>
.preview-image {
	border-radius: 10px;
	overflow: hidden;
	height: 300px;
}
</style>
