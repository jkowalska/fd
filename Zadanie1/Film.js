function Film(json) {
	var self = this;
	self.tytul = json.tytul;
	self.rezyser = json.rezyser;
	self.rok = json.rok;
	self.gatunek = json.gatunek;
	self.kraj = json.kraj;

	self.toTableRow = function() {
		return '<tr><td>'
		+ self.tytul
		+ '</td><td>'
		+ self.rezyser
		+ '</td><td>'
		+ self.rok
		+ '</td><td>'
		+ self.gatunek
		+ '</td><td>'
		+ self.kraj
		+ '</tr></td>';
	}
}

function listOfFilmy() {
	var filmy = [];
	var self = this;

	self.addFilm = function(json) {
		filmy.push(new Film(json));
	}

	self.toTable = function() {
		var table = '<table>';
		table += generateTableHeader();
		for(var i=0; i<filmy.length; i++) {
			table += filmy[i].toTableRow();
		}
		table += '</table>';
		console.log(table);
		return table;
	}

	var generateTableHeader = function() {
		return '<tr><th>Tytul</th> <th>Rezyser</th> <th>Rok</th> <th>Gatunek</th> <th>Kraj</th></tr>';
	}
}

function init() {
	var oReq = new XMLHttpRequest();
	oReq.onload = reqListener;
	oReq.open("get", "./data.json", true);
	oReq.send();
	var json;

	function reqListener(e) {
   		json = JSON.parse(this.responseText);
   		listOfFilmy = new listOfFilmy();
    	for(var i=0;json.length>i;i++) {
        	listOfFilmy.addFilm(json[i]);
        }

    	var context = document.getElementById('table');
		context.innerHTML = listOfFilmy.toTable();
	}
}