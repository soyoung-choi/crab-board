<template>
	<section class="post-list">
		<ul>
			<li v-for="item in posts" :key="item.id">
				<div class="item-text">
					<h2 class="title">{{ item.title }}</h2>
					<p class="contents">
						<span>내용 </span>
						<strong>{{ item.contents }}</strong>
					</p>
					<p>
						<span>작성자 </span>
						<strong>{{ item.User.nickname }}</strong>
					</p>

					<button class="btn-small btn-outline" @click="deletePost(item.id)">
						삭제 <i class="el-icon-delete"></i>
					</button>
				</div>

				<div class="item-image">
					<img :src="`data:image/png;base64,${item.image}`" />
				</div>
			</li>
		</ul>
	</section>
</template>

<script>
import { removePost } from '@/api/post'

export default {
	props: {
		posts: {
			type: Array,
			required: true,
		},
	},
	methods: {
		async deletePost(post_id) {
			try {
				await removePost(post_id).then(res => {
					this.$toasted.show(res.data.message)
				})
			} catch (error) {
				console.error(error)
			} finally {
				window.location.reload(true)
			}
		},
	},
}
</script>

<style scoped>
h3 {
	margin-bottom: 20px;
}

li {
	border: 1px solid #e5e5e5;
	padding: 20px;
	border-radius: 10px;
	margin-bottom: 20px;
}

.item-text span {
	width: 70px;
	display: inline-block;
}
</style>
