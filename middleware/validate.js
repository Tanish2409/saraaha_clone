const validator = require('validator');

const validateSignUp = (req, res, next) => {
	let { firstName, lastName, userName, password, confirmPassword } = req.body;
	const errors = [];

	firstName = firstName ? firstName.trim() : '';
	lastName = lastName ? lastName.trim() : '';
	userName = userName ? userName.trim() : '';
	password = password ? password.trim() : '';
	confirmPassword = confirmPassword ? confirmPassword.trim() : '';

	if (validator.isEmpty(firstName)) {
		errors.push({ msg: 'Enter First Name' });
	}
	if (validator.isEmpty(lastName)) {
		errors.push({ msg: 'Enter Last Name' });
	}
	if (validator.isEmpty(userName)) {
		errors.push({ msg: 'Enter User Name' });
	}
	if (validator.isEmpty(password)) {
		errors.push({ msg: 'Enter Password' });
	}
	if (validator.isEmpty(confirmPassword)) {
		errors.push({ msg: 'Enter Confirm Password' });
	}

	if (errors.length > 0) {
		return res.status(400).json({ errors });
	}

	if (!validator.equals(password, confirmPassword)) {
		errors.push({ msg: 'Password Does not match.' });
	}

	if (errors.length > 0) {
		return res.status(400).json({ errors });
	}

	next();
};

const validateLogin = (req, res, next) => {
	let { userName, password } = req.body;
	const errors = [];

	userName = userName ? userName.trim() : '';
	password = password ? password.trim() : '';

	if (validator.isEmpty(userName)) {
		errors.push({ msg: 'Enter User Name' });
	}
	if (validator.isEmpty(password)) {
		errors.push({ msg: 'Enter Password' });
	}

	if (errors.length > 0) {
		return res.status(400).json({ errors });
	}

	if (errors.length > 0) {
		return res.status(400).json({ errors });
	}

	next();
};

module.exports = { validateLogin, validateSignUp };
