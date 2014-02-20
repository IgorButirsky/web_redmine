angular.module("redmineApp").controller("projectCtrl", ["$scope", "$routeParams", function($scope, $routeParams){
	$scope.projectId = $routeParams.projectId;
}]);