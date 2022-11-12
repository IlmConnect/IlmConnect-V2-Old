import useSWR from 'swr'
import { fetcher } from './fetcher'

// TODO: Remove to models
interface User {
	temp: string
}

export const getUser = (url: string) => useSWR<User>(url, fetcher.get)
