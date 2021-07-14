import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const Message = ({ auth }) => {
	if (auth.user) {
		return auth.user.messages
			.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
			.map((msg) => (
				<div className='messages' key={msg._id}>
					<span>{msg.content}</span>
					<Moment fromNow>{msg.createdAt}</Moment>
				</div>
			));
	} else {
		return null;
	}
};

Message.propTypes = {
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, {})(Message);
