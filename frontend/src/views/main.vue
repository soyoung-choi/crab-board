<template>
	<div class="container">
		<h3>
			총 <span class="color-main">{{ posts.length }}</span
			>개
		</h3>
		<section class="create-post">
			<PostAdd />
		</section>
		<PostList :posts="posts" v-loading="loading" />
	</div>
</template>

<script>
import PostAdd from '@/components/post-add'
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
		PostAdd,
		PostList,
	},
	created() {
		if (this.posts.length === 0) {
			setTimeout(() => {
				this.fetchData()
			}, 1000)
		}
		this.fetchData()
	},
	methods: {
		async fetchData() {
			try {
				await fetchPostList().then(res => {
					this.loading = true
					const post_list = res.data.posts

					this.posts = post_list.filter(
						post => (post.image = Buffer.from(post.image, 'base64'))
					)
					this.loading = false
				})
			} catch (error) {
				console.error(error)
			}
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

h3 {
	padding-top: 30px;
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
