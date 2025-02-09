import Country from "./Country.jsx"

const Countries = (props) => {
	const countries = props.countries

	if (countries.length > 10) {
		return <p>Too many matches!</p>
	}
	if (countries.length === 1 && Object.keys(props.weatherJSON).length !== 0) {
		const country = countries[0]
		return (
			<Country 
				name={country.name.common}
				capital={country.capital[0]}
				area={country.area}
				languages={Object.values(country.languages)}
				flags={country.flags}
				weatherJSON={props.weatherJSON}

			/>
		)
	}
	return countries.map(country => 
		<p key={country.name.common}>
			{country.name.common} 
			<button name={country.name.common} onClick={props.onShow}>
				show
			</button> 
		</p>
	)
}

export default Countries