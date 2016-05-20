const express     = require('express');
const Path        = require('path');
const bodyParser  = require('body-parser');
const app 				= express();
const db 					= require('./db');
const routes      = express.Router();

const assetFolder = Path.resolve(__dirname, '../client');

app.use(express.static(assetFolder));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
	extended: true
}));

app.get('/app.js', function(req, res) {
	res.sendFile(assetFolder + '/app.js');
})

const locations = require('./locations/locations');
routes.use('/charSearch', locations);

// Example route
// routes.get('/', function(req, res) {
// 	body...
// })

// Catch all route
routes.get('/*', function(req,res) {
	res.sendFile(assetFolder + '/index.html');
});

app.use('/', routes);
const port = process.env.PORT || 8000;
app.listen(port);
console.log("Environment: ", process.env.NODE_ENV);
console.log("Express server listening on port: ", port);
