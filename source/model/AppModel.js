/**
 * App metadata
 */
var AppModel = ({
	initialize: function()  {
		this.version = "1.0.0";
    	this.author = "Björn Adelberg";
    	
    	this.isAndroid = false;
    	this.isWeb = true;
    	
    	this.supportMail = '<a href="mailto:bjawebos@adelberg-online.de">EMail</a>';
    	this.supportHomepage = '<a href="http://dev.adelberg-online.de" target="_blank">Homepage</a>';
	    this.supportTwitter = '<a href="https://twitter.com/bjawebos" target="_blank">https://twitter.com/bjawebos</a>';
    	this.supportTwitterShort = '<a href="https://twitter.com/bjawebos" target="_blank">@bjawebos</a>';
    	this.supportFacebook = '<a href="http://goo.gl/FPv0d" target="_blank">Facebook Page</a>';
    	
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