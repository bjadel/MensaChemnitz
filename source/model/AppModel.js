/**
 * App metadata
 */
var AppModel = ({
	initialize: function()  {
		this.version = "0.4.0";
    	this.author = "Björn Adelberg";
    	this.supportMail = "bjawebos@adelberg-online.de";
    	
    	this.isAndroid = false;
    	this.isWeb = true;
    	this.isWebOS = false;
    	
    	if (this.isAndroid) {
    		this.supportHomepage = "http://dev.adelberg-online.de";
    		this.supportTwitter = "https://twitter.com/bjawebos";
    		this.supportTwitterShort = "@bjawebos";
    		this.supportFacebook = "http://goo.gl/FPv0d";
    	} else {
    		this.supportHomepage = '<a href="http://dev.adelberg-online.de" target="_blank">http://dev.adelberg-online.de</a>';
	    	this.supportTwitter = '<a href="https://twitter.com/bjawebos" target="_blank">https://twitter.com/bjawebos</a>';
    		this.supportTwitterShort = '<a href="https://twitter.com/bjawebos" target="_blank">@bjawebos</a>';
    		this.supportFacebook = '<a href="http://goo.gl/FPv0d" target="_blank">Facebook Page</a>';
    	}
    	
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
	},
	getIsWebOS: function() {
		return this.isWebOS;
	}
});