const Country = (props) => {
	const weatherImg = `https://openweathermap.org/img/wn/${props.weatherJSON.list[0].weather[0].icon}@2x.png`

	console.log(props.weatherJSON)

	return (
		<div>
			<h1>{props.name}</h1>
			<p>capital {props.capital}</p>
			<p>area {props.area}</p>
			<br />
			<b>languages:</b>
			<br />
			<ul>
				{props.languages.map(language =>
					<li key={language}>{language}</li>)}
			</ul>
			<img src={props.flags.png} alt={props.flags.alt} />
			<h1>Weather in {props.capital}</h1>
			<p>temperature {props.weatherJSON.list[0].main.temp} Celcius</p>
			<img src={weatherImg} />
			<p>wind {props.weatherJSON.list[0].wind.speed} m/s</p>
		</div>
	)
}

export default Country