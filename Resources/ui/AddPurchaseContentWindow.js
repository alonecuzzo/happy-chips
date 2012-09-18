exports.AddPurchaseContentWindow = function(args) {
	var ispriceTextFieldValid = false;
	
	var self = Ti.UI.createWindow(args);
	
	//TODO: need to fix scrolling view, will probably have to write own function using the scrollTo functionality
	//in the scrollview class: http://docs.appcelerator.com/titanium/2.1/index.html#!/api/Titanium.UI.ScrollView
	//it pops into place when clicking above and when clicking textfield below animates down too far
	var scrollview = Ti.UI.createScrollView({
		contentWidth:'auto',
		contentHeight:'auto',
		top:0,
		showVerticalScrollIndicator:true,
		showHorizontalScrollIndicator:false
	});
	
	//top buttons etc
	var cancelButton = Titanium.UI.createButton({ systemButton : Titanium.UI.iPhone.SystemButton.CANCEL}); 
	self.setLeftNavButton(cancelButton);
	var doneButton = Titanium.UI.createButton({ systemButton : Titanium.UI.iPhone.SystemButton.DONE}); 
	self.setRightNavButton(doneButton);
	
	cancelButton.addEventListener('click', function(e) {
		args.parentWindow.close();
	});
	
	doneButton.addEventListener('click', function() {
		blurTextFields();
		addPurchase(itemNameTextField.value, priceTextField.value, args.parentWindow);
	});

	var itemNameTextField = Ti.UI.createTextField({
		width: '300dp',
		height: '45dp',
		top: '20dp',
		hintText: 'New Item',
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		returnKeyType: Ti.UI.RETURNKEY_DONE
	});
	itemNameTextField.addEventListener('return', function(e) {
		addPurchase(itemNameTextField.value, self);
	});
	
	var priceTextField = Ti.UI.createTextField({
		width: '300dp',
		height: '45dp',
		top: '80dp',
		hintText: 'Item Price',
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		returnKeyType: Ti.UI.RETURNKEY_DEFAULT,
		keyboardType: Titanium.UI.KEYBOARD_DECIMAL_PAD
	});
	
	var locationButton = Ti.UI.createButton({
		title: 'Add Location',
		width: '300dp',
		height: '40dp',
		top: '130dp'
	});
	
	priceTextField.addEventListener('change', function(){
		//var match = new RegExp(^(\d*\.\d{1,2}|\d+)$);
		var match = /^(\d*?)(\.\d{1,2})?$/;
		Ti.API.info("match: " + match.test(priceTextField.value));
		ispriceTextFieldValid = (match.test(priceTextField.value) === true) ? true : false;
		Ti.API.info("ispriceTextFieldValid: " + ispriceTextFieldValid);
	});
	
	var happinessButton = Ti.UI.createButton({
		title: 'Happiness Level',
		top: '180dp',
		width: '300dp',
		height: '40dp'
	});
	
	var categoryButton = Ti.UI.createButton({
		title: 'Categories',
		top: '230dp',
		width: '300dp',
		height: '40dp'
	});
	
	categoryButton.addEventListener('click', function(){
		self.navGroup.open(self.categoryWindow, {animated:true});
	});
	
	var photoButton = Ti.UI.createButton({
		title: 'Add Photo',
		top: '280dp',
		width: '300dp',
		height: '40dp'
	});
	
	var addButton = Ti.UI.createButton({
		title: 'Add',
		width: '300dp',
		height: '40dp',
		top: '330dp'
	});
	
	scrollview.add(itemNameTextField);
	scrollview.add(happinessButton);
	scrollview.add(photoButton);
	scrollview.add(locationButton);
	scrollview.add(categoryButton);
	scrollview.add(priceTextField);
	
	self.add(scrollview);
	
	self.addEventListener("click", blurTextFields);
	
	function blurTextFields() {
		itemNameTextField.blur();
		priceTextField.blur();
	}
	
	return self;
}

var addPurchase = function(item_name, item_price, win) {

	if (item_name === '') {
		alert('Please enter a item name first');
		return;	
	}
	
	if (item_price === '') {
		alert('Please enter a price first');
		return;	
	}
	
	require('db').addItem(item_name, item_price);
	Ti.App.fireEvent('app:updateTables');
	win.close();
};
