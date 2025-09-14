import { createSlice } from "@reduxjs/toolkit"

const notificationReducer = createSlice({
	name: "notification",
	initialState: "Hello",
	reducers: {
		changeNotification(state, action) {
			return action.payload
		}
	}
})

export const { changeNotification } = notificationReducer.actions
export default notificationReducer.reducer