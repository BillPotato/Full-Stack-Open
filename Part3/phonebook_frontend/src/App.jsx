import { useState, useEffect } from "react"
import axios from "axios"
import numberService from "./services/numbers.js"
import Filter from "./components/Filter.jsx"
import Form from "./components/Form.jsx"
import Numbers from "./components/Numbers.jsx"
import Notification from "./components/Notification.jsx"


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [filter, setFilter] = useState("")
  const [notiStatus, setNotiStatus] = useState([null, null])

  useEffect(() => {
    console.log("effect")
    numberService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
        // console.log(persons)
      })
  }, [])

  const setTempMessage = (tempMessage, tempNotiStatus) => {
    setNotiStatus([tempMessage, tempNotiStatus])
    setTimeout(() => {
      setNotiStatus([null, null])
    }, 5000)
  }

  const handleNameChange = (event) => {
    // console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const onAddPerson = (event) => {
    event.preventDefault()

    const existedPerson = persons.find(person => person.name == newName)

    const newObj = {
      name: newName,
      number: newNumber,
    }

    if (!existedPerson) {
      numberService
        .create(newObj)
        .then(newPerson => {
          console.log(`created new person ${newPerson.id}`)
          setPersons(persons.concat(newPerson))
          setNewName("")
          setNewNumber("")
          setTempMessage(`${newPerson.name} successfully added!`, "success")
        })

    } 
    else if (existedPerson) {
      const confirmed = window.confirm(`Do you want to replace ${existedPerson.name}'s Number?`)
      if (confirmed) {
        numberService
          .update(existedPerson.id, newObj)
          .then(updatedPerson => {
            console.log(`updated person ${updatedPerson.id}`)
            setPersons(persons.map(person =>
              (person.id) === (updatedPerson.id) ? updatedPerson : person
            ))
            setNewName("")
            setNewNumber("")
            setTempMessage(`${updatedPerson.name} successfully updated!`, "success")
          })
          .catch(error => {
            console.log(error)
            setTempMessage(`Person ${existedPerson.name} is no longer in server`, "error")
            setPersons(persons.filter(person => person.id !== existedPerson.id))
            setNewName("")
            setNewNumber("")
          })
      }
    }
  }

  const onDeletePerson = (id, name) => {
    const confirmed = window.confirm(`Do you want to delete ${name}'s number?`)

    if (confirmed) {
      numberService
        .del(id)
        .then(deletedPerson => { // deletedPerson should be empty
          console.log("deleted person in server")
          setPersons(persons.filter(person => person.id !== id))
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
      <Notification className={notiStatus[1]} message={notiStatus[0]} />
      <Filter value={filter} onChange={handleFilterChange} />
      <h2>add new stuff</h2>
      <Form 
        nameValue={newName} onNameChange={handleNameChange}
        numberValue={newNumber} onNumberChange={handleNumberChange}
        onSubmit={onAddPerson}
      />
      <h2>Numbers</h2>
      <Numbers 
        displayPersons={filteredArray}
        deleteFunction={onDeletePerson} 
      />
    </>
  )
}

export default App