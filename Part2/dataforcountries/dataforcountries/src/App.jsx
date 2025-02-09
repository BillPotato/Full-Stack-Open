import { useState, useEffect } from "react"
import axios from "axios"

import Filter from "./components/Filter.jsx"
import Countries from "./components/Countries.jsx"

const App = () => {
  const [filterValue, setFilterValue] = useState("")
  const [allCountriesData, setAllCountriesData] = useState([])

  useEffect(() => {
    console.log("Downloading...")
    
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then(response => {
        setAllCountriesData(response.data)
      })
  }, [])

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
      />
    </>
  )
}

export default App
