exports.PurchaseChartWindow = function(args) {
	var self = Ti.UI.createWindow(args);
	var webView = Ti.UI.createWebView({html:htmlString});
	self.add(webView);
	return self;
}

var htmlString = '<html><head><script src="lib/raphael-min.js"></script><script src="lib/g.raphael-min.js"></script><script src="lib/g.pie-min.js"></script><script> window.onload = function () { alert("" + Raphael); var r = Raphael("holder"); r.text(250, 100, "dope ass chart").attr({ font: "12px sans-serif" }); r.piechart(100, 100, 50, [55, 20, 13, 32, 5, 1, 2, 10]); }; </script></head><body class="raphael" id="g.raphael.dmitry.baranovskiy.com"> <div id="holder"></div></body></html>';
