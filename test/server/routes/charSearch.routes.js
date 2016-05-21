var expect  = require('chai').expect,
		request = require('supertest-as-promised');

describe("'/charSearch' routes", function(){
	var app     = require(TEST_HELPERS).createApp(),
			routes  = require(__server + '/index.js'),
			db 			= require(__server + '/db.js');

	app.use('/', routes);

	before(function() {
		return db.deleteAll();
	})

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
		describe("POST '/:name'", function() {
			it("Expects 201 and data", function() {
				return request(app)
					.post("/charSearch/griffith")
					.expect(201)
					.then(function(res) {
						expect(res.body.data[0].player).to.equal('griffith');
					})
			})
		})
	})
})