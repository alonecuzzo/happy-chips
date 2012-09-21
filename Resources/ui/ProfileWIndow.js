exports.ProfileWindow = function(args) {
	var self = Ti.UI.createWindow(args);
	
	//we want totals per emotion too, use emotion sum function from db.js
	var profileObject = require('db').getProfileStats();
	
	Ti.API.info('totalSpent: ' + profileObject.totalSpent);
	Ti.API.info('purchaseCount: ' + profileObject.purchaseCount);
	Ti.API.info('points: ' + profileObject.userObject.points);
	Ti.API.info('first_name: ' + profileObject.userObject.firstName);
	Ti.API.info('last_name: ' + profileObject.userObject.lastName);
	Ti.API.info('user_name: ' + profileObject.userObject.userName);
	
	return self;
}
