exports.AddWindow = function(args) {
	var self = Ti.UI.createWindow(args);
	
	var CategoryListViewWindow = require('ui/CategoryListViewWindow').CategoryListViewWindow,
		AddPurchaseContentWindow = require('ui/AddPurchaseContentWindow').AddPurchaseContentWindow;
	
	var addPurchaseContentWindow = new AddPurchaseContentWindow({
		title: 'Add Item',
		backgroundColor: '#fff',
		parentWindow: self
	});
	
	var categoryListView = new CategoryListViewWindow({
		backgroundColor: '#FFF',
		title: 'Categories'
	});
	categoryListView.catsAreSelectable = true;
	addPurchaseContentWindow.categoryListView = categoryListView;
	
	var navGroup = Ti.UI.iPhone.createNavigationGroup({
		window:addPurchaseContentWindow
	});
	
	addPurchaseContentWindow.navGroup = navGroup;
	addPurchaseContentWindow.categoryWindow = categoryListView;

	self.add(navGroup);
	
	return self;
};
