import Country from "./Country.jsx"

const Countries = ({ countries, onShow, weatherJSON }) => {

	if (countries.length > 10) {
		return <p>Too many matches!</p>
	}
	
	
	// Need to debug: web rerenders one extra time before showing result without having fetched weatherJSON, which means weatherJSON cannot be accessed by the Country component which raises an error. Below is a temporary fix.
	if (countries.length === 1 && Object.keys(weatherJSON).length !== 0) {
		const country = countries[0]
		return (
			<Country 
				name={country.name.common}
				capital={country.capital[0]}
				area={country.area}
				languages={Object.values(country.languages)}
				flags={country.flags}
				weatherJSON={weatherJSON}

			/>
		)
	}
	

	return countries.map(country => 
		<p key={country.name.common}>
			{country.name.common} 
			<button name={country.name.common} onClick={onShow}>
				show
			</button> 
		</p>
	)
}

export default Countries