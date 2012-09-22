exports.LimitListView = function(args) {
	var self = Ti.UI.createWindow(args);
	
	var addButton = Titanium.UI.createButton({ systemButton : Titanium.UI.iPhone.SystemButton.ADD}); 
	self.setRightNavButton(addButton);
	
	addButton.addEventListener('click', function(){
		var AddLimitRootWindow = require('ui/AddLimitRootWindow').AddLimitRootWindow;
		var addLimitRootWindow = new AddLimitRootWindow({
			modal:true,
			navBarHidden:true
		});
		addLimitRootWindow.open();
	});
	
	Ti.App.addEventListener('app:updateTables', function() {
		tableView.setData(getTableData());
	});
	
	var tableView = Ti.UI.createTableView();
	tableView.setData(getTableData());
	self.add(tableView);
		
	function getTableData() {
		var db = require('db');
		var data = [];
		var row = null;
		var limits = db.selectLimits();
		
		for (var i = 0; i < limits.length; i++) {
			row = Ti.UI.createTableViewRow({
				id: limits[i].id,
				title: limits[i].name,
				//need to add cost too
				color: '#000',
				font: {
					fontWeight: 'bold'	
				}
			});
			data.push(row);
		}
		return data;
	}
	
	return self;
}
