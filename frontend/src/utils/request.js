import axios from 'axios'
import { getAuthFromCookie } from '@/utils/cookies'

const instance = axios.create({
	baseURL: process.env.VUE_APP_API_URL,
	timeout: 1000,
})

instance.interceptors.request.use(
	function (config) {
		// 요청 바로 직전 axios 설정값 작성
		const access_token = getAuthFromCookie()
		if (access_token) {
			config.headers.Authorization = `Bearer ${access_token}`
		}
		return config
	},
	function (error) {
		// 요청 에러 처리를 작성합니다.
		return Promise.reject(error)
	}
)

instance.interceptors.response.use(
	function (response) {
		return response
	},

	function (error) {
		return Promise.reject(error)
	}
)

export default instance
