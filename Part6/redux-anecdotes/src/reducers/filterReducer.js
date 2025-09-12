export const changeFilter = (filter) => {
	console.log("change filter function", filter)
	return {
		type: "CHANGE_FILTER",
		payload: {
			filter
		}
	}
}

const filterReducer = (state = "", action) => {
	switch (action.type) {
		case "CHANGE_FILTER":
			console.log("filter changed:", action.payload.filter)
			return action.payload.filter
	}

	return state
}

export default filterReducer