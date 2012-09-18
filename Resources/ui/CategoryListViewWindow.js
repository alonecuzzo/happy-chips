exports.CategoryListViewWindow = function(args) {
	self = Ti.UI.createWindow(args);
	
	var addRow = Ti.UI.createTableViewRow();
	
	var addItemTextField = Ti.UI.createTextField({
		width: '300dp',
		height: '45dp',
		left:'10dp',
		hintText: 'Add New Category',
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE,
		returnKeyType: Ti.UI.RETURNKEY_DONE
	});
	
	addItemTextField.addEventListener('blur', function(){
		//Ti.API.info("textfield lost focus");
		//add the item to the db
	});
	
	addRow.add(addItemTextField);
	
	var sectionCategory = Ti.UI.createTableViewSection({ headerTitle: 'Categories' });
	sectionCategory.add(Ti.UI.createTableViewRow({ title: 'Clothing' }));
	sectionCategory.add(Ti.UI.createTableViewRow({ title: 'Drink' }));
	sectionCategory.add(Ti.UI.createTableViewRow({ title: 'Electronics'}));
	sectionCategory.add(Ti.UI.createTableViewRow({ title: 'Food' }));
	sectionCategory.add(Ti.UI.createTableViewRow({ title: 'Video Games' }));
	sectionCategory.add(addRow);
	
	var table = Ti.UI.createTableView({
	  data: [sectionCategory]
	});
	table.style = Ti.UI.iPhone.TableViewStyle.GROUPED;
	
	self.add(table);
	
	table.addEventListener('click', function(e){
		if(e.row.getTitle() != ''){
			addItemTextField.blur();
			e.row.hasCheck = !e.row.hasCheck;
		} 
	});
	
	return self;
}
