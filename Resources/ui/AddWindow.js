exports.AddWindow = function() {
	//var db = require('db');
	var isPriceFieldValid = false;
	
	var self = Ti.UI.createWindow({
		modal: true,
		title: 'Add Item',
		backgroundColor: '#fff'
	});
	var itemField = Ti.UI.createTextField({
		width: '300dp',
		height: '45dp',
		top: '20dp',
		hintText: 'New Item',
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		returnKeyType: Ti.UI.RETURNKEY_DONE
	});
	itemField.addEventListener('return', function(e) {
		addTask(itemField.value, self);
	});
	
	var locationButton = Ti.UI.createButton({
		title: 'Add Location',
		width: '300dp',
		height: '40dp',
		top: '80dp'
	});
	
	var priceField = Ti.UI.createTextField({
		width: '300dp',
		height: '45dp',
		top: '130dp',
		hintText: 'Item Price',
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		returnKeyType: Ti.UI.RETURNKEY_DEFAULT,
		keyboardType: Titanium.UI.KEYBOARD_DECIMAL_PAD
	});
	
	priceField.addEventListener('change', function(){
		//var match = new RegExp(^(\d*\.\d{1,2}|\d+)$);
		var match = /^(\d*?)(\.\d{1,2})?$/;
		Ti.API.info("match: " + match.test(priceField.value));
		isPriceFieldValid = (match.test(priceField.value) === true) ? true : false;
		Ti.API.info("isPriceFieldValid: " + isPriceFieldValid);
	});
	
	var happinessButton = Ti.UI.createButton({
		title: 'Happiness Level',
		top: '180dp',
		width: '300dp',
		height: '40dp'
	});
	
	var photoButton = Ti.UI.createButton({
		title: 'Add Photo',
		top: '230dp',
		width: '300dp',
		height: '40dp'
	});
	
	var addButton = Ti.UI.createButton({
		title: 'Add',
		width: '300dp',
		height: '40dp',
		top: '280dp'
	});
	addButton.addEventListener('click', function() {
		addTask(itemField.value, self);
	});
	
	var cancelButton = Ti.UI.createButton({
		title: 'Cancel',
		width: '300dp',
		height: '40dp',
		top: '330dp'
	});
	cancelButton.addEventListener('click', function(e) {
		self.close();
	});
	
	self.add(itemField);
	self.add(happinessButton);
	self.add(photoButton);
	self.add(locationButton);
	self.add(priceField);
	self.add(addButton);
	self.add(cancelButton);
	
	return self;
};

var addTask = function(value, win) {
	if (value === '') {
		alert('Please enter a task first');
		return;	
	}
	
	//require('db').addItem(value);
	Ti.App.fireEvent('app:updateTables');
	win.close();
};