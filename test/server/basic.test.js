var expect  = require('chai').expect,
    request = require('supertest-as-promised');

describe("Initial Basic Tests", function(){
	var app     = require(TEST_HELPERS).createApp(),
			routes  = require(__server + '/index.js'),
			db 			= require(__server + '/db.js');

	app.use('/', routes);

	before(function() {
		return db.deleteAll();
	})

	describe("First steps", function() {
		describe("Set apple = banana", function(){
			it("Expect apple = banana", function() {
				var apple = "banana";
				expect(apple).to.equal("banana");
			})
		})
	})

	describe("Async test", function() {
		describe("GET '/'", function(){
			it("Expect 200 and index.html", function() {
				return request(app)
					.get("/")
					.expect(200)
					.then(function(res) {
						expect(res.status).to.equal(200);
						return res;
					})
					.then(function(data) {
						var type = data.headers['content-type'];
						expect(type).to.equal("text/html; charset=UTF-8");
					})
			})
		})
	})
})
