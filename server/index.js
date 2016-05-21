const express     = require('express'),
		  Path        = require('path'),
		  bodyParser  = require('body-parser'),
		  db 					= require('./db'),
		  routes      = express.Router();

const assetFolder = Path.resolve(__dirname, '../client');

const locations = require('./routes/locations');
routes.use('/charSearch', locations);

routes.get('/app.js', function(req, res) {
	res.sendFile(assetFolder + '/app.js');
})

// Catch all route, MUST BE LAST
routes.use('/*', function(req,res) {
	// res.status(500);// Testing purposes
	res.sendFile(assetFolder + '/index.html');
});

// Example route
// routes.get('/', function(req, res) {
// 	body...
// })

if(process.env.NODE_ENV !== 'test'){
	const app = express();
	app.use(express.static(assetFolder));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({
		extended: true
	}));

	app.use('/', routes);
	const port = process.env.PORT || 8000;
	app.listen(port);
	console.log("Environment: ", process.env.NODE_ENV);
	console.log("Express server listening on port: ", port);
}
else{
	console.log("Environment: ", process.env.NODE_ENV);
	module.exports = routes;
}
