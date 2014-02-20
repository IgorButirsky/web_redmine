angular.module("redmineApp").controller("projectCtrl", ["$scope", "$routeParams", "$http", "$log", "$location",
											 function($scope, $routeParams, $http, $log, $location){
	$scope.projectId = $routeParams.projectId;

	$scope.loadIssues = function() {
		$log.log("Start loading issues");
		$http.get("http://crm.mlsdev.com/issues.json?", {params:{project_id:$scope.projectId, key:localStorage.getItem("api_key")}})
				.success(function(data) {
					$log.log("issues loading finished");
					$scope.issuesData = data;
				});	
	};

	$scope.onIssueSelected = function (index) {
		$log.log("Issue " + index + " selected");
		$location.path("/main/projects/" + $scope.projectId + "/issues/" + $scope.issuesData.issues[index].id);
	};

	$http.get("http://crm.mlsdev.com/projects/" + $scope.projectId + ".json?", {params:{key:localStorage.getItem("api_key")}})
				.success(function(data) {
					$scope.project = data.project;
					$scope.loadIssues();
				});

}]);