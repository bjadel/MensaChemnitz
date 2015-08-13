/**
 * This kind views the canteen panel.
 */
enyo.kind({
	name: "Canteen",
	kind: "Panels",
	realtimeFit: true,
	classes: "enyo-border-box canteen-panel",
	events: {
		onBack:""
	},
	selectedCanteen: "",
	components: [
		{kind: "Scroller", fit: true, touch: true, strategyKind: "TouchScrollStrategy", ondragover: "handleOnDragEvent", vertical: "auto", horizontal: "hidden", dragDuringGesture: true, classes: "scroller-sample-scroller enyo-fit", components: [
			{kind: "FittableRows", classes: "canteen-panel-content", centered: true, components: [
				{name: "canteenDescription", components: [
					{name: "canteenName"},
					{name: "canteenInfo"},
					{name: "canteenBusinessHours", tag: "dl", components: [
						{name: "businessHours", tag: "dt", content: $L('Business Hours')},
						{name: "businessHoursLecturePeriod", tag: "dd", allowHtml: true},
						{name: "businessHoursNonLecturePeriod", tag: "dd", allowHtml: true}
					]},
					{name: "canteenContact"}
				]}
			]}
		]}
	],
	create: function(inControl) {
		this.inherited(arguments);
		AppModel.initialize();
		AppModel.setExistsSmallScreen();
	},
	rendered: function() {
		this.inherited(arguments);
	},
	setSelectedCanteen: function(canteen) {
		this.selectedCanteen = canteen;
		this.$.canteenName.setContent(this.selectedCanteen.name);
		this.$.businessHoursLecturePeriod.setContent(this.selectedCanteen.businessHoursLecturePeriod);
		this.$.businessHoursNonLecturePeriod.setContent(this.selectedCanteen.businessHoursNonLecturePeriod);
	},
	handleOnDragEvent: function(sender, event) {
		if (event.srcEvent.type == "touchmove") {
			if (event.horizontal) {
				if (AppModel.getExistsSmallScreen()) {
					this.doBack();
				}
			}
		}
		return true;
	}
});
