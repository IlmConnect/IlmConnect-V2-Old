import axios from 'axios';
import { makeAutoObservable } from 'mobx';

const USER_KEY = 'user'
const TOKEN_KEY = 'token'

class AuthStore {
	user: object | undefined;
	token: string | undefined;

	constructor() {
		makeAutoObservable(this);

		const user = window.localStorage.getItem(USER_KEY)
		const token = window.localStorage.getItem(TOKEN_KEY)
		if (user && token) {
			this.setUser(JSON.parse(user), token)
		}
	}

	setUser(user: object, token: string) {
		this.user = user
		this.token = token

		window.localStorage.setItem(USER_KEY, JSON.stringify(user))
		window.localStorage.setItem(TOKEN_KEY, token)
	}

	logout() {
		this.user = undefined
		this.token = undefined
		window.location.reload()
		delete axios.defaults.headers.common.Authorization
	}
}

const authStore = new AuthStore();
export default authStore;

