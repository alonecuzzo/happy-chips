var DATABASE_NAME = 'purchases';

exports.createDb = function() {
	Ti.Database.install('purchases.sqlite', DATABASE_NAME);
}

exports.selectItems = function() {
	var retData = [];
	var db = Ti.Database.open(DATABASE_NAME);
	var rows = db.execute('select ROWID, * from purchases');
	while (rows.isValidRow()) {
		retData.push({item_name:rows.fieldByName('item_name'), 
			id:rows.fieldByName('ROWID'), item_price:rows.fieldByName('item_price'), item_price:rows.fieldByName('item_price')});
		rows.next();
	}
	db.close();
	return retData;
};

exports.selectItem = function(rowID) {
	var retData = [];
	var db = Ti.Database.open(DATABASE_NAME);
	var rows = db.execute('select ROWID, * from purchases where ROWID=? limit 1', rowID);
	while (rows.isValidRow()) {
		retData.push({item_name:rows.fieldByName('item_name'), id:rows.fieldByName('ROWID'), item_price:rows.fieldByName('item_price'),
					note:rows.fieldByName('note'), location_latitude:rows.fieldByName('location_latitude'), location_longitude:rows.fieldByName('location_longitude'),
					date_time:rows.fieldByName('date_time')});
		rows.next();
	}
	var categories = db.execute('select ROWID, * from purchase_categories where purchase_id=?', rowID);
	var categoryIds = [];
	while(categories.isValidRow()) {
		categoryIds.push(categories.fieldByName('category_id'));
		categories.next();
	}
	//Ti.API.info('category ids: ' + categoryIds);
	var categoryNames = [];
	var categoryNameQuery = 'select category_name from categories where ROWID in (';
	if(categoryIds.length > 0) {
		for(var i=0; i<=categoryIds.length-1; i++) {
			if((i == (categoryIds.length-1))){
				categoryNameQuery += '?';
			} else {
				categoryNameQuery += '?,';
			}
		}
		categoryNameQuery += ')';
		var categoryName = db.execute(categoryNameQuery, categoryIds);
		while(categoryName.isValidRow()) {
			categoryNames.push(categoryName.fieldByName('category_name'));
			categoryName.next();
		}
		retData[0].categoryNames = categoryNames;
	}
	
	db.close();
	return retData;
}

exports.addItem = function(item_name, item_price, optional_args) {
	var mydb = Ti.Database.open(DATABASE_NAME);
	
	Ti.API.info("lat: " + optional_args.userLat + ' lon: ' + optional_args.userLon);
	 
	mydb.execute('insert into purchases (item_name, item_price, note, location_latitude, location_longitude) values (?,?,?,?,?)', 
			item_name, item_price,optional_args.note, optional_args.userLat, optional_args.userLon);
	
	if(optional_args.hasOwnProperty('categoryIds')) {
		if(optional_args.categoryIds.length > 0) {
			var row = mydb.execute('select ROWID from purchases order by rowid desc limit 1');
			var purchaseId = row.fieldByName('ROWID');
			var categoriesLength = optional_args.categoryIds.length;
			for(var i=0; i<=categoriesLength-1; i++) {
				//Ti.API.info('adding category to db: ' + optional_args.categoryIds[i]);
				mydb.execute('insert into purchase_categories values (?,?)', purchaseId, optional_args.categoryIds[i]);
			}
		}
	}
	mydb.close();
};

exports.selectCategories = function() {
	var retData = [];
	var db = Ti.Database.open(DATABASE_NAME);
	var rows = db.execute('select ROWID, * from categories order by category_name asc');
	while (rows.isValidRow()) {
		retData.push({category_name:rows.fieldByName('category_name'), id:rows.fieldByName('ROWID')});
		rows.next();
	}
	db.close();
	return retData;
}

exports.addCategory = function(category_name) {
	var mydb = Ti.Database.open(DATABASE_NAME);
	mydb.execute('insert into categories values (?)', category_name);
	mydb.close();
}
