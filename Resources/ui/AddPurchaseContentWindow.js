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
	
	var doneButton = Titanium.UI.createButton({
		title:'', 
		backgroundImage:'iphone/doneButton.png',
		width:60,
		height:35
	});
	self.setRightNavButton(doneButton);
	
	var cancelButton = Titanium.UI.createButton({
		title:'', 
		backgroundImage:'iphone/cancelButton.png',
		width:60,
		height:35
	});
	self.setLeftNavButton(cancelButton); 
	
	cancelButton.addEventListener('click', function(e) {
		args.parentWindow.close();
	});
	
	doneButton.addEventListener('click', function() {
		blurTextFields();
		addPurchase(itemNameTextField.value, priceTextField.value, args.parentWindow, self.categoryListView,
			noteTextArea.value, userLat, userLon, self.questionWindow);
	});

	var addItemSection = Ti.UI.createTableViewSection();
	var itemNameRow = Ti.UI.createTableViewRow();

	var itemNameTextField = Ti.UI.createTextField({
		width: 250,
		height: '45dp',
		left: '10dp',
		hintText: 'Purchase Name',
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE,
		returnKeyType: Ti.UI.RETURNKEY_DONE
	});
	
	itemNameRow.add(itemNameTextField);
	addItemSection.add(itemNameRow);
	
	var priceTextField = Ti.UI.createTextField({
		width: 250,
		height: '45dp',
		left: 10,
		hintText: 'Purchase Price',
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE,
		returnKeyType: Ti.UI.RETURNKEY_DEFAULT,
		keyboardType: Titanium.UI.KEYBOARD_DECIMAL_PAD
	});
	
	var priceRow = Ti.UI.createTableViewRow();
	priceRow.add(priceTextField);
	addItemSection.add(priceRow);
	
	var happinessQuestionOneRow = Ti.UI.createTableViewRow({
		hasChild:true,
		title:'Happiness Level',
		id:0
	});
	addItemSection.add(happinessQuestionOneRow);

	var categoryRow = Ti.UI.createTableViewRow({
		hasChild:true,
		title:'Category',
		id:1
	});
	addItemSection.add(categoryRow);


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
	
	var noteTextArea = Ti.UI.createTextArea({
	  returnKeyType: Ti.UI.RETURNKEY_DONE,
	  textAlign: 'left',
	  value: 'Purchase Note',
	  left:5,
	  top:0,
	  width: 292, height: 73,
	  borderWidth:0,
	  backgroundColor:'#f7f7f7',
	  font:{fontSize:18},
	  color:'#bdbdbd'
	});
	
	noteTextArea._hintText = noteTextArea.value;
 
	noteTextArea.addEventListener('focus',function(e){
	    if(e.source.value == e.source._hintText){
	        e.source.value = "";
	    }
	});
	noteTextArea.addEventListener('blur',function(e){
	    if(e.source.value==""){
	        e.source.value = e.source._hintText;
	    }
	});
	
	var noteRow = Ti.UI.createTableViewRow({
		height:90
	});
	noteRow.add(noteTextArea);
	addItemSection.add(noteRow);
	

	var table = Ti.UI.createTableView({
	  data: [addItemSection],
	  backgroundColor:'#f7f7f7',
	  selectionStyle: Ti.UI.iPhone.TableViewCellSelectionStyle.NONE
	});
	
	table.style = Ti.UI.iPhone.TableViewStyle.GROUPED;
	
	self.add(table);
	
	table.addEventListener('click', function(e){
		if(e.row.id === 0){
			blurTextFields();
			self.navGroup.open(self.questionWindow, {animated:true});
		} else if(e.row.id === 1) {
			blurTextFields();
			self.navGroup.open(self.categoryWindow, {animated:true});
		} else {
			blurTextFields();
		}
	});
	
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
