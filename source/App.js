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
				{name: "title", content: "Chemnitz"}
			]},
			{kind: "FittableColumns", components: [
				{kind: "onyx.MenuDecorator", fit: "true", onSelect: "mensaItemSelected", components: [ 
					{name: "menuMensa", content: "", components: [{kind: "onyx.Icon", src: "assets/settings.png"}]},
					{kind: "onyx.Tooltip", content: "Choose your canteen"},
					{kind: "onyx.Menu", components: [ 
						{content: "Straße der Nationen"}, 
						{content: "Reichenhainer"}
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
		DateManager.initialize();
		this.$.foodlist.setCount(50);
		this.$.title.setContent(Canteen.getCanteenName() + " - " + this.formatDate(DateManager.getCurrentDate()));
	},
	rendered: function() {
		this.inherited(arguments);
		this.setIndex(0);
	},
	refresh: function() {
        this.$.foodlist.setDate(DateManager.getCurrentDate());
    },
    foodSelected: function(inSender, inFood) {
    	var essen =  Essen.getEssenByIndex(inFood.index);
    	this.$.food.setFood(essen);
    },
    mensaItemSelected: function(inSender, inMensa) {
    	Canteen.setCanteen(inMensa.content);
    	this.$.title.setContent(Canteen.getCanteenName() + " - " + this.formatDate(DateManager.getCurrentDate()));
    	this.refresh();
    },
    formatDate: function(date) {
    	var year = date.getFullYear();
		var month = date.getMonth() + 1;
		var day = date.getDate();
		return day+"."+month+"."+year
    },
    buttonPreviousDate: function() {
        this.$.foodlist.setDate(DateManager.getPreviousDate());
        this.$.title.setContent(Canteen.getCanteenName() + " - " + this.formatDate(DateManager.getCurrentDate()));
    },
    buttonHomeDate: function() {
    	DateManager.initialize();
        this.$.foodlist.setDate(DateManager.getCurrentDate());
        this.$.title.setContent(Canteen.getCanteenName() + " - " + this.formatDate(DateManager.getCurrentDate()));
    },
    buttonNextDate: function() {
        this.$.foodlist.setDate(DateManager.getNextDate());
        this.$.title.setContent(Canteen.getCanteenName() + " - " + this.formatDate(DateManager.getCurrentDate()));
    }
});
