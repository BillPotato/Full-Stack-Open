const Country = (props) => {
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
		</div>
	)
}

export default Country