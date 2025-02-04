const Total = ({ parts }) => {
  let total_exercises = parts.reduce((total, part) => 
    total + part.exercises, 0)
  return (
    <b>total of {total_exercises} exercises</b>
    )
}

export default Total