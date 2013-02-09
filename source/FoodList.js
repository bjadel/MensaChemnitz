/**
 * This kind views the food list.
 */
enyo.kind({
	name: "FoodList",
	kind: "Panels",
	realtimeFit: true,
	classes: "enyo-border-box",
	events: {
		onSelect: ""
	},
	components: [
		{name: "getMenu", kind: "enyo.WebService", 
			handleAs: "text",
			contentType: "text/xml",
			onResponse: "gotMenu",
			onError: "gotMenuFailure"},
		{kind: "Scroller", fit: true, touch: true, horizontal: "hidden", classes: "scroller-sample-scroller enyo-fit", components: [
			{name: "list", kind: "Repeater", count: 1, fit: true, touch: true, onSetupItem: "setupItem", 
				components:	[
					{name: "item", classes: "item", ontap: "itemTap", components: [
						{kind: "FittableColumns", components: [
							{kind: "FittableRows", centered: true, style: "text-align: center;", components: [
								{name: "foodImage", kind: "Picture", pictureClasses: "food_image", spinnerClasses: "onyx-dark", currentSrc: "assets/0.png"}, 
								{name: "ratingImage", kind: "Image", style: "visibility: hidden;", src: "", onerror: "imageError"}
							]},
							{name: "description", classes: "description_box", components: [ 
								{kind: "FittableRows", components: [
									{name: "name", classes: "food_name"},
									{name: "foodItemDescription", classes: "food_description"},
									{name: "foodItemFeeList", classes: "food_fee"}
								]} 
							]}
						]}
					]}
				]
			}
		]},
	],
	setCount: function(counter) {
		this.$.list.setCount(counter);
	},
	initialize: function(year, month, day) {
		this.url=CanteenService.getUrl(year, month, day);
		this.$.getMenu.setUrl(this.url);
		this.$.getMenu.send();
	},
	gotMenu: function(inSender, inResponse) {
	  	CanteenService.getCanteenMenu(inSender, inResponse);
	    this.doSelect({index: 0, first: 1});
	    this.$.list.setCount(FoodModel.getSize());
	    this.render();
	},
	gotMenuFailure: function(inSender, inResponse) {
		console.log("got failure from getMenu");
		CanteenService.getError();
		this.doSelect({index: 0, first: 1});
		this.$.list.setCount(FoodModel.getSize());
		this.render();
	},
	setupItem: function(inSender, inEvent) {
		var i = inEvent.index;
    	var item = inEvent.item;
		if (i < FoodModel.getSize()) {
			var foodEntry = FoodModel.getFoodByIndex(i, false);
			if (i == 0) {
				item.children[0].addRemoveClass("onyx-selected", 1);
			}
			if (foodEntry) {
				if (foodEntry.isPictureAvailable) {
					if (foodEntry.pictureKey != "") {
						item.$.foodImage.replace("http://www.swcz.de/bilderspeiseplan/bilder_190/"+foodEntry.pictureKey+".png");
					}
				}
				// rating
				if (foodEntry.rating != "" && foodEntry.rating > 0) {
					item.$.ratingImage.setStyle("visibility:visible;");
					if (foodEntry.rating == 1) {
						item.$.ratingImage.setSrc("assets/rating-1.png");
					} else if (foodEntry.rating == 2) {
						item.$.ratingImage.setSrc("assets/rating-2.png");
					} else if (foodEntry.rating == 3) {
						item.$.ratingImage.setSrc("assets/rating-3.png");
					} else if (foodEntry.rating == 4) {
						item.$.ratingImage.setSrc("assets/rating-4.png");
					} else if (foodEntry.rating == 5) {
						item.$.ratingImage.setSrc("assets/rating-5.png");
					}
				} else {
					item.$.ratingImage.setStyle("visibility:hidden;");
					item.$.ratingImage.setSrc("");
				}
				// category
				item.$.name.setContent(foodEntry.category);
				// description
				item.$.foodItemDescription.setContent(foodEntry.description);
				// fee
				var feeList = "S: "+foodEntry.feeStudent+" € M: "+foodEntry.feeEmployee+" € G: "+foodEntry.feeGuest+" €";
				item.$.foodItemFeeList.setContent(feeList);
			} else {
				this.$.name.setContent("");
			}
		}
		return true;
	},
	itemTap: function(inSender, inEvent) {
		var repeaterItems = inSender.parent.parent.children;
		enyo.forEach(repeaterItems, function(item) {
			item.children[0].addRemoveClass("onyx-selected", 0);
		});
		inSender.addRemoveClass("onyx-selected", 1);
		this.doSelect(inEvent);
	},
	setDate: function(inDate) {
		var year = inDate.getFullYear();
		var month = inDate.getMonth() + 1;
		var day = inDate.getDate();
		this.initialize(year, month, day);
	},
	imageError: function(inSender, inEvent) {
		inEvent.currentTarget.src = "assets/0.png";
	}
});