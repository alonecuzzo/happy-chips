exports.AddLimitWindow = function(args) {
	var self = Ti.UI.createWindow(args);
	// create the label
	var titleLabel = Titanium.UI.createLabel({
	    color:'#444',
	    height:'auto',
	    width:'auto',
	    top:10,
	    text:'Add Goal',
	    textAlign:'center',
	    font:{fontSize:20,fontWeight:'bold'},
	    shadowColor:'#eee',shadowOffset:{x:0,y:1}
	});
	
	self.setTitleControl(titleLabel);
	self.barImage = 'iphone/navBackground.png';
	var doneButton = Titanium.UI.createButton({
		title:'', 
		backgroundImage:'iphone/doneButton.png',
		width:60,
		height:35
	});
	self.setRightNavButton(doneButton);
	doneButton.enabled = false;
	
	var cancelButton = Titanium.UI.createButton({
		title:'', 
		backgroundImage:'iphone/cancelButton.png',
		width:60,
		height:35
	});
	self.setLeftNavButton(cancelButton); 
	
	cancelButton.addEventListener('click', function(){
		self.parentWindow.close();
	});
	
	doneButton.addEventListener('click', function(){
		var limitObject = {};
		limitObject.name = limitNameTextField.value;
		//need to convert date
		var myEpoch = limiterDate.getTime()/1000.0;
		limitObject.end_date = myEpoch;
		limitObject.limit_type = self.limiterType;
		limitObject.limit_constraint = self.limiterId;
		Ti.API.info('adding constraint: ' + limitObject.limit_constraint);
		limitObject.limit_amount = amountTextField.value;
		limitObject.completed = 'false';
		//insert limit
		require('db').addLimit(limitObject);
		Ti.App.fireEvent('app:updateTables');
		self.parentWindow.close();
	});
	
	var limiterDate = '';
	self.limiterType = '';
	self.limiterId = -1;
	self.limiterName = '';
	var amount = '';
	
	 self.evaluateFields = function(){
		var isNameFieldValid = false;
		var isLimiterDateValid = false;
		var isLimiterIdValid = false;
		var isAmountValid = false;
		if(limitNameTextField.value !== ''){
			isNameFieldValid = true;
		} else {
			isNameFieldValid = false;
		}
		
		if(amountTextField.value !== ''){
			isAmountValid = true;
		} else {
			isAmountValid = false;
		}
		
		if(limiterDate !== ''){
			isLimiterDateValid = true;
		} else {
			isLimiterDateValid = false;
		}
		
		if(self.limiterId > -1) {
			limiterRow.title = 'Limit Type: ' + self.limiterName;
			isLimiterIdValid = true;
		} else {
			isLimiterIdValid = false;
		}

		if(isNameFieldValid && isLimiterDateValid && isLimiterIdValid && isAmountValid) {
			doneButton.enabled = true;
		} else {
			doneButton.enabled = false;
		}
	}
	
	var limitNameRow = Ti.UI.createTableViewRow({
		backgroundColor:'#fff'
	});
	var amountRow = Ti.UI.createTableViewRow({
		backgroundColor:'#fff'
	});
	var date = new Date();
	var myLimitDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
	var picker = Ti.UI.createPicker({
		top:43,
		type:Ti.UI.PICKER_TYPE_DATE,
		minDate:myLimitDate
	});
	var slide_in =  Titanium.UI.createAnimation({bottom:0});
	var slide_out =  Titanium.UI.createAnimation({bottom:-251});
	
	var picker_view = Titanium.UI.createView({
		height:251,
		bottom:-251
	});
	 
	var cancel =  Titanium.UI.createButton({
		title:'Cancel',
		style:Titanium.UI.iphone.SystemButtonStyle.BORDERED
	});
	 
	var done =  Titanium.UI.createButton({
		title:'Done',
		style:Titanium.UI.iphone.SystemButtonStyle.DONE
	});
	 
	var spacer = Titanium.UI.createButton({
		systemButton:Titanium.UI.iphone .SystemButton.FLEXIBLE_SPACE
	});
	 
	var toolbar =  Titanium.UI.iOS.createToolbar({
		top:0,
		items:[cancel,spacer,done]
	});
	
	cancel.addEventListener('click', function(){
		picker_view.animate(slide_out);
		self.evaluateFields();
	});
	
	done.addEventListener('click', function(){
		picker_view.animate(slide_out);
		//limiterDate = picker.getValue();
		dateRow.title = 'Limited Until: ' + limiterDate;
		self.evaluateFields();
	});
	
	picker_view.add(toolbar);
	picker_view.add(picker);

	// turn on the selection indicator (off by default)
	picker.selectionIndicator = true;
	
	var limitNameTextField = Ti.UI.createTextField({
		width: '300dp',
		height: '45dp',
		left:'10dp',
		hintText: 'Goal Name',
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE,
		returnKeyType: Ti.UI.RETURNKEY_DONE
	});
	
	var amountTextField = Ti.UI.createTextField({
		width: '300dp',
		height: '45dp',
		left: '10dp',
		hintText: 'Amount',
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE,
		returnKeyType: Ti.UI.RETURNKEY_DEFAULT,
		keyboardType: Titanium.UI.KEYBOARD_DECIMAL_PAD
	});
	
	limitNameTextField.addEventListener('change', function(){
		self.evaluateFields();
	});
	
	amountTextField.addEventListener('change', function(){
		self.evaluateFields();
	});
	
	amountTextField.addEventListener('focus', function(){
		picker_view.animate(slide_out);
		limitNameTextField.blur();
	});
	
	limitNameTextField.addEventListener('focus', function(){
		picker_view.animate(slide_out);
		amountTextField.blur();
	});
	
	limitNameRow.add(limitNameTextField);
	amountRow.add(amountTextField);
	
	var sectionCategory = Ti.UI.createTableViewSection({ headerTitle:''});
	sectionCategory.add(limitNameRow);
	sectionCategory.add(amountRow);
	var dateRow = Ti.UI.createTableViewRow({title:'Limited Until', hasChild:true, id:0, backgroundColor:'#fff'});
	sectionCategory.add(dateRow);
	var limiterRow = Ti.UI.createTableViewRow({title:'Limit Type', hasChild:true, id:1, backgroundColor:'#fff'});
	sectionCategory.add(limiterRow);
	
	var table = Ti.UI.createTableView({
	  data: [sectionCategory],
	  backgroundColor:'#dfdfdf',
	  selectionStyle: Ti.UI.iPhone.TableViewCellSelectionStyle.NONE
	});
	
	table.style = Ti.UI.iPhone.TableViewStyle.GROUPED;
	
	table.addEventListener('click', function(e){
		if(e.row.id === 0) {
			limitNameTextField.blur();
			amountTextField.blur();
			picker_view.animate(slide_in);
		} else if(e.row.id === 1) {
			limitNameTextField.blur();
			amountTextField.blur();
			self.navGroup.open(self.limitTypeListView, {animated:true});
		} 
	});

	 picker.addEventListener('change',function(e) {
		// Ti.API.info(e.value);
		 limiterDate = e.value;
	 });
	
	self.add(table);
	self.add(picker_view);
	
	return self;
}
