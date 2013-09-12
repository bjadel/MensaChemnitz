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
		FoodModel.addFood("Upps", "The server is not reachable.", "0", "", "", "", "1", "0", "", "", "", "");
	},
	getCanteenMenu: function(inSender, inResponse) {
		var xmlObject = new DOMParser().parseFromString(inResponse.data, 'text/xml');
	  	FoodModel.initialize();
	  	try {
			for (var i=0; i<xmlObject.getElementsByTagName('essen').length; i++) {
				// category
				var category = xmlObject.getElementsByTagName('essen')[i].getAttribute('kategorie');
				// description
				var description = xmlObject.getElementsByTagName('essen')[i].getElementsByTagName('deutsch')[0].childNodes[0].nodeValue;
				// rating
				var rating = xmlObject.getElementsByTagName('essen')[i].getAttribute('bewertung');
							// fee model like {S: 1,40 €, M: 3,20 €, G: 5€}
			/** element one */
			var key0 = xmlObject.getElementsByTagName('essen')[i].getElementsByTagName('pr')[0].getAttribute('gruppe');
			var value0 = "";
			try {
				value0 = xmlObject.getElementsByTagName('essen')[i].getElementsByTagName('pr')[0].childNodes[0].nodeValue;
			} catch (err) {
				//
			}
			/** element two */
			var key1 = xmlObject.getElementsByTagName('essen')[i].getElementsByTagName('pr')[1].getAttribute('gruppe');
			var value1 = "";
			try {
				value1 = xmlObject.getElementsByTagName('essen')[i].getElementsByTagName('pr')[1].childNodes[0].nodeValue;
			} catch (err) {
				//
			}
			/** element three */
			var key2 = xmlObject.getElementsByTagName('essen')[i].getElementsByTagName('pr')[2].getAttribute('gruppe');
			var value2 = "";
			try {
				value2 = xmlObject.getElementsByTagName('essen')[i].getElementsByTagName('pr')[2].childNodes[0].nodeValue;
			} catch (err) {
				//
			}
			
			// fee student
			var feeStudent = "";
			if (key0 == "S") {
				feeStudent = value0;
			} else if (key1 == "S") {
				feeStudent = value1;
			} else if (key2 == "S") {
				feeStudent = value2;
			}
			feeStudent = feeStudent.replace("?", "");
			// fee employee
			var feeEmployee = "";
			if (key1 == "M") {
				feeEmployee = value1;
			} else if (key0 == "M") {
				feeEmployee = value0;
			} else if (key2 == "M") {
				feeEmployee = value2;
			}
			feeEmployee = feeEmployee.replace("?", "");
			// fee guest
			var feeGuest = "";
			if (key2 == "G") {
				feeGuest = value2;
			} else if (key0 == "G") {
				feeGuest = value0;
			} else if (key1 == "G") {
				feeGuest = value1;
			}
			feeGuest = feeGuest.replace("?", "");
			// picture
			var isPictureAvailable = xmlObject.getElementsByTagName('essen')[i].getAttribute("img");
			var pictureKey = xmlObject.getElementsByTagName('essen')[i].getAttribute("id");
			// pig
			var pig = xmlObject.getElementsByTagName('essen')[i].getAttribute('schwein');
			// cow
			var cow = xmlObject.getElementsByTagName('essen')[i].getAttribute('rind');
			// vegetarian
			var veg = xmlObject.getElementsByTagName('essen')[i].getAttribute('vegetarisch');
			// alcohol
			var alc = xmlObject.getElementsByTagName('essen')[i].getAttribute('alkohol');
			
			FoodModel.addFood(category, description, rating, feeStudent, feeEmployee, feeGuest, isPictureAvailable, pictureKey, pig, cow, alc, veg);
			}
	  	} catch(err) {
	  		console.log("Food parse error: " + err);
	  	}
		if (FoodModel.getSize() <= 0) {
	    	FoodModel.addFood("Upps", $L('No canteen menu entry available for this day.'), "0", "", "", "", "1", "0", "", "", "", "");
	    }
	},
	getPictureURL: function() {
		return "http://www.swcz.de/bilderspeiseplan/bilder_350/";
	},
	getSmallPictureURL: function() {
		return "http://www.swcz.de/bilderspeiseplan/bilder_190/";
	}
});