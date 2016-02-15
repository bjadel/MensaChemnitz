/**
 * This kind views the about panel.
 */
enyo.kind({
	name: "Settings",
	kind: "Panels",
	realtimeFit: true,
	classes: "enyo-border-box settings-panel",
	modus: "unlocked",
	events: {
		onSelect: "",
		onBack: ""
	},
	selectedCanteenKey: "rh",
	components: [
		{kind: "Scroller", fit: true, touch: true, strategyKind: "TouchScrollStrategy", ondragover: "handleOnDragEvent", ondown: "unlock", vertical: "auto", horizontal: "hidden", dragDuringGesture: true, classes: "scroller-sample-scroller enyo-fit", components: [
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
						]},
						{kind: "onyx.InputDecorator", components: [
						    { kind:"onyx.Checkbox", name: "schbg"},
						    { content: "Mensa am Scheffelberg"}
						]},
						{kind: "onyx.InputDecorator", components: [
						    { kind:"onyx.Checkbox", name: "ring"},
						    { content: "Mensa Ring"}
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
						{ name: "mailPicture", kind: "Image", classes: "settings_image", src: "assets/mail.png"},
						{ name: "mailContent", tag: "a", allowHtml: true }
					]},
					{ kind: "FittableColumns", components: [
						{ name: "wwwPicture", kind: "Image", classes: "settings_image", src: "assets/browser.png" },
						{ name: "homepageContent", tag: "a", ontap: "loadURL", allowHtml: true }
					]},
					{ kind: "FittableColumns", components: [
						{ name: "twtPicture", kind: "Image", classes: "settings_image", src: "assets/twitter.png" },
						{ name: "twitterContent", tag: "a", ontap: "loadURL", allowHtml: true }
					]},
					{ kind: "FittableColumns", components: [
						{ name: "fbPicture", kind: "Image", classes: "settings_image", src: "assets/f_logo.png" },
						{ name: "fbContent", tag: "a", ontap: "loadURL", allowHtml: true }
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
		// set author and version
		this.$.authorContent.setContent($L('Author:') + " " + AppModel.author);
		this.$.versionContent.setContent("Version: " + AppModel.version);
		// set email content
		this.$.mailContent.setAttribute("href", AppModel.supportMail);
		this.$.mailContent.setContent($L('E-Mail'));
		// set homepage
		this.$.homepageContent.setAttribute("href", "#");
		this.$.homepageContent.setContent($L('Homepage'));
		// set Twitter
		this.$.twitterContent.setAttribute("href", "#");
		this.$.twitterContent.setContent($L('Twitter'));
		// set facebook
		this.$.fbContent.setAttribute("href", "#");
		this.$.fbContent.setContent($L('Facebook'));
	},
	unlock: function() {
		this.modus = "unlocked";
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
		this.unlock();
		this.selectedCanteenKey = canteenKey;
		// set settings content
		if (this.selectedCanteenKey == ReichenhainerCanteen.key) {
			this.$.rh.setChecked(true);
		} else if (this.selectedCanteenKey == StraNaCanteen.key) {
			this.$.strana.setChecked(true);
		} else if (this.selectedCanteenKey == ScheffelbergCanteen.key) {
			this.$.schbg.setChecked(true);
		} else if (this.selectedCanteenKey == RingCanteen.key) {
			this.$.ring.setChecked(true);
		} else {
			this.selectedCanteenKey = ReichenhainerCanteen.key;
		}
	},
	loadURL: function(inSender, inEvent) {
	    // load URL
		if (inSender.getName() == "fbContent") {
			URLLoader.loadURL(AppModel.supportFacebook);
		} else if (inSender.getName() == "twitterContent") {
			URLLoader.loadURL(AppModel.supportTwitter);
		} else if (inSender.getName() == "homepageContent") {
			URLLoader.loadURL(AppModel.supportHomepage);
		}
	},
	handleOnDragEvent: function(sender, event) {
		if (event.srcEvent.type == "touchmove") {
			if (event.horizontal && event.xDirection > 0) {
				if (AppModel.getExistsSmallScreen()) {
					if (this.modus == "unlocked") {
						this.modus = "locked";
						this.doBack();
					}
				}
			}
		}
		return true;
	}
});
