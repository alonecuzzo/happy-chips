exports.LimitTypeLimiterListWindow = function(args) {
	var self = Ti.UI.createWindow(args);
	
	var itemSection = Ti.UI.createTableViewSection({headerTitle:'Select One:'});
	
	var setTableData = function(section, tableName) {
		var db = require('db');
		var row = null;
		var items = db.selectFromTable(tableName);
		for (var i = 0; i < items.length; i++) {
			var title = '';
			if(self.dbTableName === 'emotions') {
				title = items[i].emotion;
			} else if(self.dbTableName === 'categories' ) {
				title = items[i].category_name;
			}
			
			row = Ti.UI.createTableViewRow({
				id: items[i].id,
				title: title,
				color: '#000',
				font: {
					fontWeight: 'bold'	
				}
			});
			section.add(row);
		}
	}
	
	var collectCheckMark = function(rowTitle) {
		var rows = itemSection.getRows();
		var rowLength = rows.length;
		var checkMarkId = -1;
		for(var i=0; i<=rowLength-1; i++) {
			var row = rows[i];
			if(row.title === rowTitle){
				checkMarkId = row.id;
			} else {
				row.hasCheck = false;
			}
		}
		return checkMarkId;
	}
	
	setTableData(itemSection, args.dbTableName);
	
	var table = Ti.UI.createTableView({
	  data: [itemSection]
	});
	table.style = Ti.UI.iPhone.TableViewStyle.GROUPED;
	self.add(table);
	
	table.addEventListener('click', function(e){
		e.row.hasCheck = !e.row.hasCheck;
		var answerId = collectCheckMark(e.row.title);
	});
	
	return self;
}
