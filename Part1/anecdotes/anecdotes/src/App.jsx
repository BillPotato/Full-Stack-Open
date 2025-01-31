import { useState } from 'react'

// Destructure
const Button = ({onClick, label}) => (
  <button onClick={onClick}>
    {label}
  </button>
  ) 

const DisplayQuote = ({anecdotes, selected}) => (
  <p>
    {anecdotes[selected]}
  </p>
  )

const DisplayVotes = ({votes, selected}) =>(
  <p>has {votes[selected]} votes.</p>
  )

const DisplayMostVotes = ({votes, anecdotes}) => {
  
  let max = 0
  let index_max = 0
  
  votes.forEach((value, index) => {
    if (value > max) {
      max = value
      index_max = index
    }
  })
  
  return (
    <p>"{anecdotes[index_max]}" has the most votes ({max}).</p>
    )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const getRndInteger = (min, max) => (
    Math.floor(Math.random() * (max - min + 1) ) + min
  )

  const handleClick = () => {
    let num = getRndInteger(0,7)
    if (num === selected) {
      if (num === 7) {
        num -=1
      } else {
        num +=1
      }
    }
    console.log("next quote clicked", num)
    setSelected(num)
  }

  const handleVote = () => {
    const updatedVotes = [...votes]
    updatedVotes[selected] += 1
    console.log("vote clicked", updatedVotes)
    setVotes(updatedVotes)
  }

  
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(8).fill(0))

  return (
    <>
      <Button label="next quote" onClick={handleClick}/>
      <Button label="vote" onClick={handleVote} />
      <DisplayQuote anecdotes={anecdotes} selected={selected} />
      <DisplayVotes votes={votes} selected={selected} />
      <DisplayMostVotes votes={votes} anecdotes={anecdotes} />
    </>
  )
}

export default App