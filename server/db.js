const config = require('../knexfile.js');
const env = process.env.NODE_ENV || 'development';

const db = require('knex')(config[env]);

module.exports = db;

db.migrate.latest(config)
	.then(function() {
		console.log("migrated");
	})
	.catch(function() {
		console.log("migration error");
	})
