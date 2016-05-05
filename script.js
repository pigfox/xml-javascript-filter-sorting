"use strict";

//Global bhtmlRowser variable
var xmlHttp = null;
var fileName = 'data.xml';

(function(){
    //Create new xmlHttp object
	getXmlHttpObject();

	//Read file
	try {
    	readFile(fileName);
	}
	catch(err){
	    console.log(err.message);
	}
	
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
			 
			var jsonRows = new Array(); 
			var jsonRow =  {id:'',title:'',rating:'',provider:'',released:''};

			for(var i=0; i < node[0].childNodes.length; i++){	   

		    	if(node[0].childNodes[i].nodeName == 'title'){
		    		jsonRow.title = node[0].childNodes[i].textContent;
		    	}

		    	if(node[0].childNodes[i].nodeName == 'rating'){
		    		jsonRow.rating = node[0].childNodes[i].textContent;
		    	}

		    	if(node[0].childNodes[i].nodeName == 'provider'){
		    		jsonRow.provider = node[0].childNodes[i].textContent;
		    	}

		    	if(node[0].childNodes[i].nodeName == 'released'){
		    		jsonRow.released = node[0].childNodes[i].textContent;		    		
		    	}

		    	if(node[0].childNodes[i].nodeName == 'id'){
		    		jsonRow.id = node[0].childNodes[i].textContent;	
		    	}

		    	if(0 < jsonRow.id.length && 0 < jsonRow.title.length &&  0 < jsonRow.rating.length && 0 < jsonRow.provider.length && 0 < jsonRow.released.length){
		    		//Clone the jsonRow to get a new reference
		    		jsonRows.push(JSON.parse(JSON.stringify(jsonRow)));
		    		for(var prop in jsonRow){ 
		    			jsonRow[prop] = '';		    			
		    		}
		    	}		    
			}//for

			if(typeof(Storage)!=='undefined'){
			  	localStorage.setItem('videos', JSON.stringify(jsonRows));
			}
			else{
				console.log('No Web Storage support, please use a modern browser!');
			}

			populateTable(jsonRows);    
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
	var header = '<tr><th>Title</th><th>Rating</th><th>Provider</th><th>Release Date</th></tr>';
	var length = data.length;
	var rows = '';
	var table = '';
	for (var j = 0; j < length; j++){
		rows += '<tr id="' + data[j].id + '">'; 
		rows += '<td>' + data[j].title + '</td>';
		rows += '<td>' + data[j].rating + '</td>';
		rows += '<td>' + data[j].provider + '</td>';
		rows += '<td>' + data[j].released + '</td>';
		rows += '</tr>';
	}

	table += header + rows; 
	document.getElementById('movies').innerHTML = table;
}

 document.onreadystatechange = function () {
     if (document.readyState == "complete") {
     	document.getElementById("sort").addEventListener("click", function(){
     		var node = JSON.parse(localStorage.getItem('videos'));

		    console.log('106',node);

		});

		document.getElementById("filter").addEventListener("click", function(){
		    alert(104);
		});
   }
 }