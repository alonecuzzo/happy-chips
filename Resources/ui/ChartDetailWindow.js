exports.ChartDetailWindow = function(args) {
	var self = Ti.UI.createWindow(args);
	
	var webView = Ti.UI.createWebView({
		top:50
	});
	
	var htmlString = '';
	
	populateHTML();
	
	Ti.App.addEventListener('app:updateTables', function() {
		populateHTML();	
	});
	
	function populateHTML() {
		var sums = require('db').getEmotionalSumByCategory(args.emotionId);
		//need to sort
		var tempSumsArray = [];
		var atsa = [];
		for(var i=0; i<=sums.length-1; i++) {
			tempSumsArray.push(sums[i].sum);
		}
		tempSumsArray.sort(function(a,b){return b-a});
		for(var i=0; i<=sums.length-1; i++) {
			for(var j=0; j<=sums.length-1; j++) {
				if(tempSumsArray[i] == sums[j].sum) {
					atsa[i] = sums[j];
				}
			}
		}
		
		sums = atsa;
		
		var sumsString = '[';
		var legendString = '[';
		var urlString = '[';
		for(var i=0; i<=sums.length-1; i++) {
			if(i == (sums.length-1)){
				sumsString += sums[i].sum + ']';
				legendString += '"' + sums[i].category_name + ' - $' + sums[i].sum + '"]';
				urlString += '"javascript:fireEvent(' + sums[i].id + ')"]';
			} else {
				sumsString += sums[i].sum + ', ';
				legendString += '"' + sums[i].category_name + ' - $' + sums[i].sum + '", ';
				urlString += '"javascript:fireEvent(' + sums[i].id + ')",';
			}
		}
		
		htmlString = '<html><head><script src="lib/raphael-min.js"></script><script src="lib/g.raphael-min.js"></script><script src="lib/g.pie-min.js"></script><script> window.onload = function () { var r = Raphael("holder"); r.text(145, 20, "dope ass chart").attr({ font: "16px sans-serif" }); r.piechart(150, 140, 100, ' + sumsString + ', { legend: ' + legendString + ', legendpos: "south", href: '+ urlString +'}); }; </script></head><body class="raphael" id="g.raphael.dmitry.baranovskiy.com"> <div id="holder"></div></body></html>';
		webView.html = htmlString;
		Ti.API.info('sum string: ' + sumsString);
		Ti.API.info('legend string: ' + legendString);
	}
	
	self.add(webView);
	
	return self;
}
