/**
 * This controller load an URL.
 */
var URLLoader = ({
	loadURL: function(url)  {
		var win=window.open(url, '_blank');
		win.focus();
		return false;
	}
});