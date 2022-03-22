import instance from '@/utils/request'

// 회원가입
export function createUser(data) {
	return instance.post('/users/signup', data)
}

// 해당 회원 불러오기
export function fetchUser(email) {
	return instance.get(`/users/${email}`)
}

// 비밀번호 재설정
export function findPassword(email) {
	return instance.post('/users/forget-password', email)
}

// 비밀번호 재설정
export function resetPassword(data) {
	return instance.post('/users/reset-password', data)
}

// 해당 회원의 프로필 불러오기
export function fetchUserProfile() {
	return instance.get('/users/profile')
}
