import axios from 'axios'
import config from '../../config'

export const fetcher = {
	get: (url: string) => axios.get(config.backend.url + url).then(res => res.data),
	post: <B,>(url: string, body: B) => axios.post(config.backend.url + url, body).then(res => res.data),
}
