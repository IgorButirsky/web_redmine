angular.module("redmineApp").controller("mainCtrl", ["$scope", "$http", "$spMenu", "$location", "$log",
									 function($scope, $http, $spMenu, $location, $log){
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
		$http.get($scope.currentScreen.url, {params:$scope.currentScreen.params})
				.success($scope.currentScreen.successResultCallback)
				.error(function(data, status) {
					isLoading = false;
				});
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
		$log.log("project " + index + " selected");
		$location.path('/main/projects/' + $scope.projectsData.projects[index].id);
	}

	$scope.onIssueSelected = function(index) {
		$log.log("issue " + index + " selected");
		$location.path('/main/issues/' + $scope.issuesData.issues[index].id);
	}

	$scope.loadMore = function() {
        console.log("loadMore");
        if (!isLoading) {
        	console.log("isLoading != true");
        	isLoading = true;
	        $http.get($scope.currentScreen.url, {params:{offset:offset, key:$scope.token}})
					.success(function(data) {
						console.log("success");
						$scope.issuesData.issues = $scope.issuesData.issues.concat(data.issues);
						offset += limit;
						isLoading = false;
					})
					.error(function(data, status) {
						console.log("error");
						isLoading = false;
					});
		}
    };
	
	init();
}]);

