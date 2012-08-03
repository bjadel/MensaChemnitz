var Essen = ({
	initialize: function()  {
		this.lastClicked = 0;
    	this.essenList = [];
	},
	
	addEssen: function(name, essen, preiss, preism, preisg, isPicture, bild, wertung, schwein, rind, alk, veg, eng) {
		this.essenList.push({
			name:name, 
			essen:essen, 
			preiss:preiss, 
			preism:preism, 
			preisg:preisg,
			isPicture:isPicture,
			bild:bild,
			wertung:wertung,
			schwein:schwein,
			rind:rind,
			alk:alk,
			veg:veg,
			eng:eng
		});
	},
	
	getLastClickedEssen: function() {
		return this.essenList[this.lastClicked];
	},
	
	getEssenByIndex: function(index) {
		return this.essenList[index];
	},
	
	getSize: function() {
		return this.essenList.length;
	}
});