const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
	//Get Token from header
	const token = req.header('x-auth-token');

	//Check if no token

	if (!token) {
		return res.status(401).json({ errors: [{ msg: 'Unauthorized Access' }] });
	}

	//Verify token
	try {
		const decoded = jwt.verify(token, process.env.secret);

		req.user = decoded.user;

		next();
	} catch (err) {
		return res.status(401).json({ errors: [{ msg: 'Unauthorized Access' }] });
	}
};
