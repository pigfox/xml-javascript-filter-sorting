"use strict";

//Global browser variable
var xmlHttp = null;

(function(){
    //Create new xmlHttp object
	getXmlHttpObject();

	//Read file
	readFile("data.xml");
})();

function getXmlHttpObject(){
	try{
		 // Firefox, Opera 8.0+, Safari
		 xmlHttp = new XMLHttpRequest();
	}
	catch (e){
		// Internet Explorer
		try{
			xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
		}
		catch(e){
			xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
	}
	return xmlHttp;
}

function readFile(fileName){	
	xmlHttp.onreadystatechange = function() {
	    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
			var xmlDoc = xmlHttp.responseXML;
			var node = xmlDoc.getElementsByTagName('videos');
			var rows = ''; 
			var row =  {}; 
			row.id = '';
			row.title = '';
			row.rating = '';
			row.provider = '';
			row.released = '';

			for(var i=0; i < node[0].childNodes.length; i++){	   

		    	if(node[0].childNodes[i].nodeName == 'title')
		    		row.title = '<td>' + node[0].childNodes[i].textContent + '</td>';


		    	if(node[0].childNodes[i].nodeName == 'rating')
		    		row.rating = '<td>' + node[0].childNodes[i].textContent + '</td>';


		    	if(node[0].childNodes[i].nodeName == 'provider')
		    		row.provider = '<td>' + node[0].childNodes[i].textContent + '</td>';


		    	if(node[0].childNodes[i].nodeName == 'released')
		    		row.released = '<td>' + node[0].childNodes[i].textContent + '</td></tr>';		    		


		    	if(node[0].childNodes[i].nodeName == 'id')
		    		row.id = '<tr id="' + node[0].childNodes[i].textContent + '">'; 	

		    	if(0 < row.id.length && 0 < row.title.length &&  0 < row.rating.length && 0 < row.provider.length && 0 < row.released.length){

		    		for (var prop in row) {
					  rows += row[prop];
					}

					for (var prop in row) {
					  row[prop] = '';
					}
		    	} 		    
			}//for

		    populateTable(rows);	    
	    }
	    else if(xmlHttp.status != 200){
	    	console.log("responseText: ", xmlHttp.responseText);
	    	console.log("readyState: ", xmlHttp.readyState);
	    	console.log("status: ", xmlHttp.status);
	    }
	};

	xmlHttp.open("GET", fileName, true);
	xmlHttp.send();
}

function populateTable(data){ 
	var table = '<tr><th>Title</th><th>Rating</th><th>Provider</th><th>Release Date</th></tr>'; 
	table += data; 
	document.getElementById('movies').innerHTML = table;
}


