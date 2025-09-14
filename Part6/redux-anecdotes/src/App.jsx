import Notification from "./components/Notification.jsx"
import AnecdoteForm from "./components/AnecdoteForm.jsx"
import AnecdoteList from "./components/AnecdoteList.jsx"
import Filter from "./components/Filter.jsx"

import noteServices from "./services/anecdotes.js"
import { useEffect } from "react"
import { setAnecdotes } from "./reducers/anecdoteReducer.js"
import { useDispatch } from "react-redux"

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    noteServices.getAll()
      .then(initialAnecdotes => dispatch(setAnecdotes(initialAnecdotes)))
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