var Canteen = ({
	initialize: function()  {
		this.canteen = "rh";
	},
	getCanteen: function() {
		return this.canteen;
	},
	setCanteen: function(_canteen) {
		if(_canteen == "Reichenhainer") {
			this.canteen = "rh";
		} else {
			this.canteen = "strana";
		}
	},
	getCanteenName: function() {
		if(this.canteen == "strana") {
			return "Straße der Nationen";
		};
		if(this.canteen == "rh") {
			return "Reichenhainer";
		};
		return "Reichenhainer";
	}
});