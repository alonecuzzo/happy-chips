exports.LimitDetailView = function(args) {
	var self = Ti.UI.createWindow(args);
	var webView = Ti.UI.createWebView({
		top:50
	});
	
	var rightChartAmt = 50;
	var leftChartAmt = 15;
	
	if(args.limitObject.limitType === 'emotions') {
		var emotionalSums = require('db').getEmotionalSums();
		var sumOfInterest = {};
		for(var i=0; i<=emotionalSums.length-1; i++) {
			if(emotionalSums[i].id === args.limitObject.limitConstraint) {
				if(emotionalSums[i].sum > args.limitObject.limitAmount) {
					rightChartAmt = emotionalSums[i].sum;
					leftChartAmt = args.limitObject.limitAmount;
				} else {
					rightChartAmt = args.limitObject.limitAmount;
					leftChartAmt = emotionalSums[i].sum;
				}
			}
		}
	}
	Ti.API.info('left chart value: ' + leftChartAmt);
	Ti.API.info('right chart value: ' + rightChartAmt);
	
	htmlString = '<html><head><script src="lib/raphael-min.js"></script><script src="lib/g.raphael-min.js"></script><script src="lib/g.bar-min.js"></script><script> window.onload = function () { var r = Raphael("holder"); r.hbarchart(10, 10, 250, 50, [[' + leftChartAmt + '], [' + rightChartAmt + ']], {stacked: false});} </script></head><body class="raphael" id="g.raphael.dmitry.baranovskiy.com"> <div id="holder"></div></body></html>';
	webView.html = htmlString;
	
	self.add(webView);
	return self;
}
