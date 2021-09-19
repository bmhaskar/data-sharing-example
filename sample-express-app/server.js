const express = require('express');
const path = require('path');
const response = require('./response.json');
const app = express();
app.use(express.static('static'));
app.get('/index.html', function(req,res){
	res.set('Cache-control', 'no-store')
	res.sendFile(__dirname + '/static/index.html');
});
app.get('/static/styles.css', function(req,res){
	res.set('Cache-control', 'no-store');
	res.set('Content-Type', 'text/css');
	res.sendFile(__dirname + '/static/styles.css');
});



app.get('/data', function(req, res){
	res.set('Cache-control', 'no-store');
	res.set('Access-Control-Allow-Origin', '*');
	res.json(response);
});


const port = 8089;

app.listen(port, function(){
	console.log("Server is running");
});