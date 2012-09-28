exports.LimitTypeLimiterListWindow = function(args) {
	var self = Ti.UI.createWindow(args);
	
	//back button
	var backbutton = Titanium.UI.createButton({
		title:'', 
		backgroundImage:'iphone/backArrow.png',
		width:20,
		height:18
	});
	backbutton.addEventListener('click', function() {
		self.navGroup.close(self);
	});
	self.leftNavButton = backbutton;
	self.barImage = 'iphone/navBackground.png';
	
	
	// create the label
	var titleLabel = Titanium.UI.createLabel({
	    color:'#444',
	    height:'auto',
	    width:'auto',
	    top:10,
	    text:'Select Emotion',
	    textAlign:'center',
	    font:{fontSize:20,fontWeight:'bold'},
	    shadowColor:'#eee',shadowOffset:{x:0,y:1}
	});
	
	self.setTitleControl(titleLabel);
	
	var itemSection = Ti.UI.createTableViewSection({headerTitle:'Select Emotion:'});
	
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
				backgroundColor:'#fff',
				font: {
					fontWeight: 'bold'	
				}
			});
			row.setLeftImage('iphone/' + items[i].iconName);
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
	
	setTableData(itemSection, self.dbTableName);
	
	var table = Ti.UI.createTableView({
	  data: [itemSection],
	  style: Ti.UI.iPhone.TableViewStyle.GROUPED,
	  backgroundColor:'#dfdfdf',
	  selectionStyle: Ti.UI.iPhone.TableViewCellSelectionStyle.NONE
	});
	self.add(table);
	
	table.addEventListener('click', function(e){
		e.row.hasCheck = !e.row.hasCheck;
		args.addView.limiterId = collectCheckMark(e.row.title);
		args.addView.limiterName = e.row.title;
		args.addView.evaluateFields();
	});
	
	return self;
}
