exports.FeedViewTableRow = function(args) {
	var self = Ti.UI.createView(args);
	self.id = args.id;
	self.photo = args.photo;
	self.setBackgroundImage('iphone/feedRowBackground.png');
	
	var purchaseNameLabel = Ti.UI.createLabel({
	  color: '#111',
	  font: {fontSize:17, textAlign:'left', fontFamily:'Arial'},
	  text: args.itemName,
	  top: 45,
	  left: 55,
	  width: 'auto', height: 'auto'
	});
	
	var priceLabel = Ti.UI.createLabel({
	  color: '#191919',
	  font: {fontSize:15, textAlign:'left', fontFamily:'Arial'},
	  text: '$' + args.itemPrice,
	  top: 47,
	  right: 10,
	  width: 'auto', height: 'auto'
	});
	
	var dateLabel = Ti.UI.createLabel({
	  color: '#666',
	  font: {fontSize:12, textAlign:'left', fontFamily:'Arial'},
	  text: '2 hours ago',
	  top: 73,
	  left: 12,
	  width: 'auto', height: 'auto'
	});
	
	var iconView = Ti.UI.createView({
		backgroundImage:'iphone/bagicon.png',
		width:22,
		height:22,
		right:9,
		top:25
	});
	
	var photoImageView = Titanium.UI.createImageView({
		height:40,
		width:40,
		top:25,
		left:10
	});
	
	photoImageView.image = 'iphone/purchaseDetailPhotoPlaceholder.png';
	
	var db = require('db');
	var item = db.selectItem(args.id)[0];
	
	if(item.photo){
		photoImageView.image = item.photo;
		Ti.API.info('phootto');
	}
	
	self.add(photoImageView);
	self.add(iconView);
	self.add(dateLabel);
	self.add(priceLabel);
	self.add(purchaseNameLabel);
	
	return self;
}
