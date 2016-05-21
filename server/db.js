const config = require('../knexfile.js');
const env = process.env.NODE_ENV || 'development';
// const Promise = require('bluebird');

const db = require('knex')(config[env]);

module.exports = db;

db.migrate.latest(config);

db.deleteAll = function() {
	if(env !== 'test'){
		return Promise.reject();
	}
	return db('players').delete()
		// .then(function() {
		// 	// chain delete future tables
		// })
		.catch(function(err) {
			console.log("Error deleting all", err);
		})
}
