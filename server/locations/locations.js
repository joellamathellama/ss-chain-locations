const express     = require('express');
const locations   = express.Router();
const db 					= require('../db');

module.exports = locations;

locations.get('/:name', function(req, res) {
	// check if entry exists
	// if so, send the data
	// if not, send error 'entry does not exist'
	const name = req.params.name;
	db('players').where({player: name})
		.then(searchEntry)
	function searchEntry(data) {
		if(data.length === 0){
			res.status(404).json({error: 'Entry does not exist'});
		}
		else{
			res.status(200).json({data: data});
		}
	}
})

locations.post('/:name', function(req, res) {
	// check if entry exists
	// if not, add entry, send back added data
	// if so, send error entry 'already exists'
	const name = req.params.name;
	const locations = JSON.stringify(req.body.locations);
	console.log("create entry", name, locations);
	db('players').where({player: name})
		.then(createEntry)
		.catch(function(err) {
			console.log(".catch post data", err);
		})
	function createEntry(data) {
		// check if there are any matches
		if(data.length === 0){
			// if not, insert entry
			db('players').returning(['player', 'locations']).insert({player: name, locations: locations})
				.then(function(data) {
					console.log("insert data", data);
					res.status(201).json({data: data});
				})
				.catch(function(err) {
					console.log("insert error", err);
				})
		}
	}
})

locations.delete('/:name', function(req, res) {
	// check if entry exists
	// if so, delete it
	// if not, send error 'entry does not exist'
	const name = req.params.name;
	console.log("delete", name);
	db('players').where({player: name}).del()
		.then(function(data) {
			console.log("deleted");
			res.status(204).json({data: "Entry deleted"});
		})
		.catch(function(err) {
			console.log("delete error", err);
		})
})
