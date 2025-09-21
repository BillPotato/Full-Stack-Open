import { useState } from "react"
import axios from "axios"

export const useResource = baseUrl => {
	const [token, setToken] = useState("")

	const setAuth = token => {
		setToken(`bearer ${token}`)
	}

	const getAll = () => {
		const data = await axios.get(baseUrl).then(res=>res.data)
		return data
	}

	const create = newObj => {
		const confiq = {
			headers: { Authorization: token }
		}
		const data = await axios.post(baseUrl, newObj, confiq).then(res=>res.data)
		return data
	}

	return {
		setAuth,
		getAll,
		create
	}
}