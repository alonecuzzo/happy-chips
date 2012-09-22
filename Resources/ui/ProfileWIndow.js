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
	Ti.API.info('challenges_completed: ' + profileObject.userObject.challengesCompleted);
	
	var sectionCategory = Ti.UI.createTableViewSection({ headerTitle:'' });
	sectionCategory.add(Ti.UI.createTableViewRow({title:'Manage Goals', hasChild:true}));
	sectionCategory.add(Ti.UI.createTableViewRow({title:'Manage Challenges', hasChild:true}));
	
	var table = Ti.UI.createTableView({
	  data: [sectionCategory]
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
	
	return self;
}
