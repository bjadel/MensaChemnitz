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
				{kind: "onyx.MenuDecorator", fit: "true", onSelect: "settingsMenuItemSelected", components: [ 
					{name: "menuCanteen", content: "", components: [{kind: "onyx.Icon", src: "assets/settings.png"}]},
					{kind: "onyx.Tooltip", content: "Settings such as canteen selection"},
					{kind: "onyx.Menu", components: [ 
						{name: "stranaCanteen", content: ""}, 
						{name: "rhCanteen", content: ""},
						{classes: "onyx-menu-divider"},
						{content: "About"}
					]}
				]},
				{kind: "onyx.Button", name:"buttonPreviousDate", ontap:"buttonPreviousDate", components: [ {kind: "onyx.Icon", src: "assets/go-previous.png"} ]},
				{kind: "onyx.Button", name:"buttonHomeDate", ontap:"buttonHomeDate", components: [ {kind: "onyx.Icon", src: "assets/go-home.png"} ]},
				{kind: "onyx.Button", name:"buttonNextDate", ontap:"buttonNextDate", components: [ {kind: "onyx.Icon", src: "assets/go-next.png"} ]}
			]},
			{kind: "FoodList", name: "foodlist", onSelect: "foodSelected", fit: true},
			{name: "modalPopupAbout", classes: "onyx-sample-popup", kind: "onyx.Popup", centered: true, modal: true, floating: true, onShow: "popupShown", onHide: "popupHidden", components: [ 
				{content: "About"},
				{kind: "onyx.Groupbox", style: "margin-top: 10px;", components: [ 
					{ kind: "onyx.GroupboxHeader", classes: "popup_app_groupboxHeader", content: "Info"},
					{ name: "authorContent", tag: "p", content: "Author: Björn Adelberg" },
					{ name: "versionContent", tag: "p", content: "Version: 0.1.3-1" }					
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
    	var foodEntry =  FoodModel.getFoodByIndex(inFood.index);
    	this.$.food.setFood(foodEntry);
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
