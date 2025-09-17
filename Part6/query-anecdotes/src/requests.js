import axios from "axios"

export const getAnecdotes = () => {
	return axios.get("http://localhost:3001").then(res => res.data)
}