import {
	USER_LOGIN,
	LOGIN_ERROR,
	USER_REGISTER,
	REGISTER_ERROR,
	LOAD_USER,
	AUTH_ERROR,
	LOGOUT,
} from '../types';

const initialState = {
	token: null,
	isAuthenticated: false,
	isLoading: true,
	user: null,
};

export default function (state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case LOAD_USER:
			return {
				...state,
				token: localStorage.getItem('token'),
				user: payload.user,
				isAuthenticated: true,
				isLoading: false,
			};
		case USER_LOGIN:
		case USER_REGISTER:
			localStorage.setItem('token', payload.token);
			return {
				...state,
				...payload,
				isAuthenticated: true,
			};
		case LOGIN_ERROR:
		case REGISTER_ERROR:
		case AUTH_ERROR:
		case LOGOUT:
			localStorage.removeItem('token');
			return {
				...state,
				isAuthenticated: false,
				isLoading: true,
				user: null,
				token: null,
			};
		default:
			return {
				...state,
			};
	}
}
