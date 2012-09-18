exports.CategoryListViewWindow = function(args) {
	self = Ti.UI.createWindow(args);
	
	var sectionFruit = Ti.UI.createTableViewSection({ headerTitle: 'Categories' });
	sectionFruit.add(Ti.UI.createTableViewRow({ title: 'Clothing' }));
	sectionFruit.add(Ti.UI.createTableViewRow({ title: 'Drink' }));
	sectionFruit.add(Ti.UI.createTableViewRow({ title: 'Electronics' }));
	sectionFruit.add(Ti.UI.createTableViewRow({ title: 'Food' }));
	sectionFruit.add(Ti.UI.createTableViewRow({ title: 'Video Games' }));
	
	var table = Ti.UI.createTableView({
	  data: [sectionFruit]
	});
	table.style = Ti.UI.iPhone.TableViewStyle.GROUPED;
	
	self.add(table);
	
	return self;
}
