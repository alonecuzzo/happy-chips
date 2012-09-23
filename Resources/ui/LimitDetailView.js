exports.LimitDetailView = function(args) {
	var self = Ti.UI.createWindow(args);
	var webView = Ti.UI.createWebView({
		top:50
	});
	
	
	htmlString = '<html><head><script src="lib/raphael-min.js"></script><script src="lib/g.raphael-min.js"></script><script src="lib/g.bar-min.js"></script><script> window.onload = function () { var r = Raphael("holder"); r.hbarchart(10, 10, 300, 220, [[55, 20, 13, 32, 5, 1, 2, 10], [10, 2, 1, 5, 32, 13, 20, 55]], {stacked: true});} </script></head><body class="raphael" id="g.raphael.dmitry.baranovskiy.com"> <div id="holder"></div></body></html>';
	webView.html = htmlString;
	
	self.add(webView);
	return self;
}
