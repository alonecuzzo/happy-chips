exports.AddLimitWindow = function(args) {
	var self = Ti.UI.createWindow(args);
	
	var doneButton = Titanium.UI.createButton({ systemButton : Titanium.UI.iPhone.SystemButton.DONE}); 
	doneButton.enabled = false;
	self.setRightNavButton(doneButton);
	
	doneButton.addEventListener('click', function(){
		
	});
	
	var limiterDate = '';
	var limiterType = -1;
	
	function evaluateFields(){
		var isNameFieldValid = false;
		var isLimiterDateValid = false;
		if(limitNameTextField.value !== ''){
			isNameFieldValid = true;
		} else {
			isNameFieldValid = false;
		}
		
		if(limiterDate !== ''){
			isLimiterDateValid = true;
		} else {
			isLimiterDateValid = false;
		}

		if(isNameFieldValid && isLimiterDateValid) {
			doneButton.enabled = true;
		} else {
			doneButton.enabled = false;
		}
	}
	
	var limitNameRow = Ti.UI.createTableViewRow();
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
		evaluateFields();
	});
	
	done.addEventListener('click', function(){
		picker_view.animate(slide_out);
		//limiterDate = picker.getValue();
		dateRow.title = 'Limited Until: ' + limiterDate;
		evaluateFields();
	});
	
	picker_view.add(toolbar);
	picker_view.add(picker);

	// turn on the selection indicator (off by default)
	picker.selectionIndicator = true;
	
	var limitNameTextField = Ti.UI.createTextField({
		width: '300dp',
		height: '45dp',
		left:'10dp',
		hintText: 'Limit Name',
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE,
		returnKeyType: Ti.UI.RETURNKEY_DONE
	});
	
	limitNameTextField.addEventListener('change', function(){
		evaluateFields();
	});
	
	limitNameRow.add(limitNameTextField);
	
	var sectionCategory = Ti.UI.createTableViewSection({ headerTitle:'Limit Information'});
	sectionCategory.add(limitNameRow);
	var dateRow = Ti.UI.createTableViewRow({title:'Limited Until', hasChild:true, id:0});
	sectionCategory.add(dateRow);
	sectionCategory.add(Ti.UI.createTableViewRow({title:'Limit Type', hasChild:true}));
	
	var table = Ti.UI.createTableView({
	  data: [sectionCategory]
	});
	
	table.style = Ti.UI.iPhone.TableViewStyle.GROUPED;
	
	table.addEventListener('click', function(e){
		if(e.row.id === 0) {
			limitNameTextField.blur();
			picker_view.animate(slide_in);
		} else if(e.row.title == 'Limit Type') {
			var LimitTypeListView = require('ui/LimitTypeListView').LimitTypeListView;
			var limitTypeListView = new LimitTypeListView({
				backgroundColor:'#FFF',
				title:'Limit Types'
			});
			limitTypeListView.containingTab = self.containingTab;
			self.containingTab.open(limitTypeListView,{animated:true});
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
