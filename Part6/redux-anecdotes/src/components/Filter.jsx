import { useDispatch, useSelector } from "react-redux"
import { changeFilter } from "../reducers/filterReducer"

const Filter = () => {
	const filter = useSelector(state => state.filter)
	const dispatch = useDispatch()

	return (
		<div>
			filter:
			<input 
				type="text"
				onChange={(e)=>dispatch(changeFilter(e.target.value))}
			/>
		</div>
	)
}

export default Filter