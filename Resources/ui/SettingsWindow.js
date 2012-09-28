exports.SettingsWindow = function(args) {
	var self = Ti.UI.createWindow(args);
	
	self.barImage = 'iphone/navBackground.png';
	
	var titleLabel = Titanium.UI.createLabel({
	    color:'#525252',
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
	sectionCategory.add(Ti.UI.createTableViewRow({title:'Manage Categories', hasChild:true, backgroundColor:'#FFF'}));
	
	var table = Ti.UI.createTableView({
	  data: [sectionCategory],
	  backgroundColor:'#dfdfdf',
	  selectionStyle: Ti.UI.iPhone.TableViewCellSelectionStyle.NONE
	});
	
	table.style = Ti.UI.iPhone.TableViewStyle.GROUPED;
	
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
