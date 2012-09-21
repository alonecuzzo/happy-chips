exports.ChartDetailWindow = function(args) {
	var self = Ti.UI.createWindow(args);
	require('db').getEmotionalSumByCategory(args.emotionId);
	return self;
}
