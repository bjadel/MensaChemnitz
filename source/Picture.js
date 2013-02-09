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
	    {name: "pic", kind: "ImageView", scale: "auto", thumb: true, disableZoom: this.disableZoom, src: this.src}
	],
	create: function() {
		this.inherited(arguments);
		this.$.spinner.addRemoveClass(this.spinnerClasses, true);
		this.$.pic.addRemoveClass(this.pictureClasses, true);
		this.$.pic.setDisableZoom(this.disableZoom);
		this.$.pic.hide();
		this.$.spinner.start();
	},
	replace: function(url) {
		this.$.pic.hide();
		this.$.spinner.start();
		this.antecessorSrc = this.currentSrc;
		this.currentSrc = url;
		this.$.pic.setSrc(this.currentSrc);
		this.$.pic.show();
		this.$.spinner.stop();
	}
});