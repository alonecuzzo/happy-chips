exports.QuestionWindow = function(args) {
	var self = Ti.UI.createWindow(args);
	self.answerId = -1;
	self.iconName = '';
	var answerSection = Ti.UI.createTableViewSection();
	var setTableData = function(section) {
		var db = require('db');
		var row = null;
		var emotions = db.selectEmotions();
		for (var i = 0; i < emotions.length; i++) {
			row = Ti.UI.createTableViewRow({
				id: emotions[i].id,
				title: emotions[i].emotion,
				iconName:emotions[i].iconName,
				color: '#000',
				backgroundColor:'#FFF',
				font: {
					fontWeight: 'bold'	
				}
			});
			row.setLeftImage('iphone/' + emotions[i].iconName);
			section.add(row);
		}
	}
	setTableData(answerSection);
	
	var titleLabel = Titanium.UI.createLabel({
	    color:'#525252',
	    height:'auto',
	    width:'auto',
	    top:10,
	    text:'Emotion',
	    textAlign:'center',
	    font:{fontSize:20,fontWeight:'bold'},
	    shadowColor:'#eee',shadowOffset:{x:0,y:1}
	});
	
	self.setTitleControl(titleLabel);
	
	var table = Ti.UI.createTableView({
	  data: [answerSection],
	  backgroundColor:'#dfdfdf',
	  selectionStyle: Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
	  style: Ti.UI.iPhone.TableViewStyle.GROUPED
	});
	
	var backbutton = Titanium.UI.createButton({
		title:'', 
		backgroundImage:'iphone/backArrow.png',
		width:20,
		height:18
	});
	backbutton.addEventListener('click', function() {
		if(self.iconName != ''){
			self.questionOneRow.setRightImage('iphone/' + self.iconName);	
		}
		self.navGroup.close(self);
	});
	self.leftNavButton = backbutton;
	
	var collectCheckMark = function(rowTitle) {
		var rows = answerSection.getRows();
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
	
	self.add(table);
	
	table.addEventListener('click', function(e){
		e.row.hasCheck = !e.row.hasCheck;
		self.answerId = collectCheckMark(e.row.title);
		self.iconName = e.row.iconName;
	});
	
	self.getAnswerId = function() {
		return self.answerId;
	}
	
	return self;
};
