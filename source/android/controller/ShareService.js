/**
 * This service provides a set of helper methods around the share functionality.
 */
var ShareService = ({
	initialize: function()  {
		// nothing to do
	},
	share: function(subject, text) {
		share = cordova.require("cordova/plugin/share");
		share.show({subject: subject, text: text},
			function() {
				console.log("Cordova Plugin: Share: callback success");
			},
			function() {
				console.log("Cordova Plugin: Share: callback error");
			}
		);
	}
});