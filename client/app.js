function searchEntry() {
	var charName = document.getElementById("charName").value;
	var getList = document.getElementById("locationList");
	var message = document.createTextNode("Please fill in a players name!");
	var configs = {
		url: '/charSearch/' + charName,
		method: 'GET',
		dataType: 'json'
	};
	if(charName === ""){
		getList.innerHTML = "";
		getList.appendChild(message);
	}
	else{
		$.ajax(configs)
			.then(datappend);
	}
	function datappend(data) {
		getList.innerHTML = "";
		var name = data.data[0].player;
		var list = JSON.parse(data.data[0].locations);
		var textName = document.createTextNode(name);
		document.getElementById("locationList").appendChild(textName);
		for(var i=0; i<list.length; i++){
			var item = document.createTextNode(list[i]);
			document.getElementById("locationList").appendChild(item);
		}
	}
}

function addEntry() {
	var charName = document.getElementById("charName").value;
	var locations = document.getElementById("locations").value.split(',');
	var getList = document.getElementById("locationList");
	var message = document.createTextNode("Please fill in all fields!");
	var configs = {
		url: '/charSearch/' + charName,
		method: 'POST',
		data: {locations: locations}
	};
	if(charName === "" || locations[0] === ""){
		getList.innerHTML = "";
		getList.appendChild(message);
	}
	else{
		$.ajax(configs)
			.then(datadd)
			.catch(function(err) {
				console.log("search error", err);
			})
	}
	function datadd(data) { // should return an object with name and locations
		getList.innerHTML = "";
		var name = data.data[0].player;
		var list = JSON.parse(data.data[0].locations);
		var textName = document.createTextNode(name + ': ');
		document.getElementById("locationList").appendChild(textName);
		for(var i=0; i<list.length; i++){
			var item = document.createTextNode(list[i]);
			document.getElementById("locationList").appendChild(item);
		}
	}
}

function deleteEntry() {
	console.log("delete entry");
	var charName = document.getElementById("charName").value;
	var getList = document.getElementById("locationList");
	var configs = {
		url: '/charSearch/' + charName,
		method: 'DELETE'
	};
	$.ajax(configs)
		.then(delentry)
	function delentry(data) {
		getList.innerHTML = "";
		console.log("delete data", data)
	}
}
