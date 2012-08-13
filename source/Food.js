/**
 * This kind views one single food.
 */
enyo.kind({
	name: "Food",
	kind: "Panels",
	realtimeFit: true,
	classes: "enyo-border-box",
	components: [
		{kind: "FittableRows", components: [
			{name: "foodname", components: [
				{name: "foodtitle"},
				{name: "description"}
			]},
			{name: "foodPictureWrapper", kind: "FittableRows", components: [
				{name: "foodPicture", kind: "Image", src: "assets/0.png", style: "width: 190px;"},
				{name: "zoomFoodPicture", kind: "onyx.IconButton", src: "assets/zoom.png", ontap: "showPopup", popup: "modalPopupViewLargerPicture"}
			]},
			{name: "foodFee", components: [
				{name: "feeTitle", content: "Canteen Fees"},
				{name: "feeStudent"},
				{name: "feeEmployee"},
				{name: "feeGuest"}
			]},
			{name: "modalPopupViewLargerPicture", classes: "onyx-sample-popup", kind: "onyx.Popup", centered: true, modal: true, floating: true, onShow: "popupShown", onHide: "popupHidden", components: [ 
				{name: "largeFoodImage", kind: "Image", src: "assets/0.png", ontap: "closeModalPopup"}, 
				{tag: "br"}, 
				{kind: "onyx.Button", classes: "onyx-affirmative", content: "Close", ontap: "closeModalPopup"} 
			]}
		]}
	],
	addControl: function(inControl) {
		this.inherited(arguments);
	},
	setFood: function(inFood) {
		this.selectedFood = inFood;
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
	}
});