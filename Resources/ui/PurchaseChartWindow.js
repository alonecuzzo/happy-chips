exports.PurchaseChartWindow = function(args) {
	var self = Ti.UI.createWindow(args);
	var webView = Ti.UI.createWebView({
		top:50,
		touchEnabled:false
	});
	
	self.barImage = 'iphone/navBackground.png';
	
	var titleLabel = Titanium.UI.createLabel({
	    color:'#525252',
	    height:'auto',
	    width:'auto',
	    top:10,
	    text:'Charts',
	    textAlign:'center',
	    font:{fontSize:20,fontWeight:'bold'},
	    shadowColor:'#eee',shadowOffset:{x:0,y:1}
	});
	
	self.setTitleControl(titleLabel);

	
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
	
	var htmlString = '';
	
	var colors = '["#932453", "#bf5280", "#928189", "#65565c", "#e2ced7", "#d6abbd"]';
	var colorsArray = ['#932453', '#bf5280', '#928189', '#65565c', '#e2ced7', '#d6abbd'];
	var buttonHolderView;
	
	populateHTML();
	
	Ti.App.addEventListener('app:updateTables', function() {
		populateHTML();	
	});
	
	Titanium.App.addEventListener('fromwebview', function(e) {
		//Ti.API.info('got it: ' + e.id);
		var ChartDetailWindow = require('ui/ChartDetailWindow').ChartDetailWindow;
		var chartDetailWindow = new ChartDetailWindow({
			title: 'Chart Detail',
			backgroundColor: '#FFF',
			emotionId:e.id
		});
		self.containingTab.open(chartDetailWindow,{animated:true});
	});
	
	function populateHTML() {
		var sums = require('db').getEmotionalSums();
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
		
		if(buttonHolderView){
			self.remove(buttonHolderView);
		}
		
		buttonHolderView = Ti.UI.createView({
			height:'auto',
			width:300,
			top:170,
			left:50
		});
		
		//ok we need to scroll through the sums array and create buttons that link to the detail page of each emotion
		for(var i=0; i<=sums.length-1; i++) {
			var xPos = (i % 2)*120;
			var yPos = 0;
			var lineHeight = 50;
			
			if(2 % i === 0 && (i > 0)) {
				yPos += lineHeight;
			}
			
			var legendView = Ti.UI.createView({
				left:xPos,
				top:yPos,
				id:i
			});
			legendView.addEventListener('click', function(e){
				Ti.App.fireEvent('fromwebview',{id:this.id});
				//Ti.API.info('sending id: ' + this.id);
			});
			var legendChip = Titanium.UI.createView({
							  backgroundColor:colorsArray[i],
							  height:10,
							  width:10,
							  left:0
							});
			legendView.add(legendChip);
			var roundedSum = Math.round(100*sums[i].sum)/100;
			var titleLabel = Titanium.UI.createLabel({
			    color:'#111111',
			    height:'auto',
			    width:'auto',
			    left:15,
			    text:'$' + roundedSum + ': ' + sums[i].emotion ,
			    font:{fontSize:10,fontWeight:'bold'}
			});
			legendView.add(titleLabel);
			buttonHolderView.add(legendView);
		}
		
		self.add(buttonHolderView);
		
		var sumsString = '[';
		var legendString = '[';
		var urlString = '[';
		var fireEventString = '<script type="text/JavaScript">function fireEvent(msg){Ti.App.fireEvent(\'fromwebview\',{id:msg});}</script>';
		//Ti.API.info('sums length: ' + sums.length);
		for(var i=0; i<=sums.length-1; i++) {
			if(i == (sums.length-1)){
				sumsString += sums[i].sum + ']';
				legendString += '"' + sums[i].emotion + ' - $' + sums[i].sum + '"]';
				urlString += '"javascript:fireEvent(' + sums[i].id + ')"]';
			} else {
				sumsString += sums[i].sum + ', ';
				legendString += '"' + sums[i].emotion + ' - $' + sums[i].sum + '", ';
				urlString += '"javascript:fireEvent(' + sums[i].id + ')",';
			}
		}
		
		htmlString = '<html><head>' + fireEventString + '<script src="lib/raphael-min.js"></script><script src="lib/g.raphael-min.js"></script><script src="lib/g.pie-min.js"></script><script> window.onload = function () { var r = Raphael("holder"); r.piechart(150, 100, 90, ' + sumsString + ', { colors: ' + colors + ', href: '+ urlString +'}); }; </script></head><body class="raphael" id="g.raphael.dmitry.baranovskiy.com"> <div id="holder"></div></body></html>';
		webView.html = htmlString;
		Ti.API.info('sum string: ' + sumsString);
		Ti.API.info('legend string: ' + legendString);
	}
	return self;
}


