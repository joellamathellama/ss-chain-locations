var app = require(TEST_HELPERS).createApp();
var routes = require(__server + '/index.js');
app.use('/', routes);// require and set routes from server/index

describe("Initial tests", function() {
	describe("Expects banana", function(){
		it("Got banana", function() {
			var apple = "banana";
			expect(apple).to.equal("banana");
		})
	})
})

describe("Async test", function() {
	describe("'/' GET expects 200 with data", function(){
		it("Got 200 with data", function() {
			return request(app)
				.get("/")
				.expect(200)
				.then(function(res) {
					describe(".then promise test", function(){
						it("check response from request", function(){
							expect(res).to.not.equal("undefined");
						})
					})
					return res;
				})
				.then(function(data) {
					var type = data.headers['content-type'];
					describe("correct data received", function(){
						it("expect index.html", function() {
							expect(type).to.equal("text/html; charset=UTF-8");
						})
					})
				})
		})
	})
})
