import Axios from 'axios';
import {
	USER_LOGIN,
	USER_REGISTER,
	LOGIN_ERROR,
	AUTH_ERROR,
	LOAD_USER,
	REGISTER_ERROR,
	LOGOUT,
} from '../types';
import setAuthToken from '../../utils/setAuthToken';
import { setAlert } from './alert';

export const loadUser = () => async (dispatch) => {
	setAuthToken();

	try {
		const res = await Axios.get('/api/user');

		dispatch({
			type: LOAD_USER,
			payload: res.data,
		});
	} catch (error) {
		dispatch({
			type: AUTH_ERROR,
		});
	}
};

export const login = (loginDetails) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};

	const body = JSON.stringify(loginDetails);

	try {
		const res = await Axios.post('/api/user/login', body, config);

		dispatch({
			type: USER_LOGIN,
			payload: res.data,
		});

		dispatch(loadUser());
	} catch (error) {
		const errors = error.response.data.errors;

		console.log(error);

		if (errors) {
			errors.forEach((error) => {
				dispatch(setAlert(error.msg, 'danger'));
			});
		}

		dispatch({
			type: LOGIN_ERROR,
		});
	}
};

export const register = (registerDetails) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};

	const body = JSON.stringify(registerDetails);

	try {
		const res = await Axios.post('/api/user/register', body, config);

		dispatch({
			type: USER_REGISTER,
			payload: res.data,
		});

		dispatch(loadUser());
	} catch (error) {
		const errors = error.response.data.errors;

		if (errors) {
			errors.forEach((error) => {
				dispatch(setAlert(error.msg, 'danger'));
			});
		}

		dispatch({
			type: REGISTER_ERROR,
		});
	}
};

export const logout = () => (dispatch) => {
	dispatch({
		type: LOGOUT,
	});
};
