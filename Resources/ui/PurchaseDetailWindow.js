exports.PurchaseDetailWindow = function(args) {
	var self = Ti.UI.createWindow(args);
	//Ti.API.info("row id: " + args.rowID);
	var db = require('db');
	var item = db.selectItem(args.rowID)[0];
	
	Ti.API.info("item price: " + item.item_price);
	
	var titleLabel = Ti.UI.createLabel({
	  color: '#000',
	  font: {fontSize:12},
	  text: item.item_name,
	  top: 10,
	  width: 'auto', height: 'auto'
	});
	
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
