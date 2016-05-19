const express     = require('express');
const Path        = require('path');
const bodyParser  = require('body-parser');
const app 				= express();
const db 					= require('./db');
const routes      = express.Router();

const assetFolder = Path.resolve(__dirname, '../client');

routes.use(express.static(assetFolder));

routes.use(function(req, res, next) {
	bodyParser.json();
	next();
})

routes.use(function(req, res, next) {
	bodyParser.urlencoded({
		extended: true
	});
	next();
})

routes.get('/charSearch/:name', function(req, res) {
	res.status(200).json({name: req.params.name, locations: ['1-3', '5-3', '6-2']});
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
