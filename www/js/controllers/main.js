angular.module("redmineApp").controller("mainCtrl", ["$scope", "$http", "$spMenu", "$location", "$log", function($scope, $http, $spMenu, $location, $log){
	var screens = [
		{
			title : "Projects",
			url : "http://crm.mlsdev.com/projects.json",
			successResultCallback : function(data){
				$scope.projectsData = data;
			}
		},
		{
			title : "Tasks",
			url : "http://crm.mlsdev.com/issues.json",
			successResultCallback : function(data){
				$scope.issuesData = data;
			}
		},
		{
			title : "My Profile",
			url : "http://crm.mlsdev.com/users/current.json",
			successResultCallback : function(data){
				$scope.user = data.user;
			}
		}
	];

	var setCurrentPage = function(index) {
		$scope.currentScreen = screens[index];
		$scope.pageTitle = $scope.currentScreen.title;
		$http.get($scope.currentScreen.url, {params:{key:$scope.token}})
				.success($scope.currentScreen.successResultCallback);
		$spMenu.hide();
	};

	var showLoginScreen = function() {
		$location.path('/login');
		$location.replace();	
	};

	var init = function() {
		if (localStorage.getItem("api_key") != null) {
			$scope.token = localStorage.getItem("api_key");
			setCurrentPage(0);	
		} else {
			showLoginScreen();	
		}
	};

	$scope.menuItems = new Array();
	for (var i = 0; i < screens.length; ++i) {
		$scope.menuItems[i] = screens[i].title;	
	};

	$scope.onMenuItemClick = function(index) {
		setCurrentPage(index);
	};

	$scope.onLogout = function() {
		localStorage.removeItem("api_key");
		showLoginScreen();
	};

	$scope.onProjectSelected = function(index) {
		$log.log("project " + index + " selected");
		$location.path('/main/projects/' + $scope.projectsData.projects[index].id);
	}

	$scope.onIssueSelected = function(index) {
		$log.log("issue " + index + " selected");
		$location.path('/main/issues/' + $scope.issuesData.issues[index].id);
	}
	
	init();
}]);

