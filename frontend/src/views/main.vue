<template>
	<div class="container">
		<section class="create-post">
			<CreatePost />
		</section>
		<section class="post-list" v-loading="loading">
			<ul>
				<li v-for="item in posts" :key="item._id">
					<div class="item-text">
						<h2 class="title">{{ item.title }}</h2>
						<p class="contents">{{ item.contents }}</p>
					</div>
					<div class="item-image">
						<img :src="`data:image/png;base64,${item.image}`" />
					</div>
				</li>
			</ul>
		</section>
	</div>
</template>

<script>
import CreatePost from '@/components/create-post'
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
