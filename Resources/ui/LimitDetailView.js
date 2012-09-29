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
	
	var opts = {
	  cancel: 2,
	  options: ['Twitter', 'Facebook', 'Cancel'],
	  selectedIndex: 2,
	  destructive: 2,
	  title: 'Share'
	};
	
	var dialog = Ti.UI.createOptionDialog(opts);
	
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
		top:130,
		height:100,
		width:290,
		borderColor:'#b7b7b7',
		borderWidth:1
	});
	
	var colors = '["#932453", "#65565C"]';
	var colorsArray = ['#932453', '#65565C'];
	
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
		backgroundImage: 'iphone/limitPlaceHolder.png',
		height: 50,
		width: 50,
		top: 10,
		left: 10,
		borderColor:'#b7b7b7',
		borderWidth:1
	});
	
	var date = new Date(args.limitObject.endDate*1000);
	var hours = date.getHours();
	var minutes = date.getMinutes();
	var seconds = date.getSeconds();
	var day = date.getDate();
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var formattedTime =  date.getMonthNameShort() + ' ' + day + ', ' + year;
	
	var dateLabel = Ti.UI.createLabel({
	  color: '#f7f7f7',
	  font: {fontSize:13},
	  text: 'Ends: ' + formattedTime,
	  top: 35,
	  left: 65,
	  width: 'auto', height: 'auto'
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
	
	
	var legendViewHolder = Ti.UI.createView({
			height:300,
			width:300,
			top:60,
			left:33
		});
	
	var legendView1 = Ti.UI.createView({
				left:0		
			});
	var legendView2 = Ti.UI.createView({
				left:100		
			});
		
	var legendChip1 = Titanium.UI.createView({
							  backgroundColor:colorsArray[0],
							  height:10,
							  width:10,
							  left:0
							});
	var legendChip2 = Titanium.UI.createView({
							  backgroundColor:colorsArray[1],
							  height:10,
							  width:10,
							  left:0
							});
	legendView1.add(legendChip1);
	legendView2.add(legendChip2);
	var roundedSum = Math.round(100*leftChartAmt)/100;
	var roundedSum1 = Math.round(100*rightChartAmt)/100;
	var titleLabel = Titanium.UI.createLabel({
			    color:'#111111',
			    height:'auto',
			    width:'auto',
			    left:15,
			    text:'$' + roundedSum + ': Spent' ,
			    font:{fontSize:10,fontWeight:'bold'}
			});
	var titleLabel1 = Titanium.UI.createLabel({
			    color:'#111111',
			    height:'auto',
			    width:'auto',
			    left:15,
			    text:'$' + roundedSum1 + ': Total Limit' ,
			    font:{fontSize:10,fontWeight:'bold'}
			});
	legendView2.add(titleLabel1);
	legendView1.add(titleLabel);
	legendViewHolder.add(legendView1);
	legendViewHolder.add(legendView2);
	
	htmlString = '<html><head><script src="lib/raphael-min.js"></script><script src="lib/g.raphael-min.js"></script><script src="lib/g.bar-min.js"></script><script> window.onload = function () { var r = Raphael("holder"); r.hbarchart(10, 10, 250, 50, [[' + leftChartAmt + '], [' + rightChartAmt + ']], {stacked: false, colors: ' + colors + '});} </script></head><body class="raphael" id="g.raphael.dmitry.baranovskiy.com"> <div id="holder"></div></body></html>';
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
	
	var statsBackground = Ti.UI.createView({
		backgroundImage:'iphone/shareButtonBarBackground.png',
		width:350,
		height:60,
		top:60
	});
	
	var verticalDivider3 = Ti.UI.createView({
		backgroundColor:'#ccc',
		width:1,
		height:50,
		left:118,
		top:5
	});
	
	var verticalDivider4 = Ti.UI.createView({
		backgroundColor:'#ccc',
		width:1,
		height:50,
		left:230,
		top:5
	});
	
	statsBackground.add(verticalDivider3);
	statsBackground.add(verticalDivider4);
	
	var shareButtonBarBackground = Ti.UI.createView({
		backgroundImage:'iphone/shareButtonBarBackground.png',
		width:310,
		height:50,
		top:243
	});

	var verticalDivider = Ti.UI.createView({
		backgroundColor:'#ccc',
		width:1,
		height:40,
		left:100,
		top:5
	});
	
	var verticalDivider2 = Ti.UI.createView({
		backgroundColor:'#ccc',
		width:1,
		height:40,
		left:200,
		top:5
	});
	
	var trashButton = Titanium.UI.createButton({
		title:'', 
		backgroundImage:'iphone/trashIcon.png',
		width:25,
		height:25,
		left: 238
	});
	
	var shareButton = Titanium.UI.createButton({
		title:'', 
		backgroundImage:'iphone/shareIcon.png',
		width:25,
		height:25,
		left: 37
	});
	
	var editButton = Titanium.UI.createButton({
		title:'', 
		backgroundImage:'iphone/editIcon.png',
		width:25,
		height:25,
		left: 137
	});
	
	shareButton.addEventListener('click', function(){
		dialog.show();
	})
	
	shareButtonBarBackground.add(shareButton);
	shareButtonBarBackground.add(editButton);
	shareButtonBarBackground.add(trashButton);
	shareButtonBarBackground.add(verticalDivider);
	shareButtonBarBackground.add(verticalDivider2);
	//self.add(chartBackground);
	self.add(statsBackground);
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
	self.add(dateLabel);
	self.add(legendViewHolder);
	self.add(shareButtonBarBackground);
	return self;
}
