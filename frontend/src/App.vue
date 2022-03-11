<template>
	<div id="app">
		<HeaderArea />
		<router-view :class="$route.name" />
		<FooterArea />
	</div>
</template>

<script>
import '@/assets/css/common.css'
import '@/assets/css/color.css'
import '@/assets/css/button.css'
import '@/assets/css/element-ui.css'
import '@/assets/css/icon.css'
import HeaderArea from '@/components/header-area'
import FooterArea from '@/components/footer-area'
import { mapGetters } from 'vuex'
import { getAuthFromCookie } from '@/utils/cookies'

export default {
	components: {
		HeaderArea,
		FooterArea,
	},
	created() {
		const access_token = getAuthFromCookie()

		if (!access_token) {
			this.$router.push({ name: 'login' })
		} else {
			this.$router.push({ name: 'main' })
		}
	},
	computed: {
		...mapGetters(['GET_ACCESS_TOKEN']),
	},
}
</script>
