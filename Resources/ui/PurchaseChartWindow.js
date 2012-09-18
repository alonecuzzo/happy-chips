exports.PurchaseChartWindow = function(args) {
	var self = Ti.UI.createWindow(args);
	var webView = Ti.UI.createWebView({
		html:htmlString,
		top:50
		});
	
	var chart1Button = Ti.UI.createButton({
		title: 'Chart 1',
		top: '10dp',
		width: '100dp',
		height: '40dp',
		left: '5dp'
	});
	
	var chart2Button = Ti.UI.createButton({
		title: 'Chart 2',
		top: '10dp',
		width: '100dp',
		height: '40dp',
		left: '110dp'
	});
	
	var chart3Button = Ti.UI.createButton({
		title: 'Chart 3',
		top: '10dp',
		width: '100dp',
		height: '40dp',
		left: '215dp'
	});
	
	chart2Button.addEventListener('click', function(){
		webView.html = htmlString;
	});
	
	chart3Button.addEventListener('click', function(){
		webView.html = '<html>LULZ</html>';
	});
	
	self.add(chart1Button);
	self.add(chart2Button);
	self.add(chart3Button);
	self.add(webView);
	return self;
}

var htmlString = '<html><head><script src="lib/raphael-min.js"></script><script src="lib/g.raphael-min.js"></script><script src="lib/g.pie-min.js"></script><script> window.onload = function () { var r = Raphael("holder"); r.text(145, 20, "dope ass chart").attr({ font: "16px sans-serif" }); r.piechart(150, 140, 100, [55, 20, 13, 32, 5, 1, 2, 10]); }; </script></head><body class="raphael" id="g.raphael.dmitry.baranovskiy.com"> <div id="holder"></div></body></html>';
