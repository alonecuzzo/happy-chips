exports.LimitTypeListView = function(args) {
	var self = Ti.UI.createWindow(args);
	
	var limitTypeSection = Ti.UI.createTableViewSection({headerTitle:'Limit Types'});
	
	var setTableData = function(section) {
		var db = require('db');
		var row = null;
		var limitTypes = db.selectLimitTypes();
		for (var i = 0; i < limitTypes.length; i++) {
			row = Ti.UI.createTableViewRow({
				id: limitTypes[i].id,
				hasChild: true,
				title: limitTypes[i].limit_type,
				color: '#000',
				font: {
					fontWeight: 'bold'	
				}
			});
			section.add(row);
		}
	}
	
	setTableData(limitTypeSection);
	
	var table = Ti.UI.createTableView({
	  data: [limitTypeSection]
	});
	table.style = Ti.UI.iPhone.TableViewStyle.GROUPED;
	
	table.addEventListener('click', function(e) {
		var dbTableName = '';
		if(e.row.title === 'Emotion') {
			dbTableName = 'emotions';
		} else if(e.row.title === 'Category') {
			dbTableName = 'categories';
		}
		args.addView.limiterType = dbTableName;
		var LimitTypeLimiterListWindow = require('ui/LimitTypeLimiterListWindow').LimitTypeLimiterListWindow;
		var limitTypeLimiterListWindow = new LimitTypeLimiterListWindow({
			title: 'Choose Limiter',
			backgroundColor: '#FFF',
			dbTableName: dbTableName,
			addView: args.addView
		});
		self.containingTab.open(limitTypeLimiterListWindow,{animated:true});
		//will implement once questions are done
		// } else if(e.row.title === 'Satisfaction Level') {
// 			
		// } else if(e.row.title === 'Impule Level') {
// 			
		// }
	});
	
	self.add(table);
	
	return self;
}
