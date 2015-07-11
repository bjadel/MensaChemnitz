/**
 * This kind views one picture.
 */
enyo.kind({
	name: "Picture",
	events: {
		onLoad: "",
		onError: ""
	},
	disableZoom: false,
	antecessorSrc: "",
	currentSrc: "",
	pictureClasses: "",
	spinnerClasses: "onyx-light",
	components: [
	    {name: "spinner", kind: "onyx.Spinner"},
	    {name: "pic", kind: "Image", alt: "", src: this.src, onerror: "errorImageView", onload: "loadImageView"}
	],
	create: function() {
		this.inherited(arguments);
		this.$.spinner.addRemoveClass(this.spinnerClasses, true);
		this.$.pic.addRemoveClass(this.pictureClasses, true);
		this.$.pic.hide();
	},
	replace: function(url) {
		this.$.pic.hide();
		this.$.spinner.start();
		this.replaceURL(url);
	},
	replaceURL: function(url) {
		this.antecessorSrc = this.currentSrc;
		this.currentSrc = url;
		this.$.pic.setSrc(this.currentSrc);
		this.$.spinner.stop();
		this.$.pic.show();
	},
	setAlternativeText: function(text) {
		this.$.pic.setAlt(text);
	},
	errorImageView: function() {
		this.replaceURL("assets/0.png");
	},
	loadImageView: function() {
		//
	}
});
