var expect  = require('chai').expect,
    request = require('supertest-as-promised');

describe("Initial Client Tests", function(){
	var app     = require(TEST_HELPERS).createApp(),
			routes  = require(__server + '/index.js'),
			db 			= require(__server + '/db.js');

	app.use('/', routes);

	before(function() {
		return db.deleteAll();
	})

	describe("First steps", function() {
		describe("ready", function(){
			it("to go", function() {
				expect(true).to.equal(true);
			})
		})
	})
})
