process.env.NODE_ENV = 'test';
global.__server = __dirname + '/../server';
global.__test = __dirname + '/../test';
global.__client = __dirname + '/../client';
// Getting rid of chai/supertest global variables to avoid any possible confusion.
// global.expect = require('chai').expect;
// global.request = require('supertest-as-promised');

var TH ={};
module.exports = TH;

TH.createApp = function()  {
	var app = require('express')();
	app.use(require('body-parser').json());
	app.use(function(err, req, res, next) {
		console.error('Errors -----');
		console.error(' ' + err.stack);
		next(err);
	})
	return app;
}
