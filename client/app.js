"use strict";


// SEARCH ------
function searchEntry() {
	var charName = document.getElementById("charName").value,
			message = document.createTextNode("Please fill in a players name!"),
			view = new viewCtrl(),
			configs = {
				url: '/charSearch/' + charName,
				method: 'GET',
				dataType: 'json'
			};
	if(charName === ""){
		view.clean();
		view.append(message);
		return;
	}
	else{
		$.ajax(configs)
			.done(success)
			.fail(failed);
	}
	function success(data) {
		var playerName = document.createTextNode(data.data[0].player + ': '),
				list = JSON.parse(data.data[0].locations);
		view.clean();
		view.append(playerName);
		for(var i=0; i<list.length; i++){
			var item;
			if(i === 0){
				item = document.createTextNode(list[i]);
			}
			else{
				item = document.createTextNode(", " + list[i]);
			}
			view.append(item);
		}
	}
	function failed(err) {
		var failMsg = document.createTextNode(err.responseJSON);
		view.clean();
		view.append(failMsg);
	}
}


// ADD ------
function addEntry() {
	var charName = document.getElementById("charName").value,
			locations = document.getElementById("locations").value.split(','),
			message = document.createTextNode("Please fill in all fields!"),
			view = new viewCtrl(),
			configs = {
				url: '/charSearch/' + charName,
				method: 'POST',
				data: {locations: locations}
			};
	if(charName === "" || locations[0] === ""){
		view.clean();
		view.append(message);
		return;
	}
	else{
		$.ajax(configs)
			.done(success)
			.fail(failed);
	}
	function success(data) { // should return an object with name and locations
		var playerName = data.data[0].player,
				textName = document.createTextNode(playerName + ': '),
				list = JSON.parse(data.data[0].locations);
		view.clean();
		view.append(textName);
		for(var i=0; i<list.length; i++){
			var item;
			if(i === 0){
				item = document.createTextNode(list[i]);
			}
			else{
				item = document.createTextNode(", " + list[i]);
			}
			view.append(item);
		}
	}
	function failed(err) {
		var failMsg = document.createTextNode(err.responseJSON);
		view.clean();
		view.append(failMsg);
	}
}


// DELETE ------
function deleteEntry() {
	var charName = document.getElementById("charName").value,
			view = new viewCtrl(),
			message = document.createTextNode("Please fill in a players name!"),
			configs = {
				url: '/charSearch/' + charName,
				method: 'DELETE'
			};
	if(charName === ""){
		view.clean();
		view.append(message);
		return;
	}
	$.ajax(configs)
		.done(success)
		.fail(failed)
	function success(data) {
		var successMsg = document.createTextNode(data);
		view.clean();
		view.append(successMsg);
	}
	function failed(err) {
		var failMsg = document.createTextNode(err.responseJSON);
		view.clean();
		view.append(failMsg);
	}
}


// View controller
function viewCtrl(){
	var listView = document.getElementById("locationList");
	this.clean = function() {
		listView.innerHTML = "";
	}
	this.append = function(node) {
		listView.appendChild(node);
	}
}