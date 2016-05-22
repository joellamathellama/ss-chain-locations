var expect  = require('chai').expect;
		// request = require('supertest-as-promised');

describe("Call Chain model functions", function(){
	// var app     = require(TEST_HELPERS).createApp(),
	// 		routes  = require(__server + '/index.js'),
	// 		db 			= require(__server + '/db.js'),
	// 		chains  = require(__server + '/chains/chains.models.js');

	// app.use('/', routes);
	var db 			= require(__server + '/db.js'),
			chains  = require(__server + '/chains/chains.models.js');

	before(function(done) {
		db.deleteAll();
		done();
	})
	// call all the functions in 'chain.models.js'
	describe("Call getEntry", function() {
		it("Expects no data", function() {
			return chains.getEntry("yuri")
				.then(function(data) {
					expect(data).to.have.length.below(1);
				})
				.catch(function(err) {
					expect(err).to.not.exist;
				});
		})
	})
	describe("Call postEntry", function() {
		it("Expects correct data", function() {
			return chains.postEntry("yuri", "[]")
				.then(function(data) {
					expect(data[0].player).to.equal("yuri");
					expect(data[0].locations).to.equal("[]");
				})
				.catch(function(err) {
					expect(err.message).to.equal("Entry already exists!");
				});
		})
	})
	describe("Call putEntry", function() {
		it("Expects correctly altered data", function() {
			return chains.putEntry("yuri", "[1,2,3]")
				.then(function(data) {
					expect(data[0].player).to.equal("yuri");
					expect(data[0].locations).to.equal("[1,2,3]");
				})
				.catch(function(err) {
					expect(err).to.not.exist;
				});
		})
	})
	describe("Call deleteEntry", function() {
		it("Expects to successfully delete entry", function() {
			return chains.deleteEntry("yuri")
				.then(function(data) {
					expect(data).to.exist;
				})
				.catch(function(err) {
					expect(err).to.not.exist;
				});
		})
	})
})