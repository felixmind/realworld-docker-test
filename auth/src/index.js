const express = require('express');
const axios = require('axios');
const { connectDb } = require('./helpers/db');
const { port, db, apiUrl, mailerApiUrl } = require('./configuration');
const app = express();

const startServer = () => {
	app.listen(port, () => {
		console.log(`Started auth server on port: ${port}`);
		console.log(`Our database: ${db}`);
	});
};

app.get('/test', (req, res) => {
	res.send('Our auth server is working correctly');
});

app.get('/testwithapidata', (req, res) => {
	axios.get(apiUrl + '/testapidata').then((response) => {
		res.json({
			testapidata: response.data.testwithapi,
		});
	}).catch(err => console.log(err));
});

app.get('/api/currentUser', (req, res) => {
	console.log('MAIL SEND ACROSS AUTH API');
	axios.get(mailerApiUrl + '/send-mail').then((response) => {
		console.log('MAIL SENT ACROSS AUTH API');
		res.json({
			id: "1234",
			email: "foo@gmail.com"
		});
	}).catch(err => console.log(err));
});

connectDb()
	.on('error', console.log)
	.on('disconnected', connectDb)
	.once('open', startServer);