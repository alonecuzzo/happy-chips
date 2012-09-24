exports.FeedViewTableRow = function(args) {
	var self = Ti.UI.createView(args);
	self.id = args.id;
	self.setBackgroundImage('iphone/feedRowBackground.png');
	
	return self;
}
