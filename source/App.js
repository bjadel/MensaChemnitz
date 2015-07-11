/**
 * Main kind.
 */
enyo.kind({
	name: "App",
	kind: "Panels",
	classes: "app enyo-unselectable",
	fit: true,
	realtimeFit: true,
	doNotReinitThePanel: false,
	isSettingsVisible: false,
	arrangerKind: "CollapsingArranger",
	handlers: {
		resize: "resizeHandler"
	},
	components: [
		{kind: "enyo.Signals", onkeydown: "docKeypress", onbackbutton: "backButtonHandler" },
		{kind: "FittableRows", classes: "left", components: [
			{kind: "onyx.Toolbar", style: "overflow: initial;", components: [
				{name: "title", content: "Chemnitz", style: "width: 90%;", ontap: "canteenSelected", allowHtml: true},
				{name: "grabPicture", kind: "Image", src: "lib/onyx/images/grabbutton.png"}
			]},
			{kind: "FittableColumns", components: [
				{kind: "onyx.TooltipDecorator", fit: true, components: [
					{kind: "onyx.Button", name:"buttonSettings", ontap:"addSettingsPanel", components: [ {kind: "onyx.Icon", src: "assets/settings.png"} ]},
					{kind: "onyx.Tooltip", content: $L('Settings such as canteen selection')} 
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
						{kind: "onyx.Button", name:"buttonShare", ontap:"buttonShare", components: [ {kind: "onyx.Icon", style: "width: 24px; height: 24px;", src: "assets/share.png"} ]},
						{kind: "onyx.Button", name:"buttonNextFood", ontap:"buttonNextFood", components: [ {kind: "onyx.Icon", style: "width: 24px; height: 24px;", src: "assets/go-next-gray.png"} ]},
						{kind: "onyx.Button", name:"buttonPreviousFood", ontap:"buttonPreviousFood", components: [ {kind: "onyx.Icon", style: "width: 24px; height: 24px;", src: "assets/go-previous-gray.png"} ]}
					]}
				]}
			]},
			{kind: "Panels", name: "contentPanels", draggable: false, arrangerKind: "CardSlideInArranger", fit:true, realtimeFit: true, classes: "panels-sample-panels enyo-border-box", components: [
				{kind: "Food", name: "food", fit: true},
				{kind: "Settings", name: "settingsPanel", onSelect: "updateCanteen", fit: true},
				{kind: "Canteen", name: "canteenPanel", fit: true}
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
			this.$.buttonBack.hide();
			this.$.buttonPreviousFood.hide();
			this.$.buttonNextFood.hide();
			if (!AppModel.getIsAndroid()) {
				this.$.buttonShare.hide();
			}
		}
		// set canteen name
		this.$.title.setContent("<span style=\"text-decoration:underline;\">" + CanteenModel.getCanteenName() + "</span> - " + this.formatDate(DateModel.getCurrentDate()));
    },
	refresh: function() {
		this.cleanContentPanel();
		enyo.asyncMethod(this, "asyncInitialize");
    },
    foodSelected: function(inSender, inFood) {
    	if (this.doNotReinitThePanel == false) {
    		this.cleanContentPanel();
    		this.isSettingsVisible = false;
    	}
    	this.$.title.setContent("<span style=\"text-decoration:underline;\">" + CanteenModel.getCanteenName() + "</span> - " + this.formatDate(DateModel.getCurrentDate()));
    	var foodEntry =  FoodModel.getFoodByIndex(inFood.index, true);
    	this.$.food.setFood(foodEntry);
    	if (AppModel.getExistsSmallScreen()) {
    		// do not set the index to 1 after web service call (see FoodList)
    		if (!inFood.first == 1) {
    			if (this.doNotReinitThePanel == false) {
	    			this.setIndex(1);
	    		}
    		}
    	}
    	if (this.doNotReinitThePanel == true) {
   			this.doNotReinitThePanel = false;
    	}
    },
    addSettingsPanel: function() {
    	// hide food selection buttons
    	this.$.buttonPreviousFood.hide();
		this.$.buttonNextFood.hide();
    	// set current canteen
		this.$.settingsPanel.setSelectedCanteenKey(CanteenModel.getCanteen().key);
    	this.$.contentPanels.setIndex(1);
		if (AppModel.getExistsSmallScreen()) {
    		this.setIndex(1);
    	}
    	this.isSettingsVisible = true;
    },
    canteenSelected: function() {
    // hide food selection buttons
    	this.$.buttonPreviousFood.hide();
		this.$.buttonNextFood.hide();
    	// set current canteen
		this.$.canteenPanel.setSelectedCanteen(CanteenModel.getCanteen());
    	this.$.contentPanels.setIndex(2);
		if (AppModel.getExistsSmallScreen()) {
    		this.setIndex(1);
    	}
    	this.isSettingsVisible = false;
    },
    cleanContentPanel: function() {
    	if (AppModel.getExistsSmallScreen()) {
			this.$.buttonPreviousFood.show();
			this.$.buttonNextFood.show();
		} else {
			this.$.buttonPreviousFood.hide();
			this.$.buttonNextFood.hide();
		}
		if (!AppModel.getIsAndroid()) {
			this.$.buttonShare.hide();
		}
    	this.$.contentPanels.setIndex(0);
    	if (!AppModel.getExistsSmallScreen()) {
    		this.setIndex(0);
    	}
    },
    formatDate: function(date) {
		return DateModel.formatDate(date);
    },
    updateCanteen: function(inSender) {
		// set canteen name
		var canteenKey = inSender.selectedCanteenKey;
		CanteenModel.setCanteenKey(canteenKey);
		// set flag "do not reinitialize the panel"
		// the current settings panel should be activated/visible
		this.doNotReinitThePanel = true;
		// get data from service for new canteen
		enyo.asyncMethod(this, "asyncCallDate", DateModel.getCurrentDate());    
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
    	if (AppModel.getExistsSmallScreen()) {
    		this.cleanContentPanel();
			this.setIndex(0);
		}
	},
	backButtonHandler: function(inSender, inEvent) {
		if (AppModel.getIsAndroid()) {
			if (this.getIndex() < 1) {
				navigator.app.exitApp();
			}
			this.buttonBack();
		}
	}, 
	buttonShare: function() {
		var lastClickedFood = FoodModel.getLastClickedFood();
		if (lastClickedFood != null && !this.isSettingsVisible) {
			var foodCategory = lastClickedFood.category;
			var foodPictureKey = lastClickedFood.pictureKey;
			if (foodPictureKey == "0") {
				var pictureURL = ""; 
			} else {
				var pictureURL = CanteenService.getPictureURL()+foodPictureKey+".png ";
			}
			var text = " " + $L('tastes very well today!')+" "+pictureURL+"#chemapp";
			this.share(foodCategory, text);
		} else {
			var text = $L('I like this app!')+" http://goo.gl/FPv0d #chemapp";
			this.share("", text);
		}
	},
	share: function(subject, text) {
		ShareService.share(subject, text);
	},
	resizeHandler: function(inSender, inEvent) {
		AppModel.setExistsSmallScreen();
		if (!AppModel.getExistsSmallScreen()) {
			this.$.buttonBack.hide();
			this.$.buttonPreviousFood.hide();
			this.$.buttonNextFood.hide();
		} else {
			this.$.buttonBack.show();
			this.$.buttonPreviousFood.show();
			this.$.buttonNextFood.show();
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
