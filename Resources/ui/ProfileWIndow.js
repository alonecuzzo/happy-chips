exports.ProfileWindow = function(args) {
	var self = Ti.UI.createWindow(args);
	
	// create the label
	var titleLabel = Titanium.UI.createLabel({
	    color:'#525252',
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
	  top:70
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
	  color: '#111',
	  font: {fontSize:18, fontWeight:'bold'},
	  text: profileObject.userObject.firstName + ' ' + profileObject.userObject.lastName,
	  top: 10,
	  left: 80,
	  width: 'auto', height: 'auto'
	});
	
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
	
	self.add(table);
	self.add(avatarImageView);
	self.add(nameLabel);
	
	
	return self;
}
