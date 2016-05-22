const config = require('../knexfile.js'),
			env = process.env.NODE_ENV || 'development';
// const Promise = require('bluebird');

const db = require('knex')(config[env]);

module.exports = db;

db.migrate.latest(config);

db.deleteAll = function() {
	if(env !== 'test'){
		return Promise.reject();
	}
	return db('players').delete();
}
