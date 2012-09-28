exports.ChartDetailWindow = function(args) {
	var self = Ti.UI.createWindow(args);
	
	var webView = Ti.UI.createWebView({
	});
	
	self.barImage = 'iphone/navBackground.png';
	
	var titleLabel = Titanium.UI.createLabel({
	    color:'#525252',
	    height:'auto',
	    width:'auto',
	    top:10,
	    text:'Chart Detail',
	    textAlign:'center',
	    font:{fontSize:20,fontWeight:'bold'},
	    shadowColor:'#eee',shadowOffset:{x:0,y:1}
	});
	
	self.setTitleControl(titleLabel);
	
	var colors = '["#932453", "#bf5280", "#928189", "#65565c", "#e2ced7", "#d6abbd"]';
	var colorsArray = ['#932453', '#bf5280', '#928189', '#65565c', '#e2ced7', '#d6abbd'];
	
	//back button
	var backbutton = Titanium.UI.createButton({
		title:'', 
		backgroundImage:'iphone/backArrow.png',
		width:20,
		height:18
	});
	backbutton.addEventListener('click', function() {
		self.close();
	});
	self.leftNavButton = backbutton;
	
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
			Ti.API.info('sums name: ' + sums[i].category_name);
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
		for(var i=0; i<=sums.length-1; i++) {
			if(i == (sums.length-1)){
				sumsString += sums[i].sum + ']';
				legendString += '"' + sums[i].category_name + ' - $' + sums[i].sum + '"]';
			} else {
				sumsString += sums[i].sum + ', ';
				legendString += '"' + sums[i].category_name + ' - $' + sums[i].sum + '", ';
			}
		}
		
		htmlString = '<html><head><script src="lib/raphael-min.js"></script><script src="lib/g.raphael-min.js"></script><script src="lib/g.pie-min.js"></script><script> window.onload = function () { var r = Raphael("holder"); r.piechart(150, 140, 100, ' + sumsString + ', { legend: ' + legendString + ', legendpos: "south", colors: ' + colors + '}); }; </script></head><body class="raphael" id="g.raphael.dmitry.baranovskiy.com"> <div id="holder"></div></body></html>';
		webView.html = htmlString;
		Ti.API.info('sum string: ' + sumsString);
		Ti.API.info('legend string: ' + legendString);
	}
	
	self.add(webView);
	
	return self;
}
