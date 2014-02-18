angular.module("redmineApp").controller("mainCtrl", ["$scope", "$http", function($scope, $http){
	$scope.token = localStorage.getItem("api_key");
	$scope.projectsData = {total_count : 0};
	$http.get("http://crm.mlsdev.com/projects.json", {params:{key:$scope.token}})
		.success(function(data){
			$scope.projectsData = data;
		});
}]);