import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import { setAlert } from '../../redux/actions/alert';

import Message from './Message';

const Dashboard = ({ auth, setAlert }) => {
	if (!auth.isAuthenticated) {
		return <Redirect to='/login' />;
	}

	const firstName = auth.user ? auth.user.firstName : null;
	const userName = auth.user ? auth.user.userName : null;

	const onShareClick = async (e) => {
		console.log(e.target.textContent);

		var textArea = document.createElement('textarea');
		textArea.value = e.target.textContent;
		textArea.focus();
		textArea.select();

		const shareData = {
			title: 'Cloak',
			text: 'Send secret messages without other person ever knowing',
			url: e.target.textContent,
		};

		try {
			await navigator.share(shareData);
			document.execCommand('copy');
			setAlert('Shared Successfully', 'success');
		} catch (err) {
			setAlert('Problem in sharing', 'danger');
		}
	};
	return (
		<div className='container dashboard'>
			<h2>Welcome, {firstName}</h2>
			<div class='shareLink'>
				Share this link with your friends to receive secret messages:{' '}
				<span
					onClick={(e) => onShareClick(e)}
				>{`${window.location.origin}/send/${userName}`}</span>
			</div>
			<h4>Your Messages</h4>
			<Message />
		</div>
	);
};

Dashboard.propTypes = {
	auth: PropTypes.object.isRequired,
	setAlert: PropTypes.func,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, { setAlert })(Dashboard);
