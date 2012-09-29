exports.LimitListView = function(args) {
	var self = Ti.UI.createWindow(args);
	
	// create the label
	var titleLabel = Titanium.UI.createLabel({
	    color:'#444',
	    height:'auto',
	    width:'auto',
	    top:10,
	    text:'Goals',
	    textAlign:'center',
	    font:{fontSize:20,fontWeight:'bold'},
	    shadowColor:'#eee',shadowOffset:{x:0,y:1}
	});
	
	self.setTitleControl(titleLabel);
	self.barImage = 'iphone/navBackground.png';
	
	//back button
	var backbutton = Titanium.UI.createButton({
		title:'', 
		backgroundImage:'iphone/backArrow.png',
		width:20,
		height:18
	});
	backbutton.addEventListener('click', function() {
		self.close();
	});
	self.leftNavButton = backbutton;
	
	var addButton = Titanium.UI.createButton({ 
		height:20,
		width:20,
		backgroundImage:'iphone/addIcon.png' 
	}); 
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
	
	var tableView = Ti.UI.createTableView({
		 selectionStyle:Ti.UI.iPhone.TableViewCellSelectionStyle.NONE
	});
	tableView.setData(getTableData());
	self.add(tableView);
	
	tableView.addEventListener('click', function(e) {
		var LimitDetailView = require('ui/LimitDetailView').LimitDetailView;
		var limitDetailView = new LimitDetailView({
			backgroundColor: '#FFF',
			title: 'Detail',
			rowID: e.row.id,
			limitObject: e.row.limitObject
		});
		self.containingTab.open(limitDetailView,{animated:true});
	});
		
	function getTableData() {
		var db = require('db');
		var data = [];
		var row = null;
		var limits = db.selectLimits();
		
		for (var i = 0; i < limits.length; i++) {
			row = Ti.UI.createTableViewRow({
				id: limits[i].id,
				title: limits[i].name,
				limitObject: limits[i],
				//need to add cost too
				color: '#000',
				hasChild:true,
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
