import { makeAutoObservable } from "mobx"

class AuthStore {
	user: object | undefined
	token: string | undefined

	constructor() {
		makeAutoObservable(this)
	}
}

const authStore = new AuthStore()
export default authStore
