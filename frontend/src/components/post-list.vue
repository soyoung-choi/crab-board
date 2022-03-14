<template>
	<section class="post-list">
		<h3>
			총 <span class="color-main">{{ posts.length }}</span
			>개
		</h3>
		<ul>
			<li v-for="item in posts" :key="item.id">
				<div class="item-text">
					<h2 class="title">{{ item.title }}</h2>
					<p class="contents">{{ item.contents }}</p>
				</div>
				<p @click="removePost(item.id)">삭제</p>
				<div class="item-image">
					<img :src="`data:image/png;base64,${item.image}`" />
				</div>
			</li>
		</ul>
	</section>
</template>

<script>
export default {
	props: {
		posts: {
			type: Array,
			required: true,
		},
	},
	methods: {
		removePost(id) {
			console.log(id)
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
</style>
