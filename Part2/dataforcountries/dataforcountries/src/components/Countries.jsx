import Country from "./Country.jsx"

const Countries = (props) => {
	const countries = props.countries
	console.log(countries.length)

	if (countries.length > 10) {
		return <p>Too many matches!</p>
	}
	if (countries.length === 1) {
		const country = countries[0]
		return (
			<Country 
				name={country.name.common}
				capital={country.capital[0]}
				area={country.area}
				languages={Object.values(country.languages)}
				flags={country.flags}

			/>
		)
	}
	return countries.map(country => 
		<p key={country.name.common}>{country.name.common}</p>
	)
}

export default Countries