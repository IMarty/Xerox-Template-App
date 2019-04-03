// Router file to shift the location of the Xerox Widgets

// true = offbox 
// false = on device
var XRXRouterEnabled = true;

var xrxServerLoc = "../xrx_g9_widgets/";      // Xerox 9th Gen Widgets path relative to your application

// Do not touch this section
if(!XRXRouterEnabled)
{
	xrxServerLoc = "http://localhost/xrx_g9_widgets/";
}

(function loadJSandCSS() {
		document.write( '<link rel=\"stylesheet\" href=\"' + xrxServerLoc + 'XRXg9Widgets.min.css\" type=\"text/css\" />');	
		document.write('<script src=\"' + xrxServerLoc + 'XRXg9Widgets.min.js\"></script>');
})();
