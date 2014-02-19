angular.module("redmineApp").controller("mainCtrl", ["$scope", "$http", function($scope, $http){
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
	}

	$scope.token = localStorage.getItem("api_key");
	$scope.menuItems = new Array();
	for (var i = 0; i < screens.length; ++i) {
		$scope.menuItems[i] = screens[i].title;	
	}

	$scope.onMenuItemClick = function(index) {
		setCurrentPage(index);
	};

	setCurrentPage(0);

}]);

