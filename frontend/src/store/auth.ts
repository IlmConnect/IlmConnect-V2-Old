import axios from 'axios';
import { makeAutoObservable } from 'mobx';

class AuthStore {
	user: object | undefined;
	token: string | undefined;

	constructor() {
		makeAutoObservable(this);
	}

	setUser(user: object, token: string) {
		this.user = user
		this.token = token
		axios.defaults.headers.common.Authorization = `Bearer ${token}`
	}

	logout() {
		this.user = undefined
		this.token = undefined
		delete axios.defaults.headers.common.Authorization
		window.location.reload()
	}
}

const authStore = new AuthStore();
export default authStore;
