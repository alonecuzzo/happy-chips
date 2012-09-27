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
	
	var photoImageView = Titanium.UI.createImageView({
		height:60,
		width:60,
		top:15,
		left:20,
		borderColor:'#b7b7b7',
		borderWidth:1
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
			noteTextArea.value, userLat, userLon, self.questionWindow, photo);
	});

	var addItemSection = Ti.UI.createTableViewSection();
	var itemNameRow = Ti.UI.createTableViewRow({
		backgroundColor:'#FFF'
	});
	
	var photoButton = Titanium.UI.createButton({
		title:'', 
		backgroundImage:'iphone/addImageIcon.png',
		width:70,
		height:70,
		top:5,
		left:10
	});
	
	var opts = {
	  cancel: 2,
	  options: ['Camera', 'Photo Gallery', 'Cancel'],
	  selectedIndex: 2,
	  destructive: 2,
	  title: 'Add a Photo'
	};
	
	var dialog = Ti.UI.createOptionDialog(opts);
	var photo;
	
	dialog.addEventListener('click', function(e) {
		if(e.index === 0) {
			//camera
			Ti.Media.showCamera({
				success:function(event)
				{
					Titanium.UI.createAlertDialog({title:'Camera', message:'Check your Photo Gallery'}).show();
				},
				cancel:function()
				{
			
				},
				error:function(error)
				{
					// create alert
					var a = Titanium.UI.createAlertDialog({title:'Camera'});
			
					// set message
					if (error.code == Titanium.Media.NO_CAMERA)
					{
						a.setMessage('Device does not have camera capabilities');
					}
					else
					{
						a.setMessage('Unexpected error: ' + error.code);
					}
			
					// show alert
					a.show();
				},
				saveToPhotoGallery:true,
				allowEditing:true
			});
		} else if(e.index === 1){
			//photo gallery
			Ti.Media.openPhotoGallery({
				success:function(event)
				{
					var cropRect = event.cropRect;
					var image = event.media;
					var filename = 'image' + Math.random() + '.png';
        			Titanium.App.Properties.setString("filename", filename);
        			var f2 = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, filename);
    				f2.write(image);

					// set image view
					Ti.API.debug('Our type was: '+event.mediaType);
					if(event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO)
					{
						photoImageView.image = image;
						self.add(photoImageView);
						self.remove(photoButton);
						
						 if (Titanium.App.Properties.getString("filename") != null) {
						        // we have the file, so show it
						        var filename = Titanium.App.Properties.getString("filename");
						 		Ti.API.info('file name: ' + filename);
						        var imageFile = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, filename);
						        photo = imageFile.read();
						       // db.execute('INSERT OR REPLACE INTO images (id,path) VALUES(?,?)','1',f2);
						}
					}
					else
					{
						// is this necessary?
					}
			
					Titanium.API.info('PHOTO GALLERY SUCCESS cropRect.x ' + cropRect.x + ' cropRect.y ' + cropRect.y  + ' cropRect.height ' + cropRect.height + ' cropRect.width ' + cropRect.width);
			
				},
				cancel:function()
				{
			
				},
				error:function(error)
				{
				},
				allowEditing:true,
				mediaTypes:[Ti.Media.MEDIA_TYPE_VIDEO,Ti.Media.MEDIA_TYPE_PHOTO]
			});
		}
	});
	
	photoButton.addEventListener('click', function(){
		dialog.show();
	});
	
	self.add(photoButton);

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
		width: 220,
		height: '45dp',
		right: 10,
		top: 25,
		hintText: 'Purchase Price',
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		returnKeyType: Ti.UI.RETURNKEY_DEFAULT,
		keyboardType: Titanium.UI.KEYBOARD_DECIMAL_PAD
	});
	
	self.add(priceTextField);
	
	// var priceRow = Ti.UI.createTableViewRow({
		// backgroundColor:'#FFF'
	// });
	// priceRow.add(priceTextField);
	// addItemSection.add(priceRow);
	
	var happinessQuestionOneRow = Ti.UI.createTableViewRow({
		hasChild:true,
		title:'Happiness Level',
		id:0,
		backgroundColor:'#FFF'
	});
	addItemSection.add(happinessQuestionOneRow);

	var categoryRow = Ti.UI.createTableViewRow({
		hasChild:true,
		title:'Category',
		id:1,
		backgroundColor:'#FFF'
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
	  backgroundColor:'#FFF',
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
		height:90,
		backgroundColor:'#FFF'
	});
	noteRow.add(noteTextArea);
	addItemSection.add(noteRow);
	

	var table = Ti.UI.createTableView({
	  data: [addItemSection],
	  backgroundColor:'#dfdfdf',
	  selectionStyle: Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
	  top:70
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

var addPurchase = function(item_name, item_price, win, categoryView, noteText, userLat, userLon, questionWindow, photo) {

	if (item_name === '') {
		alert('Please enter a item name first');
		return;	
	}
	
	if (item_price === '') {
		alert('Please enter a price first');
		return;	
	}
	
	
	var optionalFields = {};
	
	
	if(photo) {
		optionalFields.photo = photo;
	}
	
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
