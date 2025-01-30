import { useState } from 'react'

const Title = ({content}) => (
  <h1>{content}</h1>
  )

const Button = ({onClick, label}) => (
  <button onClick={onClick}>{label}</button>
  )

const Statistics = ({good, neutral, bad}) => {
  const total = good + neutral + bad
  const average = (good - bad) / total
  const positive = `${(good/total)*100} %`

  // No feedback
  if (total === 0) {
    return (
      <p>No feedback given</p>
      )
    }
  
  // Yes feedback
  return (
    <div>
        <p>good {good}</p>
        <p>neutral {neutral}</p>
        <p>bad {bad}</p>
        <p>total {total}</p>
        <p>average {average}</p>
        <p>positive {positive}</p>
    </div>
    )
  }

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    console.log("good review received")
    setGood(good + 1)
  }

  const handleNeutral = () => {
    console.log("neutral review received")
    setNeutral(neutral + 1)
  }

  const handleBad = () => {
    console.log("bad review received")
    setBad(bad + 1)
  }

  return (
    <div>
      <Title content="meal review" />
      <Button onClick={handleGood} label="good" />
      <Button onClick={handleNeutral} label="neutral" />
      <Button onClick={handleBad} label="bad" />
      <Title content="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App