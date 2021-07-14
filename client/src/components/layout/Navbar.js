import React from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../redux/actions/auth';

const Navbar = ({ auth, logout }) => {
	return (
		<nav className='nav-container'>
			<div className='container nav'>
				<div className='brand'>
					<img src='/anonymous_logo.png' alt='logo' className='brand_img' />
					<Link to='/'>
						<h1 className='brand_name'>Anonymous</h1>
					</Link>
				</div>

				<div className='nav_btn_container'>
					{auth.isAuthenticated ? (
						<button onClick={(e) => logout(e)} className='nav_btn'>
							Logout
						</button>
					) : (
						<>
							<Link to='/login'>
								<button className='nav_btn' style={{ marginRight: '1rem' }}>
									Login
								</button>
							</Link>
							<Link to='/register'>
								<button className='nav_btn'>Register</button>
							</Link>
						</>
					)}
				</div>
			</div>
		</nav>
	);
};

Navbar.propTypes = {
	logout: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
