var MensaService = ({
	initialize: function()  {
		
	},
	getUrl: function(year, month, day) {
		var canteen = Canteen.getCanteen();
		var url="http://ws.adelberg-online.de/canteenws/canteen/"+canteen+"/year/"+year+"/month/"+month+"/day/"+day;
		return url;
	},
	getError: function() {
		Essen.initialize();
		Essen.addEssen("Upps", "The server is not reachable.", "", "", "", "0", "", "", "", "", "", "");
	},
	getCanteenMenu: function(inSender, inResponse) {
		var xmlObject = new DOMParser().parseFromString(inResponse.data, 'text/xml');
	  	Essen.initialize();
	  	try {
			for (var i=0; i<xmlObject.getElementsByTagName('essen').length; i++) {
				// nummer
				var number = xmlObject.getElementsByTagName('essen')[i].getAttribute("id");
				// essen
				var essen = xmlObject.getElementsByTagName('essen')[i].getElementsByTagName('deutsch')[0].childNodes[0].nodeValue;
				// category
				var category = xmlObject.getElementsByTagName('essen')[i].getAttribute("kategorie");
				// Bild
				var isPicture = xmlObject.getElementsByTagName('essen')[i].getAttribute("img");
				var bild = xmlObject.getElementsByTagName('essen')[i].getAttribute("id");
				Essen.addEssen(category, essen, "", "", "", isPicture, bild, "", "", "", "", "", "");
			}
	  	} catch(err) {
	  		Essen.addEssen("Upps", "The server is not reachable.", "", "", "", "", "0", "", "", "", "", "", "");
	  	}
		if (Essen.essenList.length <= 0) {
	    	Essen.addEssen("Upps", "No canteen menu entry available for this day.", "", "", "", "", "0", "", "", "", "", "", "");
	    }
	}
});