angular.module("redmineApp").controller("issueCtrl", ["$scope", "$routeParams", "$http", function($scope, $routeParams, $http) {
	$scope.issueId = $routeParams.issueId;

	$http.get("http://crm.mlsdev.com/issues/" + $scope.issueId + ".json", {params:{key:localStorage.getItem("api_key")}})
				.success(function(data) {
					$scope.issue = data.issue;
				});
}]);