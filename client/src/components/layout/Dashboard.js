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

		const shareData = {
			title: 'Cloak',
			text: 'Send secret messages without other person ever knowing',
			url: e.target.textContent,
		};

		textArea.style.top = '0';
		textArea.style.left = '0';
		textArea.style.position = 'fixed';
		document.body.appendChild(textArea);
		textArea.focus();
		textArea.select();

		try {
			// await navigator.share(shareData);
			document.execCommand('copy');
			setAlert('Successfully Copied to Clipboard', 'success');
		} catch (err) {
			setAlert('Problem in copying', 'danger');
		}

		document.body.removeChild(textArea);
	};
	return (
		<div className='container dashboard'>
			<h2>Welcome, {firstName}</h2>
			<div class='shareLink'>
				Click on the link below to copy it to clipboard and share this link with
				your friends to receive secret messages:{' '}
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
