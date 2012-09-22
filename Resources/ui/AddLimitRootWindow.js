exports.AddLimitRootWindow = function(args) {
	var self = Ti.UI.createWindow(args),
		AddLimitWindow = require('ui/AddLimitWindow').AddLimitWindow,
		LimitTypeListView = require('ui/LimitTypeListView').LimitTypeListView,
		LimitTypeLimiterListWindow = require('ui/LimitTypeLimiterListWindow').LimitTypeLimiterListWindow;
	
	var addLimitWindow = new AddLimitWindow({
		title: 'Add Goal',
		modal: true,
		backgroundColor: '#FFF',
		parentWindow: self
	});
	
	var limitTypeListView = new LimitTypeListView({
		backgroundColor:'#FFF',
		title:'Limit Types',
		addView:addLimitWindow
	});
	
	var navGroup = Ti.UI.iPhone.createNavigationGroup({
		window:addLimitWindow
	});
	
	addLimitWindow.navGroup = navGroup;
	addLimitWindow.limitTypeListView = limitTypeListView;
	limitTypeListView.navGroup = navGroup;
	
	self.add(navGroup);
	
	return self;
}
