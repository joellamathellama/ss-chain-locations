var expect  = require('chai').expect,
		request = require('supertest-as-promised');

describe("Catch-all routes", function(){
	var app    = require(TEST_HELPERS).createApp(),
			routes = require(__server + '/index.js'),
			db 		 = require(__server + '/db.js');

	app.use('/', routes);

	before(function(done) {
		db.deleteAll();
		done();
	})

	describe("PUT '/", function() {
		it("Expect 200 and index.html", function() {
			return request(app)
				.put("/")
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

	describe("POST '/", function() {
		it("Expect 200 and index.html", function() {
			return request(app)
				.post("/")
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

	describe("DELETE '/", function() {
		it("Expect 200 and index.html", function() {
			return request(app)
				.delete("/")
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