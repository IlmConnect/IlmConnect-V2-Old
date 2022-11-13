import { useEffect, useState } from "react";
import axios from 'axios'
import config from '../config'


interface useApiResult<T> {
	loading: boolean
	data?: T
}

/*
	in component: const { data, loading } = useGet('/hello')
*/
function useGet<T>(url: string) : useApiResult<T> {
	const [loading, setLoading] = useState(true)
	const [data, setData] = useState<T>()

	const get = async () => {
		const res = await axios.get(config.backend.url + url)
		setData(res.data as T)
		setLoading(false)
	}

	useEffect(() => {
		get()
	}, [])

	return {
		loading,
		data,
	}
}
