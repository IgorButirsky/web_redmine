angular.module("redmineApp").controller("mainCtrl", ["$scope", "$spMenu", "$location", "Users", "Projects", "Issues",
									 function($scope, $spMenu, $location, Users, Projects, Issues){
 	var offset = 0;
	var limit = 25;
	var isLoading = false;
	var screens = null;

    function handleResponse() {
        isLoading = false;
    }

	function initScreens() {
		screens = [
			{
				title : "Projects",
                doAction : function() {
                    $scope.projectsData = Projects.get({key:$scope.token}, handleResponse(), handleResponse());
                }
			},
			{
				title : "Tasks",
                doAction : function() {
                    $scope.issuesData = Issues.get({offset:offset, key:$scope.token}, function(){
                        offset += limit;
                        isLoading = false;
                    }, handleResponse());
                }
			},
			{
				title : "My Profile",
                doAction : function() {
                    $scope.user = Users.get({key:$scope.token}, handleResponse(), handleResponse());
                }
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
        $scope.currentScreen.doAction();
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
            Issues.get({offset:offset, key:$scope.token}, function(issuesResult){
                $scope.issuesData.issues = $scope.issuesData.issues.concat(issuesResult.issues);
                offset += limit;
                isLoading = false;
            }, handleResponse());
		}
    };
	
	init();
}]);

