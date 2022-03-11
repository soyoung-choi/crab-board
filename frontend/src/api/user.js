import instance from '@/utils/request'

// 회원가입
export function createUser(data) {
	return instance.post('/users/signup', data)
}
