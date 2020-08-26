import React from 'react';
import { Link, Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

const Home = ({ auth: { isAuthenticated } }) => {
	if (isAuthenticated) {
		return <Redirect to='/dashboard' />;
	}
	return (
		<div className='container home-container'>
			<p>Join up and receive anonymous messages from your friends</p>
			<div>
				<button>
					<Link to='/login'>Login</Link>
				</button>
				<button>
					<Link to='/register'>Register</Link>
				</button>
			</div>
		</div>
	);
};

Home.propTypes = {
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});
export default connect(mapStateToProps, {})(Home);
