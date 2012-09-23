exports.PurchaseListWindow = function(args) {
	var self = Ti.UI.createWindow(args);
	var tableView = Ti.UI.createTableView();
	
	tableView.setData(getTableData());
	self.add(tableView);
	
	tableView.addEventListener('click', function(e) {
		//createConfirmDialog(e.row.id, e.row.title, isDone).show();
		//Ti.API.info("you clicked: " + e.row.title);
		var PurchaseDetailWindow = require('ui/PurchaseDetailWindow').PurchaseDetailWindow;
		var detailWindow = new PurchaseDetailWindow({
			backgroundColor: '#FFF',
			title: 'Detail',
			rowID: e.row.id
		});
		self.containingTab.open(detailWindow,{animated:true});
	});
	
	
	Ti.App.addEventListener('app:updateTables', function() {
		tableView.setData(getTableData());
	});
	
	var logoButton = Ti.UI.createButton({
		backgroundImage: 'iphone/logo.png',
		width: '151dp',
		height: '30dp',
		touchEnabled: false
	});
	
	self.setLeftNavButton(logoButton);
	
	return self;
};


var getTableData = function() {
	var db = require('db');
	var data = [];
	var row = null;
	var purchaseItems = db.selectItems();
	
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
