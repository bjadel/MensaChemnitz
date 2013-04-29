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
	handlers: {
		resize: "resizeHandler"
	},
	components: [
		{kind: "enyo.Signals", onbackbutton: "backButtonHandler", onkeydown: "docKeypress", ondeviceready: "deviceready" },
		{kind: "FittableRows", classes: "left", components: [
			{kind: "onyx.Toolbar", style: "overflow: initial;", components: [
				{name: "title", content: "Chemnitz", style: "width: 90%;"},
				{name: "grabPicture", kind: "Image", src: "lib/onyx/images/grabbutton.png"}
			]},
			{kind: "FittableColumns", components: [
				{kind: "onyx.MenuDecorator", fit: "true", onSelect: "settingsMenuItemSelected", components: [ 
					{name: "menuCanteen", content: "", components: [{kind: "onyx.Icon", src: "assets/settings.png"}]},
					{kind: "onyx.Tooltip", content: $L('Settings such as canteen selection')},
					{kind: "onyx.Menu", floating: true, components: [ 
						{name: "stranaCanteen", content: ""}, 
						{name: "rhCanteen", content: ""},
						{classes: "onyx-menu-divider"},
						{content: $L('About')}
					]}
				]},
				{kind: "onyx.TooltipDecorator", components: [
					{kind: "onyx.Button", name:"buttonPreviousDate", ontap:"buttonPreviousDate", components: [ {kind: "onyx.Icon", src: "assets/go-previous.png"} ]},
					{kind: "onyx.Tooltip", content: $L('Previous')} 
				]},
				{kind: "onyx.TooltipDecorator", components: [
					{kind: "onyx.Button", name:"buttonHomeDate", ontap:"buttonHomeDate", components: [ {kind: "onyx.Icon", src: "assets/go-home.png"} ]},
					{kind: "onyx.Tooltip", content: $L('Today')}
				]},
				{kind: "onyx.TooltipDecorator", components: [
					{kind: "onyx.Button", name:"buttonNextDate", ontap:"buttonNextDate", components: [ {kind: "onyx.Icon", src: "assets/go-next.png"} ]},
					{kind: "onyx.Tooltip", content: $L('Next')}
				]}
			]},
			{kind: "FoodList", name: "foodlist", onSelect: "foodSelected", fit: true}
		]},
		{kind: "FittableRows", components: [
			{kind: "FittableColumns", noStretch: true, classes: "onyx-toolbar onyx-toolbar-inline", components: [
				{kind: "onyx.Grabber"},
				{kind: "Scroller", thumb: false, fit: true, touch: true, vertical: "hidden", style: "margin: 0;", components: [
					{classes: "onyx-toolbar-inline", style: "white-space: nowrap;", components: [
						{kind: "onyx.Button", name:"buttonBack", classes: "onyx-affirmative", ontap:"buttonBack", components: [ {kind: "onyx.Icon", style: "width: 24px; height: 24px;", src: "assets/go-back-gray.png"} ]},
						{kind: "onyx.Button", name:"buttonNextFood", ontap:"buttonNextFood", components: [ {kind: "onyx.Icon", style: "width: 24px; height: 24px;", src: "assets/go-next-gray.png"} ]},
						{kind: "onyx.Button", name:"buttonPreviousFood", ontap:"buttonPreviousFood", components: [ {kind: "onyx.Icon", style: "width: 24px; height: 24px;", src: "assets/go-previous-gray.png"} ]}
					]}
				]}
			]},
			{kind: "Panels", name: "contentPanels", draggable: false, arrangerKind: "CardSlideInArranger", fit:true, realtimeFit: true, classes: "panels-sample-panels enyo-border-box", components: [
				{kind: "Food", name: "food", fit: true},
				{kind: "About", name: "aboutPanel", fit: true}
			]}
		]}
	],
	create: function() {
		this.inherited(arguments);
	},
	rendered: function() {
		this.inherited(arguments);
		this.setIndex(0);
	},
	asyncInitialize: function() {
		// core init
		DateModel.initialize();
		CanteenModel.initialize();
		FoodModel.initialize();
		AppModel.initialize();
		// get data from service
		enyo.asyncMethod(this, "asyncCallDate", DateModel.getCurrentDate());
		// extended init
		this.initialize();
	},
	asyncCallDate: function(date) {
	 	this.$.foodlist.setDate(date);
	},
    initialize: function() {
		AppModel.setExistsSmallScreen();
		// When ready...
		window.addEventListener("load",function() {
			// Set a timeout...
			setTimeout(function(){
				// Hide the address bar!
				window.scrollTo(0, 1);
			}, 0);
		});
		// set visibility of food rotation buttons
		if (!AppModel.getExistsSmallScreen()) {
			this.$.buttonBack.setStyle("visibility:hidden;");
			this.$.buttonPreviousFood.setStyle("visibility:hidden;");
			this.$.buttonNextFood.setStyle("visibility:hidden;");
		}
		// set canteen menu entries
		this.$.stranaCanteen.setContent(StraNaCanteen.name);
		this.$.rhCanteen.setContent(ReichenhainerCanteen.name);
		this.$.title.setContent(CanteenModel.getCanteenName() + " - " + this.formatDate(DateModel.getCurrentDate()));
    },
	refresh: function() {
		this.cleanContentPanel();
		enyo.asyncMethod(this, "asyncInitialize");
    },
    foodSelected: function(inSender, inFood) {
    	this.cleanContentPanel();
    	this.$.title.setContent(CanteenModel.getCanteenName() + " - " + this.formatDate(DateModel.getCurrentDate()));
    	var foodEntry =  FoodModel.getFoodByIndex(inFood.index, true);
    	this.$.food.setFood(foodEntry);
    	if (AppModel.getExistsSmallScreen()) {
    		// do not set the index to 1 after web service call (see FoodList)
    		if (!inFood.first == 1) {
	    		this.setIndex(1);
    		}
    	}
    },
    settingsMenuItemSelected: function(inSender, inSettings) {
    	if ($L('About') == inSettings.content) {
    		// 'About' clicked
			this.addAboutPanel();    		
    	} else {
    		// canteen chosen
    		CanteenModel.setCanteen(inSettings.content);
	    	this.$.title.setContent(CanteenModel.getCanteenName() + " - " + this.formatDate(DateModel.getCurrentDate()));
	    	this.refresh();
    	}
    },
    addAboutPanel: function() {
    	// hide food selection buttons
    	this.$.buttonPreviousFood.setStyle("visibility:hidden;");
		this.$.buttonNextFood.setStyle("visibility:hidden;");
		// set about panel
		this.$.contentPanels.setIndex(2);
		if (AppModel.getExistsSmallScreen()) {
    		this.setIndex(1);
    	}
    },
    cleanContentPanel: function() {
    	if (AppModel.getExistsSmallScreen()) {
			this.$.buttonPreviousFood.setStyle("visibility:visible;");
			this.$.buttonNextFood.setStyle("visibility:visible;");
		} else {
			this.$.buttonPreviousFood.setStyle("visibility:hidden;");
			this.$.buttonNextFood.setStyle("visibility:hidden;");
		}
    	this.$.contentPanels.setIndex(0);
    	if (!AppModel.getExistsSmallScreen()) {
    		this.setIndex(0);
    	}
    },
    formatDate: function(date) {
		return DateModel.formatDate(date);
    },
    buttonPreviousDate: function() {
    	this.cleanContentPanel();
    	enyo.asyncMethod(this, "asyncCallDate", DateModel.getPreviousDate());
    },
    buttonHomeDate: function() {
    	this.cleanContentPanel();
    	DateModel.initialize();
    	enyo.asyncMethod(this, "asyncCallDate", DateModel.getCurrentDate());
    },
    buttonNextDate: function() {
    	this.cleanContentPanel();
    	enyo.asyncMethod(this, "asyncCallDate", DateModel.getNextDate());
    },
    buttonPreviousFood: function() {
    	this.cleanContentPanel();
        var foodEntry =  FoodModel.getPreviousFood();
    	this.$.food.setFood(foodEntry);
    },
    buttonNextFood: function() {
    	this.cleanContentPanel();
    	var foodEntry = FoodModel.getNextFood();
    	this.$.food.setFood(foodEntry);
    },
    buttonBack: function() {
    	this.cleanContentPanel();
    	this.setIndex(0);
	},
	backButtonHandler: function(inSender, inEvent) {
		if (AppModel.getIsAndroid()) {
			if (this.getIndex() < 1) {
				navigator.app.exitApp(); 
			}
			if (AppModel.getExistsSmallScreen()) {
				this.cleanContentPanel();
				this.setIndex(0);
			}
		}
	},
	resizeHandler: function(inSender, inEvent) {
		AppModel.setExistsSmallScreen();
		if (!AppModel.getExistsSmallScreen()) {
			this.$.buttonBack.setStyle("visibility:hidden;");
			this.$.buttonPreviousFood.setStyle("visibility:hidden;");
			this.$.buttonNextFood.setStyle("visibility:hidden;");
		} else {
			this.$.buttonBack.setStyle("visibility:visible;");
			this.$.buttonPreviousFood.setStyle("visibility:visible;");
			this.$.buttonNextFood.setStyle("visibility:visible;");
		}
		this.cleanContentPanel();
		this.rendered();
	},
	docKeypress: function(inSender, inEvent) {
		//console.log("Key pressed (keyCode:"+inEvent.keyCode+")");
		if (inEvent.keyCode === 27 || inEvent.keyCode === 8) {
			// esc or backspace
			if (AppModel.getExistsSmallScreen()) {
				this.setIndex(0);
			}
		} else if (inEvent.keyCode === 40 || inEvent.keyCode === 34) {
			// arrow/page down
			this.buttonNextFood();
		} else if (inEvent.keyCode === 38 || inEvent.keyCode === 33) {
			// arrow/page up
			this.buttonPreviousFood();
		} else if (inEvent.keyCode === 39) {
			// arrow right
			this.buttonNextDate();
		} else if (inEvent.keyCode === 37) {
			// arrow left
			this.buttonPreviousDate();
		}
	}
});
