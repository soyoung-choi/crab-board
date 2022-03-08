import instance from '@/utils/request'

export function uploadImage(fd) {
	return instance.post('/posts/upload_image', fd)
}
