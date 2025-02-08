import { useState, useEffect } from "react"
import axios from "axios"
import Filter from "./components/Filter.jsx"
import Form from "./components/Form.jsx"
import Numbers from "./components/Numbers.jsx"
import numberService from "./services/numbers.js"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [filter, setFilter] = useState("")

  useEffect(() => {
    console.log("effect")
    numberService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
        // console.log(persons)
      })
  }, [])

  const handleNameChange = (event) => {
    // console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()

    const existedArray = persons.filter(person =>
      person.name === newName
      )

    const newObj = {
      name: newName,
      number: newNumber,
    }

    if (existedArray.length === 0) {
      
      numberService
        .create(newObj)
        .then(newPerson => {
          setPersons(persons.concat(newPerson))
          setNewName("")
          setNewNumber("")
        })

    } else {
      const existedPerson = existedArray[0]
      const confirmed = window.confirm(`Do you want to replace ${existedPerson.name}'s Number?`)
      if (confirmed) {
        numberService
          .update(existedPerson.id, newObj)
          .then(updatedPerson => {
            setPersons(persons.map(person =>
              (person.id) === (updatedPerson.id) ? updatedPerson : person
            ))
            setNewName("")
            setNewNumber("")
          })
      }
    }
  }

  const deletePerson = (id, name) => {
    const confirmed = window.confirm(`Do you want to delete ${name}'s number?`)

    if (confirmed) {
      numberService
        .del(id)
        .then(deletedPerson => {
          setPersons(persons.filter(person => person.id !== deletedPerson.id))
        })
    }
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const filteredArray = persons.filter((person) =>
    person.name.toUpperCase().indexOf(filter.toUpperCase()) !== -1
  )
  // console.log(filteredArray)

  return (
    <>
      <h2>Phonebook</h2>
      <Filter value={filter} onChange={handleFilterChange} />
      <h2>add new stuff</h2>
      <Form 
        nameValue={newName} onNameChange={handleNameChange}
        numberValue={newNumber} onNumberChange={handleNumberChange}
        onSubmit={addPerson}
      />
      <h2>Numbers</h2>
      <Numbers 
        displayPersons={filteredArray}
        deleteFunction={deletePerson} 
      />
    </>
  )
}

export default App