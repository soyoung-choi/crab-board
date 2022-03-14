import VueCookies from 'vue-cookies'

export function saveAuthToCookie(token) {
	return VueCookies.set('access_token', token)
}

export function saveUserToCookie(email) {
	return VueCookies.set('email', email)
}

export function getAuthFromCookie() {
	return VueCookies.get('access_token')
}

export function getUserFromCookie() {
	return VueCookies.get('email')
}

export function removeAuthFromCookie() {
	return VueCookies.remove('access_token')
}

export function removeUserFromCookie() {
	return VueCookies.remove('email')
}
