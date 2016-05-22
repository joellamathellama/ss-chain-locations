// this file is triggered on index.js run
const config = require('../knexfile.js'),
			env = process.env.NODE_ENV || 'development',
			Promise = require('bluebird');

const db = require('knex')(config[env]);

module.exports = db;

db.migrate.latest(config);// Always migrate to the latest db schema

db.deleteAll = function() {// delete all db data to use in testing
	if(process.env.NODE_ENV !== 'test'){
		return Promise.reject();
	}
	return db('players').delete();// chain promises to delete more tables
}
