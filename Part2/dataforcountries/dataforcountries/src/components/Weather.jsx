import axios from "axios"
import { useState, useEffect } from "react"

const Weather = ({ country, API_key }) => {
	const lat = country.capitalInfo.latlng[0]
	const lon = country.capitalInfo.latlng[1]
	const weatherURL = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&id=524901&appid=${API_key}`	
	const [weatherData, setWeatherData] = useState(null)

	
	useEffect(() => {
		axios
			.get(weatherURL)
			.then(response => {
				setWeatherData(response.data)
				console.log(response.data)
			})
	}, [country])
	

	if (weatherData == null) return null

	const temp = weatherData.list[0].main.temp
	const imgURL = `https://openweathermap.org/img/wn/${weatherData.list[0].weather[0].icon}@2x.png`
	const wind = weatherData.list[0].wind.speed

	return (
		<div>
			<h1>Weather in {country.capital[0]}</h1>
			<div>Temperature {temp} Celcius</div>
			<img src = {imgURL} width = "150" />
			<div>Wind {wind} m/s</div>
		</div>
	)
}

export default Weather