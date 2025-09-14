import axios from "axios"

const baseURL = "http://localhost:3001/anecdotes"

const getAll = async () => {
	const response = await axios.get(baseURL)
	return response.data
}

const createNew = async (content) => {
	const newAnecdote = {
		content,
		votes: 0
	}
	const response = await axios.post(baseURL, newAnecdote)
	return response.data
}

const update = async (id, newAnecdote) => {
	const response = await axios.put(`${baseURL}/${id}`, newAnecdote)
	return response.data
}

export default {
	getAll,
	createNew,
	update
}