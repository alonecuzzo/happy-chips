exports.LimitListView = function(args) {
	var self = Ti.UI.createWindow(args);
	
	var addButton = Titanium.UI.createButton({ systemButton : Titanium.UI.iPhone.SystemButton.ADD}); 
	self.setRightNavButton(addButton);
	
	addButton.addEventListener('click', function(){
		var AddLimitRootWindow = require('ui/AddLimitRootWindow').AddLimitRootWindow;
		var addLimitRootWindow = new AddLimitRootWindow({
			modal:true,
			navBarHidden:true
		});
		addLimitRootWindow.open();
	});
	
	return self;
}
