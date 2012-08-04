/**
 * This model holds the selected canteen like ReichenhainerCanteen or StraNaCanteen.
 */
var CanteenModel = ({
	initialize: function()  {
		ReichenhainerCanteen.initialize();
		StraNaCanteen.initialize();
		this.canteen = ReichenhainerCanteen;
	},
	getCanteen: function() {
		return this.canteen;
	},
	setCanteen: function(canteenName) {
		if(canteenName == StraNaCanteen.name) {
			this.canteen = StraNaCanteen;
		} else {
			this.canteen = ReichenhainerCanteen;
		}
	},
	getCanteenName: function() {
		return this.canteen.name;
	}
});