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
			{name: "foodPicture", kind: "Image", src: "assets/0.png", style: "width: 190px;"}
		]}
	],
	addControl: function(inControl) {
		this.inherited(arguments);
	},
	setFood: function(inFood) {
		this.$.foodtitle.setContent(inFood.name);
		this.$.description.setContent(inFood.essen);
		if (inFood.isPicture) {
			this.$.foodPicture.setSrc("http://www-user.tu-chemnitz.de/~fnor/speiseplan/bilder_190/"+inFood.bild+".png");
		}
	}
});