var DATABASE_NAME = 'purchases';

exports.createDb = function() {
	Ti.Database.install('purchases.sqlite', DATABASE_NAME);
}

exports.selectItems = function() {
	var retData = [];
	var db = Ti.Database.open(DATABASE_NAME);
	var rows = db.execute('select ROWID, * from purchases order by date_time desc');
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
					date_time:rows.fieldByName('date_time'), question_1_emotion:rows.fieldByName('question_1_emotion'), photo:rows.fieldByName('photo_url')});
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
	var categoryIconNames = [];
	var categoryWhiteIconNames = [];
	var categoryNameQuery = 'select * from categories where ROWID in (';
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
			categoryIconNames.push(categoryName.fieldByName('icon_name'));
			categoryWhiteIconNames.push(categoryName.fieldByName('white_icon_name'));
			categoryName.next();
		}
		retData[0].categoryNames = categoryNames;
		retData[0].categoryIconNames = categoryIconNames;
		retData[0].categoryWhiteIconNames = categoryWhiteIconNames;
	}
	
	//emotion name
	var emotionId = retData[0].question_1_emotion;
	if(emotionId > -1){
		var emotionName = db.execute('select ROWID, * from emotions where ROWID=? limit 1', emotionId);
		retData[0].question_1_emotion_name = emotionName.fieldByName('emotion');
	}
	
	db.close();
	return retData;
}

exports.addItem = function(item_name, item_price, optional_args) {
	var mydb = Ti.Database.open(DATABASE_NAME);
	
	//Ti.API.info("lat: " + optional_args.userLat + ' lon: ' + optional_args.userLon);
	 
	mydb.execute('insert into purchases (item_name, item_price, note, location_latitude, location_longitude, question_1_emotion, photo_url) values (?,?,?,?,?,?,?)', 
			item_name, item_price,optional_args.note, optional_args.userLat, optional_args.userLon, optional_args.question_1_emotion, optional_args.photo);
	
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
		retData.push({category_name:rows.fieldByName('category_name'), whiteIconName:rows.fieldByName('white_icon_name'),
				 iconName:rows.fieldByName('icon_name'), id:rows.fieldByName('ROWID')});
		rows.next();
	}
	db.close();
	return retData;
}

exports.selectEmotions = function() {
	var retData = [];
	var db = Ti.Database.open(DATABASE_NAME);
	var rows = db.execute('select ROWID, * from emotions order by emotion asc');
	while (rows.isValidRow()) {
		retData.push({emotion:rows.fieldByName('emotion'), id:rows.fieldByName('ROWID'), iconName:rows.fieldByName('icon_name')});
		rows.next();
	}
	db.close();
	return retData;
}

exports.selectEmotionById = function(_id) {
	var retData = [];
	var db = Ti.Database.open(DATABASE_NAME);
	var rows = db.execute('select ROWID, * from emotions where ROWID=?', _id);
	while (rows.isValidRow()) {
		retData.push({emotion:rows.fieldByName('emotion'), id:rows.fieldByName('ROWID'), iconName:rows.fieldByName('icon_name')});
		rows.next();
	}
	db.close();
	return retData;
}

exports.getEmotionalSums = function() {
	var retData = [];
	var db = Ti.Database.open(DATABASE_NAME);
	var emotionIds = [];
	var emotions = db.execute('select ROWID, * from emotions');
	while(emotions.isValidRow()) {
		emotionIds.push({id:emotions.fieldByName('ROWID'), emotion:emotions.fieldByName('emotion')});
		emotions.next();
	}
	
	//now scroll through emotion ids grabbing $$ sum
	for(var i=0; i<=emotionIds.length-1; i++) {
		var sum = db.execute('select sum(item_price) as priceSum from purchases where question_1_emotion=?', emotionIds[i].id);
		if(sum.fieldByName('priceSum') != null){
			retData.push({id:emotionIds[i].id, sum:sum.fieldByName('priceSum'), emotion:emotionIds[i].emotion});
		}	
	}
	db.close();
	return retData;
}

exports.getEmotionalSumByCategory = function(emotionId) {
	// 1. get all items with emotionId
	var retData = [];
	var db = Ti.Database.open(DATABASE_NAME);
	var purchasesWithEmotionArray = [];
	var purchasesWithEmotion = db.execute('select ROWID, * from purchases where question_1_emotion=?', emotionId);
	while(purchasesWithEmotion.isValidRow()) {
		purchasesWithEmotionArray.push(purchasesWithEmotion.fieldByName('ROWID'));
		purchasesWithEmotion.next();
	}
	//Ti.API.info('purchases with emotion: ' + purchasesWithEmotionArray + ' emotion id: ' + emotionId);
	var categoryQuery = '';
	//build category query string
	for(var i=0; i<=purchasesWithEmotionArray.length-1; i++) {
		if((i == (purchasesWithEmotionArray.length-1))){
			categoryQuery += purchasesWithEmotionArray[i];
		} else {
			categoryQuery += purchasesWithEmotionArray[i] + ',';
		}
	}
	//Ti.API.info('category query: ' + categoryQuery);
	var categoriesInQuestionArray = [];
	var categoriesInQuestion = db.execute('select category_id from purchase_categories where purchase_id in (' + categoryQuery + ')');
	while(categoriesInQuestion.isValidRow()) {
		categoriesInQuestionArray.push(categoriesInQuestion.fieldByName('category_id'));
		categoriesInQuestion.next();
	}
	var sumQuery = '';
	//build category query string
	categoriesInQuestionArray = require('util').removeArrayDuplicates(categoriesInQuestionArray);
	for(var i=0; i<=categoriesInQuestionArray.length-1; i++) {
		if((i == (categoriesInQuestionArray.length-1))){
			sumQuery += categoriesInQuestionArray[i];
		} else {
			sumQuery += categoriesInQuestionArray[i] + ',';
		}
	}
	//Ti.API.info('categories in question: ' + categoriesInQuestionArray);
	var purchaseIdsFromCategoryIdsArray = [];
	//do a loop through the categories in question
	for(var i=0; i<= categoriesInQuestionArray.length-1; i++) {
		var purchaseIdsFromCategoryIds = db.execute('select purchase_id, category_id from purchase_categories where category_id=?', categoriesInQuestionArray[i]);
		var pids = [];
		var cid = -1;
		while(purchaseIdsFromCategoryIds.isValidRow()) {
			pids.push(purchaseIdsFromCategoryIds.fieldByName('purchase_id'));
			cid = purchaseIdsFromCategoryIds.fieldByName('category_id');
			Ti.API.info('hey im inserting category_id: ' + purchaseIdsFromCategoryIds.fieldByName('category_id') + ' for purchase_id: ' + purchaseIdsFromCategoryIds.fieldByName('purchase_id'));
			purchaseIdsFromCategoryIds.next();
		}
		purchaseIdsFromCategoryIdsArray.push({purchase_ids:pids, category_id:cid});
	}
	//Ti.API.info('purchase ids ' + purchaseIdsFromCategoryIdsArray);
	for(var i=0; i<=purchaseIdsFromCategoryIdsArray.length-1; i++) {
		//need to build query
		var pidString = '';
		for(var k=0; k<=purchaseIdsFromCategoryIdsArray[i].purchase_ids.length-1; k++) {
			if((k == (purchaseIdsFromCategoryIdsArray[i].purchase_ids.length-1))){
				pidString += purchaseIdsFromCategoryIdsArray[i].purchase_ids[k];
			} else {
				pidString += purchaseIdsFromCategoryIdsArray[i].purchase_ids[k] + ',';
			}
		}
		//Ti.API.info('purchase ids for query: ' + pidString + ' with catid: ' + purchaseIdsFromCategoryIdsArray[i].category_id);
		var sumsInQuestion = db.execute('select sum(item_price) as priceSum from purchases where question_1_emotion=? and ROWID in (' + pidString + ')', emotionId);
		while(sumsInQuestion.isValidRow()){
			var categoryName = '';
			var cn = db.execute('select ROWID,* from categories where ROWID=?', purchaseIdsFromCategoryIdsArray[i].category_id);
			while(cn.isValidRow()){
				categoryName = cn.fieldByName('category_name');
				cn.next();
			}
			retData.push({category_id:purchaseIdsFromCategoryIdsArray[i].category_id, sum:sumsInQuestion.fieldByName('priceSum'), category_name:categoryName});
			Ti.API.info('for cat id: ' + purchaseIdsFromCategoryIdsArray[i].category_id + ', ' + categoryName + ' we have a sum of ' + sumsInQuestion.fieldByName('priceSum'));
			sumsInQuestion.next();
		}
	}
	db.close();
	return retData;
}

exports.addCategory = function(category_name) {
	var mydb = Ti.Database.open(DATABASE_NAME);
	mydb.execute('insert into categories (category_name) values (?)', category_name);
	mydb.close();
}

exports.getCategoryById = function(category_id) {
	var db = Ti.Database.open(DATABASE_NAME);
	var retData = [];
	var query = db.execute('select ROWID, * from categories where ROWID=?', category_id);
	while(query.isValidRow()){
		retData.push({category_name:query.fieldByName('category_name'), id:category_id});
	}
	db.close();
}

exports.getProfileStats = function() {
	var retData = {};
	var db = Ti.Database.open(DATABASE_NAME);
	//total spent
	var totalSpentQuery = db.execute('select sum(item_price) as purchaseSum, count(item_price) as purchaseCount from purchases');
	while(totalSpentQuery.isValidRow()) {
		retData.totalSpent = totalSpentQuery.fieldByName('purchaseSum');
		retData.purchaseCount = totalSpentQuery.fieldByName('purchaseCount');
		totalSpentQuery.next();
	}
	//total spent while a certain emotion- use previous function
	//points
	var userQuery = db.execute('select ROWID, * from users where username=?', 'alonecuzzo');
	while(userQuery.isValidRow()) {
		retData.userObject = {};
		retData.userObject.points = userQuery.fieldByName('points');
		retData.userObject.challengesCompleted = userQuery.fieldByName('challenges_completed');
		retData.userObject.firstName = userQuery.fieldByName('first_name');
		retData.userObject.lastName = userQuery.fieldByName('last_name');
		retData.userObject.userName = userQuery.fieldByName('username');
		userQuery.next();
	}
	//goals completed - limits/contstraints broken?
	db.close();
	return retData;
}

exports.selectFromTable = function(table) {
	var retData = [];
	var db = Ti.Database.open(DATABASE_NAME);
	var rows = db.execute('select ROWID, * from ' + table);
	while (rows.isValidRow()) {
		if(table === 'emotions'){
			retData.push({id:rows.fieldByName('ROWID'), emotion:rows.fieldByName('emotion'), iconName:rows.fieldByName('icon_name')});
		} else if(table === 'categories') {
			retData.push({id:rows.fieldByName('ROWID'), category_name:rows.fieldByName('category_name')});
		}
		rows.next();
	}
	db.close();
	return retData;
};

exports.addLimit = function(limitObject) {
	var mydb = Ti.Database.open(DATABASE_NAME);
	mydb.execute('insert into limits (name, end_date, limit_amount, limit_type, limit_constraint, completed) values (?,?,?,?,?,?)', 
			limitObject.name, limitObject.end_date, limitObject.limit_amount, limitObject.limit_type, limitObject.limit_constraint, limitObject.completed);
	mydb.close();
}

exports.selectLimits = function() {
	var retData = [];
	var db = Ti.Database.open(DATABASE_NAME);
	var query = db.execute('select ROWID, * from limits where completed=? order by date_time desc', 'false');
	while(query.isValidRow()){
		retData.push({id:query.fieldByName('ROWID'), name:query.fieldByName('name'), endDate:query.fieldByName('end_date'),
			limitAmount:query.fieldByName('limit_amount'), limitType:query.fieldByName('limit_type'), limitConstraint:query.fieldByName('limit_constraint'),
			completed:query.fieldByName('completed'), dateTime:query.fieldByName('date_time')});
		query.next();
	}
	db.close();
	return retData;
}

exports.selectLimitTypes = function() {
	var retData = [];
	var db = Ti.Database.open(DATABASE_NAME);
	var rows = db.execute('select ROWID, * from limit_types');
	while (rows.isValidRow()) {
		retData.push({id:rows.fieldByName('ROWID'), limit_type:rows.fieldByName('limit_type')});
		rows.next();
	}
	db.close();
	return retData;
};
