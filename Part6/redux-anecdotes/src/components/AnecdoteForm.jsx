import { createAnecdote } from "../reducers/anecdoteReducer.js"
import { useDispatch } from 'react-redux'
import anecdoteServices from "../services/anecdotes"

const AnecdoteForm = () => {
	const dispatch = useDispatch()

	const onCreateAnecdote = async (event) => {
		event.preventDefault()
		console.log("create note")
		dispatch(createAnecdote(event.target.anecdote.value))
		event.target.anecdote.value = ""	
	} 

	return (	
		<div>
			<h2>create new</h2>
			<form onSubmit={onCreateAnecdote}>
				<div><input name="anecdote" /></div>
				<button
					type="submit"
				>create</button>
			</form>
		</div>	
	)
}


export default AnecdoteForm