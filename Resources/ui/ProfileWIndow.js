exports.ProfileWindow = function(args) {
	var self = Ti.UI.createWindow(args);
	
	// create the label
	var titleLabel = Titanium.UI.createLabel({
	    color:'#444',
	    height:'auto',
	    width:'auto',
	    top:10,
	    text:'Profile',
	    textAlign:'center',
	    font:{fontSize:20,fontWeight:'bold'},
	    shadowColor:'#eee',shadowOffset:{x:0,y:1}
	});
	
	self.setTitleControl(titleLabel);
	self.barImage = 'iphone/navBackground.png';
	
	var topBackgroundColor = Titanium.UI.createView({
						backgroundColor:'#444',
						height:80,
				  	    width:350,
						left:0,
						top:0
					});
	
	//we want totals per emotion too, use emotion sum function from db.js
	var profileObject = require('db').getProfileStats();
	
	Ti.API.info('totalSpent: ' + profileObject.totalSpent);
	Ti.API.info('purchaseCount: ' + profileObject.purchaseCount);
	Ti.API.info('points: ' + profileObject.userObject.points);
	Ti.API.info('first_name: ' + profileObject.userObject.firstName);
	Ti.API.info('last_name: ' + profileObject.userObject.lastName);
	Ti.API.info('user_name: ' + profileObject.userObject.userName);
	Ti.API.info('challenges_completed: ' + profileObject.userObject.challengesCompleted);
	
	var sectionCategory = Ti.UI.createTableViewSection({ headerTitle:'' });
	sectionCategory.add(Ti.UI.createTableViewRow({title:'Manage Goals', hasChild:true, backgroundColor:'#FFF'}));
	sectionCategory.add(Ti.UI.createTableViewRow({title:'Manage Challenges', hasChild:true, backgroundColor:'#FFF'}));
	
	var table = Ti.UI.createTableView({
	  data: [sectionCategory],
	  backgroundColor:'#dfdfdf',
	  selectionStyle: Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
	  top:120
	});
	
	var avatarImageView = Titanium.UI.createImageView({
		height:60,
		width:60,
		top:10,
		left:10,
		borderColor:'#b7b7b7',
		borderWidth:1,
		backgroundColor:'#fff',
		image:'iphone/avatar.png'
	});
	
	var nameLabel = Ti.UI.createLabel({
	  color: '#f7f7f7',
	  font: {fontSize:18, fontWeight:'bold'},
	  text: profileObject.userObject.firstName + ' ' + profileObject.userObject.lastName,
	  top: 10,
	  left: 80,
	  width: 'auto', height: 'auto'
	});
	
	var totalSpentLabel = Ti.UI.createLabel({
	  color: '#444',
	  font: {fontSize:10, fontWeight:'bold'},
	  text: 'spent',
	  top: 105,
	  right: 45,
	  width: 'auto', height: 'auto'
	});
	
	var totalSpent = Ti.UI.createLabel({
	  color: '#111',
	  font: {fontSize:18, fontWeight:'bold'},
	  text: '$' + profileObject.totalSpent,
	  top: 85,
	  right: 25,
	  width: 'auto', height: 'auto'
	});
	
	var pointsLabel = Ti.UI.createLabel({
	  color: '#444',
	  font: {fontSize:10, fontWeight:'bold'},
	  text: 'points',
	  top: 105,
	  left: 135,
	  width: 'auto', height: 'auto'
	});
	
	var points = Ti.UI.createLabel({
	  color: '#111',
	  font: {fontSize:18, fontWeight:'bold'},
	  text: profileObject.userObject.points,
	  top: 85,
	  left: 140,
	  width: 'auto', height: 'auto'
	});
	
	var totalItemsBoughtLabel = Ti.UI.createLabel({
	  color: '#444',
	  font: {fontSize:10, fontWeight:'bold'},
	  text: 'purchases',
	  top: 105,
	  left: 20,
	  width: 'auto', height: 'auto'
	});
	
	var totalItemsBought = Ti.UI.createLabel({
	  color: '#333',
	  font: {fontSize:18, fontWeight:'bold'},
	  text: profileObject.purchaseCount,
	  top: 85,
	  left: 38,
	  textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
	  width: 'auto', height: 'auto'
	});
	
	var shareButtonBarBackground = Ti.UI.createView({
		backgroundImage:'iphone/shareButtonBarBackground.png',
		width:350,
		height:60,
		top:75
	});
	
	var verticalDivider = Ti.UI.createView({
		backgroundColor:'#ccc',
		width:1,
		height:50,
		left:118,
		top:5
	});
	
	var verticalDivider2 = Ti.UI.createView({
		backgroundColor:'#ccc',
		width:1,
		height:50,
		left:215,
		top:5
	});
	
	shareButtonBarBackground.add(verticalDivider);
	shareButtonBarBackground.add(verticalDivider2);
	
	
	table.style = Ti.UI.iPhone.TableViewStyle.GROUPED;
	
	table.addEventListener('click', function(e){
		if(e.row.title === 'Manage Goals') {
			var LimitListView = require('ui/LimitListView').LimitListView;
			var limitListView = new LimitListView({
				backgroundColor: '#FFF',
				title: 'Goals'
			});
			limitListView.containingTab = self.containingTab;
			self.containingTab.open(limitListView,{animated:true});
		} else if(e.row.title === 'Manage Challenges') {
			var ChallengeListView = require('ui/ChallengeListView').ChallengeListView;
			var challengeListWindow = new ChallengeListView({
				backgroundColor: '#FFF',
				title: 'Challenges'
			});
			self.containingTab.open(challengeListWindow,{animated:true});
		}
	});
	
	self.add(topBackgroundColor);
	self.add(table);
	self.add(shareButtonBarBackground);
	self.add(avatarImageView);
	self.add(nameLabel);
	self.add(totalSpent);
	self.add(totalSpentLabel);
	self.add(totalItemsBought);
	self.add(totalItemsBoughtLabel);
	self.add(points);
	self.add(pointsLabel);
	
	
	return self;
}
