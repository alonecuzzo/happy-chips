exports.ChallengeListView = function(args) {
	var self = Ti.UI.createWindow(args);
	// create the label
	var titleLabel = Titanium.UI.createLabel({
	    color:'#444',
	    height:'auto',
	    width:'auto',
	    top:10,
	    text:'Challenges',
	    textAlign:'center',
	    font:{fontSize:20,fontWeight:'bold'},
	    shadowColor:'#eee',shadowOffset:{x:0,y:1}
	});
	
	self.setTitleControl(titleLabel);
	self.barImage = 'iphone/navBackground.png';
	
	//back button
	var backbutton = Titanium.UI.createButton({
		title:'', 
		backgroundImage:'iphone/backArrow.png',
		width:20,
		height:18
	});
	backbutton.addEventListener('click', function() {
		self.close();
	});
	self.leftNavButton = backbutton;
	return self;
}
