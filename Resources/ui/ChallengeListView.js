exports.ChallengeListView = function(args) {
	var self = Ti.UI.createWindow(args);
	// create the label
	var titleLabel = Titanium.UI.createLabel({
	    color:'#444',
	    height:'auto',
	    width:'auto',
	    top:10,
	    text:'Challenges',
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
	
	var rows = [];
	rows.push(Ti.UI.createTableViewRow({title:'Create and complete a goal.', font:{fontWeight: 'bold'}}));
	rows.push(Ti.UI.createTableViewRow({title:'Share a goal on a social media network.', font:{fontWeight: 'bold'}}));
	rows.push(Ti.UI.createTableViewRow({title:'Earn 300 points.', font:{fontWeight: 'bold'}}));
	
	
	var table = Ti.UI.createTableView({
		data: rows,
		selectionStyle:Ti.UI.iPhone.TableViewCellSelectionStyle.NONE
	});
	
	self.add(table);
	return self;
}
