import { useSelector, useDispatch } from 'react-redux'
import { vote, createAnecdote } from "./reducers/anecdoteReducer.js"
import AnecdoteForm from "./components/AnecdoteForm.jsx"

const App = () => {
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
      {anecdotes
      .map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => onVote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <AnecdoteForm />      
    </div>
  )
}

export default App