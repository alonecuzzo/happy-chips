exports.PurchaseDetailWindow = function(args) {
	var self = Ti.UI.createWindow(args);
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
	
	Ti.API.info("item date_time: " + formattedTime);
	Ti.API.info("item lat: " + item.location_latitude);
	Ti.API.info("item lon: " + item.location_longitude);
	Ti.API.info("item note: " + item.note);
	Ti.API.info("categories: " + item.categoryNames);
	Ti.API.info("emotion: " + item.question_1_emotion);
	
	
	var titleLabel = Ti.UI.createLabel({
	  color: '#000',
	  font: {fontSize:12},
	  text: item.item_name,
	  top: 10,
	  width: 'auto', height: 'auto'
	});
	
	//TODO: need to make sure returned price rounds to the second decimal point
	//  	i entered 69.99 for borderlands 2 and got back 69.9899999999!!!!
	var priceLabel = Ti.UI.createLabel({
	  color: '#000',
	  font: {fontSize:12},
	  text: item.item_price,
	  top: 30,
	  width: 'auto', height: 'auto'
	});
	
	self.add(titleLabel);
	self.add(priceLabel);
	
	return self;
}
