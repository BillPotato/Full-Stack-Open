import { createAnecdote } from "../reducers/anecdoteReducer.js"
import { useDispatch } from 'react-redux'
import anecdoteServices from "../services/anecdotes"

const AnecdoteForm = () => {
	const dispatch = useDispatch()

	const onCreateAnecdote = async (event) => {
		event.preventDefault()
		console.log("create note")
		anecdoteServices.createNew(event.target.anecdote.value)
			.then(newAnecdote => dispatch(createAnecdote(newAnecdote)))
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