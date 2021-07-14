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
			<img src='/whispering.png' alt='whispering illustration' />
			<h2>Welcome</h2>
			<p>
				Send messages anonymously <br /> to your friends.
			</p>
			<p>OR</p>
			<p>
				Register and start receiving messages <br /> from your friends.
			</p>
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
