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
			{name: "foodPicture", kind: "Image", src: "assets/0.png", style: "width: 190px;"},
			{name: "foodFee", components: [
				{name: "feeTitle", content: "Canteen Fees"},
				{name: "feeStudent"},
				{name: "feeEmployee"},
				{name: "feeGuest"}
			]}
		]}
	],
	addControl: function(inControl) {
		this.inherited(arguments);
	},
	setFood: function(inFood) {
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
	}
});