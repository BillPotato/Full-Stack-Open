import { createContext, useReducer } from "react"

const notificationReducer = (state, action) => {
	console.log("Reached notificationReducer")
	switch (action.type) {
		case "SET":
			return action.payload.content
		case "CLEAR":
			return ""
	}
	return state
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
	const [notification, notificationDispatch] = useReducer(notificationReducer, "")

	return (
		<NotificationContext.Provider value={[notification, notificationDispatch]}>
			{props.children}
		</NotificationContext.Provider>
	)
}

export default NotificationContext