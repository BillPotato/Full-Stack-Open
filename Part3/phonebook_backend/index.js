require("dotenv").config()

const express = require("express")
const app = express()

const Person = require("./models/Person")

const morgan = require("morgan")

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.use(express.static('dist'))
app.use(express.json())
morgan.token("body", (request, response) => {
	if (request.method == "POST") {
		// console.log("POST method detected!")
		return JSON.stringify(request.body)
	}
	return " "
})
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"))


// _______________________________________


app.get("/info", (request, response) => {
	const message = `Phonebook has info for ${persons.length} people`
	const now = new Date()
	const time = now.toLocaleString()

	response.write(`<div>${message}</div>`)
	response.end(`<div>${time}</div>`)
})


app.get("/api/persons", (request, response) => {
	Person.find({}).then(people => {
		response.json(people)
	})	
})


app.post("/api/persons", (request, response) => {
	const newPerson = request.body

	// const exists = persons.filter(person => person.name == newPerson.name).length > 0

	if (!newPerson.name || !newPerson.number) {
		const error = {"error": "missing parameters"}
		response.status(422).json(error)
	}
	// else if (exists) {
	// 	const error = {"error": "name already exists"}
	// 	response.status(409).json(error)
	// }
	else {
		person = new Person(newPerson)	
		person.save().then(savedPerson => {
			response.json(person)
		})
	}
})


app.get("/api/persons/:id", (request, response) => {
	const id = request.params.id
	// console.log(`Searching for id ${id}`)
	Person.findById(id).then(foundPerson => {
		if (foundPerson) {
			response.json(foundPerson)
		}
		else {
			response.status(404).end()
		}
	})
})


app.delete("/api/persons/:id", (request, response) => {
	const id = request.params.id
	persons = persons.filter(person => person.id != id)

	response.status(204).end()
})


// _______________________________________


const PORT = process.env.PORT
app.listen(PORT, () => {
	console.log(`Phonebook backend running on port ${PORT}`)
})
