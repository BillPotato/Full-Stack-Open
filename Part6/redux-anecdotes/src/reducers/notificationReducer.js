import { createSlice } from "@reduxjs/toolkit"

const notificationReducer = createSlice({
	name: "notification",
	initialState: "",
	reducers: {
		changeNotification(state, action) {
			return action.payload
		},
		removeNotification(state, action) {
			return ""
		}
	}
})

export const { changeNotification, removeNotification } = notificationReducer.actions

export const setNotification = (notification, seconds) =>
	async dispatch => {
		dispatch(changeNotification(notification))
		setTimeout(() => removeNotification(), seconds*100)
	}


export default notificationReducer.reducer