angular.module("redmineApp").controller("issueCtrl", ["$scope", "$routeParams", function($scope, $routeParams) {
	$scope.issueId = $routeParams.issueId;
}]);