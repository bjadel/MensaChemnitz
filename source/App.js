/**
 * Main kind.
 */
enyo.kind({
	name: "App",
	kind: "Panels",
	classes: "app enyo-unselectable",
	fit: true,
	realtimeFit: true,
	arrangerKind: "CollapsingArranger",
	components: [
		{kind: "FittableRows", classes: "left", components: [
			{kind: "onyx.Toolbar", style: "overflow: initial;", components: [
				{name: "title", content: "Chemnitz", style: "width: 90%;"},
				{name: "grabPicture", kind: "Image", src: "lib/onyx/images/grabbutton.png"}
			]},
			{kind: "FittableColumns", components: [
				{kind: "onyx.MenuDecorator", fit: "true", onSelect: "canteenItemSelected", components: [ 
					{name: "menuCanteen", content: "", components: [{kind: "onyx.Icon", src: "assets/settings.png"}]},
					{kind: "onyx.Tooltip", content: "Choose your canteen"},
					{kind: "onyx.Menu", components: [ 
						{name: "stranaCanteen", content: ""}, 
						{name: "rhCanteen", content: ""}
					]}
				]},
				{kind: "onyx.Button", name:"buttonPreviousDate", ontap:"buttonPreviousDate", components: [ {kind: "onyx.Icon", src: "assets/go-previous.png"} ]},
				{kind: "onyx.Button", name:"buttonHomeDate", ontap:"buttonHomeDate", components: [ {kind: "onyx.Icon", src: "assets/go-home.png"} ]},
				{kind: "onyx.Button", name:"buttonNextDate", ontap:"buttonNextDate", components: [ {kind: "onyx.Icon", src: "assets/go-next.png"} ]}
			]},
			{kind: "FoodList", name: "foodlist", onSelect: "foodSelected", fit: true}
		]},
		{kind: "FittableRows", components: [
			{kind: "FittableColumns", noStretch: true, classes: "onyx-toolbar onyx-toolbar-inline", components: [
				{kind: "onyx.Grabber"},
				{kind: "Scroller", thumb: false, fit: true, touch: true, vertical: "hidden", style: "margin: 0;", components: [
					{classes: "onyx-toolbar-inline", style: "white-space: nowrap;", components: [
						
					]}
				]}
			]},
			{kind: "Food", name: "food", arrangerKind: "CardArranger", fit: true}
		]}
	],
	create: function() {
		this.inherited(arguments);
		DateModel.initialize();
		CanteenModel.initialize();
		// set canteen menu entries
		this.$.stranaCanteen.setContent(StraNaCanteen.name);
		this.$.rhCanteen.setContent(ReichenhainerCanteen.name);
		// set size of foodList
		this.$.foodlist.setCount(50);
		this.$.title.setContent(CanteenModel.getCanteenName() + " - " + this.formatDate(DateModel.getCurrentDate()));
	},
	rendered: function() {
		this.inherited(arguments);
		this.setIndex(0);
	},
	refresh: function() {
        this.$.foodlist.setDate(DateModel.getCurrentDate());
    },
    foodSelected: function(inSender, inFood) {
    	var foodEntry =  FoodModel.getFoodByIndex(inFood.index);
    	this.$.food.setFood(foodEntry);
    },
    canteenItemSelected: function(inSender, inCanteen) {
    	CanteenModel.setCanteen(inCanteen.content);
    	this.$.title.setContent(CanteenModel.getCanteenName() + " - " + this.formatDate(DateModel.getCurrentDate()));
    	this.refresh();
    },
    formatDate: function(date) {
    	var year = date.getFullYear();
		var month = date.getMonth() + 1;
		var day = date.getDate();
		return day+"."+month+"."+year
    },
    buttonPreviousDate: function() {
        this.$.foodlist.setDate(DateModel.getPreviousDate());
        this.$.title.setContent(CanteenModel.getCanteenName() + " - " + this.formatDate(DateModel.getCurrentDate()));
    },
    buttonHomeDate: function() {
    	DateModel.initialize();
        this.$.foodlist.setDate(DateModel.getCurrentDate());
        this.$.title.setContent(CanteenModel.getCanteenName() + " - " + this.formatDate(DateModel.getCurrentDate()));
    },
    buttonNextDate: function() {
        this.$.foodlist.setDate(DateModel.getNextDate());
        this.$.title.setContent(CanteenModel.getCanteenName() + " - " + this.formatDate(DateModel.getCurrentDate()));
    }
});
