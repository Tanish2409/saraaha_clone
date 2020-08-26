const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	userName: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	messages: [
		{
			content: {
				type: String,
			},
			createdAt: {
				type: Date,
				default: Date.now(),
			},
		},
	],
	date: {
		type: Date,
		default: Date.now(),
	},
});

module.exports = User = mongoose.model('user', UserSchema);
