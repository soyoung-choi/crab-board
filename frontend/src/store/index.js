import Vue from 'vue'
import Vuex from 'vuex'

import {
	getAuthFromCookie,
	getUserFromCookie,
	removeAuthFromCookie,
	removeUserFromCookie,
	getNicknameFromCookie,
	removeNicknameFromCookie,
} from '@/utils/cookies'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		access_token: getAuthFromCookie() || '',
		email: getUserFromCookie() || '',
		nickname: getNicknameFromCookie() || '',
	},
	getters: {
		GET_ACCESS_TOKEN(state) {
			return state.access_token
		},
		GET_EMAIL(state) {
			return state.email
		},
		GET_NICKNAME(state) {
			return state.nickname
		},
	},
	mutations: {
		MU_ACCESS_TOKEN(state, payload) {
			state.access_token = payload
		},
		MU_EMAIL(state, payload) {
			state.email = payload
		},
		MU_NICKNAME(state, payload) {
			state.nickname = payload
		},

		REMOVE_ACCESS_TOKEN(state) {
			removeAuthFromCookie()
			state.access_token = ''
		},
		REMOVE_EMAIL(state) {
			removeUserFromCookie()
			state.email = ''
		},
		REMOVE_NICKNAME(state) {
			removeNicknameFromCookie()
			state.nickname = ''
		},
	},
	actions: {
		AC_LOGOUT({ commit }) {
			commit('REMOVE_ACCESS_TOKEN')
			commit('REMOVE_EMAIL')
			commit('REMOVE_NICKNAME')
		},
	},
	modules: {},
})
