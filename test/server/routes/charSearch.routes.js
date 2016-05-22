var expect  = require('chai').expect,
		request = require('supertest-as-promised');

describe("'/charSearch' routes", function(){
	var app     = require(TEST_HELPERS).createApp(),
			routes  = require(__server + '/index.js'),
			db 			= require(__server + '/db.js');

	app.use('/', routes);

	before(function(done) {
		db.deleteAll();
		done();
	})
	// Requests without params should be intercepted
	describe("'/charSearch' without params", function() {// these should all return the same message
		describe("GET '/charSearch'", function() {
			it("Expects 400 and message", function() {
				return request(app)
					.get("/charSearch")
					.expect(400)
					.catch(function(err) {
						expect(err.responseJSON).to.equal("Specify a player name!");
					})
			})
		})
		describe("POST '/charSearch'", function() {
			it("Expects 400 and message", function() {
				return request(app)
					.post("/charSearch")
					.expect(400)
					.catch(function(err) {
						expect(err.responseJSON).to.equal("Specify a player name!");
					})
			})
		})
		describe("PUT '/charSearch'", function() {
			it("Expects 400 and message", function() {
				return request(app)
					.put("/charSearch")
					.expect(400)
					.catch(function(err) {
						expect(err.responseJSON).to.equal("Specify a player name!");
					})
			})
		})
		describe("DELETE '/charSearch'", function() {
			it("Expects 400 and message", function() {
				return request(app)
					.delete("/charSearch")
					.expect(400)
					.catch(function(err) {
						expect(err.responseJSON).to.equal("Specify a player name!");
					})
			})
		})
	})
	// Requests with the correct params for nonexistent entries
	describe("Nonexistent entries", function(){
		describe("GET '/:name'", function() {
			it("Expects 404 and message", function() {
				return request(app)
					.get("/charSearch/griffith")
					.expect(404)
					.catch(function(err) {
						expect(err.responseJSON).to.equal("Entry does not exist!");
					})
			})
		})
		describe("PUT '/:name'", function() {
			it("Expects 404 and data", function() {
				return request(app)
					.put("/charSearch/griffith")
					.expect(404)
					.catch(function(err) {
						expect(err.responseJSON).to.equal("Entry does not exist!");
					})
			})
		})
		describe("DELETE '/:name'", function() {
			it("Expects 404 and data", function() {
				return request(app)
					.delete("/charSearch/griffith")
					.expect(404)
					.catch(function(err) {
						expect(err.responseJSON).to.equal("Entry does not exist!");
					})
			})
		})
		describe("POST '/:name'", function() {// End with POST/create for next set of tests
			it("Expects 201 and data", function() {
				return request(app)
					.post("/charSearch/griffith")
					.expect(201)
					.then(function(res) {
						expect(res.body.data[0].player).to.equal("griffith");
					})
			})
		})
	})
		// Requests with correct params for existing entries
		describe("Existing entries", function() {
			describe("POST '/:name'", function() {
				it("Expects 409 and message", function() {
					return request(app)
						.post("/charSearch/griffith")
						.expect(409)
						.catch(function(err) {
							expect(err.responseJSON).to.equal("Entry already exists!");
						})
				})
			})
			describe("GET", function() {
				it("Expects 200 and data", function() {
					return request(app)
						.get("/charSearch/griffith")
						.expect(200)
						.then(function(res) {
							expect(res.body.data[0].player).to.equal("griffith");
						})
				})
			})
			describe("PUT", function() {
				it("Expects 200 and data", function() {
					return request(app)
						.put("/charSearch/griffith")
						.expect(200)
						.then(function(res) {
							expect(res.body.data[0].player).to.equal("griffith");
						})
				})
			})
			describe("DELETE", function() {// Delete last
				it("Expects 200 and message", function() {
					return request(app)
						.delete("/charSearch/griffith")
						.expect(200)
						.then(function(res) {
							expect(res.body).to.equal("Entry deleted!");
						})
				})
			})
		})
})