exports.QuestionWindow = function(args) {
	self = Ti.UI.createWindow(args);
	self.answerId = -1;
	var answerSection = Ti.UI.createTableViewSection({headerTitle:'Answers'});
	var setTableData = function(section) {
		var db = require('db');
		var row = null;
		var emotions = db.selectEmotions();
		for (var i = 0; i < emotions.length; i++) {
			row = Ti.UI.createTableViewRow({
				id: emotions[i].id,
				title: emotions[i].emotion,
				color: '#000',
				font: {
					fontWeight: 'bold'	
				}
			});
			
			section.add(row);
		}
	}
	setTableData(answerSection);
	
	var table = Ti.UI.createTableView({
	  data: [answerSection]
	});
	table.style = Ti.UI.iPhone.TableViewStyle.GROUPED;
	
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
	});
	
	self.getAnswerId = function() {
		return self.answerId;
	}
	
	return self;
};
