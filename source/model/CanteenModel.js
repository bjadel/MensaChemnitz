/**
 * This model holds the selected canteen like ReichenhainerCanteen or StraNaCanteen.
 */
var CanteenModel = ({
	initialize: function()  {
		ReichenhainerCanteen.initialize();
		StraNaCanteen.initialize();
		this.canteen = ReichenhainerCanteen;
		this.storageKey = "canteen";
		var storageCanteen = this.getStorageCanteen();
		if ( storageCanteen != null ) {
			this.canteen = storageCanteen;
		}
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
		this.setStorageCanteen(this.canteen);
	},
	getCanteenName: function() {
		return this.canteen.name;
	},
	setStorageCanteen: function(obj){
		localStorage.setItem(this.storageKey, JSON.stringify(obj));
	},
	getStorageCanteen: function(){
		var result = localStorage.getItem(this.storageKey);
		if(typeof result === "string"){
			return JSON.parse(result);
		}
	}
});