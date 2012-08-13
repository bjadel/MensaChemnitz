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
		{kind: "List", fit: true, touch: true, onSetupItem: "setupItem", 
			components:	[
				{name: "item", classes: "item", ontap: "itemTap", components: [
					{name: "index", classes: "list-sample-index"},
					{kind: "FittableColumns", components: [
						{name:"image", components: [ {name: "foodImage", kind: "Image", style: "width: 70px; height: 70px;", src: "assets/0.png", onerror: "imageError"} ]},
						{name: "description", components: [ 
							{kind: "FittableRows", components: [
								{name: "name"},
								{name: "foodItemDescription"},
								{name: "foodItemFeeList"}
							]} 
						]}
					]}
				]}
			]
		}
	],
	setCount: function(counter) {
		this.$.list.setCount(counter);
	},
	create: function() {
		this.inherited(arguments);
		FoodModel.initialize();
	},
	initialize: function(year, month, day) {
		this.url=CanteenService.getUrl(year, month, day);
		this.$.getMenu.setUrl(this.url);
		this.$.getMenu.send();
	},
	gotMenu: function(inSender, inResponse) {
	  	CanteenService.getCanteenMenu(inSender, inResponse);
	    this.doSelect({index: 0});
	    this.$.list.setCount(FoodModel.getSize());
	    this.render();
	},
	gotMenuFailure: function(inSender, inResponse) {
		console.log("got failure from getMenu");
		CanteenService.getError();
		this.doSelect({index: 0});
	},
	setupItem: function(inSender, inIndex) {
		var i = inIndex.index;
		var foodEntry = FoodModel.getFoodByIndex(i);
		// apply selection style if inSender (the list) indicates that this row is selected. 
		this.$.item.addRemoveClass("onyx-selected", inSender.isSelected(i)); 
		if (foodEntry) {
			if (foodEntry.isPictureAvailable) {
				if (foodEntry.pictureKey != "") {
					this.$.foodImage.setSrc("http://www-user.tu-chemnitz.de/~fnor/speiseplan/bilder_190/"+foodEntry.pictureKey+".png");
				}
			}
			// category
			this.$.name.setContent(foodEntry.category);
			// description
			this.$.foodItemDescription.setContent(foodEntry.description);
			// fee
			var feeList = "S: "+foodEntry.feeStudent.replace("?", "€")+" M: "+foodEntry.feeEmployee.replace("?", "€")+" G: "+foodEntry.feeGuest.replace("?", "€");
			this.$.foodItemFeeList.setContent(feeList);
			return true;
		} else {
			this.$.name.setContent("");
			return true;
		}
	},
	itemTap: function(inSender, inEvent) {
		
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