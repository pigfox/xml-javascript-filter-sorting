var myInt = 0;

//Global variable for holding the xml data from file
var xml = null;

//Global browser variable
var xmlHttp = null;

(function() {
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
	       // Action to be performed when the document is read;
	       xml = xmlHttp.responseText;
	    }
	    else if(xmlHttp.status != 200){
	    	console.log("readyState: ", xmlHttp.readyState);
	    	console.log("status: ", xmlHttp.status);
	    }

	};

	xmlHttp.open("GET", fileName, true);
	xmlHttp.send();
}