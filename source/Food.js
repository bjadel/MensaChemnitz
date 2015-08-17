/**
 * This kind views one single food.
 */
enyo.kind({
	name: "Food",
	kind: "Panels",
	realtimeFit: true,
	classes: "enyo-border-box",
	modus: "unlocked",
	events: {
		onBack:""
	},
	components: [
		{kind: "Scroller", fit: true, touch: true, strategyKind: "TouchScrollStrategy", vertical: "auto", horizontal: "hidden", dragDuringGesture: true, classes: "scroller-sample-scroller enyo-fit", components: [
			{kind: "FittableRows", name: "foodContent", ondragover: "handleOnDragEvent", ondown: "unlock", centered: true, components: [
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
					{name: "foodPicture", kind: "Picture" }
				]},
				{kind: "FittableColumns", name: "additionalContent", centered: true, components: [
					{name: "foodFee", components: [
						{name: "feeTitle", content: $L('Canteen Fees')},
						{name: "feeStudent"},
						{name: "feeEmployee"},
						{name: "feeGuest"}
					]},
					{name: "additive", components: [
						{name: "additiveTitle", content: $L('Food Additive')},
						{content: $L('01 - with colouring agent')},
						{content: $L('02 - with preservative')},
						{content: $L('03 - with antioxidant')},
						{content: $L('04 - with flavour enhancer')},
						{content: $L('05 - sulfured')},
						{content: $L('06 - blackened')},
						{content: $L('07 - waxed')},
						{content: $L('08 - with phosphate')},
						{content: $L('09 - with sweetener')},
						{content: $L('10 - contains a phenylalanine resource')},
						{content: $L('11 - caffeinated')},
						{content: $L('12 - containing quinine')},
						{content: $L('13 - containing gluten')},
						{content: $L('14 - crustaceans')},
						{content: $L('15 - with milk powder')},
						{content: $L('16 - with whey protein')},
						{content: $L('17 - with whey powder')},
						{content: $L('18 - with egg white')},
						{content: $L('19 - using lactic')},
						{content: $L('20 - using cream')},
						{content: $L('21 - celery')},
						{content: $L('22 - mustard')},
						{content: $L('23 - sesame')},
						{content: $L('24 - sulphite/sulphuric')},
						{content: $L('25 - lupine')},
						{content: $L('26 - molluscs')},
						{content: $L('35 - contains azo dye')},
						{content: $L('36 - with whey protein')},
						{content: $L('37 - with milk powder')},
						{content: $L('38 - with milk protein')},
						{content: $L('39 - with egg white')},
						{content: $L('40 - applying milk')},
						{content: $L('41 - applying cream')},
						{content: $L('43 - with cocoa compound coating')},
						{content: $L('44 - with alcohol')},
						{content: $L('45 - with gelatine')},
						{content: $L('46 - with carmine E120')},
						{content: $L('47 - with animal rennet')},
						{content: $L('48 - with honey')},
						{content: $L('49 - with garlic')},
						{content: $L('51 - pork')},
						{content: $L('52 - beef')},
						{content: $L('53 - lamb')},
						{content: $L('54 - poultry')},
						{content: $L('55 - bushmeat')},
						{content: $L('56 - fish')}
					]}
				 ]}
			]}
		]}
	],
	create: function(inControl) {
		this.inherited(arguments);
		this.zoomed = 0;
	},
	unlock: function() {
		this.modus = "unlocked";
	},
	setFood: function(inFood) {
		if (AppModel.getExistsSmallScreen()) {
			this.unlock();
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
				this.$.foodPicture.replace(CanteenService.getPictureURL()+inFood.pictureKey+".png");
				this.$.foodPicture.setAlternativeText(inFood.description);
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
	handleOnDragEvent: function(sender, event) {
		if (event.srcEvent.type == "touchmove") {
			if (event.horizontal) {
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
