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
						{name:"image", components: [ {name: "foodImage", kind: "Image", style: "width: 65px; height: 65px;", src: "assets/0.png"} ]},
						{name: "description", components: [ 
							{kind: "FittableRows", components: [
								{name: "name"},
								{name: "foodItemDescription"}
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
		Essen.initialize();
	},
	initialize: function(year, month, day) {
		this.url=MensaService.getUrl(year, month, day);
		this.$.getMenu.setUrl(this.url);
		this.$.getMenu.send();
	},
	gotMenu: function(inSender, inResponse) {
	  	MensaService.getCanteenMenu(inSender, inResponse);
	    this.doSelect({index: 0});
	    this.$.list.setCount(Essen.getSize());
	    this.render();
	},
	gotMenuFailure: function(inSender, inResponse) {
		console.log("got failure from getMenu");
		MensaService.getError();
		this.doSelect({index: 0});
	},
	setupItem: function(inSender, inIndex) {
		var i = inIndex.index;
		var essen = Essen.getEssenByIndex(i);
		// apply selection style if inSender (the list) indicates that this row is selected. 
		this.$.item.addRemoveClass("onyx-selected", inSender.isSelected(i)); 
		if (essen) {
			if (essen.isPicture) {
				this.$.foodImage.setSrc("http://www-user.tu-chemnitz.de/~fnor/speiseplan/bilder_190/"+essen.bild+".png");
			}
			this.$.name.setContent(essen.name);
			this.$.foodItemDescription.setContent(essen.essen);
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
	}
});