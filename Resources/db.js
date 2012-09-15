var DATABASE_NAME = 'purchases';

exports.createDb = function() {
	Ti.Database.install('purchases.sqlite', DATABASE_NAME);
}

exports.addItem = function(item_name, item_price) {
	var mydb = Ti.Database.open(DATABASE_NAME);
	mydb.execute('insert into purchases values (?,?)', item_name, item_price);
	mydb.close();
};
