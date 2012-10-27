/**
 * App metadata
 */
var AppModel = ({
	initialize: function()  {
		this.version = "0.2.0";
    	this.author = "Björn Adelberg";
    	this.supportMail = "bjawebos@adelberg-online.de";
    	this.supportHomepage = "http://dev.adelberg-online.de";
    	this.supportTwitter = "https://twitter.com/bjawebos";
    	this.supportTwitterShort = "@bjawebos";
    	this.existsSmallScreen = false;
	},
	setExistsSmallScreen: function() {
		this.existsSmallScreen = enyo.dom.getWindowWidth() <= 760;
	},
	getExistsSmallScreen: function() {
		return this.existsSmallScreen;
	}
});