exports.SettingsWindow = function(args) {
	var self = Ti.UI.createWindow(args);
	
	var sectionCategory = Ti.UI.createTableViewSection({ headerTitle:'Settings' });
	sectionCategory.add(Ti.UI.createTableViewRow({title:'Manage Categories', hasChild:true}));
	
	var table = Ti.UI.createTableView({
	  data: [sectionCategory]
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
