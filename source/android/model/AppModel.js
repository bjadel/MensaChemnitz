/**
 * App metadata
 */
var AppModel = ({
	initialize: function()  {
		this.version = "1.0.1";
    	this.author = "Björn Adelberg";
    	
    	this.isAndroid = true;
    	this.isWeb = false;
    	
    	//this.supportMail = "bjawebos@adelberg-online.de";
    	//this.supportHomepage = "<a click=\"loadURL('http://dev.adelberg-online.de')\">http://dev.adelberg-online.de</a>";
    	//this.supportTwitter = "<a click=\"loadURL('https://twitter.com/bjawebos')\">https://twitter.com/bjawebos</a>";
    	//this.supportTwitterShort = "<a click=\"loadURL('https://twitter.com/bjawebos')\">@bjawebos</a>";
    	//this.supportFacebook = "<a click=\"loadURL('http://goo.gl/FPv0d')\">http://goo.gl/FPv0d</a>";
    	
    	this.supportMail = "mailto:bjawebos@adelberg-online.de";
    	this.supportHomepage = "http://dev.adelberg-online.de";
	    this.supportTwitter = "https://twitter.com/bjawebos";
    	this.supportFacebook = "http://goo.gl/FPv0d";
    	
    	this.existsSmallScreen = false;
	},
	setExistsSmallScreen: function() {
		this.existsSmallScreen = enyo.dom.getWindowWidth() <= 760;
	},
	getExistsSmallScreen: function() {
		return this.existsSmallScreen;
	},
	getIsAndroid: function() {
		return this.isAndroid;
	}
});