import { useState } from "react"

const App = () => {
  const [persons, setPersons] = useState([
    { 
    name: "Arto Hellas",
    number: "040-1234567",
    }
  ]) 
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")

  const handleNameChange = (event) => {
    // console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()

    const filterArray = persons.filter((person) =>
      person.name === newName
      )

    if (filterArray.length === 0) {
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

  return (
    <>
      <h2>Phonebook</h2>
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
        {persons.map((person) => 
          <li key={person.name}>
            {person.name} {person.number}
          </li>
        )}
      </ul>
    </>
  )
}

export default App