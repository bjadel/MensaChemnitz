/**
 * Canteen Ring
 */
var RingCanteen = ({
	initialize: function()  {
		this.key = "ring";
		this.name = "Ring";
		this.businessHoursLecturePeriod = "<fieldset><legend>" + $L('Lecture period and exam period') + "</legend>Mo-Fr 10:30-13:45 Uhr</fieldset>";
		this.businessHoursNonLecturePeriod = "<fieldset><legend>" + $L('Non lecture period') + "</legend>Mo-Fr 11:00-13:30 Uhr</fieldset>";
	}
});
