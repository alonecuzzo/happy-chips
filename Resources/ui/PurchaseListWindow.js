exports.PurchaseListWindow = function(args) {
	var self = Ti.UI.createWindow(args);
	var tableView = Ti.UI.createTableView({
		separatorStyle: Ti.UI.iPhone.TableViewSeparatorStyle.NONE,
		backgroundColor: '#444',
		selectionStyle: Ti.UI.iPhone.TableViewCellSelectionStyle.NONE
	});
	
	tableView.setData(getTableData());
	self.add(tableView);
	
	tableView.addEventListener('click', function(e) {
		//createConfirmDialog(e.row.id, e.row.title, isDone).show();
		Ti.API.info("you clicked: " + e.row.id);
		var PurchaseDetailWindow = require('ui/PurchaseDetailWindow').PurchaseDetailWindow;
		var detailWindow = new PurchaseDetailWindow({
			backgroundColor: '#f7f7f7',
			title: 'Detail',
			rowID: e.row.rowView.id
		});
		self.containingTab.open(detailWindow,{animated:true});
	});
	
	Ti.App.addEventListener('app:updateTables', function() {
		tableView.setData(getTableData());
	});
	
	var logoButton = Ti.UI.createButton({
		backgroundImage: 'iphone/logo.png',
		width: 151,
		height: 30,
		touchEnabled: false
	});
	
	self.setLeftNavButton(logoButton);
	
	return self;
};


var getTableData = function() {
	var db = require('db');
	var data = [];
	var row = null;
	var rowView = null;
	var FeedViewTableRow = require('ui/FeedViewTableRow').FeedViewTableRow;
	var purchaseItems = db.selectItems();
	
	for (var i = 0; i < purchaseItems.length; i++) {
		rowView = new FeedViewTableRow({
			width:305,
			height:85,
			itemName:purchaseItems[i].item_name,
			itemPrice:purchaseItems[i].item_price,
			id:purchaseItems[i].id,
			photo:purchaseItems[i].photo
		});
		Ti.API.info('photo: ' + purchaseItems[i].photo);
		row = Ti.UI.createTableViewRow({
			top:10,
			rowView:rowView,
			id:purchaseItems[i].id
		});
		row.add(rowView);
		data.push(row);
	}
	return data;
};
