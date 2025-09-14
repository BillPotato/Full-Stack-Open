import { createSlice } from "@reduxjs/toolkit"
import anecdoteServices from "../services/anecdotes"

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload)
    },

    vote(state, action) {
      const id = action.payload
      const anecdoteToChange = state.find(anecdote => anecdote.id === id)
      const newAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      return state.map(anecdote => anecdote.id === id ? newAnecdote : anecdote)
    },

    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { createAnecdote, vote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => 
  async dispatch => {
    const initialAnecdotes = await anecdoteServices.getAll()
    dispatch(setAnecdotes(initialAnecdotes))
  }

export default anecdoteSlice.reducer