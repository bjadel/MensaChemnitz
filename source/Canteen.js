/**
 * This kind views the canteen panel.
 */
enyo.kind({
	name: "Canteen",
	kind: "Panels",
	realtimeFit: true,
	classes: "enyo-border-box canteen-panel",
	selectedCanteen: "",
	components: [
		{kind: "Scroller", fit: true, touch: true, strategyKind: "TouchScrollStrategy", vertical: "auto", horizontal: "hidden", dragDuringGesture: true, classes: "scroller-sample-scroller enyo-fit", components: [
			{kind: "FittableRows", classes: "canteen-panel-content", centered: true, components: [
				{name: "canteenDescription", components: [
					{name: "canteenName"},
					{name: "canteenInfo"},
					{name: "canteenBusinessHours", tag: "dl", components: [
						{name: "businessHours", tag: "dt", content: $L('Business Hours')},
						{name: "businessHoursLecturePeriod", tag: "dd"},
						{name: "businessHoursNonLecturePeriod", tag: "dd"}
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
	}
});
