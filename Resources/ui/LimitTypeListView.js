exports.LimitTypeListView = function(args) {
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
	    text:'Goal Types',
	    textAlign:'center',
	    font:{fontSize:20,fontWeight:'bold'},
	    shadowColor:'#eee',shadowOffset:{x:0,y:1}
	});
	
	self.setTitleControl(titleLabel);
	var limitTypeSection = Ti.UI.createTableViewSection({headerTitle:''});
	
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
				backgroundColor:'#fff',
				font: {
					fontWeight: 'bold'	
				}
			});
			section.add(row);
		}
	}
	
	setTableData(limitTypeSection);
	
	var table = Ti.UI.createTableView({
	  data: [limitTypeSection],
	  style: Ti.UI.iPhone.TableViewStyle.GROUPED,
	  backgroundColor:'#dfdfdf',
	  selectionStyle: Ti.UI.iPhone.TableViewCellSelectionStyle.NONE
	});
	
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
		limitTypeLimiterListWindow.navGroup = self.navGroup;
		self.navGroup.open(limitTypeLimiterListWindow,{animated:true});
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
