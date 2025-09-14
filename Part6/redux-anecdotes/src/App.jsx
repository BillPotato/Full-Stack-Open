import Notification from "./components/Notification.jsx"
import AnecdoteForm from "./components/AnecdoteForm.jsx"
import AnecdoteList from "./components/AnecdoteList.jsx"
import Filter from "./components/Filter.jsx"

import anecdoteServices from "./services/anecdotes.js"
import { useEffect } from "react"
import { initializeAnecdotes } from "./reducers/anecdoteReducer.js"
import { useDispatch } from "react-redux"

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [])


  return (
    <div>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App