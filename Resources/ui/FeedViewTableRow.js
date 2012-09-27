exports.FeedViewTableRow = function(args) {
	var self = Ti.UI.createView(args);
	self.id = args.id;
	self.photo = args.photo;
	self.setBackgroundImage('iphone/feedRowBackground.png');
	
	var db = require('db');
	var item = db.selectItem(args.id)[0];
	
	var purchaseNameLabel = Ti.UI.createLabel({
	  color: '#000',
	  font: {fontSize:17, textAlign:'left', fontFamily:'Arial'},
	  text: args.itemName,
	  top: 30,
	  left: 55,
	  width: 'auto', height: 'auto'
	});
	
	var priceLabel = Ti.UI.createLabel({
	  color: '#191919',
	  font: {fontSize:15, textAlign:'left', fontFamily:'Arial'},
	  text: '$' + args.itemPrice,
	  top: 32,
	  right: 10,
	  width: 'auto', height: 'auto'
	});
	
	var dateLabel = Ti.UI.createLabel({
	  color: '#666',
	  font: {fontSize:12, textAlign:'left', fontFamily:'Arial'},
	  text: '2 hours ago',
	  top: 61,
	  left: 12,
	  width: 'auto', height: 'auto'
	});
	
	var iconView;
	
	//Ti.API.info(item.itemName + ': ' + item.categoryIconNames.length);
	
	if(item.categoryIconNames !== undefined) {
		iconView = require('util').buildArrayOfIconsView(item.categoryIconNames, 16, -40, 50);
	} else {
		Ti.API.info('hey!!');
		iconView = Ti.UI.createView({
			 backgroundImage:'iphone/bagicon.png',
			 width:20,
			 height:20,
			 left:52,
			 top:14
		 });
	}
	
	var photoImageView = Titanium.UI.createImageView({
		height:40,
		width:40,
		top:10,
		left:10,
		borderColor:'#b7b7b7',
		borderWidth:1
	});
	
	photoImageView.image = 'iphone/purchaseDetailPhotoPlaceholder.png';
	
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
