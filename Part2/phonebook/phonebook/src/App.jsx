import { useState } from "react"

const App = () => {
  const [persons, setPersons] = useState([
      { name: 'Arto Hellas', number: '040-123456', id: 1 },
      { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
      { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
      { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
    ])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [filter, setFilter] = useState("")

  const handleNameChange = (event) => {
    // console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()

    const existedArray = persons.filter((person) =>
      person.name === newName
      )

    if (existedArray.length === 0) {
      const newObj = {
        name: newName,
        number: newNumber,
      }
      
      setPersons(persons.concat(newObj))
      setNewName("")
      setNewNumber("")

    } else {
      alert(`${newName} already exists!`)
    }
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const filteredArray = persons.filter((person) =>
    person.name.toUpperCase().indexOf(filter.toUpperCase()) !== -1
  )
  // console.log(filter, filteredArray)

  return (
    <>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input value={filter} onChange={handleFilterChange} />
      </div>
      <h2>add new stuff</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input id="name" value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input id="number" value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {filteredArray.map((person) => 
          <li key={person.name}>
            {person.name} {person.number}
          </li>
        )}
      </ul>
    </>
  )
}

export default App