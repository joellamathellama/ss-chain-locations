process.env.NODE_ENV = 'test';
var expect = require('chai').expect,
		request = require('supertest-as-promised'),
		express = require('express');

var app = express();
app.use(require('body-parser').json());
app.use(function(err, req, res, next) {
	console.error('Errors -----');
	console.error(' ' + err.stack);
	next(err);
})
var routes = require('../../server/index.js');
app.use('/', routes);

describe("Initial tests", function() {
	describe("Chai test", function(){
		it("Chai expects apple", function() {
			var apple = "apple";
			expect(apple).to.equal("apple");
		})
	})
	describe("Async test", function() {
		it("GET request to '/'", function() {
			return request(app)
				.get("/")
				.expect(200)
				.then(function(data) {
					it("testing supertest-as-promisde", function() {
						expect(data).to.be("you got me!");
					})
				})
		})
	})
})
