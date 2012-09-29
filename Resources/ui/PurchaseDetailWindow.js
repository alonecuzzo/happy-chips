exports.PurchaseDetailWindow = function(args) {
	var self = Ti.UI.createWindow(args);
	self.barImage = 'iphone/navBackground.png';
	//Ti.API.info("row id: " + args.rowID);
	var db = require('db');
	var item = db.selectItem(args.rowID)[0];
	
	Ti.API.info("item price: " + item.item_price);
	Ti.API.info("we got question 2! " + args.isQuestionTwo);
	Ti.API.info("we got question 3! " + args.isQuestionThree);
	
	var opts = {
	  cancel: 2,
	  options: ['Twitter', 'Facebook', 'Cancel'],
	  selectedIndex: 2,
	  destructive: 2,
	  title: 'Share'
	};
	
	var dialog = Ti.UI.createOptionDialog(opts);
	
	var date = new Date(item.date_time*1000);
	var hours = date.getHours();
	var minutes = date.getMinutes();
	var seconds = date.getSeconds();
	var day = date.getDate();
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var formattedTime =  date.getMonthNameShort() + ' ' + day + ', ' + year;
	
	var topBackgroundColor = Titanium.UI.createView({
						backgroundColor:'#444',
						height:100,
				  	    width:350,
						left:0,
						top:0
					});
	
	// Ti.API.info("item date_time: " + formattedTime);
	// Ti.API.info("item lat: " + item.location_latitude);
	// Ti.API.info("item lon: " + item.location_longitude);
	// Ti.API.info("item note: " + item.note);
	// Ti.API.info("categories: " + item.categoryNames);
	// Ti.API.info("emotion: " + item.question_1_emotion);
	// Ti.API.info("emotion name: " + item.question_1_emotion_name);
	
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
	
	// create the label
	var titleLabel = Titanium.UI.createLabel({
	    color:'#000',
	    height:'auto',
	    width:'auto',
	    top:10,
	    text:'Purchase',
	    textAlign:'center',
	    font:{fontSize:20,fontWeight:'bold'},
	    shadowColor:'#eee',shadowOffset:{x:0,y:1}
	});
	
	self.setTitleControl(titleLabel);
	
	var photoPlaceHolder = Ti.UI.createView({
		backgroundImage: 'iphone/purchaseDetailPhotoPlaceholder.png',
		height: 60,
		width: 60,
		top: 10,
		left: 10,
		borderColor:'#b7b7b7',
		borderWidth:1
	});
	
	var photoImageView = Titanium.UI.createImageView({
		height:60,
		width:60,
		top:10,
		left:10,
		backgroundColor:'#999',
		borderColor:'#b7b7b7',
		borderWidth:1
	});
	
	var purchaseNameLabel = Ti.UI.createLabel({
	  color: '#f7f7f7',
	  font: {fontSize:18, fontWeight:'bold'},
	  text: item.item_name,
	  top: 10,
	  left: 80,
	  width: 'auto', height: 'auto'
	});
	
	//TODO: need to make sure returned price rounds to the second decimal point
	//  	i entered 69.99 for borderlands 2 and got back 69.9899999999!!!!
	var priceLabel = Ti.UI.createLabel({
	  color: '#ddd',
	  font: {fontSize:20, fontWeight:'bold'},
	  text: '$' + item.item_price,
	  top: 45,
	  right: 10,
	  width: 'auto', height: 'auto'
	});
	
	var iconView;
	
	//Ti.API.info(item.itemName + ': ' + item.categoryIconNames.length);
	
	if(item.categoryIconNames !== undefined) {
		iconView = require('util').buildArrayOfIconsView(item.categoryWhiteIconNames, 19, -330, 75);
	} else {
		Ti.API.info('hey!!');
		iconView = Ti.UI.createView({
			 backgroundImage:'iphone/bagicon_white.png',
			 width:22,
			 height:22,
			 left:77,
			 top:30
		 });
	}
	
	var emotionIcon = Ti.UI.createView({
			 backgroundImage:'iphone/' + item.whiteIconName,
			 width:22,
			 height:22,
			 right:12,
			 top:23
		 });
	
	var dateLabel = Ti.UI.createLabel({
	  color: '#f7f7f7',
	  font: {fontSize:13},
	  text: formattedTime,
	  top: 55,
	  left: 80,
	  width: 'auto', height: 'auto'
	});
	
	var mountainView = Titanium.Map.createAnnotation({
	   latitude:item.location_latitude,
			longitude:item.location_longitude,
			title:'Purchased: ' + item.item_name,
			subtitle:'',
			animate:true,
			leftButton:'/images/backButton.png',
			myid:3 
	});
	
	var mapview = Titanium.Map.createView({
	    mapType: Titanium.Map.STANDARD_TYPE,
	    region: {latitude:item.location_latitude, longitude:item.location_longitude, 
	            latitudeDelta:0.01, longitudeDelta:0.01},
	    animate:true,
	    regionFit:true,
	    userLocation:true,
	    annotations:[mountainView],
	    top:90,
	    width:290,
	    height:100
	});
	
	var mapBackgroundView = Ti.UI.createView({
		backgroundImage:'iphone/feedRowBackground.png',
		width:305,
		height:120,
		top:80
	});
	
	var shareButtonBarBackground = Ti.UI.createView({
		backgroundImage:'iphone/shareButtonBarBackground.png',
		width:310,
		height:50,
		top:205
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
	
	self.add(topBackgroundColor);
	self.add(mapBackgroundView);
	self.add(iconView);
	self.add(emotionIcon);
	self.add(dateLabel);
	self.add(photoPlaceHolder);
	self.add(purchaseNameLabel);
	self.add(priceLabel);
	self.add(shareButtonBarBackground);
	self.add(mapview);
	
	if(item.photo) {
		photoImageView.image = item.photo;
		self.add(photoImageView);
		self.remove(photoPlaceHolder);
	}
	
	return self;
}
