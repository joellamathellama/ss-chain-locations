const db = require('../db');

const models = {}
module.exports = models;

models.getEntry = function(name) {
	return db('players').where({player: name}).limit(1);
}

models.postEntry = function(name, locations) {
	return models.getEntry(name)
		.then(function(data) {
			if(data.length === 1){
				throw new Error("Entry already exists!");
			}
			else{
				return db('players').returning(['player', 'locations']).insert({player: name, locations: locations});
			}
		})
		.catch(function(err) {
			res.status(500).json("Server error!");
		});
}

models.deleteEntry = function(name) {
	return models.getEntry(name)
		.then(function(data) {
			if(data.length === 1){
				return db('players').where({player: name}).del();
			}
			else{
				throw new Error("Entry does not exist!");
			}
		})
		.catch(function(err) {
			res.status(500).json("Server error!");
		});
}

models.putEntry = function(name, locations) {
	return models.getEntry(name)
		.then(function(data) {
			if(data.length === 1){
				return models.deleteEntry(name)
					.then(function() {
						return models.postEntry(name, locations);
					})
					.catch(function(err) {
						res.status(500).json("Server error!");
					})
			}
			else{
				throw new Error("Entry does not exist!");
			}
		})
		.catch(function(err) {
			res.status(500).json("Server error!");
		});
}
