import Number from "./Number.jsx"

const Numbers = ({ displayPersons, deleteFunction }) => {
  return (
    <ul>
      {displayPersons.map((person) => 
        <Number 
          key={person.id}
          id={person.id}
          name={person.name}
          number={person.number}
          deleteFunction={deleteFunction}
        />
      )}
    </ul>
  )
}

export default Numbers