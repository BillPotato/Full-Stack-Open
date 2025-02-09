const Country = ({ name, capital, area, languages, flags, weatherJSON }) => {
	const temperature = weatherJSON.list[0].main.temp
	const weatherImg = `https://openweathermap.org/img/wn/${weatherJSON.list[0].weather[0].icon}@2x.png`
	const wind = weatherJSON.list[0].wind.speed

	// console.log(weatherJSON)

	return (
		<div>
			<h1>{name}</h1>
			<p>capital {capital}</p>
			<p>area {area}</p>
			<br />
			<b>languages:</b>
			<br />
			<ul>
				{languages.map(language =>
					<li key={language}>{language}</li>)}
			</ul>
			<img src={flags.png} alt={flags.alt} />
			<h1>Weather in {capital}</h1>
			<p>temperature {temperature} Celcius</p>
			<img src={weatherImg} />
			<p>wind {wind} m/s</p>
		</div>
	)
}

export default Country