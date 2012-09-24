exports.PurchaseDetailWindow = function(args) {
	var self = Ti.UI.createWindow(args);
	self.barImage = 'iphone/navBackground.png';
	//Ti.API.info("row id: " + args.rowID);
	var db = require('db');
	var item = db.selectItem(args.rowID)[0];
	
	Ti.API.info("item price: " + item.item_price);
	
	var date = new Date(item.date_time*1000);
	var hours = date.getHours();
	var minutes = date.getMinutes();
	var seconds = date.getSeconds();
	var day = date.getDate();
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var formattedTime = year + ', ' + month + ', ' + day + ', ' + hours + ':' + minutes;
	
	// Ti.API.info("item date_time: " + formattedTime);
	// Ti.API.info("item lat: " + item.location_latitude);
	// Ti.API.info("item lon: " + item.location_longitude);
	// Ti.API.info("item note: " + item.note);
	// Ti.API.info("categories: " + item.categoryNames);
	// Ti.API.info("emotion: " + item.question_1_emotion);
	// Ti.API.info("emotion name: " + item.question_1_emotion_name);
	
	// create the label
	var titleLabel = Titanium.UI.createLabel({
	    color:'#111',
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
		left: 10
	});
	
	var purchaseNameLabel = Ti.UI.createLabel({
	  color: '#111',
	  font: {fontSize:18, fontWeight:'bold'},
	  text: item.item_name,
	  top: 10,
	  left: 80,
	  width: 'auto', height: 'auto'
	});
	
	//TODO: need to make sure returned price rounds to the second decimal point
	//  	i entered 69.99 for borderlands 2 and got back 69.9899999999!!!!
	var priceLabel = Ti.UI.createLabel({
	  color: '#111',
	  font: {fontSize:13},
	  text: '$' + item.item_price,
	  top: 37,
	  left: 80,
	  width: 'auto', height: 'auto'
	});
	self.add(photoPlaceHolder);
	self.add(purchaseNameLabel);
	self.add(priceLabel);
	
	return self;
}
