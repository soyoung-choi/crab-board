<template>
	<div class="container">
		<section class="create-post">
			<CreatePost />
		</section>
		<PostList :posts="posts" v-loading="loading" />
	</div>
</template>

<script>
import CreatePost from '@/components/create-post'
import PostList from '@/components/post-list'
import { fetchPostList } from '@/api/post'

export default {
	data() {
		return {
			posts: [],
			loading: true,
		}
	},
	components: {
		CreatePost,
		PostList,
	},
	mounted() {
		this.fetchPostList()
	},
	methods: {
		async fetchPostList() {
			await fetchPostList()
				.then(res => {
					this.loading = true
					const posts = res.data.posts

					this.posts = posts.filter(
						post => (post.image = Buffer.from(post.image, 'base64'))
					)
					this.loading = false
				})
				.catch(error => {
					console.error(error)
				})
		},
	},
}
</script>

<style scoped>
.main {
	overflow: hidden;
}

.post-list {
	float: left;
	width: 48%;
}

.create-post {
	float: right;
	width: 48%;
}

li {
	border: 1px solid #eee;
	padding: 15px;
	box-sizing: border-box;
	overflow: hidden;
	margin-bottom: 20px;
	border-radius: 10px;
}

li .item-text {
	float: left;
}

li .item-image {
	float: right;
	width: 50%;
}

@media (max-width: 768px) {
	.post-list {
		width: 100%;
	}

	.create-post {
		width: 100%;
	}
}
</style>
