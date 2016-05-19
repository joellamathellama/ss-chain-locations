const express     = require('express');
const Path        = require('path');
const bodyParser  = require('body-parser');
const app 				= express();
const db 					= require('./db');
const routes      = express.Router();

const assetFolder = Path.resolve(__dirname, '../client');

routes.use(express.static(assetFolder));

routes.use(function(req, res, next) {
	console.log("bodyParser json");
	bodyParser.json();
	next();
})

routes.use(function(req, res, next) {
	console.log("bodyParser urlencoded");
	bodyParser.urlencoded({
		extended: true
	});
	next();
})

// Example route
// routes.get('/', function(req, res) {

// })

routes.get('/*', function(req,res) {
	res.sendFile(assetFolder + '/index.html');
});

app.use('/', routes);
const port = process.env.PORT || 8000;
app.listen(port);
console.log("Environment: ", process.env.NODE_ENV);
console.log("Express server listening on port: ", port);
