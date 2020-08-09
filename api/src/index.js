const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const { connectDb } = require('./helpers/db');
const { port, db, authApiUrl, mailerApiUrl } = require('./configuration');
const app = express();
const postSchema = new mongoose.Schema({
	name: String
});
const Post = mongoose.model("Post", postSchema);

const startServer = () => {
	app.listen(port, () => {
		console.log(`Started api server on port: ${port}`);
		console.log(`Our database: ${db}`);

		Post.find(function(err, posts) {
			if (err) return console.error(err);
			console.log('posts', posts);
		});

		// const silence = new Post({ name: "Silence" });
		// silence.save(function(err, savedSilence) {
		// 	if (err) return console.error(err);
		// 	console.log('savedSilence with volumes', savedSilence);
		// });
	});
};

app.get('/test', (req, res) => {
	res.send('Our api server is working correctly');
});

app.get('/api/testapidata', (req, res) => {
	res.json({
		testwithapi: true,
	});
});

app.get('/testwithcurrentuser', (req, res) => {
	console.log('MAIL SEND ACROSS API');
	axios.get(authApiUrl + '/currentUser').then((response) => {
		console.log('MAIL SENT ACROSS API');
		res.json({
			testwithcurrentuser: true,
			currentUserFromAuth: response.data
		});
	}).catch(err => console.log(err));
});

connectDb()
	.on('error', console.log)
	.on('disconnected', connectDb)
	.once('open', startServer);