/**
 * App metadata
 */
var AppModel = ({
	initialize: function()  {
		this.version = "1.1.0";
    	this.author = "Björn Adelberg";
    	
    	this.isAndroid = true;
    	this.isWeb = false;
    	
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