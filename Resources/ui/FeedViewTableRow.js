exports.FeedViewTableRow = function(args) {
	var self = Ti.UI.createView(args);
	self.id = args.id;
	self.setBackgroundImage('iphone/feedRowBackground.png');
	
	var purchaseNameLabel = Ti.UI.createLabel({
	  color: '#6e6e6e',
	  font: {fontSize:17, fontWeight: 'bold', textAlign:'left', fontFamily:'Arial'},
	  text: args.itemName,
	  top: 8,
	  left: 40,
	  width: 'auto', height: 'auto'
	});
	
	self.add(purchaseNameLabel);
	
	return self;
}
