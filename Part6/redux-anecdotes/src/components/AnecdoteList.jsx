import { useSelector, useDispatch } from "react-redux"
import { vote } from "../reducers/anecdoteReducer.js"

const Anecdote = ({ anecdote, onVote }) => {
	return (
		<div>
			<div>
			    {anecdote.content}
			</div>
			<div>
				has {anecdote.votes}
				<button onClick={() => onVote(anecdote.id)}>vote</button>
			</div>
		</div>	
	)
}

const AnecdoteList = () => {
	// Note: sorting is done in useSelector
	const anecdotes = useSelector(state => [...state].sort((anecA, anecB) => anecB.votes - anecA.votes))	
	const dispatch = useDispatch()

	const onVote = (id) => {
		console.log("vote ", id)
		dispatch(vote(id))
	}

	return (
		<div>
			<h2>Anecdotes</h2>
			<div>
			{anecdotes.map(anecdote =>
				<Anecdote
					key={anecdote.id}
					anecdote={anecdote}
					onVote={onVote}
				/>
			)}	
			</div>
		</div>
	)

}


export default AnecdoteList