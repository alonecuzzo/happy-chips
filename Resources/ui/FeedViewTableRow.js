exports.FeedViewTableRow = function(args) {
	var self = Ti.UI.createView(args);
	self.id = args.id;
	self.setBackgroundImage('iphone/feedRowBackground.png');
	
	var purchaseNameLabel = Ti.UI.createLabel({
	  color: '#191919',
	  font: {fontSize:17, textAlign:'left', fontFamily:'Arial'},
	  text: args.itemName,
	  top: 10,
	  left: 26,
	  width: 'auto', height: 'auto'
	});
	
	var priceLabel = Ti.UI.createLabel({
	  color: '#a3a2a2',
	  font: {fontSize:15, textAlign:'left', fontFamily:'Arial'},
	  text: '$' + args.itemPrice,
	  top: 12,
	  right: 10,
	  width: 'auto', height: 'auto'
	});
	
	var dateLabel = Ti.UI.createLabel({
	  color: '#a3a2a2',
	  font: {fontSize:12, textAlign:'left', fontFamily:'Arial'},
	  text: '2 hours ago',
	  top: 38,
	  left: 8,
	  width: 'auto', height: 'auto'
	});
	
	var iconView = Ti.UI.createView({
		backgroundImage:'iphone/bagicon.png',
		width:22,
		height:22,
		left:5,
		top:9
	});
	
	self.add(iconView);
	self.add(dateLabel);
	self.add(priceLabel);
	self.add(purchaseNameLabel);
	
	return self;
}
