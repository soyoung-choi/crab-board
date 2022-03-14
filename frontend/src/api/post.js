import instance from '@/utils/request'

// 포스트 목록
export function fetchPostList() {
	return instance.get('/posts')
}

// 이미지 업로드
export function createPost(fd) {
	return instance.post('/posts/upload', fd)
}

// 포스트 삭제
export function removePost(post_id) {
	return instance.delete(`/posts/${post_id}`)
}
