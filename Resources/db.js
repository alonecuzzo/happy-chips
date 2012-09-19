var DATABASE_NAME = 'purchases';

exports.createDb = function() {
	Ti.Database.install('purchases.sqlite', DATABASE_NAME);
}

exports.selectItems = function() {
	var retData = [];
	var db = Ti.Database.open(DATABASE_NAME);
	var rows = db.execute('select ROWID, * from purchases');
	while (rows.isValidRow()) {
		retData.push({item_name:rows.fieldByName('item_name'), id:rows.fieldByName('ROWID'), item_price:rows.fieldByName('item_price')});
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
		retData.push({item_name:rows.fieldByName('item_name'), id:rows.fieldByName('ROWID'), item_price:rows.fieldByName('item_price')});
		rows.next();
	}
	db.close();
	return retData;
}

exports.addItem = function(item_name, item_price, item_categories) {
	var mydb = Ti.Database.open(DATABASE_NAME);
	mydb.execute('insert into purchases values (?,?,0,0,0,0,0,0,0,0,0,0,0,0)', item_name, item_price);
	Ti.API.info('categories: ' + item_categories);
	if(item_categories.length > 0) {
		var row = mydb.execute('select ROWID from purchases order by rowid desc limit 1');
		var purchaseId = row.fieldByName('ROWID');
		var categoriesLength = item_categories.length;
		for(var i=0; i<=categoriesLength-1; i++) {
			Ti.API.info('adding category to db: ' + item_categories[i]);
			mydb.execute('insert into purchases_categories values (?,?)', purchaseId, item_categories[i]);
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
