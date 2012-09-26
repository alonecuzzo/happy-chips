exports.CategoryListViewWindow = function(args) {
	self = Ti.UI.createWindow(args);
	self.checkCategoryIds = [];
	
	var titleLabel = Titanium.UI.createLabel({
	    color:'#525252',
	    height:'auto',
	    width:'auto',
	    top:10,
	    text:'Categories',
	    textAlign:'center',
	    font:{fontSize:20,fontWeight:'bold'},
	    shadowColor:'#eee',shadowOffset:{x:0,y:1}
	});
	
	self.setTitleControl(titleLabel);
	
	var addRow = Ti.UI.createTableViewRow({
		backgroundColor:'#FFF'
	});
	
	var addItemTextField = Ti.UI.createTextField({
		width: '300dp',
		height: '45dp',
		left:'10dp',
		hintText: 'Add New Category',
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE,
		returnKeyType: Ti.UI.RETURNKEY_DONE
	});
	
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
	
	var addButton = Titanium.UI.createButton({ 
		height:20,
		width:20,
		backgroundImage:'iphone/addIcon.png' 
	}); 
	self.setRightNavButton(addButton);
	
	addButton.addEventListener('click', function(){
		addItemTextField.focus();
	});
	
	addItemTextField.addEventListener('blur', function(){
		//Ti.API.info("textfield lost focus");
		//add the item to the db
		if(addItemTextField.value != '') {
			require('db').addCategory(addItemTextField.value);
			Ti.App.fireEvent('app:updateTables');
		}
	});
	
	addRow.add(addItemTextField);
	var sectionCategory = Ti.UI.createTableViewSection({ headerTitle:'' });
	var setTableData = function(section) {
		var db = require('db');
		var row = null;
		var categories = db.selectCategories();
		for (var i = 0; i < categories.length; i++) {
			row = Ti.UI.createTableViewRow({
				id: categories[i].id,
				title: categories[i].category_name,
				backgroundColor:'#FFF',
				color: '#000',
				font: {
					fontWeight: 'bold'	
				}
			});
			
			//if(categories[i].id.iconName != '') {
				row.setLeftImage('iphone/' + categories[i].iconName);
			//}
			
			if(self.catsAreSelectable == true) {

			} else {
				row.setTouchEnabled(false);
				row.setSelectionStyle(Ti.UI.iPhone.TableViewCellSelectionStyle.NONE);
			}
			
			section.add(row);
		}
	}
	setTableData(sectionCategory);
	sectionCategory.add(addRow);
	
	//need a function that loops through every row in the table and checks the checked status, 
	//then adds it to an array
	var collectCheckMarks = function() {
		var rows = sectionCategory.getRows();
		var rowLength = rows.length;
		var checkMarkIds = [];
		for(var i=0; i<=rowLength-1; i++) {
			var row = rows[i];
			if(row.hasCheck){
				checkMarkIds.push(row.id);
			}
		}
		return checkMarkIds;
		//.API.info('checked row length: ' + checkMarkIds);
	}
	
	var table = Ti.UI.createTableView({
	  data: [sectionCategory],
	  backgroundColor:'#dfdfdf',
	  selectionStyle: Ti.UI.iPhone.TableViewCellSelectionStyle.NONE
	});
	table.style = Ti.UI.iPhone.TableViewStyle.GROUPED;
	
	self.add(table);
	
	table.addEventListener('click', function(e){
		if(e.row.getTitle() != ''){
			addItemTextField.blur();
			if(self.catsAreSelectable == true){
				e.row.hasCheck = !e.row.hasCheck;
				self.checkCategoryIds = collectCheckMarks();
			}
		} 
	});
	
	Ti.App.addEventListener('app:updateTables', function() {
		sectionCategory = Ti.UI.createTableViewSection({headerTitle: 'Categories'});
		setTableData(sectionCategory);
		addItemTextField.value = '';
		sectionCategory.add(addRow);
		table.setData([sectionCategory]);
	});
	
	self.getSelectedCategories = function() {
		return self.checkCategoryIds;
	}
	
	return self;
}

