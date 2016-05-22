const express = require('express'),
			routes = express.Router(),
			chains	= require('./chains.models.js');

module.exports = routes;

routes.use('/', function(req, res, next) {
	if(req.originalUrl === "/charSearch"){// if the original url does not have extra params(did not specify a name)
		res.status(400).json("Specify a player name!");// send error
	}
	else{// else move on
		next();
	}
})

routes.get('/:name', function(req, res) {
	const name = req.params.name;
	return chains.getEntry(name)
		.then(function(data) {
			if(data.length === 1){
				res.status(200).json({data: data});
			}
			else{
				res.status(404).json("Entry does not exist!");
			}
		})
		.catch(function(err) {
			res.status(500).json("Server error");
		})
})

routes.post('/:name', function(req, res) {
	const name = req.params.name,
				locations = JSON.stringify(req.body.locations);
	return chains.postEntry(name, locations)
		.then(function(data) {
			res.status(201).json({data: data});// send back inserted data
		})
		.catch(function(err) {
			res.status(409).json("Entry already exists!");
		})
})

routes.put('/:name', function(req, res) {
	const name = req.params.name,
				locations = req.body.locations;
	return chains.putEntry(name, locations)
		.then(function(data) {
			res.status(200).json({data: data});// send back inserted data
		})
		.catch(function(err) {
			res.status(404).json("Entry does not exist!");
		})
})

routes.delete('/:name', function(req, res) {
	const name = req.params.name;
	return chains.deleteEntry(name)
		.then(function(data){
			res.status(200).json("Entry deleted!");
		})
		.catch(function(err) {
			res.status(404).json("Entry does not exist!");
		})

})
