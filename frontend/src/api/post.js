import instance from '@/utils/request'

// 포스트 목록
export function fetchPostList() {
	return instance.get('/posts')
}

// 포스트 정보 조회
export function fetchPost(post_id) {
	return instance.get(`/posts/${post_id}`)
}

// 포스트 이미지 업로드
export function createPost(fd) {
	return instance.post('/posts/upload', fd)
}

// 포스트 삭제
export function removePost(post_id) {
	return instance.delete(`/posts/${post_id}`)
}
