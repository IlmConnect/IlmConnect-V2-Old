import { useEffect, useState } from "react";
import axios from 'axios'

interface useApiResult<T> {
	loading: boolean
	data?: T
}

function useGet<T>(url: string) : useApiResult<T> {
	const [loading, setLoading] = useState(true)
	const [data, setData] = useState<T>()

	const get = async () => {
		const res = await axios.get(url)
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
