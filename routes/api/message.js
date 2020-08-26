const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../../model/User');

router.put('/:userName', async (req, res) => {
	try {
		const message = {
			content: req.body.content,
			createdAt: Date.now(),
		};

		const userName = req.params.userName;

		let user = await User.findOne({ userName });

		if (!user) {
			return res
				.status(404)
				.json({ errors: [{ msg: 'User not Found' }] });
		}

		user.messages.push(message);

		await user.save();

		return res.status(200).send();
	} catch (err) {
		console.log(err);

		return res.status(500).send('Something went wrong. Please try again');
	}
});

module.exports = router;
