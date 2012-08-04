/**
 * This service provides a set of helper methods around the canteen webservice.
 */
var CanteenService = ({
	initialize: function()  {
		// nothing to do
	},
	getUrl: function(year, month, day) {
		var canteenKey = CanteenModel.getCanteen().key;
		var url="http://ws.adelberg-online.de/canteenws/canteen/"+canteenKey+"/year/"+year+"/month/"+month+"/day/"+day;
		return url;
	},
	getError: function() {
		FoodModel.initialize();
		FoodModel.addFood("Upps", "The server is not reachable.", "", "", "", "0", "");
	},
	getCanteenMenu: function(inSender, inResponse) {
		var xmlObject = new DOMParser().parseFromString(inResponse.data, 'text/xml');
	  	FoodModel.initialize();
	  	try {
			for (var i=0; i<xmlObject.getElementsByTagName('essen').length; i++) {
				// category
				var category = xmlObject.getElementsByTagName('essen')[i].getAttribute("kategorie");
				// description
				var description = xmlObject.getElementsByTagName('essen')[i].getElementsByTagName('deutsch')[0].childNodes[0].nodeValue;
				// picture
				var isPictureAvailable = xmlObject.getElementsByTagName('essen')[i].getAttribute("img");
				var pictureKey = xmlObject.getElementsByTagName('essen')[i].getAttribute("id");
				FoodModel.addFood(category, description, "", "", "", isPictureAvailable, pictureKey);
			}
	  	} catch(err) {
	  		FoodModel.addFood("Upps", "The server is not reachable.", "", "", "", "0", "");
	  	}
		if (FoodModel.getSize() <= 0) {
	    	FoodModel.addFood("Upps", "No canteen menu entry available for this day.", "", "", "", "0", "");
	    }
	}
});