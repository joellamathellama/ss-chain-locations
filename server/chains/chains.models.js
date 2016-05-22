const db = require('../db');

const models = {}
module.exports = models;

models.getEntry = function(name) {// Simple function to get a specific entry
	return db('players').where({player: name}).limit(1);
}

models.postEntry = function(name, locations) {
	return models.getEntry(name)// check entries existence
		.then(function(data) {
			if(data.length === 1){// can't create something that already exists
				throw new Error("Entry already exists!");
			}
			else{// if it doesn't exist, create and return the data
				return db('players').returning(['player', 'locations']).insert({player: name, locations: locations});
			}
		})
		.catch(function(err) {
			res.status(500).json("Server error!");
		});
}

models.deleteEntry = function(name) {
	return models.getEntry(name)// check entries existence
		.then(function(data) {
			if(data.length === 1){// if it exists, delete it
				return db('players').where({player: name}).del();
			}
			else{// if not, send error
				throw new Error("Entry does not exist!");
			}
		})
		.catch(function(err) {
			res.status(500).json("Server error!");
		});
}

models.putEntry = function(name, locations) {
	return models.getEntry(name)// check entries existence
		.then(function(data) {
			if(data.length === 1){// if it exists, delete it, create new entry.
				return models.deleteEntry(name)
					.then(function() {
						return models.postEntry(name, locations);
					})
					.catch(function(err) {
						res.status(500).json("Server error!");
					})
			}
			else{// if not, throw error
				throw new Error("Entry does not exist!");
			}
		})
		.catch(function(err) {
			res.status(500).json("Server error!");
		});
}
