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

exports.addItem = function(item_name, item_price) {
	var mydb = Ti.Database.open(DATABASE_NAME);
	mydb.execute('insert into purchases values (?,?)', item_name, item_price);
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
