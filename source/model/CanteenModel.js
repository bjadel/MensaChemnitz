/**
 * This model holds the selected canteen like ReichenhainerCanteen or StraNaCanteen.
 */
var CanteenModel = ({
	initialize: function()  {
		ReichenhainerCanteen.initialize();
		StraNaCanteen.initialize();
		ScheffelbergCanteen.initialize();
		RingCanteen.initialize();
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
		} else if(canteenName == ReichenhainerCanteen.name) {
			this.canteen = ReichenhainerCanteen;
		} else if(canteenName == ScheffelbergCanteen.name) {
			this.canteen = ScheffelbergCanteen;
		} else if(canteenName == RingCanteen.name) {
			this.canteen = RingCanteen;
		}
		this.setStorageCanteen(this.canteen);
	},
	setCanteenKey: function(canteenKey) {
		if(canteenKey == StraNaCanteen.key) {
			this.canteen = StraNaCanteen;
		} else if(canteenKey == ReichenhainerCanteen.key) {
			this.canteen = ReichenhainerCanteen;
		} else if(canteenKey == ScheffelbergCanteen.key) {
			this.canteen = ScheffelbergCanteen;
		} else if(canteenKey == RingCanteen.key) {
			this.canteen = RingCanteen;
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