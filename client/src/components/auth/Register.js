import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { register } from '../../redux/actions/auth';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Register = ({ auth: { isAuthenticated }, register }) => {
	const [registerDetails, setRegisterDetails] = useState({
		firstName: '',
		lastName: '',
		userName: '',
		password: '',
		confirmPassword: '',
	});

	const onRegisterChange = (e) => {
		setRegisterDetails({
			...registerDetails,
			[e.target.name]: e.target.value,
		});
	};

	const onRegisterSubmit = (e) => {
		e.preventDefault();
		register(registerDetails);
	};

	if (isAuthenticated) {
		return <Redirect to='/dashboard' />;
	}
	return (
		<div className='container auth-container'>
			<h2>Register</h2>
			<form onSubmit={(e) => onRegisterSubmit(e)}>
				<input
					type='text'
					placeholder='First Name'
					value={registerDetails.firstName}
					name='firstName'
					onChange={(e) => {
						onRegisterChange(e);
					}}
				/>
				<input
					type='text'
					placeholder='Last Name'
					value={registerDetails.lastName}
					name='lastName'
					onChange={(e) => {
						onRegisterChange(e);
					}}
				/>
				<input
					type='text'
					placeholder='User Name'
					value={registerDetails.userName}
					name='userName'
					onChange={(e) => {
						onRegisterChange(e);
					}}
				/>
				<input
					type='password'
					placeholder='Password'
					value={registerDetails.password}
					name='password'
					onChange={(e) => {
						onRegisterChange(e);
					}}
				/>
				<input
					type='password'
					placeholder='Confirm password'
					value={registerDetails.confirmPassword}
					name='confirmPassword'
					onChange={(e) => {
						onRegisterChange(e);
					}}
				/>
				<input type='submit' value='Register' />
			</form>
			<div>
				Already have an account? <Link to='/login'>login</Link>
			</div>
		</div>
	);
};

Register.propTypes = {
	register: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, { register })(Register);
