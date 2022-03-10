import VueCookies from 'vue-cookies'

export function saveAuthToCookie(token) {
	VueCookies.set('access_token', token)
}

export function saveUserToCookie(email) {
	VueCookies.set('email', email)
}

export function getAuthFromCookie() {
	VueCookies.get('access_token')
}

export function getUserFromCookie() {
	VueCookies.get('email')
}

export function removeAuthFromCookie() {
	VueCookies.remove('access_token')
}

export function removeUserFromCookie() {
	VueCookies.remove('email')
}
