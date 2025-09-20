import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useContext } from "react"
import axios from "axios"

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

import { getAnecdotes, updateAnecdote } from "./requests"
import NotificationContext from "./contexts/NotificationContext"

const App = () => {
  const queryClient = useQueryClient()
  const [notification, notificationDispatch] = useContext(NotificationContext)

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: updatedAnecdote => {
      queryClient.invalidateQueries("anecdotes")
    }
  })

  const setNotification = (content) => {
    notificationDispatch({
      type: "SET",
      payload: {
        content
      }
    })
    setTimeout(() => notificationDispatch({"type": "CLEAR"}), 2000)
  }

  const handleVote = (anecdote) => {
    console.log('vote', anecdote.id)
    const updatedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    updateAnecdoteMutation.mutate(updatedAnecdote)
    setNotification(`Voted for "${anecdote.content}"`)
  }

  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
    retry: 3,
  })

  if ( result.isLoading ) {
    return <div>Loading...</div>
  }
  if ( result.isError ) {
    return <div>EOROROROROROROROOR YOUR CODE SUCKS</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
