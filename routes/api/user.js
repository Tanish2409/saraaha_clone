const express = require('express');
const router = express.Router();
const User = require('../../model/User');
const bcrypt = require('bcryptjs');
const { validateSignUp, validateLogin } = require('../../middleware/validate');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

router.post('/register', validateSignUp, async (req, res) => {
	try {
		const { firstName, lastName, userName, password } = req.body;

		let user = await User.findOne({ userName });

		if (user) {
			return res.status(400).json({ errors: [{ msg: 'User Already exists' }] });
		}

		user = new User({
			firstName,
			lastName,
			userName,
			password,
		});

		const salt = await bcrypt.genSalt(10);

		user.password = await bcrypt.hash(password, salt);

		await user.save();

		const payload = {
			user: {
				id: user.id,
			},
		};

		jwt.sign(
			payload,
			process.env.secret,
			{ expiresIn: 604800 },
			(err, token) => {
				if (err) throw err;

				res.json({ token });
			}
		);
	} catch (err) {
		console.error(err);

		res.status(500).send('Something went wrong. Please try again.');
	}
});

router.post('/login', validateLogin, async (req, res) => {
	try {
		const { userName, password } = req.body;

		const user = await User.findOne({ userName });

		if (!user) {
			return res.status(404).json({ errors: [{ msg: 'Invalid Credentials' }] });
		}

		const isPasswordMatch = await bcrypt.compare(password, user.password);

		if (!isPasswordMatch) {
			return res
				.status(401)
				.json({ errors: [{ msg: 'Invalid Credentials.' }] });
		}

		const payload = {
			user: {
				id: user.id,
			},
		};

		jwt.sign(
			payload,
			process.env.secret,
			{ expiresIn: 604800 },
			(err, token) => {
				if (err) throw err;

				return res.json({ token });
			}
		);
	} catch (err) {
		console.error(err);

		res.status(500).send('Something went wrong. Please try again');
	}
});

router.get('/', auth, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select('-password');

		if (!user) {
			return res.status(404).json({ errors: [{ msg: 'User not found' }] });
		}

		return res.json({ user });
	} catch (err) {
		console.error(err);
		return res
			.status(500)
			.send('Something went wrong. Please try agian later.');
	}
});

module.exports = router;
