const config = require('../knexfile.js'),
			env = process.env.NODE_ENV || 'development',
			Promise = require('bluebird');

const db = require('knex')(config[env]);

module.exports = db;

db.migrate.latest(config);

db.deleteAll = function() {
	if(process.env.NODE_ENV !== 'test'){
		return Promise.reject();
	}
	return db('players').delete();
}
