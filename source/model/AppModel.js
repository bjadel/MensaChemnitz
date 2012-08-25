/**
 * App metadata
 */
var AppModel = ({
	initialize: function()  {
		this.version = "0.1.6";
    	this.author = "Björn Adelberg";
    	this.supportMail = "bjawebos@adelberg-online.de";
    	this.supportHomepage = "http://dev.adelberg-online.de";
    	this.supportTwitter = "https://twitter.com/bjawebos";
    	this.existsSmallScreen = false;
	},
	setExistsSmallScreen: function(smallScreen) {
		this.existsSmallScreen = smallScreen;
	},
	getExistsSmallScreen: function() {
		return this.existsSmallScreen;
	}
});