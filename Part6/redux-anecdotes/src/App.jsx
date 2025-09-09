import { useSelector, useDispatch } from 'react-redux'
import { vote, createAnecdote } from "./reducers/anecdoteReducer.js"

const App = () => {
  // TODO: try sorting from useSelector
  const anecdotes = useSelector(state => state.sort((anecA, anecB) => anecB.votes - anecA.votes))
  const dispatch = useDispatch()

  const onVote = (id) => {
    console.log("vote ", id)
    dispatch(vote(id))
    // console.log(vote(id))
  }

  const onCreateAnecdote = (event) => {
    console.log("create note")
    dispatch(createAnecdote(event.target.anecdote.value))
  } 

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
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
      <h2>create new</h2>
      <form onSubmit={createAnecdote}>
        <div><input name="anecdote" /></div>
        <button
          type="submit"
        >create</button>
      </form>
    </div>
  )
}

export default App