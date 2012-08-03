var DateManager = ({
	initialize: function()  {
		Date.prototype.addDays = function(days) {
			this.setDate(this.getDate() + days);
			return this;
		};
		var bDate = new Date();
		/* ab 22 Uhr wechselt er auf den nächsten Tag */
    	if (bDate.getHours() > 21) {
    		bDate.addDays(1);
    	}
    	if(bDate.getDay() == 6) {
    		bDate.addDays(2);
    	}
    	if(bDate.getDay() == 0) {
    		bDate.addDays(1);
    	}
		this.currentDate = bDate;
	},
	getCurrentDate: function() {
		return this.currentDate;
	},
	getPreviousDate: function() {
		var bDate = this.currentDate;
		bDate.addDays(-1);
    	if(bDate.getDay() == 6) {
    		bDate.addDays(-1);
    	}
    	if(bDate.getDay() == 0) {
    		bDate.addDays(-2);
    	}
    	this.currentDate = bDate;
    	return bDate;
    },
	getNextDate: function() {
		var bDate = this.currentDate;
		bDate.addDays(1);
    	if(bDate.getDay() == 6) {
    		bDate.addDays(2);
    	}
    	if(bDate.getDay() == 0) {
    		bDate.addDays(1);
    	}
    	this.currentDate = bDate;
    	return bDate;
    }
});