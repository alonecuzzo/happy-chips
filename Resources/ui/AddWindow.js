exports.AddWindow = function(args) {
	var self = Ti.UI.createWindow(args);
	
	var CategoryListViewWindow = require('ui/CategoryListViewWindow').CategoryListViewWindow,
		AddPurchaseContentWindow = require('ui/AddPurchaseContentWindow').AddPurchaseContentWindow,
		AddCategoryWindow = require('ui/AddCategoryWindow').AddCategoryWindow;;
	
	var addPurchaseContentWindow = new AddPurchaseContentWindow({
		title: 'Add Item',
		backgroundColor: '#fff',
		parentWindow: self
	});
	
	var categoryListView = new CategoryListViewWindow({
		backgroundColor: '#FFF',
		title: 'Select Category'
	});
	
	var addCategoryWindow = new AddCategoryWindow({
		title:'Add Category',
		backgroundColor:'#FFF'
	}); 
		
	var navGroup = Ti.UI.iPhone.createNavigationGroup({
		window:addPurchaseContentWindow
	});
	
	addPurchaseContentWindow.navGroup = navGroup;
	addPurchaseContentWindow.categoryWindow = categoryListView;
	categoryListView.navGroup = navGroup;
	categoryListView.addCategoryWindow = addCategoryWindow;

	self.add(navGroup);
	
	return self;
};
