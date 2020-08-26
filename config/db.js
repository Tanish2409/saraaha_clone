const mongoose = require('mongoose');

module.exports = async () => {
	try {
		await mongoose.connect(process.env.dbURI, {
			useCreateIndex: true,
			useFindAndModify: false,
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		console.log('Connected to DB');
	} catch (err) {
		console.log(err);
		process.exit(1);
	}
};
