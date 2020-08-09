const express = require('express');
const { port } = require('./configuration');
const app = express();

const startServer = () => {
	app.listen(port, () => {
		console.log(`Started mailer server on port: ${port}`);
	});
};

app.get('/send-mail', (req, res) => {
	console.log('MAIL SENT ON MAILER');
	res.json({
		status: true
	});
});

startServer();