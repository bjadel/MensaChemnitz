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
					{name: "description"},
					{kind: "FittableColumns", name: "ingredientsBox", components: [
						{name: "stage1", kind: "Image", src: ""},
		            	{name: "stage2", kind: "Image", src: ""},
		            	{name: "stage3", kind: "Image", src: ""},
		            	{name: "stage4", kind: "Image", src: ""}
					]}
				]},
				{name: "foodPictureWrapper", kind: "FittableRows", components: [
					{name: "foodPicture", kind: "Image", src: "assets/0.png", onerror: "imageError"},
					{name: "zoomFoodPicture", kind: "Image", src: "assets/zoom.png", ontap: "zoomPicture"}
				]},
				{name: "foodFee", components: [
					{name: "feeTitle", content: $L('Canteen Fees')},
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
			this.$.foodPictureWrapper.addRemoveClass("small_screen", true);
		} else {
			this.$.foodPictureWrapper.addRemoveClass("small_screen", false);
		}
		this.selectedFood = inFood;
		this.$.fooddate.setContent(DateModel.formatDate(DateModel.getCurrentDate()));
		this.$.foodtitle.setContent(inFood.category);
		this.$.description.setContent(inFood.description);
		// picture
		if (inFood.isPictureAvailable) {
			if (inFood.pictureKey != "") {
				this.$.foodPicture.setSrc("http://www.swcz.de/bilderspeiseplan/bilder_190/"+inFood.pictureKey+".png");
			}
		}
		// ingredients
		this.$.stage1.setSrc("");
		this.$.stage2.setSrc("");
		this.$.stage3.setSrc("");
		this.$.stage4.setSrc("");
		this.$.stage1.hide();
		this.$.stage2.hide();
		this.$.stage3.hide();
		this.$.stage4.hide();
		if (inFood.pig == "true")  {
			this.addToStage("assets/pig.png");
		}
		if (inFood.cow == "true")  {
			this.addToStage("assets/cow.png");
		}
		if (inFood.alc == "true")  {
			this.addToStage("assets/alc.png");
		}
		if (inFood.veg == "true")  {
			this.addToStage("assets/veg.png");
		}
		// fees
		this.$.feeStudent.setContent($L('Students:') + " " + inFood.feeStudent + " €");
		this.$.feeEmployee.setContent($L('Employees:') + " " + inFood.feeEmployee + " €");
		this.$.feeGuest.setContent($L('Guests:') + " " + inFood.feeGuest + " €");
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
	addToStage: function(picUrl) {
		if (this.$.stage1.src == "") {
			this.$.stage1.setSrc(picUrl)
			this.$.stage1.show();
		} else if (this.$.stage2.src == "") {
			this.$.stage2.setSrc(picUrl)
			this.$.stage2.show();
		} else if (this.$.stage3.src == "") {
			this.$.stage3.setSrc(picUrl)
			this.$.stage3.show();
		} else if (this.$.stage4.src == "") {
			this.$.stage4.setSrc(picUrl)
			this.$.stage4.show();
		}
	},
	imageError: function(inSender, inEvent) {
		inEvent.currentTarget.src = "assets/0.png";
	}
});