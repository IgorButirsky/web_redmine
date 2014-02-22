angular.module("redmineApp").controller("mainCtrl", ["$scope", "$spMenu", "$location", "Users", "Projects", "Issues",
									 function($scope, $spMenu, $location, Users, Projects, Issues){
 	var offset = 0;
	var limit = 25;
	var isLoading = false;
	var screens = null;

	function initScreens() {
		screens = [
			{
				title : "Projects",
				url : "http://crm.mlsdev.com/projects.json",
				successResultCallback : function(data){
					$scope.projectsData = data;
					isLoading = false;
				},
				params : {key:$scope.token}
			},
			{
				title : "Tasks",
				url : "http://crm.mlsdev.com/issues.json",
				successResultCallback : function(data){
					$scope.issuesData = data;
					offset += limit;
					isLoading = false;
				},
				params : {offset:offset, key:$scope.token}
			},
			{
				title : "My Profile",
				url : "http://crm.mlsdev.com/users/current.json",
				successResultCallback : function(data){
					$scope.user = data.user;
					isLoading = false;
				},
				params : {key:$scope.token}
			}
		];
		$scope.menuItems = new Array();
		for (var i = 0; i < screens.length; ++i) {
			$scope.menuItems[i] = screens[i].title;	
		};
	}

	var setCurrentScreen = function(index) {
		$scope.currentScreen = screens[index];
		$scope.pageTitle = $scope.currentScreen.title;
		isLoading = true;

        if (index == 0) {
            $scope.projectsData = Projects.get({key:$scope.token}, function(){
                console.log("get projects succeess");
                isLoading = false;
            }, function(){
                console.log("get projects error");
                isLoading = false;
            });
        } else if (index == 1) {
            $scope.issuesData = Issues.get({offset:offset, key:$scope.token}, function(){
                console.log("get issues succeess");
                offset += limit;
                isLoading = false;
            }, function(){
                console.log("get issues error");
                isLoading = false;
            });
        } else {
            console.log("Profile screen selected");
            $scope.user = Users.get({key:$scope.token}, function(){
                console.log("get user succeess");
                isLoading = false;
            }, function(){
                console.log("get user error");
                isLoading = false;
            });
        }
        $spMenu.hide();
	};

	var showLoginScreen = function() {
		$location.path('/login');
		$location.replace();	
	};

	var init = function() {
		if (localStorage.getItem("api_key") != null) {
			$scope.token = localStorage.getItem("api_key");
			initScreens();
			setCurrentScreen(0);	
		} else {
			showLoginScreen();	
		}
	};

	$scope.onMenuItemClick = function(index) {
		setCurrentScreen(index);
	};

	$scope.onLogout = function() {
		localStorage.removeItem("api_key");
		showLoginScreen();
	};

	$scope.onProjectSelected = function(index) {
		console.log("project " + index + " selected");
		$location.path('/main/projects/' + $scope.projectsData.projects[index].id);
	}

	$scope.onIssueSelected = function(index) {
		console.log("issue " + index + " selected");
		$location.path('/main/issues/' + $scope.issuesData.issues[index].id);
	}

	$scope.loadMore = function() {
        console.log("loadMore");
        if (!isLoading) {
        	console.log("isLoading != true");
        	isLoading = true;
            Issues.get({offset:offset, key:$scope.token}, function(issuesResult, getResponseHeaders){
                console.log("get issues next page succeess");
                $scope.issuesData.issues = $scope.issuesData.issues.concat(issuesResult.issues);
                offset += limit;
                isLoading = false;
                console.log("issues num : " + $scope.issuesData.issues.length);
            }, function(){
                console.log("get issues next page error");
                isLoading = false;
            });
		}
    };
	
	init();
}]);

