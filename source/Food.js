/**
 * This kind views one single food.
 */
enyo.kind({
	name: "Food",
	kind: "Panels",
	realtimeFit: true,
	classes: "enyo-border-box",
	components: [
		{kind: "Scroller", fit: true, touch: true, classes: "scroller-sample-scroller enyo-fit", components: [
			{kind: "FittableRows", name: "foodContent", centered: true, components: [
				{name: "foodname", components: [
					{name: "fooddate"},
					{name: "foodtitle"},
					{name: "description"}
				]},
				{name: "foodPictureWrapper", kind: "FittableRows", components: [
					{name: "foodPicture", kind: "Image", src: "assets/0.png", onerror: "imageError"},
					{name: "zoomFoodPicture", kind: "Image", src: "assets/zoom.png", ontap: "zoomPicture"}
				]},
				{name: "foodFee", components: [
					{name: "feeTitle", content: "Canteen Fees"},
					{name: "feeStudent"},
					{name: "feeEmployee"},
					{name: "feeGuest"}
				]}
			]}
		]}
	],
	create: function(inControl) {
		this.inherited(arguments);
		this.zoomed = 0;
	},
	setFood: function(inFood) {
		if (AppModel.getExistsSmallScreen()) {
			this.$.foodPictureWrapper.setClasses("small_screen");
		}
		this.selectedFood = inFood;
		this.$.fooddate.setContent(DateModel.formatDate(DateModel.getCurrentDate()));
		this.$.foodtitle.setContent(inFood.category);
		this.$.description.setContent(inFood.description);
		if (inFood.isPictureAvailable) {
			if (inFood.pictureKey != "") {
				this.$.foodPicture.setSrc("http://www.swcz.de/bilderspeiseplan/bilder_190/"+inFood.pictureKey+".png");
			}
		}
		this.$.feeStudent.setContent("Students: " + inFood.feeStudent.replace("?", "€"));
		this.$.feeEmployee.setContent("Employees: " + inFood.feeEmployee.replace("?", "€"));
		this.$.feeGuest.setContent("Guests: " + inFood.feeGuest.replace("?", "€"));
	},
	zoomPicture: function(inSender) {
		if (this.zoomed == 0) {
			this.$.zoomFoodPicture.setSrc("assets/negativezoom.png");
			this.$.foodContent.addRemoveClass("zoom", true);
			this.zoomed = 1;
		} else {
			this.$.zoomFoodPicture.setSrc("assets/zoom.png");
			this.$.foodContent.addRemoveClass("zoom", false);
			this.zoomed = 0;
		}
	},
	imageError: function(inSender, inEvent) {
		inEvent.currentTarget.src = "assets/0.png";
	}
});