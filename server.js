const express = require('express');
const db = require('./config/db');
const cors = require('cors');
const path = require('path');

const userRoutes = require('./routes/api/user');
const msgRoutes = require('./routes/api/message');

require('dotenv').config();

const app = express();
app.use(express.json({ extended: false }));

db();

app.use(cors());

app.use('/api/user/', userRoutes);
app.use('/api/message/', msgRoutes);

//Serve static asset in production

if (process.env.NODE_ENV === 'production') {
	//Set static folder
	app.use(express.static('client/build'));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

const PORT = process.env.PORT || 9999;

app.listen(PORT, (err) => {
	if (err) {
		console.log(err);
		process.exit(1);
	} else {
		console.log(`Server started at port ${PORT}`);
	}
});
