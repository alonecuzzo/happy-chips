exports.LimitDetailView = function(args) {
	var self = Ti.UI.createWindow(args);
	
	// create the label
	var titleLabel = Titanium.UI.createLabel({
	    color:'#444',
	    height:'auto',
	    width:'auto',
	    top:10,
	    text:'Goal Detail',
	    textAlign:'center',
	    font:{fontSize:20,fontWeight:'bold'},
	    shadowColor:'#eee',shadowOffset:{x:0,y:1}
	});
	
	var now = new Date();
	var differenceEpoch = args.limitObject.endDate;
	var one_day=1000*60*60*24;
	var differenceDays = Math.ceil(((differenceEpoch*1000)-now.getTime())/(one_day));
	
	// Ti.API.info('difference in days: ' + Math.ceil(((differenceEpoch*1000)-now.getTime())/(one_day)));
	// Ti.API.info('difference epoch: ' + differenceEpoch);
	// Ti.API.info('now epoch: ' + now.getTime());
	
	self.setTitleControl(titleLabel);
	self.barImage = 'iphone/navBackground.png';
	
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
	
	var topBackgroundColor = Titanium.UI.createView({
						backgroundColor:'#444',
						height:70,
				  	    width:350,
						left:0,
						top:0
					});
	
	var webView = Ti.UI.createWebView({
		top:150
	});
	
	var daysLeftLabel = Ti.UI.createLabel({
	  color: '#444',
	  font: {fontSize:10, fontWeight:'bold'},
	  text: 'days left',
	  top: 93,
	  left: 29,
	  width: 'auto', height: 'auto'
	});
	
	var daysLeft = Ti.UI.createLabel({
	  color: '#333',
	  font: {fontSize:18, fontWeight:'bold'},
	  text: differenceDays,
	  top: 73,
	  left: 39,
	  textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
	  width: 'auto', height: 'auto'
	});
	
	var limitNameLabel = Ti.UI.createLabel({
	  color: '#f7f7f7',
	  font: {fontSize:16, fontWeight:'bold'},
	  text: args.limitObject.name,
	  top: 10,
	  left: 65,
	  width: 'auto', height: 'auto'
	});
	
	var photoPlaceHolder = Ti.UI.createView({
		backgroundImage: 'iphone/purchaseDetailPhotoPlaceholder.png',
		height: 50,
		width: 50,
		top: 10,
		left: 10,
		borderColor:'#b7b7b7',
		borderWidth:1
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
	
	var percentCompleteAmt = Math.ceil((leftChartAmt / rightChartAmt) * 100);
	
	var percentCompleteLabel = Ti.UI.createLabel({
		  color: '#444',
		  font: {fontSize:10, fontWeight:'bold'},
		  text: 'spent',
		  top: 93,
		  left: 143,
		  width: 'auto', height: 'auto'
	});
	
	var percentComplete = Ti.UI.createLabel({
	  color: '#333',
	  font: {fontSize:18, fontWeight:'bold'},
	  text: percentCompleteAmt + '%',
	  top: 73,
	  left: 140,
	  textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
	  width: 'auto', height: 'auto'
	});
	
	var pointsLabel = Ti.UI.createLabel({
	  color: '#444',
	  font: {fontSize:10, fontWeight:'bold'},
	  text: 'points',
	  top: 93,
	  left: 256,
	  width: 'auto', height: 'auto'
	});
	
	var points = Ti.UI.createLabel({
	  color: '#111',
	  font: {fontSize:18, fontWeight:'bold'},
	  text: '42',
	  top: 73,
	  left: 260,
	  width: 'auto', height: 'auto'
	});
	
	var shareButtonBarBackground = Ti.UI.createView({
		backgroundImage:'iphone/shareButtonBarBackground.png',
		width:350,
		height:60,
		top:60
	});
	
	var verticalDivider = Ti.UI.createView({
		backgroundColor:'#ccc',
		width:1,
		height:50,
		left:118,
		top:5
	});
	
	var verticalDivider2 = Ti.UI.createView({
		backgroundColor:'#ccc',
		width:1,
		height:50,
		left:230,
		top:5
	});
	
	shareButtonBarBackground.add(verticalDivider);
	shareButtonBarBackground.add(verticalDivider2);
	self.add(shareButtonBarBackground);
	self.add(topBackgroundColor);
	self.add(limitNameLabel);
	self.add(webView);
	self.add(photoPlaceHolder);
	
	self.add(daysLeft);
	self.add(daysLeftLabel);
	self.add(percentCompleteLabel);
	self.add(percentComplete);
	self.add(points);
	self.add(pointsLabel);
	return self;
}
