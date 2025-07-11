const List = ({ displayedCountries, onClick }) => {
	if (displayedCountries.length == 1) return null
	if (displayedCountries.length > 10) {
		return <div>Too many matches</div>
	}

	return (
		<div>
			{displayedCountries.map(country => 
				<div key = {country.name.common}>
					{country.name.common}
					<button onClick = {() => onClick(country)}>
						Show
					</button>
				</div>
			)}
		</div>
	)
}

export default List