exports.PurchaseChartWindow = function(args) {
	var self = Ti.UI.createWindow(args);
	var webView = Ti.UI.createWebView({
		top:45,
		touchEnabled:true,
		height:310
	});
	
	self.barImage = 'iphone/navBackground.png';
	
	var titleLabel = Titanium.UI.createLabel({
	    color:'#000',
	    height:'auto',
	    width:'auto',
	    top:10,
	    text:'Charts',
	    textAlign:'center',
	    font:{fontSize:20,fontWeight:'bold'},
	    shadowColor:'#eee',shadowOffset:{x:0,y:1}
	});
	
	self.setTitleControl(titleLabel);
	
	var chartTitle = Titanium.UI.createLabel({
	    color:'#525252',
	    height:'auto',
	    width:'auto',
	    top:63,
	    text:'Emotion vs. Money Spent',
	    textAlign:'center',
	    font:{fontSize:17,fontWeight:'bold'}
	});
	
	var chart1Button = Ti.UI.createButton({
		title:'', 
		backgroundImage:'iphone/chartButtonEmotionalSpendingSelected.png',
		width:100,
		height:50,
		left:18,
		top:10
	});
	
	var chart2Button = Ti.UI.createButton({
		title:'', 
		backgroundImage:'iphone/chartButtonEmotionalSpending.png',
		width:100,
		height:50,
		left:110,
		top:10
	});
	
	var chart3Button = Ti.UI.createButton({
		title:'', 
		backgroundImage:'iphone/chartButtonEmotionalSpending.png',
		width:100,
		height:50,
		left:202,
		top:10
	});
	
	chart1Button.addEventListener('click', function(){
		populateHTML();
		chart3Button.setBackgroundImage('iphone/chartButtonEmotionalSpending.png');
		chart2Button.setBackgroundImage('iphone/chartButtonEmotionalSpending.png');
		chart1Button.setBackgroundImage('iphone/chartButtonEmotionalSpendingSelected.png');
	});
	
	chart2Button.addEventListener('click', function(){
		//webView.html = htmlString;
		populateHTMLSatisfaction();
		chart1Button.setBackgroundImage('iphone/chartButtonEmotionalSpending.png');
		chart3Button.setBackgroundImage('iphone/chartButtonEmotionalSpending.png');
		chart2Button.setBackgroundImage('iphone/chartButtonEmotionalSpendingSelected.png');
	});
	
	chart3Button.addEventListener('click', function(){
		populateHTMLImpulse();
		chart1Button.setBackgroundImage('iphone/chartButtonEmotionalSpending.png');
		chart2Button.setBackgroundImage('iphone/chartButtonEmotionalSpending.png');
		chart3Button.setBackgroundImage('iphone/chartButtonEmotionalSpendingSelected.png');
	});
	
	var bb1 = Titanium.UI.createButtonBar({
		labels:['Emotions', 'Satisfaction', 'Impulse'],
		backgroundColor:'#444',
		top:10,
		style:Titanium.UI.iPhone.SystemButtonStyle.BAR,
		height:25,
		width:300
	});
	self.add(bb1);
	
	bb1.addEventListener('click', function(e)
	{
		switch(e.index) {
			case 0:
				populateHTML();
				break;
			
			case 1:
				populateHTMLSatisfaction();
				break;
			
			case 2:
				populateHTMLImpulse();
				break;
		}
	});
	
	// self.add(chart1Button);
	// self.add(chart2Button);
	// self.add(chart3Button);
	self.add(webView);
	self.add(chartTitle);
	
	var htmlString = '';
	
	var colors = '["#932453", "#bf5280", "#928189", "#65565c", "#e2ced7", "#d6abbd"]';
	var colorsArray = ['#932453', '#bf5280', '#928189', '#65565c', '#e2ced7', '#d6abbd'];
	var buttonHolderView;
	populateHTML();
	
	Ti.App.addEventListener('app:updateTables', function() {
		populateHTML();	
	});
	
	Titanium.App.addEventListener('fromwebview', function(e) {
		Ti.API.info('got it: ' + e.id);
		var ChartDetailWindow = require('ui/ChartDetailWindow').ChartDetailWindow;
		var chartDetailWindow = new ChartDetailWindow({
			title: 'Chart Detail',
			backgroundColor: '#444',
			emotionId:e.id
		});
		self.containingTab.open(chartDetailWindow,{animated:true});
	});
	
	function populateHTMLImpulse(){
		var sumsString = '[700, 100]';
		var sums = [{id:0, sum:700, emotion:'Impulsive Spending'}, {id:1, sum:100, emotion:'Planned Spending'}];
		
		if(buttonHolderView){
			self.remove(buttonHolderView);
		}
		
		buttonHolderView = Ti.UI.createView({
			height:300,
			width:300,
			top:160,
			left:93
		});
		
		//ok we need to scroll through the sums array and create buttons that link to the detail page of each emotion
		for(var i=0; i<=sums.length-1; i++) {
			var xPos = i*120;
			var yPos = 0;
			var lineHeight = 50;
			
			if(2 % i === 0 && (i > 0)) {
				yPos += lineHeight;
				xPos = 0;
			}
			
			var legendView = Ti.UI.createView({
				left:xPos,
				top:yPos,
				id:sums[i].id
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
		
		chartTitle.text = "Impulsive Spending vs. Money Spent";
		
		self.add(buttonHolderView);
		
		htmlString = '<html><head><script src="lib/raphael-min.js"></script><script src="lib/g.raphael-min.js"></script><script src="lib/g.pie-min.js"></script><script> window.onload = function () { var r = Raphael("holder"); r.piechart(150, 140, 90, ' + sumsString + ', { colors: ' + colors + '}); }; </script></head><body class="raphael" id="g.raphael.dmitry.baranovskiy.com"> <div id="holder"></div></body></html>';
		webView.html = htmlString;
	}
	
	function populateHTMLSatisfaction() {
		var sumsString = '[300, 200, 500]';
		var sums = [{id:0, sum:300, emotion:'Satisfied'}, {id:1, sum:200, emotion:'Very Satisfied'}, {id:2, sum:500, emotion:'Not Satisfied'}];
		
		if(buttonHolderView){
			self.remove(buttonHolderView);
		}
		
		buttonHolderView = Ti.UI.createView({
			height:300,
			width:300,
			top:160,
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
				id:sums[i].id
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
		
		chartTitle.text = "Satisfaction vs. Money Spent";
		
		self.add(buttonHolderView);
		
		htmlString = '<html><head><script src="lib/raphael-min.js"></script><script src="lib/g.raphael-min.js"></script><script src="lib/g.pie-min.js"></script><script> window.onload = function () { var r = Raphael("holder"); r.piechart(150, 140, 90, ' + sumsString + ', { colors: ' + colors + '}); }; </script></head><body class="raphael" id="g.raphael.dmitry.baranovskiy.com"> <div id="holder"></div></body></html>';
		webView.html = htmlString;
	}
	
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
		
		// text:'Emotion vs. Money Spent',
		chartTitle.text = "Emotion vs. Money Spent";
		sums = atsa;
		
		if(buttonHolderView){
			self.remove(buttonHolderView);
		}
		
		buttonHolderView = Ti.UI.createView({
			height:100,
			width:300,
			top:305,
			left:50
		});
		
		//ok we need to scroll through the sums array and create buttons that link to the detail page of each emotion
		for(var i=0; i<=sums.length-1; i++) {
			var xPos = (i % 2)*120;
			var yPos = 0;
			var lineHeight = 20;
			
			if(2 % i === 0 && (i > 0)) {
				yPos += lineHeight;
			}
			
			var legendView = Ti.UI.createView({
				left:xPos,
				top:yPos,
				id:sums[i].id
			});
			var legendChip = Titanium.UI.createView({
							  backgroundColor:colorsArray[i],
							  height:10,
							  width:10,
							  left:0, top:0
							});
			legendView.add(legendChip);
			var roundedSum = Math.round(100*sums[i].sum)/100;
			var titleLabel = Titanium.UI.createLabel({
			    color:'#111111',
			    height:'auto',
			    width:'auto',
			    left:15,
			    text:'$' + roundedSum + ': ' + sums[i].emotion ,
			    font:{fontSize:10,fontWeight:'bold'},
			    top:0
			});
			legendView.add(titleLabel);
			buttonHolderView.add(legendView);
		}
		
		self.add(buttonHolderView);
		
		var sumsString = '[';
		var legendString = '[';
		var urlString = '[';
		var fireEventString = '<script type="text/JavaScript">function fireEvent(msg){Ti.App.fireEvent(\'fromwebview\',{id:msg});}</script>';
		//fireEventString = '';
		Ti.API.info('sums length: ' + sums.length);
		for(var i=0; i<=sums.length-1; i++) {
			if(i === (sums.length-1)){
				sumsString += sums[i].sum + ']';
				legendString += '"' + sums[i].emotion + ' - $' + sums[i].sum + '"]';
				urlString += '"javascript:fireEvent(' + sums[i].id + ')"]';
			} else {
				sumsString += sums[i].sum + ', ';
				legendString += '"' + sums[i].emotion + ' - $' + sums[i].sum + '", ';
				urlString += '"javascript:fireEvent(' + sums[i].id + ')",';
			}
		}
		Ti.API.info('urlString string: ' + urlString);
		htmlString = '<html><head>' + fireEventString + '<script src="lib/raphael-min.js"></script><script src="lib/g.raphael-min.js"></script><script src="lib/g.pie-min.js"></script><script> window.onload = function () { var r = Raphael("holder"); r.piechart(150, 140, 90, ' + sumsString + ', { colors: ' + colors + ', href: '+ urlString +'}); }; </script></head><body class="raphael" id="g.raphael.dmitry.baranovskiy.com"> <div id="holder"></div></body></html>';
		webView.html = htmlString;
		//Ti.API.info('sum string: ' + sumsString);
		//Ti.API.info('legend string: ' + legendString);
	}
	return self;
}


