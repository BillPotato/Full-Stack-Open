import Number from "./Number.jsx"

const Numbers = ({ displayPersons }) => {
  return (
    <ul>
      {displayPersons.map((person) => 
        <Number 
          key={person.name}
          name={person.name}
          number={person.number}
        />
      )}
    </ul>
  )
}

export default Numbers