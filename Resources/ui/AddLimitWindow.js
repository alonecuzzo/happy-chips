exports.AddLimitWindow = function(args) {
	var self = Ti.UI.createWindow(args);
	
	var limitNameRow = Ti.UI.createTableViewRow();
	var picker = Ti.UI.createPicker({
		top:43,
		type:Ti.UI.PICKER_TYPE_DATE
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
	 
	var spacer =  Titanium.UI.createButton({
		systemButton:Titanium.UI.iphone .SystemButton.FLEXIBLE_SPACE
	});
	 
	var toolbar =  Titanium.UI.iOS.createToolbar({
		top:0,
		items:[cancel,spacer,done]
	});
	
	cancel.addEventListener('click', function(){
		picker_view.animate(slide_out);
	});
	
	done.addEventListener('click', function(){
		picker_view.animate(slide_out);
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
	
	limitNameRow.add(limitNameTextField);
	
	var sectionCategory = Ti.UI.createTableViewSection({ headerTitle:'Limit Information' });
	sectionCategory.add(limitNameRow);
	sectionCategory.add(Ti.UI.createTableViewRow({title:'Limited Until', hasChild:true}));
	sectionCategory.add(Ti.UI.createTableViewRow({title:'Limit Type', hasChild:true}));
	
	var table = Ti.UI.createTableView({
	  data: [sectionCategory]
	});
	
	table.style = Ti.UI.iPhone.TableViewStyle.GROUPED;
	
	table.addEventListener('click', function(e){
		if(e.row.title === 'Limited Until') {
			picker_view.animate(slide_in);
		} else if(e.row.title == 'Limit Type') {
			var LimitTypeListView = require('ui/LimitTypeListView').LimitTypeListView;
			var limitTypeListView = new LimitTypeListView({
				backgroundColor:'#FFF',
				title:'Limit Types'
			});
			self.containingTab.open(limitTypeListView,{animated:true});
		}
	});
	
	picker.addEventListener('change',function(e) {
		Ti.API.info(e.value);
	});
	
	self.add(table);
	self.add(picker_view);
	
	return self;
}
