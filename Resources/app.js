/*
 * Single Window Application Template:
 * A basic starting point for your application.  Mostly a blank canvas.
 * 
 * In app.js, we generally take care of a few things:
 * - Bootstrap the application with any data we need
 * - Check for dependencies like device type, platform version or network connection
 * - Require and open our top-level UI component
 *  
 */

//bootstrap and check dependencies
if (Ti.version < 1.8 ) {
	alert('Sorry - this application template requires Titanium Mobile SDK 1.8 or later');	  	
}

// This is a single context application with mutliple windows in a stack
(function() {
	//determine platform and form factor and render approproate components
	var osname = Ti.Platform.osname,
		version = Ti.Platform.version,
		height = Ti.Platform.displayCaps.platformHeight,
		width = Ti.Platform.displayCaps.platformWidth;
	
	//initialize local storage
	require('db').createDb();
	
	//considering tablet to have one dimension over 900px - this is imperfect, so you should feel free to decide
	//yourself what you consider a tablet form factor for android
	var isTablet = osname === 'ipad' || (osname === 'android' && (width > 899 || height > 899));
	
	var tabGroup = Ti.UI.createTabGroup(),
		PurchaseListWindow = require('ui/PurchaseListWindow').PurchaseListWindow;
 
	var purchasesWindow = new PurchaseListWindow({
	    backgroundColor: '#FFF', 
	    title : 'Purchases' 
	});
	
	var chartWindow = Ti.UI.createWindow({
		backgroundColor: '#FFF',
		title : 'Charts',
		
	});
	 
	var purchaseWindowAddButton = Titanium.UI.createButton({ systemButton : Titanium.UI.iPhone.SystemButton.ADD }); 
	purchasesWindow.setRightNavButton(purchaseWindowAddButton);
	var AddWindow = require('ui/AddWindow').AddWindow;
	
	var chartWindowAddButton = Titanium.UI.createButton({ systemButton : Titanium.UI.iPhone.SystemButton.ADD }); 
	chartWindow.setRightNavButton(chartWindowAddButton);
	
	function showAddWindow() {
		Ti.API.info("add clicked");
		var addWindow = new AddWindow();
		addWindow.open();
	}
	
	chartWindowAddButton.addEventListener("click", showAddWindow);
	purchaseWindowAddButton.addEventListener("click", showAddWindow);
	
	var tab = Ti.UI.createTab({ 
	    title :"Purchases",
	    window: purchasesWindow
	});
	
	var chartTab = Ti.UI.createTab({
		title: 'Charts',
		window: chartWindow
	});
	 
	tabGroup.addTab(tab);
	tabGroup.addTab(chartTab);
	tabGroup.open();
})();
