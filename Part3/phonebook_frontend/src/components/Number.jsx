const Number = ({ id, name, number, deleteFunction }) => {
	return (
		<li>
		  {name} {number}
		  <button onClick={() => deleteFunction(id, name)}>delete</button>
		</li>
	)
}

export default Number