import VueCookies from 'vue-cookies'

export function saveAuthToCookie(value) {
	VueCookies.set('access_token', value)
}

export function saveUserToCookie(value) {
	VueCookies.set('email', value)
}

export function getAuthFromCookie() {
	VueCookies.get('access_token')
}

export function getUserFromCookie() {
	VueCookies.get('email')
}
