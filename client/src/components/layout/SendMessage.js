import React, { useState } from 'react';
import Axios from 'axios';
import { setAlert } from '../../redux/actions/alert';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const SendMessage = (props) => {
	const userName = props.match.params.userName;

	const [message, setMessage] = useState({
		content: '',
	});

	const onChange = (e) => {
		setMessage({
			content: e.target.value,
		});
	};

	const onSubmit = async (e) => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const body = JSON.stringify(message);
		try {
			await Axios.put(`/api/message/${userName}`, body, config);

			props.setAlert('Message sent successfully', 'success');

			setMessage({
				content: '',
			});
		} catch (err) {
			console.error(err);
			props.setAlert(
				'There was a problem in sending message. Pleae try again',
				'danger'
			);
		}
	};
	return (
		<div className='container send-message'>
			<h2>
				Send a secret message to {userName}, they will never know who
				sent it!!!! {';)'}{' '}
			</h2>

			<textarea
				placeholder='Enter you message here....'
				name='message'
				value={message.content}
				onChange={(e) => onChange(e)}
			/>
			<br />

			<button onClick={(e) => onSubmit(e)}>Send</button>
		</div>
	);
};

SendMessage.propTypes = {
	setAlert: PropTypes.func,
};

export default connect(null, { setAlert })(SendMessage);
