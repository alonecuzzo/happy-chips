exports.AddWindow = function(args) {
	var self = Ti.UI.createWindow(args);
	
	var CategoryListViewWindow = require('ui/CategoryListViewWindow').CategoryListViewWindow,
		AddPurchaseContentWindow = require('ui/AddPurchaseContentWindow').AddPurchaseContentWindow,
		QuestionWindow = require('ui/QuestionWindow').QuestionWindow;
		
	var questionWindow = new QuestionWindow({
		title: 'Question 1',
		backgroundColor: '#FFF',
		parentWindow: self
	});
	questionWindow.barImage = 'iphone/navBackground.png';
	
	var addPurchaseContentWindow = new AddPurchaseContentWindow({
		//title: 'Add Item',
		backgroundColor: '#dfdfdf',
		parentWindow: self
	});
	addPurchaseContentWindow.barImage = 'iphone/navBackground.png';
	
	var categoryListView = new CategoryListViewWindow({
		backgroundColor: '#FFF'//,
		//title: 'Categories'
	});
	categoryListView.barImage = 'iphone/navBackground.png';
	categoryListView.catsAreSelectable = true;
	addPurchaseContentWindow.categoryListView = categoryListView;
	
	var navGroup = Ti.UI.iPhone.createNavigationGroup({
		window:addPurchaseContentWindow
	});
	categoryListView.navGroup = navGroup;
	questionWindow.navGroup = navGroup;
	questionWindow.questionOneRow = addPurchaseContentWindow.getQuestionOneRow();
	addPurchaseContentWindow.navGroup = navGroup;
	addPurchaseContentWindow.categoryWindow = categoryListView;
	addPurchaseContentWindow.questionWindow = questionWindow;

	self.add(navGroup);
	
	return self;
};
