/**
 * This kind views the about panel.
 */
enyo.kind({
	name: "About",
	kind: "Panels",
	realtimeFit: true,
	classes: "enyo-border-box",
	components: [
		{kind: "Scroller", horizontal:"hidden", fit: true, touch: true, classes: "scroller-sample-scroller enyo-fit", components: [
			{kind: "FittableRows", name: "aboutContent", centered: true, components: [
				{name: "aboutTitle", content: $L('About'), tag: "h1"},
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
				]}
			]}
		]}
	],
	create: function(inControl) {
		this.inherited(arguments);
		AppModel.initialize();
		AppModel.setExistsSmallScreen();
		// set about content
		this.$.aboutTitle.setContent($L('About'));
		this.$.mailContent.setContent(AppModel.supportMail);
		this.$.homepageContent.setContent(AppModel.supportHomepage);
		if (AppModel.getExistsSmallScreen()) {
			this.$.twitterContent.setContent(AppModel.supportTwitterShort);
		} else {
			this.$.twitterContent.setContent(AppModel.supportTwitter);
		}
		this.$.authorContent.setContent($L('Author:') + " " + AppModel.author);
		this.$.versionContent.setContent("Version: " + AppModel.version);
	},
	rendered: function() {
		this.inherited(arguments);
	}
});