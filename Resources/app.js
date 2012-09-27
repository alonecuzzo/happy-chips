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
	
	//add prototype to object to check and see if an object has property
	Object.prototype.hasOwnProperty = function(property) {
	    return this[property] !== undefined;
	};
	
	Date.prototype.getMonthName = function(lang) {
    	lang = lang && (lang in Date.locale) ? lang : 'en';
    	return Date.locale[lang].month_names[this.getMonth()];
	};
	
	Date.prototype.getMonthNameShort = function(lang) {
	    lang = lang && (lang in Date.locale) ? lang : 'en';
	    return Date.locale[lang].month_names_short[this.getMonth()];
	};
	
	Date.locale = {
	    en: {
	       month_names: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
	       month_names_short: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
	    }
	};
	
	Ti.Geolocation.purpose = "Recieve User Location";
	
	//considering tablet to have one dimension over 900px - this is imperfect, so you should feel free to decide
	//yourself what you consider a tablet form factor for android
	var isTablet = osname === 'ipad' || (osname === 'android' && (width > 899 || height > 899));
	
	var tabGroup = Ti.UI.createTabGroup({}),
		PurchaseListWindow = require('ui/PurchaseListWindow').PurchaseListWindow,
		PurchaseChartWindow = require('ui/PurchaseChartWindow').PurchaseChartWindow,
		SettingsWindow = require('ui/SettingsWindow').SettingsWindow,
		ProfileWindow = require('ui/ProfileWindow').ProfileWindow;
 
	var purchasesWindow = new PurchaseListWindow({
	    backgroundColor: '#cfcfcf',
	    tabBarHidden: true,
	    height:380,
	    top:0//,
	    //title:'Purchases'
	});
	
	purchasesWindow.barImage = 'iphone/navBackground.png';
	
	var chartWindow = new PurchaseChartWindow({
		backgroundColor: '#FFF',
		title : 'Charts',
	    tabBarHidden: true,
	    height:380,
	    top:0
	});
	
	var settingsWindow = new SettingsWindow({
		backgroundColor:'#dfdfdf',
		title:'Settings',
		backgroundImage:'iphone/tabButtonBackground.png',
	    tabBarHidden: true,
	    height:380,
	    top:0
	});
	
	var profileWindow = new ProfileWindow({
		backgroundColor:'#dfdfdf',
		title:'Profile',
	    tabBarHidden: true,
	    height:380,
	    top:0
	});
	 
	var purchaseWindowAddButton = Titanium.UI.createButton({ 
		height:'30dp',
		width:'30dp',
		backgroundImage:'iphone/edit.png' 
	}); 
	purchasesWindow.setRightNavButton(purchaseWindowAddButton);
	var AddWindow = require('ui/AddWindow').AddWindow;
	
	var chartWindowAddButton = Titanium.UI.createButton({ 
		height:'30dp',
		width:'30dp',
		backgroundImage:'iphone/edit.png' 
	}); 
	chartWindow.setRightNavButton(chartWindowAddButton);
	
	function showAddWindow() {
		Ti.API.info("add clicked");
		var addWindow = new AddWindow({
			modal:true,
			navBarHidden:true
		});
		addWindow.open();
	}
	
	chartWindowAddButton.addEventListener("click", showAddWindow);
	purchaseWindowAddButton.addEventListener("click", showAddWindow);
	
	var tab = Ti.UI.createTab({ 
		//title: 'Purchases',
	    window: purchasesWindow
	});
	purchasesWindow.containingTab = tab;
	
	var chartTab = Ti.UI.createTab({
		title: 'Charts',
		window: chartWindow
	});
	chartWindow.containingTab = chartTab;
	
	var profileTab = Ti.UI.createTab({
		title: 'Profile',
		window: profileWindow
	});
	profileWindow.containingTab = profileTab;
	
	var settingsTab = Ti.UI.createTab({
		title: 'Settings',
		window: settingsWindow
	});
	settingsWindow.containingTab = settingsTab;
	 
	tabGroup.addTab(tab);
	tabGroup.addTab(chartTab);
	tabGroup.addTab(profileTab);
	tabGroup.addTab(settingsTab);
	tabGroup.open();
	
	// tutorial found here http://netsells.co.uk/blog/tutorial-custom-iphone-tabbar-using-appcelerator-titanium/
	Ti.include("customTabBar/customTabBar.js");
 
	var myCustomTabBar = new CustomTabBar({
		tabBar: tabGroup,
		imagePath: 'iphone/',
		width: 80,
		height: 45,
		items: [
		{ image: 'purchasesButtonBackground.png', selected: 'purchasesButtonBackgroundSelected.png' },
		{ image: 'chartButtonBackground.png', selected: 'chartButtonBackgroundSelected.png' },
		{ image: 'profileButtonBackground.png', selected: 'profileButtonBackgroundSelected.png' },
		{ image: 'settingsButtonBackground.png', selected: 'settingsButtonBackgroundSelected.png' }
		]
	});
})();
