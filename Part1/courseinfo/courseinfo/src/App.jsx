const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  // console.log(part1.exercises)

  return (
    <div>
      <Header course={course} />
      <Content part1={part1.name} exercises1={part1.exercises} part2={part2.name} exercises2={part2.exercises} part3={part3.name} exercises3={part3.exercises} />
      <Total exercise1={part1.exercises} exercise2={part2.exercises} exercise3={part3.exercises} />
    </div>
  )
}

const Header = (props) => {
  console.log("Header course: " + props.course)
  return (
      <h1>{props.course}</h1>
    )
}

const Content = (props) => {
  // console.log("exercise 1 in Content: " + props.exercises1)
  return (
    <div>
      <Part part={props.part1} exercise={props.exercises1} />
      <Part part={props.part2} exercise={props.exercises2} />
      <Part part={props.part3} exercise={props.exercises3} />
    </div>
    )
}

const Part = (props) => {
  console.log(props)
  return (
    <p>
      {props.part} {props.exercise}
    </p>
    )
}

const Total = (props) => {
  return (
    <p>
      Number of exercises {props.exercise1 + props.exercise2 + props.exercise3}
    </p>
    )
}

export default App