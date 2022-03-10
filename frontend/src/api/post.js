import instance from '@/utils/request'

// 포스트 목록
export function fetchPostList() {
	return instance.get('/posts')
}

// 이미지 업로드
export function uploadPost(fd) {
	return instance.post('/posts/upload', fd)
}
