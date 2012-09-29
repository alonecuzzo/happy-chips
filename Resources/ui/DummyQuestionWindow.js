exports.DummyQuestionWindow = function(args) {
	var self = Ti.UI.createWindow(args);
	//back button
	var backbutton = Titanium.UI.createButton({
		title:'', 
		backgroundImage:'iphone/backArrow.png',
		width:20,
		height:18
	});
	backbutton.addEventListener('click', function() {
		self.close();
		args.parentWindow.slideTable();
	});
	self.leftNavButton = backbutton;
	
	// create the label
	var titleLabel = Titanium.UI.createLabel({
	    color:'#000',
	    height:'auto',
	    width:'auto',
	    top:10,
	    text:args.questionTitle,
	    textAlign:'center',
	    font:{fontSize:20,fontWeight:'bold'},
	    shadowColor:'#eee',shadowOffset:{x:0,y:1}
	});
	
	var answer3Section = Ti.UI.createTableViewSection();
	answer3Section.add(Ti.UI.createTableViewRow({leftImage:'iphone/emotionSmileyIcon.png', title:'Very Satisfied', backgroundColor:'#FFF'}));
	answer3Section.add(Ti.UI.createTableViewRow({leftImage:'iphone/emotionIndifferentIcon.png', title:'Satisfied', backgroundColor:'#FFF'}));
	answer3Section.add(Ti.UI.createTableViewRow({leftImage:'iphone/emotionSadIcon.png', title:'Not Satisfied', backgroundColor:'#FFF'}));
	
	var table = Ti.UI.createTableView({
	  data: [answer3Section],
	  backgroundColor:'#dfdfdf',
	  selectionStyle: Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
	  style: Ti.UI.iPhone.TableViewStyle.GROUPED
	});
	
	var collectCheckMark = function(rowTitle, section) {
		var rows = section.getRows();
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
	
	table.addEventListener('click', function(e){
		e.row.hasCheck = !e.row.hasCheck;
		self.answerId = collectCheckMark(e.row.title, answer3Section);
		//self.iconName = e.row.iconName;
	});
	self.add(table);
	self.setTitleControl(titleLabel);
	return self;
}