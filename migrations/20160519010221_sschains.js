
exports.up = function(knex, Promise) {
	return Promise.all([
	  knex.schema.createTable('players', function(table) {
	  	table.increments('id').primary();
	  	table.string('player');
	  	table.string('locations');
	  })
	])
};

exports.down = function(knex, Promise) {
	return Promise.all([
  	knex.schema.dropTable('players')
  ])
};
