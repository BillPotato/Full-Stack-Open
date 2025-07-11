import Weather from "./Weather.jsx"

const Country = ({ displayedCountries, API_key }) => {
	if (displayedCountries.length != 1) return null

	const country = displayedCountries[0]
	
	return (
		<div>
			<h1>{country.name.common}</h1>
			<div>Capital {country.capital[0]}</div>
			<div>Area {country.area}</div>
			<h1>Languages</h1>
			<ul>
				{Object.entries(country.languages).map(([abbre, lang]) => {
					// console.log(abbre, lang)
					return (
					<li key = {abbre}>{lang}</li>
					)
				})}
			</ul>
			<img src = {country.flags.svg} width="300" />
			<Weather country = {country} API_key = {API_key} />
		</div>
	)
}

export default Country