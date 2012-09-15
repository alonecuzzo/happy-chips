exports.PurchaseListWindow = function(args) {
	var self = Ti.UI.createWindow(args);
	var tableView = Ti.UI.createTableView();
	
	tableView.setData(getTableData());
	self.add(tableView);
	
	Ti.App.addEventListener('app:updateTables', function() {
		tableView.setData(getTableData());
	});
	
	return self;
};

var getTableData = function() {
	var db = require('db');
	var data = [];
	var row = null;
	var purchaseItems = db.selectItems();
	
	Ti.API.info("array length: " + purchaseItems.length);
	
	for (var i = 0; i < purchaseItems.length; i++) {
		row = Ti.UI.createTableViewRow({
			id: purchaseItems[i].id,
			title: purchaseItems[i].item_name,
			//need to add cost too
			color: '#000',
			font: {
				fontWeight: 'bold'	
			}
		});
		data.push(row);
	}
	return data;
};
