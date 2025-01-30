import { useState } from 'react'

const Title = ({content}) => (
  <h1>{content}</h1>
  )

const Button = ({onClick, label}) => (
  <button onClick={onClick}>{label}</button>
  )

const StatisticLine = ({text, value}) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
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
    <table>
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="total" value={total} />
        <StatisticLine text="average" value={average} />
        <StatisticLine text="positive" value={positive} />
      </tbody>
    </table>
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