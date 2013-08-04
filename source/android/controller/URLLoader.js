/**
 * This controller load an URL.
 */
var URLLoader = ({
	loadURL: function(url)  {
		navigator.app.loadUrl(url, { openExternal:true });
	    return false;
	}
});