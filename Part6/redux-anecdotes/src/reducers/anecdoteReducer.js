import { createSlice } from "@reduxjs/toolkit"
import anecdoteServices from "../services/anecdotes"

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
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

export const { appendAnecdote, vote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => 
  async dispatch => {
    const initialAnecdotes = await anecdoteServices.getAll()
    dispatch(setAnecdotes(initialAnecdotes))
  }

export const createAnecdote = (content) => 
  async dispatch => {
    const newAnecdote = await anecdoteServices.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }

export const voteAnecdote = (anecdote) =>
  async dispatch => {
    console.log("anecdote:", anecdote)
    const id = anecdote.id
    console.log("id:", id)
    const newAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    const updatedAnecdote = await anecdoteServices.update(id, newAnecdote)
    dispatch(vote(id))
  }

export default anecdoteSlice.reducer