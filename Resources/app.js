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
	
	//considering tablet to have one dimension over 900px - this is imperfect, so you should feel free to decide
	//yourself what you consider a tablet form factor for android
	var isTablet = osname === 'ipad' || (osname === 'android' && (width > 899 || height > 899));
	
	var tabGroup = Ti.UI.createTabGroup();
 
	var myOnlyWin = Ti.UI.createWindow({
	    backgroundColor: '#FFF', 
	    title : 'Purchases' 
	    //tabBarHidden:true
	});
	
	var chartWindow = Ti.UI.createWindow({
		backgroundColor: '#FFF',
		title : 'Charts',
		
	});
	 
	var addButton = Titanium.UI.createButton({ systemButton : Titanium.UI.iPhone.SystemButton.ADD }); 
	myOnlyWin.setRightNavButton(addButton);
	var AddWindow = require('ui/AddWindow').AddWindow;
	
	addButton.addEventListener("click", function() {
		Ti.API.info("add clicked");
		new AddWindow().open();
		/*var w = Ti.UI.createWindow({
			backgroundColor:'#FFF',
			title: 'Add an Item'
		});
		
		var closeButton = Titanium.UI.createButton({ systemButton : Titanium.UI.iPhone.SystemButton.DONE });
		w.setRightNavButton(closeButton);
		closeButton.addEventListener('click',function()
		{
			w.close();
		});
		w.open({modal:true,modalTransitionStyle:Ti.UI.iPhone.MODAL_TRANSITION_STYLE_COVER_VERTICAL,modalStyle:Ti.UI.iPhone.MODAL_PRESENTATION_FULLSCREEN,navBarHidden:false});
		*/
		//Ti.Platform.openURL("http://www.google.com/");
	});
	
	//hack so we can get the nav bar
	var tab = Ti.UI.createTab({ 
	     title :"Purchases",
	    window: myOnlyWin
	});
	
	var chartTab = Ti.UI.createTab({
		title: 'Charts',
		window: chartWindow
	});
	 
	tabGroup.addTab(tab);
	tabGroup.addTab(chartTab);
	tabGroup.open();
})();
