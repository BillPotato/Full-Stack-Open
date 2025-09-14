import { useSelector, useDispatch } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer.js"
import { changeNotification, removeNotification } from "../reducers/notificationReducer.js"

const Anecdote = ({ anecdote, onVote }) => {
	return (
		<div>
			<div>
			    {anecdote.content}
			</div>
			<div>
				has {anecdote.votes}
				<button onClick={() => onVote(anecdote)}>vote</button>
			</div>
		</div>	
	)
}

const AnecdoteList = () => {
	// Note: sorting is done in useSelector
	const anecdotes = useSelector(state => state.anecdotes)	
	const filter = useSelector(state => state.filter)
	const dispatch = useDispatch()

	const visibleAnecdotes = [...anecdotes].filter(anecdote => anecdote.content.includes(filter))
	const sortedAnecdotes = [...visibleAnecdotes].sort((anecA, anecB) => anecB.votes - anecA.votes)

	const onVote = (anecdote) => {
		const id = anecdote.id
		console.log("vote ", id)
		dispatch(voteAnecdote(anecdote))
		dispatch(changeNotification(`Voted for "${anecdotes.find(a => a.id === id).content}"`))
		setTimeout(() => dispatch(removeNotification()), 3000)
	}

	return (
		<div>
			<h2>Anecdotes</h2>
			<div>
			{sortedAnecdotes.map(anecdote =>
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