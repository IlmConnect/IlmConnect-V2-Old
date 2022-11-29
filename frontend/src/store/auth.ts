import { makeAutoObservable } from "mobx"

class AuthStore {
	user: object | undefined
	token: string | undefined

	constructor() {
		makeAutoObservable(this)
	}

	setUser(user: object, token: string) {
		this.user = user
		this.token = token
	}
}

const authStore = new AuthStore()
export default authStore
