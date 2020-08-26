import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeAlert } from '../../redux/actions/alert';

const SetAlert = ({ alerts, removeAlert }) => {
	const onClick = (id) => {
		removeAlert(id);
	};

	if (alerts !== null && alerts.length > 0) {
		return alerts.map((alert) => (
			<div
				className={`container alert ${alert.alertType}`}
				key={alert.id}
			>
				<span>{alert.msg}</span>
				<i className='fas fa-times' onClick={() => onClick(alert.id)} />
			</div>
		));
	} else {
		return null;
	}
};

SetAlert.propTypes = {
	alert: PropTypes.array,
	removeAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	alerts: state.alert,
});

export default connect(mapStateToProps, { removeAlert })(SetAlert);
