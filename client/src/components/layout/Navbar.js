import React from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../redux/actions/auth';

const Navbar = ({ auth, logout }) => {
	return (
		<div className='nav-container'>
			<nav className='navbar'>
				<div className='heading'>
					<h4>
						<Link to='/'>Cloak</Link>
					</h4>
				</div>
				{auth.isAuthenticated ? (
					<div className='menu'>
						<span></span>
						<div className='dropdown-menu'>
							<ul>
								<li onClick={(e) => logout(e)}>Logout</li>
							</ul>
						</div>
					</div>
				) : null}
			</nav>
		</div>
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
