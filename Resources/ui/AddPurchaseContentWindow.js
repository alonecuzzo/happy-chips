exports.AddPurchaseContentWindow = function(args) {
	var ispriceTextFieldValid = false;
	Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_BEST;
	Titanium.Geolocation.distanceFilter = 10;
	
	var self = Ti.UI.createWindow(args),
		userLat = 0,
		userLon = 0;
		
	var titleLabel = Titanium.UI.createLabel({
	    color:'#525252',
	    height:'auto',
	    width:'auto',
	    top:10,
	    text:'Add Purchase',
	    textAlign:'center',
	    font:{fontSize:20,fontWeight:'bold'},
	    shadowColor:'#eee',shadowOffset:{x:0,y:1}
	});
	
	self.setTitleControl(titleLabel);
	
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
		addPurchase(itemNameTextField.value, priceTextField.value, args.parentWindow, self.categoryListView,
			noteTextArea.value, userLat, userLon, self.questionWindow);
	});

	var itemNameTextField = Ti.UI.createTextField({
		width: '300dp',
		height: '45dp',
		top: '20dp',
		hintText: 'New Item',
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		returnKeyType: Ti.UI.RETURNKEY_DONE
	});
	// itemNameTextField.addEventListener('return', function(e) {
		// addPurchase(itemNameTextField.value, self);
	// });
	
	
	var priceTextField = Ti.UI.createTextField({
		width: '300dp',
		height: '45dp',
		top: '80dp',
		hintText: 'Item Price',
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		returnKeyType: Ti.UI.RETURNKEY_DEFAULT,
		keyboardType: Titanium.UI.KEYBOARD_DECIMAL_PAD
	});
	
	// var locationButton = Ti.UI.createButton({
		// title: 'Location',
		// top: '130dp',
		// width: '300dp',
		// height: '40dp'
	// });

		Titanium.Geolocation.getCurrentPosition(function(e) {
			if (e.error) {
			    alert('HFL cannot get your current location');
			    return;
			}
			 
			var longitude = e.coords.longitude;
			var latitude = e.coords.latitude;
			var altitude = e.coords.altitude;
			var heading = e.coords.heading;
			var accuracy = e.coords.accuracy;
			var speed = e.coords.speed;
			var timestamp = e.coords.timestamp;
			var altitudeAccuracy = e.coords.altitudeAccuracy;
			    
			userLat = latitude;
			userLon = longitude;
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
	
	happinessButton.addEventListener('click', function(){
		blurTextFields();
		self.navGroup.open(self.questionWindow, {animated:true});
	});
	
	var categoryButton = Ti.UI.createButton({
		title: 'Categories',
		top: '230dp',
		width: '300dp',
		height: '40dp'
	});
	
	categoryButton.addEventListener('click', function(){
		blurTextFields();
		self.navGroup.open(self.categoryWindow, {animated:true});
	});
	
	var photoButton = Ti.UI.createButton({
		title: 'Add Photo',
		top: '280dp',
		width: '300dp',
		height: '40dp'
	});
	
	var noteTextArea = Ti.UI.createTextArea({
	  borderWidth: 2,
	  borderColor: '#bbb',
	  returnKeyType: Ti.UI.RETURNKEY_GO,
	  textAlign: 'left',
	  hintText: 'Note',
	  top: '330dp',
	  width: '300dp', height: '70dp'
	});
	
	scrollview.add(itemNameTextField);
	scrollview.add(happinessButton);
	scrollview.add(photoButton);
	//scrollview.add(locationButton);
	scrollview.add(categoryButton);
	scrollview.add(priceTextField);
	scrollview.add(noteTextArea);
	
	self.add(scrollview);
	
	self.addEventListener("click", blurTextFields);
	
	function blurTextFields() {
		itemNameTextField.blur();
		priceTextField.blur();
		noteTextArea.blur();
	}
	
	return self;
}

var addPurchase = function(item_name, item_price, win, categoryView, noteText, userLat, userLon, questionWindow) {

	if (item_name === '') {
		alert('Please enter a item name first');
		return;	
	}
	
	if (item_price === '') {
		alert('Please enter a price first');
		return;	
	}	
	
	var optionalFields = {};
	
	if(categoryView.getSelectedCategories().length > 0){
		optionalFields.categoryIds = categoryView.getSelectedCategories();
	}
	
	if(noteText != '') {
		optionalFields.note = noteText;
	}
	
	optionalFields.userLat = userLat;
	optionalFields.userLon = userLon;
	optionalFields.question_1_emotion = questionWindow.getAnswerId();
	
	var passedLimitCheck = false;
	//need to see if there are limits on anything
	
	//1. return all limits
	var limits = require('db').selectLimits();
	//2. put emotions limits in an emotions array and category limits in category array
	var emotionLimitArray = [],
		categoryLimitArray = [];
		
	var now = new Date().getTime()/1000.0;
	
	for(var i=0; i<=limits.length-1; i++) {
		//check date 
		if(limits[i].endDate > now) {
			if(limits[i].limitType === 'categories') {
				categoryLimitArray.push(limits[i]);
			}
			if(limits[i].limitType === 'emotions') {
				emotionLimitArray.push(limits[i]);
			}
		}	
	}	
	//Ti.API.info('emotion limit array length: ' + emotionLimitArray.length);
	//Ti.API.info('limit length: ' + limits.length);
	//3. identify which emotion and category are attached to this item
	//we'll just do emotion first
	//there will always be only one emotion to compare to
	//ALSO NEED TO PUT A DATE CHECK IN!!!
	for(var i=0; i<=emotionLimitArray.length-1; i++) {
		if(emotionLimitArray[i].limitConstraint === optionalFields.question_1_emotion) {
			//find sum for that emotion
			var emotionalSums = require('db').getEmotionalSums();
			var foundMatch = false;
			for(var j=0; j<=emotionalSums.length-1; j++) {
				if(emotionLimitArray[i].limitConstraint === emotionalSums[j].id) {
					foundMatch = true;
					var sumItemPriceSum = (emotionalSums[i].sum + item_price);
					if(sumItemPriceSum > emotionLimitArray[i].limitAmount) {
						Ti.API.info('you are over the limit: ' + emotionLimitArray[i].endDate);
					}
				} 
			}
			if(!foundMatch) {
				if(item_price > emotionLimitArray[i].limitAmount) {
					Ti.API.info('you are over the limit first: ' + emotionLimitArray[i].endDate);
				}
			}
		}
	}
	//4. find current sum for each match
	//5. add this sum and compare
	
	//should probably make an object to be passed vs all of these fields...
	require('db').addItem(item_name, item_price, optionalFields);
	Ti.App.fireEvent('app:updateTables');
	win.close();
};
