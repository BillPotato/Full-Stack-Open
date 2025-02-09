import { useState, useEffect } from "react"
import axios from "axios"

import Filter from "./components/Filter.jsx"
import Countries from "./components/Countries.jsx"

const App = () => {
  const [filterValue, setFilterValue] = useState("")
  const [allCountriesData, setAllCountriesData] = useState([])
  const [weatherJSON, setWeatherJSON] = useState({})

  const api_key = import.meta.env.VITE_SOME_KEY

  useEffect(() => {
    console.log("Downloading...")
    
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then(response => {
        setAllCountriesData(response.data)
      })
  }, [])

  useEffect(() => {
    if (filteredArray.length === 1) {
      const weatherURL = `https://api.openweathermap.org/data/2.5/forecast?q=${filteredArray[0].capital}&units=metric&cnt=3&appid=${api_key}`
      axios
        .get(weatherURL)
        .then(response => {
          setWeatherJSON(response.data)
        })
    }
  }, [filterValue])

    const handleFilterChange = event => {
      setFilterValue(event.target.value)
    }

  const filteredArray = allCountriesData.filter(country => {
    return (
      country.name.common.toUpperCase().includes(filterValue.toUpperCase()) || country.name.official.toUpperCase().includes(filterValue.toUpperCase())
    )
  })

    const showCountry = event => {
      setFilterValue(event.target.name)
    }

  return (
    <>
      <Filter value={filterValue} onChange={handleFilterChange} />
      <Countries 
        countries={filteredArray}
        onShow={showCountry}
        weatherJSON={weatherJSON}
      />
    </>
  )
}

export default App
