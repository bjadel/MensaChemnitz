/**
 * This kind views the about panel.
 */
enyo.kind({
	name: "Settings",
	kind: "Panels",
	realtimeFit: true,
	classes: "enyo-border-box settings-panel",
	events: {
		onSelect: ""
	},
	selectedCanteenKey: "rh",
	components: [
		{kind: "Scroller", horizontal:"hidden", fit: true, touch: true, classes: "scroller-sample-scroller enyo-fit", components: [
			{kind: "FittableRows", classes: "settings-panel-content", centered: true, components: [
				{name: "settingsTitle", content: $L('Settings'), tag: "h1"},
				{kind: "onyx.Groupbox", style: "margin-top: 10px;", components: [ 
					{ kind: "onyx.GroupboxHeader", classes: "popup_app_groupboxHeader", content: $L('Canteen')},
					{ kind: "Group", classes: "onyx-sample-tools group", onActivate:"mensaActivated", highlander: true, components: [
						{kind: "onyx.InputDecorator", components: [
							{ kind:"onyx.Checkbox", name: "rh"},
							{ content: "Reichenhainer Straße"}
						]},
						{kind: "onyx.InputDecorator", components: [
							{ kind:"onyx.Checkbox", name: "strana"},
							{ content: "Straße der Nationen"}
						]} 
					]}					
				]},
				{name: "aboutTitle", content: $L('About'), tag: "h1"},
				{kind: "onyx.Groupbox", style: "margin-top: 10px;", components: [ 
					{ kind: "onyx.GroupboxHeader", classes: "popup_app_groupboxHeader", content: "Info"},
					{ name: "authorContent", tag: "p", content: "Author: Björn Adelberg" },
					{ name: "versionContent", tag: "p" }					
				]},
				{kind: "onyx.Groupbox", style: "margin-top: 10px;", components: [ 
					{ kind: "onyx.GroupboxHeader", classes: "popup_app_groupboxHeader", content: "Support"},
					{ kind: "FittableColumns", components: [
						{ name: "mailPicture", kind: "Image", src: "assets/mail.png"},									
						{ name: "mailContent", tag: "p", allowHtml: true , content: "bjawebos@adelberg-online.de" }
					]},
					{ kind: "FittableColumns", components: [
						{ name: "wwwPicture", kind: "Image", src: "assets/browser.png" },									
						{ name: "homepageContent", tag: "p", allowHtml: true }
					]},
					{ kind: "FittableColumns", components: [
						{ name: "twtPicture", kind: "Image", src: "assets/twitter.png" },									
						{ name: "twitterContent", tag: "p", allowHtml: true}
					]},
					{ kind: "FittableColumns", components: [
						{ name: "fbPicture", kind: "Image", src: "assets/f_logo.png" },									
						{ name: "fbContent", tag: "p", allowHtml: true}
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
		this.$.fbContent.setContent(AppModel.supportFacebook);
	},
	rendered: function() {
		this.inherited(arguments);
	},
	mensaActivated: function(inSender, inEvent) {
		if (inEvent.originator.getActive()) {
			if (this.selectedCanteenKey != inEvent.originator.name) {
				this.selectedCanteenKey = inEvent.originator.name;
				this.doSelect();
			}
		}
	},
	setSelectedCanteenKey: function(canteenKey) {
		this.selectedCanteenKey = canteenKey;
		// set settings content
		if (this.selectedCanteenKey == ReichenhainerCanteen.key) {
			this.$.rh.setChecked(true);
		} else if (this.selectedCanteenKey == StraNaCanteen.key) {
			this.$.strana.setChecked(true);
		} else {
			this.selectedCanteenKey = ReichenhainerCanteen.key;
		} 
	}
});