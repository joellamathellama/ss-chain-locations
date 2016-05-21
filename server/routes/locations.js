const express     = require('express');
const locations   = express.Router();
const db 					= require('../db');

module.exports = locations;

locations.use('/', function(req, res, next) {
	if(req.originalUrl === "/charSearch"){// if the original url does not have extra params(did not specify a name)
		res.status(400).json("Specify a player name!");// send error
	}
	else{// else move on
		next();
	}
})

locations.get('/:name', function(req, res) {
	const name = req.params.name;
	// check if entry exists
	db('players').where({player: name}).limit(1)
		.then(searchEntry)
		.catch(function(err) {
			res.status(500).json("Server error!");
		})
	function searchEntry(data) {
		if(data.length === 1){// if so, send the data
			res.status(200).json({data: data});
		}
		else{// if not, send error
			res.status(404).json("Entry does not exist!");
		}
	}
})

locations.post('/:name', function(req, res) {
	const name = req.params.name;
	const locations = JSON.stringify(req.body.locations);
	// check if entry exists
	db('players').where({player: name}).limit(1)
		.then(createEntry)
		.catch(function(err) {
			res.status(500).json("Server error!");
		})
	function createEntry(data) {
		if(data.length === 0){// if not, insert entry
			db('players').returning(['player', 'locations']).insert({player: name, locations: locations})
				.then(function(data) {
					res.status(201).json({data: data});// send back inserted data
				})
				.catch(function(err) {
					res.status(500).json(err);
				})
		}
		else{// if so, send error
			res.status(409).json("Entry already exists!");
		}
	}
})

locations.put('/:name', function(req, res) {
	const name = req.params.name;
	const locations = JSON.stringify(req.body.locations);
	// check if entry exists
	db('players').where({player: name}).limit(1)
		.then(changeEntry)
		.catch(function(err) {
			res.status(500).json("Server error!");
		})
	function changeEntry(data) {
		if(data.length === 1){
			db('players').where({player: name}).del()
				.then(function() {
					db('players').returning(['player', 'locations']).insert({player: name, locations: locations})
						.then(function(data) {
							res.status(200).json({data: data});// send back inserted data
						})
						.catch(function(err) {
							res.status(500).json(err);
						})
				})
				.catch(function(err) {
					res.status(500).json("Server error!");
				})
		}
		else{
			res.status(404).json("Entry does not exist!");
		}
	}
})

locations.delete('/:name', function(req, res) {
	const name = req.params.name;
	// check if entry exists
	db('players').where({player: name}).limit(1)
		.then(deleteEntry)
		.catch(function(err) {
			res.status(500).json("Server error!");
		})
		function deleteEntry(data) {
			if(data.length === 1){// if so, delete it
				db('players').where({player: name}).del()
					.then(function(data){
						res.status(200).json("Entry deleted!");
					})
					.catch(function(err) {
						res.status(500).json(err);
					})
			}
			else{// if not, send error
				res.status(404).json("Entry does not exist!");
			}
		}
})
