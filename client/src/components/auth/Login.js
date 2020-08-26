import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { login } from '../../redux/actions/auth';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Login = ({ auth: { isAuthenticated }, login }) => {
	const [loginDetails, setLoginDetails] = useState({
		userName: '',
		password: '',
	});

	const onLoginChange = (e) => {
		setLoginDetails({
			...loginDetails,
			[e.target.name]: e.target.value,
		});
	};

	const onLoginSubmit = (e) => {
		e.preventDefault();
		login(loginDetails);
	};

	if (isAuthenticated) {
		return <Redirect to='/dashboard' />;
	}
	return (
		<div className='container auth-container'>
			<h2>Login</h2>
			<form onSubmit={(e) => onLoginSubmit(e)}>
				<input
					type='text'
					placeholder='User Name'
					value={loginDetails.userName}
					name='userName'
					onChange={(e) => {
						onLoginChange(e);
					}}
				/>
				<input
					type='password'
					placeholder='Password'
					value={loginDetails.password}
					name='password'
					onChange={(e) => {
						onLoginChange(e);
					}}
				/>
				<input type='submit' value='Login' />
			</form>
			<div>
				Don't have an account? <Link to='/register'>Register</Link>
			</div>
		</div>
	);
};

Login.propTypes = {
	login: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, { login })(Login);
