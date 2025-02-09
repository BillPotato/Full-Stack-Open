const Filter = (props) => {
	return (
		<div>
			<p>find countries
				<input 
				value={props.value}
				onChange={props.onChange}
				/>
			</p>
		</div>
	)
}

export default Filter