exports.SettingsWindow = function(args) {
	var self = Ti.UI.createWindow(args);
	
	self.barImage = 'iphone/navBackground.png';
	
	var titleLabel = Titanium.UI.createLabel({
	    color:'#000',
	    height:'auto',
	    width:'auto',
	    top:10,
	    text:'Settings',
	    textAlign:'center',
	    font:{fontSize:20,fontWeight:'bold'},
	    shadowColor:'#eee',shadowOffset:{x:0,y:1}
	});
	
	self.setTitleControl(titleLabel);
	
	var sectionCategory = Ti.UI.createTableViewSection({ headerTitle:'' });
	sectionCategory.add(Ti.UI.createTableViewRow({leftImage:'iphone/glyphicons_114_list.png', title:'Manage Categories', hasChild:true, backgroundColor:'#FFF'}));
	sectionCategory.add(Ti.UI.createTableViewRow({leftImage:'iphone/glyphicons_043_group.png', title:'Manage Sharing', hasChild:true, backgroundColor:'#FFF'}));
	
	var usSection = Ti.UI.createTableViewSection({ headerTitle:'' });
	usSection.add(Ti.UI.createTableViewRow({leftImage:'iphone/glyphicons_392_twitter.png', title:'Follow us on Twitter', hasChild:true, backgroundColor:'#FFF'}));
	usSection.add(Ti.UI.createTableViewRow({leftImage:'iphone/glyphicons_039_notes.png', title:'Leave Review', hasChild:true, backgroundColor:'#FFF'}));
	
	var supportSection = Ti.UI.createTableViewSection({ headerTitle:'' });
	supportSection.add(Ti.UI.createTableViewRow({leftImage:'iphone/glyphicons_010_envelope.png', title:'Email Support', hasChild:true, backgroundColor:'#FFF'}));
	supportSection.add(Ti.UI.createTableViewRow({leftImage:'iphone/glyphicons_194_circle_question_mark.png', title:'Help', hasChild:true, backgroundColor:'#FFF'}));
	
	
	var table = Ti.UI.createTableView({
	  data: [sectionCategory, supportSection, usSection],
	  backgroundColor:'#dfdfdf',
	  selectionStyle: Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
	  style:Ti.UI.iPhone.TableViewStyle.GROUPED
	});
	
	table.addEventListener('click', function(e){
		if(e.row.title === 'Manage Categories') {
			var CategoryListViewWindow = require('ui/CategoryListViewWindow').CategoryListViewWindow;
			var categoryListViewWindow = new CategoryListViewWindow({
				backgroundColor: '#FFF',
				title: 'Categories'
			});
			categoryListViewWindow.catsAreSelectable = false;
			self.containingTab.open(categoryListViewWindow,{animated:true});
		} 
	});
	
	self.add(table);
	
	return self;
}
