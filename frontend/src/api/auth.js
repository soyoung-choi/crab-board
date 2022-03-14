import instance from '@/utils/request'

// 토큰 발급
export function createToken(data) {
	return instance.post('/auth/token', data)
}

// 토큰 재발급
export function refreshToken() {
	return instance.post('/auth/token/refresh')
}

// 로그아웃
export function logout() {
	return instance.get('/auth/logout')
}
