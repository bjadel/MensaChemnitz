/**
 * This kind views one single food.
 */
enyo.kind({
	name: "Food",
	kind: "Panels",
	realtimeFit: true,
	classes: "enyo-border-box",
	components: [
		{kind: "Scroller", horizontal:"hidden", fit: true, touch: true, classes: "scroller-sample-scroller enyo-fit", components: [
			{kind: "FittableRows", centered: true, components: [
				{name: "foodname", components: [
					{name: "fooddate"},
					{name: "foodtitle"},
					{name: "description"}
				]},
				{name: "foodPictureWrapper", kind: "FittableRows", components: [
					{name: "foodPicture", kind: "Image", src: "assets/0.png", onerror: "imageError"},
					{name: "zoomFoodPicture", kind: "Image", src: "assets/zoom.png", ontap: "showPopup", popup: "modalPopupViewLargerPicture"}
				]},
				{name: "foodFee", components: [
					{name: "feeTitle", content: "Canteen Fees"},
					{name: "feeStudent"},
					{name: "feeEmployee"},
					{name: "feeGuest"}
				]},
				{name: "modalPopupViewLargerPicture", classes: "onyx-sample-popup", kind: "onyx.Popup", style: "z-index: 100;", centered: true, modal: true, floating: true, onShow: "popupShown", onHide: "popupHidden", components: [ 
					{name: "largeFoodImage", kind: "Image", src: "assets/0.png", ontap: "closeModalPopup", onerror: "imageError"}, 
					{tag: "br"}, 
					{kind: "onyx.Button", classes: "onyx-affirmative", content: "Close", ontap: "closeModalPopup"} 
				]}
			]}
		]}
	],
	addControl: function(inControl) {
		this.inherited(arguments);
	},
	setFood: function(inFood) {
		if (AppModel.getExistsSmallScreen()) {
			this.$.foodPictureWrapper.setClasses("small_screen");
			this.$.largeFoodImage.setClasses("small_screen");
		}
		this.selectedFood = inFood;
		this.$.fooddate.setContent(DateModel.formatDate(DateModel.getCurrentDate()));
		this.$.foodtitle.setContent(inFood.category);
		this.$.description.setContent(inFood.description);
		if (inFood.isPictureAvailable) {
			if (inFood.pictureKey != "") {
				this.$.foodPicture.setSrc("http://www-user.tu-chemnitz.de/~fnor/speiseplan/bilder_190/"+inFood.pictureKey+".png");
			}
		}
		this.$.feeStudent.setContent("Students: " + inFood.feeStudent.replace("?", "€"));
		this.$.feeEmployee.setContent("Employees: " + inFood.feeEmployee.replace("?", "€"));
		this.$.feeGuest.setContent("Guests: " + inFood.feeGuest.replace("?", "€"));
	},
	showPopup: function(inSender) { 
		var p = this.$[inSender.popup]; 
		if (p) {
			p.show(); 
		} 
	},
	popupHidden: function() { 
		// FIXME: needed to hide ios keyboard 
		document.activeElement.blur(); 
	}, 
	popupShown: function() {
		var inFood = this.selectedFood;
		if (inFood.isPictureAvailable) {
			if (inFood.pictureKey != "") {
				this.$.largeFoodImage.setSrc("http://www-user.tu-chemnitz.de/~fnor/speiseplan/bilder_350/"+inFood.pictureKey+".png");
			}
		}
	},
	closeModalPopup: function() { 
		this.$.modalPopupViewLargerPicture.hide(); 
	},
	imageError: function(inSender, inEvent) {
		inEvent.currentTarget.src = "assets/0.png";
	}
});