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
		resize: "resizeHandler",
	},
	components: [
		{kind: "enyo.Signals", onbackbutton: "backButtonHandler", onkeydown: "docKeypress" },
		{kind: "FittableRows", classes: "left", components: [
			{kind: "onyx.Toolbar", style: "overflow: initial;", components: [
				{name: "title", content: "Chemnitz", style: "width: 90%;"},
				{name: "grabPicture", kind: "Image", src: "lib/onyx/images/grabbutton.png"}
			]},
			{kind: "FittableColumns", components: [
				{kind: "onyx.MenuDecorator", fit: "true", onSelect: "settingsMenuItemSelected", components: [ 
					{name: "menuCanteen", content: "", components: [{kind: "onyx.Icon", src: "assets/settings.png"}]},
					{kind: "onyx.Tooltip", content: "Settings such as canteen selection"},
					{kind: "onyx.Menu", floating: true, components: [ 
						{name: "stranaCanteen", content: ""}, 
						{name: "rhCanteen", content: ""},
						{classes: "onyx-menu-divider"},
						{content: "About"}
					]}
				]},
				{kind: "onyx.TooltipDecorator", components: [
					{kind: "onyx.Button", name:"buttonPreviousDate", ontap:"buttonPreviousDate", components: [ {kind: "onyx.Icon", src: "assets/go-previous.png"} ]},
					{kind: "onyx.Tooltip", content: "Previous"} 
				]},
				{kind: "onyx.TooltipDecorator", components: [
					{kind: "onyx.Button", name:"buttonHomeDate", ontap:"buttonHomeDate", components: [ {kind: "onyx.Icon", src: "assets/go-home.png"} ]},
					{kind: "onyx.Tooltip", content: "Today"}
				]},
				{kind: "onyx.TooltipDecorator", components: [
					{kind: "onyx.Button", name:"buttonNextDate", ontap:"buttonNextDate", components: [ {kind: "onyx.Icon", src: "assets/go-next.png"} ]},
					{kind: "onyx.Tooltip", content: "Next"}
				]}
			]},
			{kind: "FoodList", name: "foodlist", onSelect: "foodSelected", fit: true},
			{name: "modalPopupAbout", classes: "onyx-sample-popup", kind: "onyx.Popup", style: "z-index: 100;", centered: true, modal: true, floating: true, onShow: "popupShown", onHide: "popupHidden", components: [ 
				{content: "About"},
				{kind: "onyx.Groupbox", style: "margin-top: 10px;", components: [ 
					{ kind: "onyx.GroupboxHeader", classes: "popup_app_groupboxHeader", content: "Info"},
					{ name: "authorContent", tag: "p", content: "Author: Björn Adelberg" },
					{ name: "versionContent", tag: "p", content: "Version: 0.1.5" }					
				]},
				{kind: "onyx.Groupbox", style: "margin-top: 10px;", components: [ 
					{ kind: "onyx.GroupboxHeader", classes: "popup_app_groupboxHeader", content: "Support"},
					{ kind: "FittableColumns", components: [
						{ name: "mailPicture", kind: "Image", src: "assets/mail.png"},									
						{ name: "mailContent", tag: "p", content: "bjawebos@adelberg-online.de" }
					]},
					{ kind: "FittableColumns", components: [
						{ name: "wwwPicture", kind: "Image", src: "assets/browser.png"},									
						{ name: "homepageContent", tag: "p", content: "http://dev.adelberg-online.de" }
					]},
					{ kind: "FittableColumns", components: [
						{ name: "twtPicture", kind: "Image", src: "assets/twitter.png"},									
						{ name: "twitterContent", tag: "p", content: "https://twitter.com/bjawebos" }
					]}										
				]},
				{ kind: "onyx.Button", classes: "onyx-affirmative", content: "Close", ontap: "closeModalPopup"} 
			]}
		]},
		{kind: "FittableRows", components: [
			{kind: "FittableColumns", noStretch: true, classes: "onyx-toolbar onyx-toolbar-inline", components: [
				{kind: "onyx.Grabber"},
				{kind: "Scroller", thumb: false, fit: true, touch: true, vertical: "hidden", style: "margin: 0;", components: [
					{classes: "onyx-toolbar-inline", style: "white-space: nowrap;", components: [
						{kind: "onyx.Button", name:"buttonBack", ontap:"buttonBack", components: [ {kind: "onyx.Icon", style: "width: 24px; height: 24px;", src: "assets/go-back-gray.png"} ]},
						{kind: "onyx.Button", name:"buttonNextFood", ontap:"buttonNextFood", components: [ {kind: "onyx.Icon", style: "width: 24px; height: 24px;", src: "assets/go-next-gray.png"} ]},
						{kind: "onyx.Button", name:"buttonPreviousFood", ontap:"buttonPreviousFood", components: [ {kind: "onyx.Icon", style: "width: 24px; height: 24px;", src: "assets/go-previous-gray.png"} ]}
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
		AppModel.initialize();
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
		// set about content
		this.$.mailContent.setContent(AppModel.supportMail);
		this.$.homepageContent.setContent(AppModel.supportHomepage);
		this.$.twitterContent.setContent(AppModel.supportTwitter);
		this.$.authorContent.setContent("Author: " + AppModel.author);
		this.$.versionContent.setContent("Version: " + AppModel.version);
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
    	var foodEntry =  FoodModel.getFoodByIndex(inFood.index, true);
    	this.$.food.setFood(foodEntry);
    	if (AppModel.getExistsSmallScreen()) {
    		if (!inFood.first == 1) {
	    		this.setIndex(1);
    		}
    	}
    },
    settingsMenuItemSelected: function(inSender, inSettings) {
    	if ("About" == inSettings.content) {
    		// 'About' clicked
    		this.$.modalPopupAbout.show();
    	} else {
    		// canteen chosen
    		CanteenModel.setCanteen(inSettings.content);
	    	this.$.title.setContent(CanteenModel.getCanteenName() + " - " + this.formatDate(DateModel.getCurrentDate()));
	    	this.refresh();
    	}
    },
    popupHidden: function() { 
		// FIXME: needed to hide ios keyboard 
		document.activeElement.blur(); 
	}, 
	popupShown: function() {
		// nothing to do
	},
	closeModalPopup: function() { 
		this.$.modalPopupAbout.hide();
	},
    formatDate: function(date) {
		return DateModel.formatDate(date);
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
    },
    buttonPreviousFood: function() {
        var foodEntry =  FoodModel.getPreviousFood();
    	this.$.food.setFood(foodEntry);
    },
    buttonNextFood: function() {
    	var foodEntry = FoodModel.getNextFood();
    	this.$.food.setFood(foodEntry);
    },
    buttonBack: function() {
    	this.setIndex(0);
	},
	backButtonHandler: function(inSender, inEvent) {
		if (AppModel.getExistsSmallScreen()) {
			this.setIndex(0);
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
		this.render();
	},
	docKeypress: function(inSender, inEvent) {
		//console.log("Key pressed (keyCode:"+inEvent.keyCode+")");
		if (inEvent.keyCode === 27) {
			// esc
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
