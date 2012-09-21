exports.ChartDetailWindow = function(args) {
	var self = Ti.UI.createWindow(args);
	var sums = require('db').getEmotionalSumByCategory(args.emotionId);
	return self;
}
